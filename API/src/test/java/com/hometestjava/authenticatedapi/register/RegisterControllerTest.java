package com.hometestjava.authenticatedapi.register;

import com.hometestjava.api.register.RegisterController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class RegisterControllerTest {
/*
    @Autowired
    private RegisterController controller;
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void contextLoads() throws Exception {
       assertThat(controller).isNotNull();
    }

    @Test
    public void registerMethod_shouldReturnDefaultMessage() throws Exception {
        this.mockMvc.perform(get("/authenticate/v1/registration/register")).andDo(print()).andExpect(status().isOk())
                .andExpect( content().string(containsString("Hello World!")));
    }
*/

}
