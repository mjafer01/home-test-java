package com.hometestjava.api.db;

import com.hometestjava.api.db.schemas.Account;
import com.hometestjava.api.db.schemas.AccountLogin;

import java.io.IOException;
import java.sql.*;

public class AccountLogins {
    private DBConnection dbConnection;
    public AccountLogins() throws SQLException, IOException {
        this.dbConnection = new DBConnection();
    }
    public boolean add (AccountLogin accountLogin) throws SQLException {
        String sql= "Insert into account_logins(email,password,lastLogin,accountID,dateCreated,dateUpdated,createdByAccountID,updatedByAccountID) values(?,?,?,?,?,?,?,?)";
        PreparedStatement statement = this.dbConnection.getConnection().prepareStatement(sql);
        statement.setString(1,accountLogin.email);
        statement.setString(2,accountLogin.password);
        statement.setString(3,  accountLogin.lastLogin);
        statement.setInt(4,accountLogin.accountID);
        statement.setString(5, accountLogin.dateCreated);
        statement.setString(6, accountLogin.dateUpdated);
        statement.setInt(7,accountLogin.createdByAccountID);
        statement.setInt(8,accountLogin.updatedByAccountID);
        statement.execute();
        this.dbConnection.close();
        return true;
    }

    public boolean isEmailExist(String email) throws SQLException {
        String sql = "Select * from account_logins where email = ?";
        PreparedStatement statement = this.dbConnection.getConnection().prepareStatement(sql);
        statement.setString(1,email);
        ResultSet resultSet = statement.executeQuery();
        while(resultSet.next()){
            this.dbConnection.close();
            return true;
        }
        return false;
    }

    private AccountLogin updateLastLogin(Integer accountLoginID,String email,String password) throws SQLException {
        String sql = "Update account_logins set lastLogin = now() where accountLoginID = ?";
        PreparedStatement statement = this.dbConnection.getConnection().prepareStatement(sql);
        statement.setInt(1,accountLoginID);
        statement.execute();
        return getAccountIDByEmailAndPassword(email,password,false);

    }

    public AccountLogin getAccountIDByEmailAndPassword(String email,String password,boolean ddLastLoginData) throws SQLException {
        String sql = "Select * from account_logins where email = ? and password = ?";
        PreparedStatement statement = this.dbConnection.getConnection().prepareStatement(sql);
        statement.setString(1,email);
        statement.setString(2,password);
        ResultSet resultSet = statement.executeQuery();
        while(resultSet.next()){
            AccountLogin accountLogin = new AccountLogin();
            if(ddLastLoginData) {
                accountLogin.accountID = resultSet.getInt(1);
                accountLogin.email = resultSet.getString(2);
                accountLogin.lastLogin = resultSet.getString(4);
                accountLogin.accountID = resultSet.getInt(5);
            }
            else {
                accountLogin = this.updateLastLogin(resultSet.getInt(1), email, password);
            }
            this.dbConnection.close();
            return accountLogin;
        }
        return null;
    }
}
