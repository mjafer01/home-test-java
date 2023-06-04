package com.hometestjava.api.db.schemas;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Project {
    public Integer projectID;
    public Integer accountID;
    public String projectName;
    public String projectDescription;
    public String projectHours;
    public String projectEnd;
    public Integer winningBidID;
    public String dateUpdated;
    public String dateCreated;
    public Integer updatedByAccountID;
    public Integer createdByAccountID;
    public Integer total;
    public Integer isActive;
}
