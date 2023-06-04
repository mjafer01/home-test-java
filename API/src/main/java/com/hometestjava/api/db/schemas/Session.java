package com.hometestjava.api.db.schemas;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;


@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Session {
    public Integer sessionID;
    public Integer accountID;
    public String session;
    public String expiredDate;

}

