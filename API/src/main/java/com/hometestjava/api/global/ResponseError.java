package com.hometestjava.api.global;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.http.HttpStatus;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class ResponseError {
    public HttpStatus status;
    public String message;
}
