package com.hometestjava.api.bids;

import com.hometestjava.api.db.Bids;
import com.hometestjava.api.db.Projects;
import com.hometestjava.api.db.schemas.Bid;
import com.hometestjava.api.db.schemas.Project;
import com.hometestjava.api.projects.ProjectData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class BidsService {

    public ResponseEntity add(BidData bidData, Integer accountID) throws SQLException, IOException {
        try {
            Bid bid = new Bid();
            DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
            Date date = new Date();
            bid.accountID = accountID;
            bid.projectID = bidData.projectID;
            bid.bidPriceTypeID = bidData.bidPriceTypeID;
            bid.price = bidData.price;
            bid.dateCreated = dateFormat.format(date);
            bid.dateUpdated = dateFormat.format(date);
            bid.createdByAccountID = accountID;
            bid.updatedByAccountID = accountID;
            new Bids().add(bid);
        }
        catch (SQLException | IOException exp){
            return new ResponseEntity<>( HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    public ResponseEntity getAllAccountProjects(Integer accountID,Integer projectID,Integer page, Integer record)  {
        try {
            return new ResponseEntity<>(new Bids().getAccountProjectBid(accountID,projectID,page,record),HttpStatus.OK);
        }
        catch (SQLException | IOException exp){
            return new ResponseEntity<>( HttpStatus.EXPECTATION_FAILED);
        }
    }

    public ResponseEntity getProjectBid(Integer projectID,Integer page, Integer record)  {
        try {
            return new ResponseEntity<>(new Bids().getProjectBid(projectID,page,record),HttpStatus.OK);
        }
        catch (SQLException | IOException exp){
            return new ResponseEntity<>( HttpStatus.EXPECTATION_FAILED);
        }
    }

    public ResponseEntity getBid(Integer accountID)  {
        try {
            return new ResponseEntity<>(new Bids().getBid(accountID),HttpStatus.OK);
        }
        catch (SQLException | IOException exp){
            return new ResponseEntity<>( HttpStatus.EXPECTATION_FAILED);
        }
    }
}
