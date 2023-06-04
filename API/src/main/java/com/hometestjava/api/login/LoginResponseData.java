package com.hometestjava.api.login;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.hometestjava.api.db.BridgeAccountsTypes;
import com.hometestjava.api.db.schemas.Account;
import com.hometestjava.api.db.schemas.AccountLogin;
import com.hometestjava.api.db.schemas.BridgeAccountType;
import lombok.Data;

import java.util.ArrayList;

@JsonIgnoreProperties(ignoreUnknown = true)

public class LoginResponseData {
    public String session;
    public String expiredDate;
    public Account account;
    public AccountLogin accountLogin;
    public ArrayList<BridgeAccountType> accountTypes;
}
