package com.hometestjava.api.db;

import com.hometestjava.api.db.schemas.AccountLogin;
import com.hometestjava.api.db.schemas.Project;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Map;

public class Projects {
    private DBConnection dbConnection;
    public Projects() throws SQLException, IOException {
        this.dbConnection = new DBConnection();
    }
    public boolean add (Project project) throws SQLException {
        String sql= "Insert into projects (accountID,projectName,projectDescription,projectHours,projectEnd,dateCreated,dateUpdated,createdByAccountID,updatedByAccountID) values(?,?,?,?,?,?,?,?,?)";
        PreparedStatement statement = this.dbConnection.getConnection().prepareStatement(sql);
        statement.setInt(1,project.accountID);
        statement.setString(2,project.projectName);
        statement.setString(3,  project.projectDescription);
        statement.setString(4,project.projectHours);
        statement.setString(5, project.projectEnd);
        statement.setString(6, project.dateCreated);
        statement.setString(7, project.dateUpdated);
        statement.setInt(8,project.createdByAccountID);
        statement.setInt(9,project.updatedByAccountID);
        statement.execute();
        this.dbConnection.close();
        return true;
    }

    public Project getProject(Integer projectID) throws SQLException {
        String sql = "Select *, projectEnd > now() as isActive from projects  where projectID=?";
        PreparedStatement statement = this.dbConnection.getConnection().prepareStatement(sql);
        statement.setInt(1,projectID);
        Project project = new Project();
        ResultSet resultSet = statement.executeQuery();
        while(resultSet.next()){
            project.projectID = resultSet.getInt(1);
            project.accountID = resultSet.getInt(2);
            project.projectName = resultSet.getString(3);
            project.projectDescription = resultSet.getString(4);
            project.projectHours = resultSet.getString(5);
            project.projectEnd = resultSet.getString(6);
            project.winningBidID = resultSet.getInt(7);
            project.dateUpdated = resultSet.getString(8);
            project.dateCreated = resultSet.getString(9);
            project.updatedByAccountID = resultSet.getInt(10);
            project.createdByAccountID = resultSet.getInt(11);
            project.isActive = resultSet.getInt(12);

        }
        this.dbConnection.close();
        return project;
    }

    public ArrayList<Project> getAllAccountProjects(Integer accountID,int page, int record) throws SQLException {
        String sql = "Select * from (Select * from projects pr1 where pr1.accountID = ? LIMIT ?,?) as prt1, (Select count(pr2.projectID) as total from projects pr2  where pr2.accountID = ?) as prt2,";
        PreparedStatement statement = this.dbConnection.getConnection().prepareStatement(sql);
        statement.setInt(1,accountID);
        statement.setInt(2,page);
        statement.setInt(3,record);
        statement.setInt(4,accountID);
        ArrayList<Project>  projectList = this.generateProjectArrayList(statement.executeQuery(),true);
        this.dbConnection.close();
        return projectList;
    }

    public ArrayList<Project> getAccountOpenProjects(Integer accountID,int page, int record) throws SQLException {
        String sql = "Select * from (Select * from projects pr1 where pr1.accountID = ? and pr1.projectEnd > now() and pr2.winningBidID IS NOT NULL LIMIT ?,?) as prt1, (Select count(pr2.projectID) as total from projects pr2  where pr2.accountID = ? and pr2.projectEnd > now() and pr2.winningBidID IS NOT NULL) as prt2,";
        PreparedStatement statement = this.dbConnection.getConnection().prepareStatement(sql);
        statement.setInt(1,accountID);
        statement.setInt(2,page);
        statement.setInt(3,record);
        statement.setInt(4,accountID);
        ArrayList<Project>  projectList = this.generateProjectArrayList(statement.executeQuery(),true);
        this.dbConnection.close();
        return projectList;
    }

    public ArrayList<Project> getAccountClosedProjects(Integer accountID,int page, int record) throws SQLException {
        String sql = "Select * from (Select * from projects pr1 where pr1.accountID = ? and pr1.projectEnd < now() or pr2.winningBidID  IS NULL LIMIT ?,?) as pr1, (Select count(pr2.projectID) as total from projects pr2  where pr2.accountID = ? and pr2.projectEnd < now() and pr2.winningBidID  IS NULL) as prt2,";
        PreparedStatement statement = this.dbConnection.getConnection().prepareStatement(sql);
        statement.setInt(1,accountID);
        statement.setInt(2,page);
        statement.setInt(3,record);
        statement.setInt(4,accountID);
        ArrayList<Project>  projectList = this.generateProjectArrayList(statement.executeQuery(),true);
        this.dbConnection.close();
        return projectList;
    }

    public ArrayList<Project> getAllActiveProjects(int page, int record) throws SQLException {
        String sql = "Select * from (Select pr2.* from projects pr2 where pr2.projectEnd > now() and pr2.winningBidID IS NULL LIMIT ?,?) as prTemp1,(Select count(pr1.projectID) as total from projects pr1  where pr1.projectEnd > now() and pr1.winningBidID IS NULL) as prTemp2";
        PreparedStatement statement = this.dbConnection.getConnection().prepareStatement(sql);
        statement.setInt(1,page);
        statement.setInt(2,record);
        ArrayList<Project>  projectList = this.generateProjectArrayList(statement.executeQuery(),true);
        this.dbConnection.close();
        return projectList;
    }



    public ArrayList<Project> getWinningBidsProjects(Integer accountID,int page, int record) throws SQLException {
        String sql = "Select * from (Select projects.* from projects,bids where bids.accountID = ? and projects.winningBidID = bids.bidID LIMIT ?,?) as prt1,(Select count(pr2.projectID) as total from projects pr2,bids bd2 where bd2.accountID = ? and pr2.winningBidID = bd2.bidID) as prt2";
        PreparedStatement statement = this.dbConnection.getConnection().prepareStatement(sql);
        statement.setInt(1,accountID);
        statement.setInt(2,page);
        statement.setInt(3,record);
        statement.setInt(4,accountID);
        ArrayList<Project>  projectList = this.generateProjectArrayList(statement.executeQuery(),true);
        this.dbConnection.close();
        return projectList;
    }

    public boolean assignWinningBid(Integer accountID,int projectID, int bidID) throws SQLException {
        String sql = "Update projects set  winningBidID = ?,dateUpdated = now(), updatedByAccountID= ?  where projectID = ? and accountID = ?";
        PreparedStatement statement = this.dbConnection.getConnection().prepareStatement(sql);
        statement.setInt(1,bidID);
        statement.setInt(2,accountID);
        statement.setInt(3,projectID);
        statement.setInt(4,accountID);
        statement.execute();
        this.dbConnection.close();
        return true;
    }


    private ArrayList<Project> generateProjectArrayList(ResultSet resultSet,boolean addTotal) throws SQLException {
        ArrayList<Project>  projectList = new ArrayList<Project>();
        while(resultSet.next()){
            Project project = new Project();
            project.projectID = resultSet.getInt(1);
            project.accountID = resultSet.getInt(2);
            project.projectName = resultSet.getString(3);
            project.projectDescription = resultSet.getString(4);
            project.projectHours = resultSet.getString(5);
            project.projectEnd = resultSet.getString(6);
            project.winningBidID = resultSet.getInt(7);
            project.dateUpdated = resultSet.getString(8);
            project.dateCreated = resultSet.getString(9);
            project.updatedByAccountID = resultSet.getInt(10);
            project.createdByAccountID = resultSet.getInt(11);
            if(addTotal){
                project.total = resultSet.getInt(12);

            }
            projectList.add(project);
        }
        return projectList;
    }
}
