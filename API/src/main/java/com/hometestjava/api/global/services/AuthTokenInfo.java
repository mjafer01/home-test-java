package com.hometestjava.api.global.services;

import com.hometestjava.api.db.BridgeAccountsTypes;
import com.hometestjava.api.db.Sessions;
import com.hometestjava.api.db.schemas.BridgeAccountType;
import lombok.val;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;

@Service
public class AuthTokenInfo {

    private String sessionID;
    private Integer accountID;
    private String email;

    private String token;

    private ArrayList<BridgeAccountType> bridgeAccountTypeList;

    public boolean initialiseAuthTokenInfo(String authToken) {
        try {
            this.token = authToken;
            String[] arrayToken = authToken.split(":");
            this.sessionID = arrayToken[0];
            this.email = new String(Base64.getDecoder().decode(arrayToken[1]));
            this.accountID = new Integer(new String(Base64.getDecoder().decode(arrayToken[2])));
            this.bridgeAccountTypeList = new BridgeAccountsTypes().getAllAccountType(accountID);
        }
        catch (Exception ex){
            return false;
        }
        return true;
    }
    public String getSessionID() {
        return this.sessionID;
    }
    public String getEmail(){
        return this.email;
    }
    public Integer getAccountID(){
        return this.accountID;
    }

    public boolean authorize(String authToken) throws SQLException, IOException {
        if(!this.initialiseAuthTokenInfo( authToken)){
            return false;
        }
        return new Sessions().isSessionExit(this.accountID,authToken);

    }
    public boolean isCustomer() {
        for(int i=0; i < bridgeAccountTypeList.size(); i++)
        {
            if(bridgeAccountTypeList.get(i).accountTypeID == 1)
                return true;
        }
        return false;
    }
    public boolean isTradie() {
        for(int i=0; i < bridgeAccountTypeList.size(); i++)
        {
            if(bridgeAccountTypeList.get(i).accountTypeID == 2)
                return true;
        }
        return false;
    }

}
