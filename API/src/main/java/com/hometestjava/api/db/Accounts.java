package com.hometestjava.api.db;

import com.hometestjava.api.db.schemas.Account;
import com.hometestjava.api.db.schemas.Bid;
import io.swagger.models.auth.In;
import org.mariadb.jdbc.internal.com.read.dao.Results;

import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;

public class Accounts {
    private DBConnection dbConnection;
    public Accounts() throws SQLException, IOException {
        this.dbConnection = new DBConnection();
    }
    public Integer newAccount (Account account) throws SQLException {
        String sql= "Insert into accounts(firstName,lastName,dateCreated,dateUpdated,createdByAccountID,updatedByAccountID) values(?,?,?,?,?,?)";
        PreparedStatement statement = null;
        statement = this.dbConnection.getConnection().prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
        statement.setString(1,account.firstName);
        statement.setString(2,account.lastName);
        statement.setString(3, account.dateCreated);
        statement.setString(4, account.dateUpdated);
        statement.setInt(5,account.createdByAccountID);
        statement.setInt(6,account.updatedByAccountID);
        Integer effectedRow = statement.executeUpdate();
        ResultSet rs=statement.getGeneratedKeys();
        Integer accountID = 0;
        if (rs.next()) {
            accountID = rs.getInt(1);
        }
        this.dbConnection.close();
        return accountID;
    }

    public Account getByAccountID(Integer accountID) throws SQLException {
        String sql = "Select * from accounts where accountID = ?";
        PreparedStatement statement = this.dbConnection.getConnection().prepareStatement(sql);
        statement.setInt(1,accountID);
        ResultSet resultSet = statement.executeQuery();
        Account account = new Account();
        while(resultSet.next()){
            account.accountID = resultSet.getInt(1);
            account.firstName = resultSet.getString(2);
            account.lastName = resultSet.getString(3);
        }
        this.dbConnection.close();
        return account;
    }



}
