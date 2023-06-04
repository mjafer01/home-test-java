package com.hometestjava.api.projects;

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

@RequestMapping("/api/v1/projects")
@Validated
@RestController
@RequiredArgsConstructor
public class ProjectsController {
    @Autowired
    ProjectsService projectsService;
    @Autowired
    AuthTokenInfo authTokenInfo;

    @RequestMapping(value = "/project", method = RequestMethod.POST, consumes="application/json")
    @Operation(summary = "Create a project", description = "Returns 201 if successful")

    @ApiResponses(
            value = {
                    @ApiResponse(code = 201, message = "Success", responseContainer = "default"),
                    @ApiResponse(code = 400, message = "Missing required parameter"),
                    @ApiResponse(code = 415, message = "Content type not supported")
            }
    )
    @ResponseStatus(value = HttpStatus.CREATED)
    ResponseEntity newProject(@Valid @RequestBody ProjectData projectData, @Valid @RequestHeader("Authorization") String authToken) throws SQLException, IOException {
        if(!authTokenInfo.authorize(authToken)){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        else if(!authTokenInfo.isCustomer()){
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        return this.projectsService.add(projectData,authTokenInfo.getAccountID());
    };

    @RequestMapping(value = "/bid", method = RequestMethod.POST, consumes="application/json")
    @Operation(summary = "Add success bid", description = "Returns 204 if successful")

    @ApiResponses(
            value = {
                    @ApiResponse(code = 204, message = "Success", responseContainer = "default"),
                    @ApiResponse(code = 400, message = "Missing required parameter"),
                    @ApiResponse(code = 415, message = "Content type not supported")
            }
    )
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    ResponseEntity addSuccessBid(@Valid @RequestBody WinningBidData winningBidData, @Valid @RequestHeader("Authorization") String authToken) throws SQLException, IOException {
        if(!authTokenInfo.authorize(authToken)){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        else if(!authTokenInfo.isCustomer()){
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        return this.projectsService.assignWinningBid(authTokenInfo.getAccountID(),winningBidData.projectID,winningBidData.bidID);
    };

    @RequestMapping(value = "/{accountID}/all/{page}/{record}", method = RequestMethod.GET)
    @Operation(summary = "Get all project of an account", description = "Returns 200 if successful")

    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Success", responseContainer = "default"),
                    @ApiResponse(code = 400, message = "Missing required parameter"),
                    @ApiResponse(code = 415, message = "Content type not supported")
            }
    )
    @ResponseStatus(value = HttpStatus.OK)
    ResponseEntity getAllAccountProjects(
            @PathVariable Integer accountID,
            @PathVariable Integer page,
            @PathVariable Integer record,
            @RequestHeader("Authorization") String authToken
    ) throws SQLException, IOException {
        if(!authTokenInfo.authorize(authToken) ){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        else if(authTokenInfo.getAccountID() == accountID){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        else if(!authTokenInfo.isCustomer()){
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        return this.projectsService.getAllAccountProjects(accountID,page,record);
    };

    @RequestMapping(value = "/{accountID}/active/{page}/{record}", method = RequestMethod.GET)
    @Operation(summary = "Get all project of an account", description = "Returns 200 if successful")

    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Success", responseContainer = "default"),
                    @ApiResponse(code = 400, message = "Missing required parameter"),
                    @ApiResponse(code = 415, message = "Content type not supported")
            }
    )
    @ResponseStatus(value = HttpStatus.OK)
    ResponseEntity getAccountOpenProjects(
            @PathVariable Integer accountID,
            @PathVariable Integer page,
            @PathVariable Integer record,
            @RequestHeader("Authorization") String authToken
    ) throws SQLException, IOException {
        if(!authTokenInfo.authorize(authToken) ){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        else if(authTokenInfo.getAccountID() == accountID){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        else if(!authTokenInfo.isCustomer()){
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        return this.projectsService.getAccountOpenProjects(accountID,page,record);
    };


    @RequestMapping(value = "/{accountID}/closed/{page}/{record}", method = RequestMethod.GET)
    @Operation(summary = "Get all project of an account", description = "Returns 200 if successful")

    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Success", responseContainer = "default"),
                    @ApiResponse(code = 400, message = "Missing required parameter"),
                    @ApiResponse(code = 415, message = "Content type not supported")
            }
    )
    @ResponseStatus(value = HttpStatus.OK)
    ResponseEntity getAccountClosedProjects(
            @PathVariable Integer accountID,
            @PathVariable Integer page,
            @PathVariable Integer record,
            @RequestHeader("Authorization") String authToken
    ) throws SQLException, IOException {
        if(!authTokenInfo.authorize(authToken) ){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        else if(authTokenInfo.getAccountID() == accountID){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        else if(!authTokenInfo.isCustomer()){
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        return this.projectsService.getAccountClosedProjects(accountID,page,record);
    };


    @RequestMapping(value = "/active/{page}/{record}", method = RequestMethod.GET)
    @Operation(summary = "Get all project of an account", description = "Returns 200 if successful")

    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Success", responseContainer = "default"),
                    @ApiResponse(code = 400, message = "Missing required parameter"),
                    @ApiResponse(code = 415, message = "Content type not supported")
            }
    )
    @ResponseStatus(value = HttpStatus.OK)
    ResponseEntity getAllActiveProjects(
            @PathVariable Integer page,
            @PathVariable Integer record,
            @RequestHeader("Authorization") String authToken
    ) throws SQLException, IOException {
        if(!authTokenInfo.authorize(authToken) ){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        else if(!authTokenInfo.isCustomer()){
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        return this.projectsService.getAllActiveProjects(page,record);
    };


    @RequestMapping(value = "/project/{projectID}", method = RequestMethod.GET)
    @Operation(summary = "Get all project of an account", description = "Returns 200 if successful")

    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Success", responseContainer = "default"),
                    @ApiResponse(code = 400, message = "Missing required parameter"),
                    @ApiResponse(code = 415, message = "Content type not supported")
            }
    )
    @ResponseStatus(value = HttpStatus.OK)
    ResponseEntity getProject(
            @PathVariable Integer projectID,
            @RequestHeader("Authorization") String authToken
    ) throws SQLException, IOException {
        if(!authTokenInfo.authorize(authToken) ){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        return this.projectsService.getProject(projectID);
    };
}
