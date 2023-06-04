package com.hometestjava.api.register;

import com.hometestjava.api.global.ResponseError;
import com.hometestjava.api.db.AccountLogins;
import com.hometestjava.api.db.Accounts;
import com.hometestjava.api.db.BridgeAccountsTypes;
import com.hometestjava.api.db.schemas.Account;
import com.hometestjava.api.db.schemas.AccountLogin;
import com.hometestjava.api.db.schemas.BridgeAccountType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
@Service
public class RegistrationService {

    public ResponseEntity register(RegistrationData registrationData) {
        try {
            if(new AccountLogins().isEmailExist(registrationData.email)){
                ResponseError responseError = new ResponseError();
                responseError.status = HttpStatus.BAD_REQUEST;
                responseError.message = "Email already exists";
                return new ResponseEntity<>(responseError, HttpStatus.BAD_REQUEST);
            }
            Integer accountID = this.newAccount(registrationData);
            this.newAccountLogin(registrationData, accountID);
            this.addBridgeAccountTypes(accountID);
        }
        catch (SQLException | IOException exp){
            return new ResponseEntity<>( HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    private void addBridgeAccountTypes(Integer accountID) throws SQLException, IOException {
        BridgeAccountType bridgeAccountType = new BridgeAccountType();
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        bridgeAccountType.bridgeAccountTypeID = null;
        bridgeAccountType.accountID = accountID;
        bridgeAccountType.accountTypeID = 1;
        bridgeAccountType.dateCreated  = dateFormat.format(date);
        bridgeAccountType.dateUpdated  = dateFormat.format(date);
        bridgeAccountType.createdByAccountID = 0;
        bridgeAccountType.updatedByAccountID = 0;
        new BridgeAccountsTypes().add(bridgeAccountType);
        bridgeAccountType.accountTypeID = 2;
        new BridgeAccountsTypes().add(bridgeAccountType);
    }

    private void newAccountLogin(RegistrationData registrationData,Integer accountID) throws SQLException, IOException {
        AccountLogin accountLogin = new AccountLogin();
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        accountLogin.accountLoginID = null;
        accountLogin.email = registrationData.email;
        accountLogin.password = registrationData.password;
        accountLogin.lastLogin = dateFormat.format(date);
        accountLogin.accountID = accountID;
        accountLogin.dateCreated = dateFormat.format(date);
        accountLogin.dateUpdated = dateFormat.format(date);
        accountLogin.createdByAccountID = 0;
        accountLogin.updatedByAccountID = 0;
        new AccountLogins().add(accountLogin);
    }

    private Integer newAccount(RegistrationData registrationData) throws SQLException, IOException {
        Account account = new Account();
        Date date = new Date();
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        account.accountID = null;
        account.firstName = registrationData.firstName;
        account.lastName = registrationData.lastName;
        account.dateCreated = dateFormat.format(date);
        account.dateUpdated = dateFormat.format(date);
        account.createdByAccountID = 0;
        account.updatedByAccountID = 0;
        return new Accounts().newAccount(account);

    }

}
