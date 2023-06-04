package com.hometestjava.api.db;

import com.hometestjava.api.db.schemas.AccountLogin;
import com.hometestjava.api.db.schemas.BridgeAccountType;
import com.hometestjava.api.db.schemas.Project;

import java.io.IOException;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class BridgeAccountsTypes {
    private DBConnection dbConnection;
    public BridgeAccountsTypes() throws SQLException, IOException {
        this.dbConnection = new DBConnection();
    }
    public boolean add (BridgeAccountType bridgeAccountType) throws SQLException {
        String sql= "Insert into bridge_accounts_types(accountID,accountTypeID,dateCreated,dateUpdated,createdByAccountID,updatedByAccountID) values(?,?,?,?,?,?)";
        PreparedStatement statement = this.dbConnection.getConnection().prepareStatement(sql);
        statement.setInt(1,bridgeAccountType.accountID);
        statement.setInt(2,bridgeAccountType.accountTypeID);
        statement.setString(3, bridgeAccountType.dateCreated);
        statement.setString(4,  bridgeAccountType.dateUpdated);
        statement.setInt(5,bridgeAccountType.createdByAccountID);
        statement.setInt(6,bridgeAccountType.updatedByAccountID);
        statement.execute();
        this.dbConnection.close();
        return true;
    }
    public ArrayList<BridgeAccountType> getAllAccountType (Integer accountID) throws SQLException {
        String sql= "SELECT  * from bridge_accounts_types WHERE accountID = ? limit 2";
        PreparedStatement statement = this.dbConnection.getConnection().prepareStatement(sql);
        statement.setInt(1,accountID);
        ResultSet resultSet = statement.executeQuery();
        ArrayList<BridgeAccountType> bridgeAccountTypeList = new ArrayList<BridgeAccountType>();
        while(resultSet.next()){
            BridgeAccountType bridgeAccountType = new BridgeAccountType();
            bridgeAccountType.accountTypeID = resultSet.getInt(3);
            bridgeAccountTypeList.add(bridgeAccountType);
        }
        this.dbConnection.close();
        return bridgeAccountTypeList;
    }
}
