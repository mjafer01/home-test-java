package com.hometestjava.api.login;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class LoginData {
    @NotEmpty(message = "Email is required")
    @Email(message = "Invalid email address")
    public String email;

    @NotEmpty(message = "Password is required")
    @Length(min = 6, max = 20, message="Invalid password")
    public String password;
}
