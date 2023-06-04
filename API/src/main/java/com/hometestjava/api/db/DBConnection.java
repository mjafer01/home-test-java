package com.hometestjava.api.db;

import com.hometestjava.api.ApiApplication;
import lombok.val;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.core.io.support.PropertiesLoaderUtils;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;
import java.util.Set;


public class DBConnection {
    private Connection connection;

    DBConnection() throws SQLException, IOException {

            connection = DriverManager.getConnection(
                   "jdbc:mariadb://"+System.getenv("MYSQL_HOST")+":3306/customer-tradie-projects",
                    System.getenv("MYSQL_USER"), System.getenv("MYSQL_PASSWORD")
        );

    }

    public Connection getConnection() {
        return this.connection;
    }
    public void close() throws SQLException {
        this.connection.close();
    }
}
