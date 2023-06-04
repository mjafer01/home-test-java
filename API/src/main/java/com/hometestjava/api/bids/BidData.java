package com.hometestjava.api.bids;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class BidData {
    public Integer projectID;
    public Integer bidPriceTypeID;
    public String price;
}
