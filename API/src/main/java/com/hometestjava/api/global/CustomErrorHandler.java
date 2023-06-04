package com.hometestjava.api.global;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;

import javax.validation.ConstraintViolationException;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

@ControllerAdvice
public class CustomErrorHandler {
    @ExceptionHandler(ConstraintViolationException.class)
    public void handleConstraintViolationException(ConstraintViolationException exception,
                                                   ServletWebRequest webRequest) throws IOException {
        webRequest.getResponse().sendError(HttpStatus.BAD_REQUEST.value(), exception.getMessage());
    }
/*
    @ExceptionHandler(ConstraintViolationException.class)
    public
    ResponseEntity <Map<String, java.lang.Object>> handleConstraintViolationException(ConstraintViolationException exception) {
        Map<String, java.lang.Object> customError = new LinkedHashMap<>();
        customError.put("status", HttpStatus.BAD_REQUEST);
        customError.put("exception", exception.getMessage());
        customError.put("constraint", exception.getConstraintViolations());
        return ResponseEntity.badRequest().body(customError);
    }*/
}
