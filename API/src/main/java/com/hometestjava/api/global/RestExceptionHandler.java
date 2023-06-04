package com.hometestjava.api.global;

import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.util.WebUtils;

import java.util.Map;

@Component
public class RestExceptionHandler extends DefaultErrorAttributes {

    @Override
    public Map<String, Object> getErrorAttributes(
            WebRequest webRequest, ErrorAttributeOptions options) {
        options = options.including(ErrorAttributeOptions.Include.MESSAGE);
        boolean isIncluded = options.isIncluded(ErrorAttributeOptions.Include.MESSAGE);
        Map<String, Object> errorAttributes =
                super.getErrorAttributes(webRequest, options);
       //errorAttributes.remove("error");
       errorAttributes.remove("path");
       if(errorAttributes.get("message") != null){
          // String msg = errorAttributes.get("message").toString();
          // errorAttributes.remove("message");
          // errorAttributes.put("message",msg.split(": ")[1]);
       }

        return errorAttributes;
    }


}