CREATE DATABASE /*!32312 IF NOT EXISTS*/`hellobank` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `hellobank`;

/*Table structure for table `accountoperation` */

DROP TABLE IF EXISTS `accountoperation`;

CREATE TABLE `accountoperation` (
  `accountOperationCod` INT(11) NOT NULL,
  `accountOperationName` VARCHAR(120) NOT NULL,
  `accountOperationStatus` VARCHAR(7) NOT NULL,
  PRIMARY KEY (`accountOperationCod`)
) ENGINE=INNODB DEFAULT CHARSET=latin1;

/*Table structure for table `bank` */

DROP TABLE IF EXISTS `bank`;

CREATE TABLE `bank` (
  `bankCode` INT(11) NOT NULL,
  `bankName` VARCHAR(120) NOT NULL,
  `bankStatus` VARCHAR(7) NOT NULL,
  PRIMARY KEY (`bankCode`)
) ENGINE=INNODB DEFAULT CHARSET=latin1;



/*Table structure for table `client` */

DROP TABLE IF EXISTS `client`;

CREATE TABLE `client` (
  `clientCod` INT(11) NOT NULL AUTO_INCREMENT, 
  `clientEmail` VARCHAR(120) NOT NULL,
  `clientPassword` VARCHAR(120) NOT NULL,
  `clientSalt` VARCHAR(120) NOT NULL,
  `clientName` VARCHAR(120) NOT NULL,
  `clientCPF` CHAR(11) NOT NULL,
  `clientStatus` VARCHAR(7) NOT NULL,
  `clientCreatedDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`clientCod`)
) ENGINE=INNODB DEFAULT CHARSET=latin1;



/*Table structure for table `checkingaccount` */

DROP TABLE IF EXISTS `checkingaccount`;

CREATE TABLE `checkingaccount` (
  `checkingAccountNumber` INT(11) NOT NULL AUTO_INCREMENT,
  `clientCod` INT(11) NOT NULL,
  `checkingAccountBalance` DECIMAL(10,2) NOT NULL,
  `checkingAccountCreatedDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `checkingAccountStatus` VARCHAR(7) DEFAULT NULL,
  PRIMARY KEY (`checkingAccountNumber`),
  KEY `clientCod` (`clientCod`),
  CONSTRAINT `clientCod` FOREIGN KEY (`clientCod`) REFERENCES `client` (`clientCod`)
) ENGINE=INNODB DEFAULT CHARSET=latin1;



/*Table structure for table `clientcard` */

DROP TABLE IF EXISTS `clientcard`;

CREATE TABLE `clientcard` (
  `clientCardNumber` VARCHAR(16) NOT NULL,
  `clientCod` INT(11) NOT NULL,
  `checkingAccountNumber` INT(11) NOT NULL,
  `clientcardHolder` VARCHAR(120) NOT NULL,
  `clientcardPassword` VARCHAR(120) NOT NULL,
  `clientcardSalt` VARCHAR(120) NOT NULL,
  `clientcardExpirationDate` VARCHAR(5) NOT NULL,
  `clientcardCVV` INT(3) NOT NULL,
  `clientCreditCardLimit` DECIMAL(15,2) NOT NULL DEFAULT 200,
  `clientCreditCardLimitAvailable` DECIMAL(15,2) NOT NULL DEFAULT 200,
  `clientCardCreatedDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`clientCardNumber`,`clientCod`,`checkingAccountNumber`),
  KEY `clientCod` (`clientCod`),
  -- CONSTRAINT `clientcard_ibfk_1` 
  FOREIGN KEY (`clientCod`) REFERENCES `client` (`clientCod`)
) ENGINE=INNODB DEFAULT CHARSET=latin1;

/*Table structure for table `creditcardentrieinstallment` */

DROP TABLE IF EXISTS `creditcardentrieinstallment`;

CREATE TABLE `creditcardentrieinstallment` (
  `creditCardEntrieCod` INT(11) NOT NULL,
  `creditCardEntrieInstallmentNumber` INT(11) NOT NULL,
  `creditCardEntrieInstallmentValue` DECIMAL(10,2) NOT NULL,
  `creditCardEntrieInstallmentDate` DATE NOT NULL,
  `creditCardEntrieInstallmentCreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creditCardEntrieInstallmentStatus` ENUM('open','payed') NOT NULL,
  PRIMARY KEY (`creditCardEntrieCod`,`creditCardEntrieInstallmentNumber`)
) ENGINE=INNODB DEFAULT CHARSET=latin1;


/*Table structure for table `cardentrie` */


DROP TABLE IF EXISTS `cardentrie`;

CREATE TABLE `cardentrie` (
  `cardEntrieCod` INT(11) NOT NULL AUTO_INCREMENT,
  `clientCardNumber` VARCHAR(16) NOT NULL,
  `clientCod` INT(11) NOT NULL,
  `cardEntrieType` ENUM('credit','debit') NOT NULL,
  `cardEntrieDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `cardEntrieValue` DECIMAL(15,2) NOT NULL,
  `cardEntrieCreditInstallment` INT(11) NOT NULL,
  `cardEntrieCreditDescription` VARCHAR(120) NOT NULL,
  PRIMARY KEY (`cardEntrieCod`,`clientCardNumber`),
  KEY `clientCod` (`clientCod`),
  KEY `clientCardNumber` (`clientCardNumber`),
  CONSTRAINT `cardentrie_ibfk_1` FOREIGN KEY (`clientCod`) REFERENCES `client` (`clientCod`),
  CONSTRAINT `cardentrie_ibfk_3` FOREIGN KEY (`clientCardNumber`) REFERENCES `clientcard` (`clientCardNumber`)
) ENGINE=INNODB DEFAULT CHARSET=latin1;


/*Table structure for table `checkingaccountcheckout` */

DROP TABLE IF EXISTS `checkingaccountcheckout`;

CREATE TABLE `checkingaccountcheckout` (
  `checkingAccountCheckoutNumber` INT(11) NOT NULL AUTO_INCREMENT,
  `checkingAccountNumber` INT(11) NOT NULL,
 `checkingAccountCheckoutType` ENUM('transfer','debitcard', 'debit'),
  `checkingAccountCheckoutDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `checkingAccountCheckoutValue` DECIMAL(15,2) NOT NULL,
  `bankCode` INT(11) DEFAULT NULL,
  `checkingAccountCheckoutCPF` CHAR(11) DEFAULT NULL,
  `checkingAccountCheckoutAccountDestiny` INT(11) DEFAULT NULL,
  `checkingAccountCheckoutDescription` VARCHAR (255) DEFAULT NULL,
  PRIMARY KEY (`checkingAccountCheckoutNumber`,`checkingAccountNumber`),
  KEY `checkingAccountNumber` (`checkingAccountNumber`),
  KEY `bankCode` (`bankCode`),
  CONSTRAINT `checkingaccountcheckout_ibfk_1` FOREIGN KEY (`checkingAccountNumber`) REFERENCES `checkingaccount` (`checkingAccountNumber`),
  CONSTRAINT `checkingaccountcheckout_ibfk_3` FOREIGN KEY (`bankCode`) REFERENCES `bank` (`bankCode`)
) ENGINE=INNODB DEFAULT CHARSET=latin1;

/*Table structure for table `checkingaccountentry` */

DROP TABLE IF EXISTS `checkingaccountentry`;

CREATE TABLE `checkingaccountentry` (
  `checkingAccountEntryNumber` INT(11) NOT NULL AUTO_INCREMENT,
  `checkingAccountNumber` INT(11) NOT NULL,
  `checkingAccountEntryType` ENUM('deposit', 'transfer'),
  `checkingAccountEntryDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `checkingAccountEntryValue` DECIMAL(15,2) NOT NULL,
  `bankCode` INT(11) DEFAULT NULL,
  `checkingAccountEntryCPF` CHAR(11) DEFAULT NULL,
  `checkingAccountEntryAccountOrigin` INT(11) DEFAULT NULL,
  `checkingAccountEntryDescription` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`checkingAccountEntryNumber`,`checkingAccountNumber`),
  KEY `checkingAccountNumber` (`checkingAccountNumber`),
  KEY `bankCode` (`bankCode`),
  CONSTRAINT `checkingaccountentry_ibfk_1` FOREIGN KEY (`checkingAccountNumber`) REFERENCES `checkingaccount` (`checkingAccountNumber`),
  CONSTRAINT `checkingaccountentry_ibfk_3` FOREIGN KEY (`bankCode`) REFERENCES `bank` (`bankCode`)
) ENGINE=INNODB DEFAULT CHARSET=latin1;



