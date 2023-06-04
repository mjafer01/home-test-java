package com.hometestjava.api.login;

import com.hometestjava.api.register.RegistrationData;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Properties;

@RequestMapping(value="/api/v1/login", name="Login")
@Validated
@RestController
@RequiredArgsConstructor
public class LoginController {
    @Autowired
    LoginService loginService;

    @RequestMapping(value = "", method = RequestMethod.POST, consumes="application/json", produces ="application/json"  )
    @Operation(summary = "login into an Account", description = "Returns 201 if successful and session information")

    @ApiResponses(
            value = {
                    @ApiResponse(code = 201, message = "Success", responseContainer = "default"),
                    @ApiResponse(code = 400, message = "Missing required parameter"),
                    @ApiResponse(code = 401, message = "Unauthorized")
            }
    )
    @ResponseStatus(value = HttpStatus.CREATED)
    ResponseEntity login(@Valid @RequestBody LoginData loginData) throws SQLException, IOException {
        return this.loginService.authoriseLogin(loginData.email,loginData.password);
    };



    @RequestMapping(value = "/health", method = RequestMethod.GET )
    @Operation(summary = "login into an Account", description = "Returns 201 if successful and session information")

    @ApiResponses(
            value = {
                    @ApiResponse(code = 201, message = "Success", responseContainer = "default"),
                    @ApiResponse(code = 400, message = "Missing required parameter"),
                    @ApiResponse(code = 401, message = "Unauthorized")
            }
    )
    @ResponseStatus(value = HttpStatus.CREATED)
    ResponseEntity<String> Health() throws SQLException, IOException {

        String url="jdbc:mariadb://"+System.getenv("MYSQL_HOST")+":3306/customer-tradie-projects";
        return new ResponseEntity(url, HttpStatus.OK);
    };
}
