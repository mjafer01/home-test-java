package com.hometestjava.api.db.schemas;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class AccountLogin {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public Integer accountLoginID;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public Integer accountID;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String email;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String password;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String lastLogin;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String dateCreated;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String dateUpdated;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public Integer createdByAccountID;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public Integer updatedByAccountID;

}
