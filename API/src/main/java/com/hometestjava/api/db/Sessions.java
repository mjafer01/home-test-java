package com.hometestjava.api.db;

import com.hometestjava.api.db.schemas.Session;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Sessions {
    private DBConnection dbConnection;
    public Sessions() throws SQLException, IOException {
        this.dbConnection = new DBConnection();
    }
    public Integer newSession (Session session) throws SQLException {
        String sql= "Insert into sessions(accountID,session,expiredDate) values(?,?,DATE_ADD(now(), INTERVAL 1 DAY))";
        PreparedStatement statement = null;
        statement = this.dbConnection.getConnection().prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
        statement.setInt(1,session.accountID);
        statement.setString(2,session.session);
        Integer effectedRow = statement.executeUpdate();
        ResultSet rs=statement.getGeneratedKeys();
        Integer sessionID = 0;
        if (rs.next()) {
            sessionID = rs.getInt(1);
        }
        this.dbConnection.close();
        return sessionID;
    }
    public boolean isSessionExit (Integer accountID, String session) throws SQLException {
        String sql= "Select * from sessions where accountID = ? and session = ? and expiredDate > now()";
        PreparedStatement statement = null;
        statement = this.dbConnection.getConnection().prepareStatement(sql);
        statement.setInt(1,accountID);
        statement.setString(2,session);
        ResultSet rs= statement.executeQuery();
        if (rs.next()) {
            this.dbConnection.close();
            return true;
        }
        this.dbConnection.close();
        return false;
    }
}
