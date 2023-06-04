package com.hometestjava.api.register;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class RegistrationData {
    @NotEmpty(message = "First name is required")
    @Length(min = 3, max = 100, message="Invalid first name")
    public String firstName;

    @NotEmpty(message = "Last name is required")
    @Length(min = 3, max = 100, message="Invalid last name")
    public String lastName;

    @NotEmpty(message = "Email is required")
    @Email(message = "Invalid email address")
    public String email;

    @NotEmpty(message = "Password is required")
    @Length(min = 6, max = 20, message="Invalid password")
    public String password;
}
