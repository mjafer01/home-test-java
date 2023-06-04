package com.hometestjava.api.projects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class WinningBidData {
    @NotNull
    public Integer projectID;
    @NotNull
    public Integer bidID;
}
