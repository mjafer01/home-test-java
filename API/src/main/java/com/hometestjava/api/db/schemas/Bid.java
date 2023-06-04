package com.hometestjava.api.db.schemas;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Bid {
    public Integer bidID;
    public Integer projectID;
    public Integer accountID;
    public Integer bidPriceTypeID;
    public String price;
    public Integer total;
    public String dateUpdated;
    public String dateCreated;
    public Integer updatedByAccountID;
    public Integer createdByAccountID;
}
