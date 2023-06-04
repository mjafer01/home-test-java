package com.hometestjava.api.bids;

import com.hometestjava.api.global.services.AuthTokenInfo;
import com.hometestjava.api.projects.ProjectData;
import com.hometestjava.api.projects.ProjectsService;
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

@RequestMapping("/api/v1/bids")
@Validated
@RestController
@RequiredArgsConstructor
public class BidsController {

    @Autowired
    BidsService bidsService;
    @Autowired
    AuthTokenInfo authTokenInfo;

    @RequestMapping(value = "/bid", method = RequestMethod.POST, consumes="application/json")
    @Operation(summary = "Create a bid", description = "Returns 201 if successful")

    @ApiResponses(
            value = {
                    @ApiResponse(code = 201, message = "Success", responseContainer = "default"),
                    @ApiResponse(code = 400, message = "Missing required parameter"),
                    @ApiResponse(code = 415, message = "Content type not supported")
            }
    )
    @ResponseStatus(value = HttpStatus.CREATED)
    ResponseEntity newProject(@Valid @RequestBody BidData bidData, @Valid @RequestHeader("Authorization") String authToken) throws SQLException, IOException {
        if(!authTokenInfo.authorize(authToken)){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        else if(!authTokenInfo.isTradie()){
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        return this.bidsService.add(bidData,authTokenInfo.getAccountID());
    }


    @RequestMapping(value = "/{accountID}/{projectID}/{page}/{record}", method = RequestMethod.GET)
    @Operation(summary = "Get all bid of an account for a project", description = "Returns 200 if successful")

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
            @PathVariable Integer projectID,
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
        else if(!authTokenInfo.isTradie()){
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        return this.bidsService.getAllAccountProjects(accountID,projectID,page,record);
    }


    @RequestMapping(value = "/{projectID}/{page}/{record}", method = RequestMethod.GET)
    @Operation(summary = "Get all bids of a project", description = "Returns 200 if successful")

    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Success", responseContainer = "default"),
                    @ApiResponse(code = 400, message = "Missing required parameter"),
                    @ApiResponse(code = 415, message = "Content type not supported")
            }
    )
    @ResponseStatus(value = HttpStatus.OK)
    ResponseEntity getProjectBid(
            @PathVariable Integer projectID,
            @PathVariable Integer page,
            @PathVariable Integer record,
            @RequestHeader("Authorization") String authToken
    ) throws SQLException, IOException {
        if(!authTokenInfo.authorize(authToken) ){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        return this.bidsService.getProjectBid(projectID,page,record);
    }





    @RequestMapping(value = "/bid/{bidID}", method = RequestMethod.GET)
    @Operation(summary = "Get bid detail", description = "Returns 200 if successful")

    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Success", responseContainer = "default"),
                    @ApiResponse(code = 400, message = "Missing required parameter"),
                    @ApiResponse(code = 415, message = "Content type not supported")
            }
    )
    @ResponseStatus(value = HttpStatus.OK)
    ResponseEntity getBid(
            @PathVariable Integer bidID,
            @RequestHeader("Authorization") String authToken
    ) throws SQLException, IOException {
        if(!authTokenInfo.authorize(authToken) ){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        return this.bidsService.getBid(bidID);
    }
}
