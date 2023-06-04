package com.hometestjava.api.db;

import com.hometestjava.api.db.schemas.Bid;
import com.hometestjava.api.db.schemas.Project;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class Bids {
    private DBConnection dbConnection;
    public Bids() throws SQLException, IOException {
        this.dbConnection = new DBConnection();
    }
    public boolean add (Bid bid) throws SQLException {
        String sql= "Insert into bids (projectID,accountID,bidPriceTypeID,price,dateCreated,dateUpdated,createdByAccountID,updatedByAccountID) values(?,?,?,?,?,?,?,?)";
        PreparedStatement statement = this.dbConnection.getConnection().prepareStatement(sql);
        statement.setInt(1,bid.projectID);
        statement.setInt(2,bid.accountID);
        statement.setInt(3,bid.bidPriceTypeID);
        statement.setString(4,  bid.price);
        statement.setString(5, bid.dateCreated);
        statement.setString(6, bid.dateUpdated);
        statement.setInt(7,bid.createdByAccountID);
        statement.setInt(8,bid.updatedByAccountID);
        statement.execute();
        this.dbConnection.close();
        return true;
    }

    public ArrayList<Bid> getAccountProjectBid(Integer accountID,Integer projectID,int page, int record) throws SQLException {
        String sql = "Select * from (Select * from bids bd1 where bd1.accountID = ? and bd1.projectID = ? LIMIT ?,?) as bdt1, (Select count(bd2.bidID) as total from bids bd2 where bd2.accountID = ? and bd2.projectID = ? ) as bdt2";
        PreparedStatement statement = this.dbConnection.getConnection().prepareStatement(sql);
        statement.setInt(1,accountID);
        statement.setInt(2,projectID);
        statement.setInt(3,page);
        statement.setInt(4,record);
        statement.setInt(5,accountID);
        statement.setInt(6,projectID);
        ArrayList<Bid>  list = this.generateArrayList(statement.executeQuery());
        this.dbConnection.close();
        return list;
    }

    public ArrayList<Bid> getProjectBid(Integer projectID,int page, int record) throws SQLException {
        String sql = "Select * from (Select * from bids bd1 where bd1.projectID = ? LIMIT ?,?) as bdt1, (Select count(bd2.bidID) as total from bids bd2 where bd2.projectID = ?) as bdt2";
        PreparedStatement statement = this.dbConnection.getConnection().prepareStatement(sql);
        statement.setInt(1,projectID);
        statement.setInt(2,page);
        statement.setInt(3,record);
        statement.setInt(4,projectID);
        ArrayList<Bid>  list = this.generateArrayList(statement.executeQuery());
        this.dbConnection.close();
        return list;
    }

    public Bid getBid(Integer bidID) throws SQLException {
        String sql = "Select * from bids where bidID = ?";
        PreparedStatement statement = this.dbConnection.getConnection().prepareStatement(sql);
        statement.setInt(1,bidID);
        ResultSet resultSet  = statement.executeQuery();
        Bid bid = new Bid();
        while(resultSet.next()){
            bid.bidID = resultSet.getInt(1);
            bid.projectID = resultSet.getInt(2);
            bid.accountID = resultSet.getInt(3);
            bid.bidPriceTypeID = resultSet.getInt(4);
            bid.price = resultSet.getString(5);
            bid.dateUpdated = resultSet.getString(6);
            bid.dateCreated = resultSet.getString(7);
            bid.updatedByAccountID = resultSet.getInt(9);
            bid.createdByAccountID = resultSet.getInt(8);
        }
        this.dbConnection.close();
        return bid;
    }


    private ArrayList<Bid> generateArrayList(ResultSet resultSet) throws SQLException {
        ArrayList<Bid>  list = new ArrayList<Bid>();
        while(resultSet.next()){
            Bid bid = new Bid();
            bid.bidID = resultSet.getInt(1);
            bid.projectID = resultSet.getInt(2);
            bid.accountID = resultSet.getInt(3);
            bid.bidPriceTypeID = resultSet.getInt(4);
            bid.price = resultSet.getString(5);
            bid.dateUpdated = resultSet.getString(6);
            bid.dateCreated = resultSet.getString(7);
            bid.updatedByAccountID = resultSet.getInt(9);
            bid.createdByAccountID = resultSet.getInt(8);
            bid.total = resultSet.getInt(10);
            list.add(bid);
        }
        return list;
    }
}
