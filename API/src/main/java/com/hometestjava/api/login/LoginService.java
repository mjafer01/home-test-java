package com.hometestjava.api.login;

import com.hometestjava.api.db.AccountLogins;
import com.hometestjava.api.db.Accounts;
import com.hometestjava.api.db.BridgeAccountsTypes;
import com.hometestjava.api.db.Sessions;
import com.hometestjava.api.db.schemas.AccountLogin;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;
import com.hometestjava.api.db.schemas.Session;

@Service
public class LoginService {

    public ResponseEntity authoriseLogin(String email, String password) throws SQLException, IOException {

        try {
            DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
            Date date = new Date();
            LoginResponseData loginResponseData = new LoginResponseData();
            loginResponseData.accountLogin = new AccountLogins().getAccountIDByEmailAndPassword(email,password,true);
            if(loginResponseData.accountLogin == null){
                return new ResponseEntity<>( HttpStatus.UNAUTHORIZED);
            }
            loginResponseData.account = new Accounts().getByAccountID(loginResponseData.accountLogin.accountID);
            loginResponseData.accountTypes = new BridgeAccountsTypes().getAllAccountType(loginResponseData.accountLogin.accountID);
            loginResponseData.expiredDate  = dateFormat.format(date);
            if(loginResponseData.accountLogin == null){
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            loginResponseData.session = UUID.randomUUID().toString()+":"+ Base64.getEncoder().encodeToString(email.getBytes())+":"+Base64.getEncoder().encodeToString(loginResponseData.accountLogin.accountID.toString().getBytes());
            Session session = new Session();
            session.accountID = loginResponseData.accountLogin.accountID;
            session.session = loginResponseData.session;
            session.expiredDate  = loginResponseData.expiredDate;
            new Sessions().newSession(session);
            return new ResponseEntity<>(loginResponseData,HttpStatus.CREATED);
        }
        catch (SQLException | IOException exp){
            return new ResponseEntity<>( HttpStatus.EXPECTATION_FAILED);
        }
    }


}
