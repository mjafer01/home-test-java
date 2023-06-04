package com.hometestjava.authenticatedapi.register;

import com.hometestjava.api.register.RegistrationService;
import com.hometestjava.api.register.RegistrationData;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
public class RegisterServiceTest {

    /*
    private RegistrationService tService = new RegistrationService();


    @Test
    public void contextLoads() throws Exception {
      // assertThat(tService).isNotNull();
    }

    @Test
    public void registerMethod_returnSuccess() throws Exception {
        RegistrationData registrationData = new RegistrationData();
        registrationData.firstName = "Muhammad";
        registrationData.lastName = "Jafer";
        registrationData.email = "mjafernaqvi@gmail.com";
        registrationData.password = "123456";
        /*
        Mockito.doReturn(1).when(accounts).newAccount(new Account());
        AccountLogins accountLogins = Mockito.spy(AccountLogins.class);
        Mockito.doReturn(true).when(accountLogins).add(new AccountLogin());
        BridgeAccountsTypes bridgeAccountsTypes = Mockito.spy(BridgeAccountsTypes.class);
        Mockito.doReturn(true).when(bridgeAccountsTypes).add(new BridgeAccountType());

//        Accounts accounts = Mockito.spy(Accounts.class);
        //when()
        ResponseEntity responseEntity = this.tService.register(registrationData);
        assertThat(responseEntity).isEqualTo(new ResponseEntity<>(HttpStatus.CREATED));
        //ResponseEntity<>(HttpStatus.CREATED)


    }
*/

}
