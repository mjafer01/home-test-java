package com.hometestjava.api.register;

import com.hometestjava.api.global.services.AuthTokenInfo;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.sql.SQLException;

@RequestMapping("/api/v1/register")
@Validated
@RestController
@RequiredArgsConstructor
public class RegisterController {
    @Autowired
    RegistrationService registrationService;
    AuthTokenInfo authTokenInfo;

    @RequestMapping(value = "", method = RequestMethod.POST, consumes="application/json")
    @Operation(summary = "Register an new Account", description = "Returns 201 if successful")

    @ApiResponses(
            value = {
                    @ApiResponse(code = 201, message = "Success", responseContainer = "default"),
                    @ApiResponse(code = 400, message = "Missing required parameter"),
                    @ApiResponse(code = 415, message = "Content type not supported")
            }
    )
    @ResponseStatus(value = HttpStatus.CREATED)
    ResponseEntity register(@Valid @RequestBody RegistrationData registrationData) throws SQLException, IOException {

        return this.registrationService.register(registrationData);
    };
}
