package com.hometestjava.api.projects;

import com.hometestjava.api.db.Projects;
import com.hometestjava.api.db.schemas.Project;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class ProjectsService {

    public ResponseEntity add(ProjectData projectData, Integer accountID) throws SQLException, IOException {
        try {
            Project project = new Project();
            DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
            Date date = new Date();
            project.accountID = accountID;
            project.projectName = projectData.projectName;
            project.projectDescription = projectData.projectDescription;
            project.projectHours = projectData.projectHours;
            project.projectEnd = projectData.projectEnd;
            project.dateCreated = dateFormat.format(date);
            project.dateUpdated = dateFormat.format(date);
            project.createdByAccountID = accountID;
            project.updatedByAccountID = accountID;
            new Projects().add(project);
        }
        catch (SQLException | IOException exp){
            return new ResponseEntity<>( HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    public ResponseEntity assignWinningBid(Integer accountID,int projectID, int bidID) throws SQLException, IOException {
        try {
            new Projects().assignWinningBid(accountID,projectID,bidID);
        }
        catch (SQLException | IOException exp){
            return new ResponseEntity<>( HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    public ResponseEntity getAllAccountProjects(Integer accountID,Integer page, Integer record)  {
        try {
            return new ResponseEntity<>(new Projects().getAllAccountProjects(accountID,page,record),HttpStatus.OK);
        }
        catch (SQLException | IOException exp){
            return new ResponseEntity<>( HttpStatus.EXPECTATION_FAILED);
        }
    }

    public ResponseEntity getAccountOpenProjects(Integer accountID,int page, int record)  {
        try {
            return new ResponseEntity<>(new Projects().getAccountOpenProjects(accountID,page,record),HttpStatus.OK);
        }
        catch (SQLException | IOException exp){
            return new ResponseEntity<>( HttpStatus.EXPECTATION_FAILED);
        }
    }

    public ResponseEntity getAccountClosedProjects(Integer accountID,int page, int record)  {
        try {
            return new ResponseEntity<>(new Projects().getAccountClosedProjects(accountID,page,record),HttpStatus.OK);
        }
        catch (SQLException | IOException exp){
            return new ResponseEntity<>( HttpStatus.EXPECTATION_FAILED);
        }
    }

    public ResponseEntity getAllActiveProjects(int page, int record)  {
        try {
            return new ResponseEntity<>(new Projects().getAllActiveProjects(page,record),HttpStatus.OK);
        }
        catch (SQLException | IOException exp){
            return new ResponseEntity<>( HttpStatus.EXPECTATION_FAILED);
        }
    }

    public ResponseEntity getProject(int projectID)  {
        try {
            return new ResponseEntity<>(new Projects().getProject(projectID),HttpStatus.OK);
        }
        catch (SQLException | IOException exp){
            return new ResponseEntity<>( HttpStatus.EXPECTATION_FAILED);
        }
    }
/*
    public ResponseEntity getWinningBidsProjects(Integer accountID,int page, int record)  {
        try {
            return new ResponseEntity<>(new Projects().getAccountClosedProjects(accountID,page,record),HttpStatus.OK);
        }
        catch (SQLException | IOException exp){
            return new ResponseEntity<>( HttpStatus.EXPECTATION_FAILED);
        }
    }
    */
}
