package com.hometestjava.api.projects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class ProjectData {
    @NotBlank
    @Length(min = 3, max = 100, message = "Invalid project name")
    public String projectName;
    @NotBlank
    @Length(min = 10, max = 100, message = "Invalid project description")
    public String projectDescription;
    @NotBlank
    @Length(min = 2, max = 10, message = "Invalid project hours")
    public String projectHours;
    @NotBlank
    @Length(min = 14, max = 20, message = "Invalid project end")
    public String projectEnd;
}
