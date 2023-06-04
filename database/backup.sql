-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jun 04, 2023 at 04:59 PM
-- Server version: 10.4.18-MariaDB-1:10.4.18+maria~focal
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `customer-tradie-projects`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
                            `accountID` int(11) NOT NULL,
                            `firstName` varchar(100) NOT NULL,
                            `lastName` varchar(100) NOT NULL,
                            `dateCreated` datetime NOT NULL,
                            `dateUpdated` datetime NOT NULL,
                            `createdByAccountID` int(11) NOT NULL,
                            `updatedByAccountID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`accountID`, `firstName`, `lastName`, `dateCreated`, `dateUpdated`, `createdByAccountID`, `updatedByAccountID`) VALUES
                                                                                                                                            (1, 'Muhammad', 'Jafer', '2023-06-05 02:48:31', '2023-06-05 02:48:31', 0, 0),
                                                                                                                                            (2, 'Muhammad', 'Jafer', '2023-06-05 02:49:18', '2023-06-05 02:49:18', 0, 0),
                                                                                                                                            (3, 'Muhammad', 'Jafer', '2023-06-05 02:51:05', '2023-06-05 02:51:05', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `accounts_types`
--

CREATE TABLE `accounts_types` (
                                  `accountTypeID` int(11) NOT NULL,
                                  `account` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts_types`
--

INSERT INTO `accounts_types` (`accountTypeID`, `account`) VALUES
                                                              (1, 'Fixed'),
                                                              (2, 'Hourly');

-- --------------------------------------------------------

--
-- Table structure for table `account_logins`
--

CREATE TABLE `account_logins` (
                                  `accountLoginID` int(11) NOT NULL,
                                  `email` text NOT NULL,
                                  `password` varchar(100) NOT NULL,
                                  `lastLogin` datetime NOT NULL,
                                  `accountID` int(11) NOT NULL,
                                  `dateCreated` datetime NOT NULL,
                                  `dateUpdated` datetime NOT NULL,
                                  `createdByAccountID` int(11) NOT NULL,
                                  `updatedByAccountID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account_logins`
--

INSERT INTO `account_logins` (`accountLoginID`, `email`, `password`, `lastLogin`, `accountID`, `dateCreated`, `dateUpdated`, `createdByAccountID`, `updatedByAccountID`) VALUES
    (1, 'mjafernaqvi@gmail.com', '123456', '2023-06-05 02:51:05', 3, '2023-06-05 02:51:05', '2023-06-05 02:51:05', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `bids`
--

CREATE TABLE `bids` (
                        `bidID` int(11) NOT NULL,
                        `projectID` int(11) NOT NULL,
                        `accountID` int(11) NOT NULL,
                        `bidPriceTypeID` int(11) NOT NULL,
                        `price` text NOT NULL,
                        `dateUpdated` datetime NOT NULL,
                        `dateCreated` datetime NOT NULL,
                        `createdByAccountID` int(11) NOT NULL,
                        `updatedByAccountID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bids`
--

INSERT INTO `bids` (`bidID`, `projectID`, `accountID`, `bidPriceTypeID`, `price`, `dateUpdated`, `dateCreated`, `createdByAccountID`, `updatedByAccountID`) VALUES
    (1, 7, 3, 1, '125', '2023-06-05 02:58:56', '2023-06-05 02:58:56', 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `bridge_accounts_types`
--

CREATE TABLE `bridge_accounts_types` (
                                         `bridgeAccountTypeID` int(11) NOT NULL,
                                         `accountID` int(11) NOT NULL,
                                         `accountTypeID` int(11) NOT NULL,
                                         `dateCreated` datetime NOT NULL,
                                         `dateUpdated` datetime NOT NULL,
                                         `createdByAccountID` int(11) NOT NULL,
                                         `updatedByAccountID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bridge_accounts_types`
--

INSERT INTO `bridge_accounts_types` (`bridgeAccountTypeID`, `accountID`, `accountTypeID`, `dateCreated`, `dateUpdated`, `createdByAccountID`, `updatedByAccountID`) VALUES
                                                                                                                                                                        (1, 3, 1, '2023-06-05 02:51:05', '2023-06-05 02:51:05', 0, 0),
                                                                                                                                                                        (2, 3, 2, '2023-06-05 02:51:05', '2023-06-05 02:51:05', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
                            `projectID` int(11) NOT NULL,
                            `accountID` int(11) NOT NULL,
                            `projectName` varchar(100) NOT NULL,
                            `projectDescription` text NOT NULL,
                            `projectHours` varchar(10) NOT NULL,
                            `projectEnd` datetime NOT NULL,
                            `winningBidID` int(11) DEFAULT NULL,
                            `dateUpdated` datetime NOT NULL,
                            `dateCreated` datetime NOT NULL,
                            `updatedByAccountID` int(11) NOT NULL,
                            `createdByAccountID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`projectID`, `accountID`, `projectName`, `projectDescription`, `projectHours`, `projectEnd`, `winningBidID`, `dateUpdated`, `dateCreated`, `updatedByAccountID`, `createdByAccountID`) VALUES
                                                                                                                                                                                                                   (3, 28, 'projectName', 'something something something something', '20', '2023-06-08 23:00:30', 1, '2023-06-04 12:48:55', '2023-06-02 22:16:22', 28, 17),
                                                                                                                                                                                                                   (4, 3, 'projectName', 'something something something something', '20', '2023-11-11 20:30:30', NULL, '2023-06-02 22:16:40', '2023-06-02 22:16:40', 17, 17),
                                                                                                                                                                                                                   (5, 28, 'Project 1', 'Project 123544l5k3 Project 1235567', '10', '2023-06-03 20:45:50', NULL, '2023-06-04 11:20:51', '2023-06-04 11:20:51', 28, 28),
                                                                                                                                                                                                                   (6, 28, 'Project 2', 'Project2 123544l5k3 Project2 1235567', '10', '2023-06-04 20:45:50', NULL, '2023-06-04 11:23:04', '2023-06-04 11:23:04', 28, 28),
                                                                                                                                                                                                                   (7, 3, 'Project 23', 'Project33 123544l5k3 Project 331235567', '10', '2023-07-04 20:45:50', 1, '2023-06-04 16:59:06', '2023-06-04 13:09:27', 3, 28),
                                                                                                                                                                                                                   (8, 3, 'p12', 'asdfasdf asdfasdf asdfasdf', '333', '2023-11-11 11:11:11', NULL, '2023-06-05 02:51:43', '2023-06-05 02:51:43', 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
                            `sessionID` int(11) NOT NULL,
                            `accountID` int(11) NOT NULL,
                            `session` text NOT NULL,
                            `expiredDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sessionID`, `accountID`, `session`, `expiredDate`) VALUES
    (1, 3, '22a8fa2c-5a9d-496b-b333-c5add5f31527:bWphZmVybmFxdmlAZ21haWwuY29t:Mw==', '2023-06-05 16:51:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
    ADD PRIMARY KEY (`accountID`);

--
-- Indexes for table `accounts_types`
--
ALTER TABLE `accounts_types`
    ADD PRIMARY KEY (`accountTypeID`);

--
-- Indexes for table `account_logins`
--
ALTER TABLE `account_logins`
    ADD PRIMARY KEY (`accountLoginID`);

--
-- Indexes for table `bids`
--
ALTER TABLE `bids`
    ADD PRIMARY KEY (`bidID`);

--
-- Indexes for table `bridge_accounts_types`
--
ALTER TABLE `bridge_accounts_types`
    ADD PRIMARY KEY (`bridgeAccountTypeID`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
    ADD PRIMARY KEY (`projectID`),
  ADD KEY `winningBidID` (`winningBidID`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
    ADD PRIMARY KEY (`sessionID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
    MODIFY `accountID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `accounts_types`
--
ALTER TABLE `accounts_types`
    MODIFY `accountTypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `account_logins`
--
ALTER TABLE `account_logins`
    MODIFY `accountLoginID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bids`
--
ALTER TABLE `bids`
    MODIFY `bidID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bridge_accounts_types`
--
ALTER TABLE `bridge_accounts_types`
    MODIFY `bridgeAccountTypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
    MODIFY `projectID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
    MODIFY `sessionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
