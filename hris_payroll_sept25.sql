-- MySQL dump 10.13  Distrib 5.7.23, for Linux (x86_64)
--
-- Host: localhost    Database: node_db
-- ------------------------------------------------------
-- Server version	5.7.23-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_node_adjustment`
--

DROP TABLE IF EXISTS `_node_adjustment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_adjustment` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `aDescription` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_adjustment`
--

LOCK TABLES `_node_adjustment` WRITE;
/*!40000 ALTER TABLE `_node_adjustment` DISABLE KEYS */;
INSERT INTO `_node_adjustment` VALUES (1,'sample'),(2,'old credit');
/*!40000 ALTER TABLE `_node_adjustment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_atm_list`
--

DROP TABLE IF EXISTS `_node_atm_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_atm_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `canditate_id` int(11) NOT NULL,
  `atm_number` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_atm_list`
--

LOCK TABLES `_node_atm_list` WRITE;
/*!40000 ALTER TABLE `_node_atm_list` DISABLE KEYS */;
INSERT INTO `_node_atm_list` VALUES (1,1,'12345'),(2,3,'123'),(4,2,'129391239129');
/*!40000 ALTER TABLE `_node_atm_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_benefits`
--

DROP TABLE IF EXISTS `_node_benefits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_benefits` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `benefits` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_benefits`
--

LOCK TABLES `_node_benefits` WRITE;
/*!40000 ALTER TABLE `_node_benefits` DISABLE KEYS */;
INSERT INTO `_node_benefits` VALUES (1,'13th Month Pay'),(2,'Philhealth'),(3,'SSS'),(4,'PagIbig'),(5,'HMO');
/*!40000 ALTER TABLE `_node_benefits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_candidate_dependents`
--

DROP TABLE IF EXISTS `_node_candidate_dependents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_candidate_dependents` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `candidate_id` int(12) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `relationship` varchar(100) DEFAULT NULL,
  `work` varchar(100) DEFAULT NULL,
  `bdate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_candidate_dependents`
--

LOCK TABLES `_node_candidate_dependents` WRITE;
/*!40000 ALTER TABLE `_node_candidate_dependents` DISABLE KEYS */;
INSERT INTO `_node_candidate_dependents` VALUES (1,1,'lexa chloe','daughter','none','2014-09-03');
/*!40000 ALTER TABLE `_node_candidate_dependents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_candidate_educ`
--

DROP TABLE IF EXISTS `_node_candidate_educ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_candidate_educ` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `candidate_id` int(12) DEFAULT NULL,
  `attainment` varchar(100) DEFAULT NULL,
  `school_name` varchar(100) DEFAULT NULL,
  `address` text,
  `award` varchar(100) DEFAULT NULL,
  `year_grad` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_candidate_educ`
--

LOCK TABLES `_node_candidate_educ` WRITE;
/*!40000 ALTER TABLE `_node_candidate_educ` DISABLE KEYS */;
INSERT INTO `_node_candidate_educ` VALUES (1,1,'primary','mahonri academy','sdasdasdasdasda','none','2001'),(2,1,'secondary','st. mary\'s academy','sdasdasdasdasdad','salutatorian','2006'),(3,1,'tertiary','Colegio de San Gabriel Arcangel','sdasdasdasdasd','none','2017'),(4,NULL,NULL,NULL,'sdasdasdasdasda',NULL,NULL),(5,5,'Primary','asdas','asdas',NULL,'2018-01-01'),(6,5,'Secondary','asdas','asdas',NULL,'2019-01-01'),(7,7,'P','b','b',NULL,'2'),(8,7,'r','a','a',NULL,'0'),(9,7,'i','g','g',NULL,'1'),(10,7,'m','o','o',NULL,'8'),(11,7,'a',NULL,NULL,NULL,'-'),(12,7,'r',NULL,NULL,NULL,'1'),(13,7,'y',NULL,NULL,NULL,'2'),(14,8,'P','e','e',NULL,'2'),(15,8,'r','x','x',NULL,'0'),(16,8,'i','a','a',NULL,'1'),(17,8,'m','m','m',NULL,'8'),(18,8,'a','p','p',NULL,'-'),(19,8,'r','l','l',NULL,'1'),(20,8,'y','e','e',NULL,'2');
/*!40000 ALTER TABLE `_node_candidate_educ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_candidate_exp`
--

DROP TABLE IF EXISTS `_node_candidate_exp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_candidate_exp` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `candidate_id` int(12) DEFAULT NULL,
  `employer` varchar(100) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `from` varchar(100) DEFAULT NULL,
  `to` varchar(100) DEFAULT NULL,
  `reason_for_leaving` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_candidate_exp`
--

LOCK TABLES `_node_candidate_exp` WRITE;
/*!40000 ALTER TABLE `_node_candidate_exp` DISABLE KEYS */;
INSERT INTO `_node_candidate_exp` VALUES (1,1,'Green Pasture','Web Developer','April 2017','December 2018','Done\r\n');
/*!40000 ALTER TABLE `_node_candidate_exp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_candidate_govt_id`
--

DROP TABLE IF EXISTS `_node_candidate_govt_id`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_candidate_govt_id` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `candidate_id` int(12) DEFAULT NULL,
  `sss/gsis` varchar(100) DEFAULT NULL,
  `tin_id` varchar(100) DEFAULT NULL,
  `philhealth_id` varchar(100) DEFAULT NULL,
  `prc_liscense` varchar(100) DEFAULT NULL,
  `driver_liscense` varchar(100) DEFAULT NULL,
  `postal_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_candidate_govt_id`
--

LOCK TABLES `_node_candidate_govt_id` WRITE;
/*!40000 ALTER TABLE `_node_candidate_govt_id` DISABLE KEYS */;
INSERT INTO `_node_candidate_govt_id` VALUES (1,1,'asdasd','asdasda','asdasd','asdasda','asdasdas','asdasd');
/*!40000 ALTER TABLE `_node_candidate_govt_id` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_candidate_info`
--

DROP TABLE IF EXISTS `_node_candidate_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_candidate_info` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `fname` varchar(100) DEFAULT NULL,
  `mname` varchar(100) DEFAULT NULL,
  `lname` varchar(100) DEFAULT NULL,
  `contact_num` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `ethnic` int(12) DEFAULT NULL,
  `age` varchar(50) DEFAULT NULL,
  `bday` date DEFAULT NULL,
  `street` text,
  `city` text,
  `zipcode` varchar(20) DEFAULT NULL,
  `country` text,
  `sex` varchar(20) DEFAULT NULL,
  `marital_status` varchar(20) DEFAULT NULL,
  `religion` varchar(20) DEFAULT NULL,
  `provincial_street` text,
  `provincial_city` text,
  `provincial_country` text,
  `applied_one` varchar(100) DEFAULT NULL,
  `applied_two` varchar(100) DEFAULT NULL,
  `applied_tree` varchar(100) DEFAULT NULL,
  `img_url` text,
  `employment_stat_update` int(12) DEFAULT NULL,
  `employment_stat_date` date DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_candidate_info`
--

LOCK TABLES `_node_candidate_info` WRITE;
/*!40000 ALTER TABLE `_node_candidate_info` DISABLE KEYS */;
INSERT INTO `_node_candidate_info` VALUES (1,'nayr','lester','bulot','09363172451','nayrlester@gmail.com',0,'28','1989-05-06','sddasdasdasdasd','asdasdasdasd','asdasdasd','asdasdasdasd','male','single','catholic','sdasdasdadasd','sdasdasdasdasda','sdasdasdasdasd','programmer','programmer','programmer','asd.jpg',4,'2018-04-06','2018-04-06'),(2,'James','Fombuena','Roncesvalles','09363172451','nayrlester@gmail.com',0,'28','1989-05-06','sddasdasdasdasd','asdasdasdasd','asdasdasd','asdasdasdasd','male','single','catholic','sdasdasdadasd','sdasdasdasdasda','sdasdasdasdasd','programmer','programmer','programmer','asd.jpg',4,'2018-04-06','2018-04-06'),(3,'Jade','','batal','09363172451','nayrlester@gmail.com',0,'28','1989-05-06','sddasdasdasdasd','asdasdasdasd','asdasdasd','asdasdasdasd','male','single','catholic','sdasdasdadasd','sdasdasdasdasda','sdasdasdasdasd','programmer','programmer','programmer','asd.jpg',4,'2018-04-06','2018-04-06'),(4,'Ashley','','Ohab','09363172451','nayrlester@gmail.com',0,'28','1989-05-06','sddasdasdasdasd','asdasdasdasd','asdasdasd','asdasdasdasd','male','single','catholic','sdasdasdadasd','sdasdasdasdasda','sdasdasdasdasd','programmer','programmer','programmer','asd.jpg',4,'2018-04-06','2018-04-06'),(5,'asdas','asdas','asdas','01231231231','rbulot12@gmail.com',NULL,'23','2018-07-15','asdas','asdas','1234','asdas','Male','1','asdas',NULL,NULL,NULL,NULL,NULL,NULL,'20180510_170225.jpg',2,NULL,'0000-00-00'),(6,'sample','sample','sample','01231231231','rbulot12@gmail.com',NULL,'23','2018-07-17','asdas','asdas','1234','asdas','Male','1','asdas',NULL,NULL,NULL,NULL,NULL,NULL,'20180510_170225.jpg',2,NULL,'2018-08-02'),(7,'bago','bago','bago','123123','rbulot12@gmail.com',NULL,'23','2018-12-31','bago','bago','bago','bago','Male','1','bago',NULL,NULL,NULL,NULL,NULL,NULL,'2.jpg',2,NULL,NULL);
/*!40000 ALTER TABLE `_node_candidate_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_candidate_ref`
--

DROP TABLE IF EXISTS `_node_candidate_ref`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_candidate_ref` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `candidate_id` int(12) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `contact_num` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_candidate_ref`
--

LOCK TABLES `_node_candidate_ref` WRITE;
/*!40000 ALTER TABLE `_node_candidate_ref` DISABLE KEYS */;
INSERT INTO `_node_candidate_ref` VALUES (1,1,'Engr. Marcos G. Villena','Dean/Dept. Head','Colegio De San Gabriel Arcangel','09363172451');
/*!40000 ALTER TABLE `_node_candidate_ref` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_candidate_skills`
--

DROP TABLE IF EXISTS `_node_candidate_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_candidate_skills` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `candidate_id` int(12) DEFAULT NULL,
  `skill` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_candidate_skills`
--

LOCK TABLES `_node_candidate_skills` WRITE;
/*!40000 ALTER TABLE `_node_candidate_skills` DISABLE KEYS */;
INSERT INTO `_node_candidate_skills` VALUES (1,1,'PHP Programmer'),(2,1,'MySql'),(3,1,'Node.js'),(4,5,'asdas'),(5,5,'asdas'),(6,7,'b'),(7,7,'a'),(8,7,'g'),(9,7,'o');
/*!40000 ALTER TABLE `_node_candidate_skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_cash_advance_payment`
--

DROP TABLE IF EXISTS `_node_cash_advance_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_cash_advance_payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_added` datetime DEFAULT CURRENT_TIMESTAMP,
  `amount_paid` decimal(19,2) NOT NULL,
  `payroll_transaction_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_cash_advance_payment`
--

LOCK TABLES `_node_cash_advance_payment` WRITE;
/*!40000 ALTER TABLE `_node_cash_advance_payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `_node_cash_advance_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_cash_advance_request`
--

DROP TABLE IF EXISTS `_node_cash_advance_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_cash_advance_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emp_id` varchar(12) NOT NULL,
  `amount` decimal(19,2) NOT NULL,
  `months_to_pay` int(11) NOT NULL,
  `date_added` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_cash_advance_request`
--

LOCK TABLES `_node_cash_advance_request` WRITE;
/*!40000 ALTER TABLE `_node_cash_advance_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `_node_cash_advance_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_competency_list`
--

DROP TABLE IF EXISTS `_node_competency_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_competency_list` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `vacancy_id` int(12) DEFAULT NULL,
  `candidate_id` int(12) DEFAULT NULL,
  `interview_stat` varchar(50) DEFAULT NULL,
  `interview_date` varchar(50) DEFAULT NULL,
  `job_offer_date` varchar(50) DEFAULT NULL,
  `final_stat` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_competency_list`
--

LOCK TABLES `_node_competency_list` WRITE;
/*!40000 ALTER TABLE `_node_competency_list` DISABLE KEYS */;
INSERT INTO `_node_competency_list` VALUES (1,1,1,'Passed','','','Hired'),(2,2,1,'Passed','','','Hired'),(3,3,1,'Passed','','','Hired'),(4,4,1,'Passed','','','Hired'),(5,5,1,'Passed','','','Hired'),(6,6,1,'Passed','','','Hired'),(7,7,1,'Passed','','','Hired'),(8,8,1,'Passed','','','Hired'),(9,9,1,'Passed','','','Hired'),(10,10,1,'Passed','','','Hired'),(11,11,1,'Passed','','','Hired'),(12,12,1,'Passed','','','Hired'),(13,13,1,'Passed','','','Hired'),(14,1,1,'Passed','','','Hired'),(15,2,1,'Passed',NULL,NULL,'Hired'),(16,3,1,'Passed',NULL,NULL,'Hired'),(17,4,1,'Passed','','','Hired'),(18,5,1,'Passed',NULL,NULL,'Hired'),(19,1,1,'Passed','','','Hired'),(20,2,1,'Passed',NULL,NULL,'Hired'),(21,14,5,'Passed','','','Hired');
/*!40000 ALTER TABLE `_node_competency_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_discipline`
--

DROP TABLE IF EXISTS `_node_discipline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_discipline` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `emp_id` varchar(100) DEFAULT NULL,
  `violation` varchar(100) DEFAULT NULL,
  `assignment` int(12) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `offense` varchar(100) DEFAULT NULL,
  `suspension` varchar(50) DEFAULT NULL,
  `sanction` varchar(100) DEFAULT NULL,
  `required` varchar(100) DEFAULT NULL,
  `descision` varchar(100) DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_discipline`
--

LOCK TABLES `_node_discipline` WRITE;
/*!40000 ALTER TABLE `_node_discipline` DISABLE KEYS */;
INSERT INTO `_node_discipline` VALUES (1,'18-0411182','negligence',2,'Leaving post','1st','No','NTE','No','None','2018-04-11'),(2,'18-0411181','asa',2,'asasda','1','asda','asdasd','asdasd','asda','2018-04-11');
/*!40000 ALTER TABLE `_node_discipline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_emp_benefits`
--

DROP TABLE IF EXISTS `_node_emp_benefits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_emp_benefits` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `emp_num` varchar(20) DEFAULT NULL,
  `user_info_id` int(12) DEFAULT NULL,
  `benefit_id` int(12) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_emp_benefits`
--

LOCK TABLES `_node_emp_benefits` WRITE;
/*!40000 ALTER TABLE `_node_emp_benefits` DISABLE KEYS */;
INSERT INTO `_node_emp_benefits` VALUES (1,'18-0705',5,1),(2,'18-0707',6,1);
/*!40000 ALTER TABLE `_node_emp_benefits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_flow_mngt`
--

DROP TABLE IF EXISTS `_node_flow_mngt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_flow_mngt` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int(12) DEFAULT NULL,
  `link_id` int(12) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_flow_mngt`
--

LOCK TABLES `_node_flow_mngt` WRITE;
/*!40000 ALTER TABLE `_node_flow_mngt` DISABLE KEYS */;
INSERT INTO `_node_flow_mngt` VALUES (2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,2,1),(7,2,5),(17,1,16),(9,1,7),(10,1,8),(11,1,9),(12,1,10),(14,1,11),(51,1,12);
/*!40000 ALTER TABLE `_node_flow_mngt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_gov_pagibig`
--

DROP TABLE IF EXISTS `_node_gov_pagibig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_gov_pagibig` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start` decimal(19,2) DEFAULT NULL,
  `end` decimal(19,2) DEFAULT NULL,
  `contribution` decimal(19,2) DEFAULT NULL,
  `employer` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_gov_pagibig`
--

LOCK TABLES `_node_gov_pagibig` WRITE;
/*!40000 ALTER TABLE `_node_gov_pagibig` DISABLE KEYS */;
INSERT INTO `_node_gov_pagibig` VALUES (1,0.00,1500.00,0.01,0.02),(2,1500.01,999999.00,0.02,0.02);
/*!40000 ALTER TABLE `_node_gov_pagibig` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_gov_philhealth`
--

DROP TABLE IF EXISTS `_node_gov_philhealth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_gov_philhealth` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `salary_base` double(10,2) DEFAULT NULL,
  `start` double(10,2) DEFAULT NULL,
  `end` double(10,2) DEFAULT NULL,
  `employer` double(10,2) DEFAULT NULL,
  `employee` double(10,2) DEFAULT NULL,
  `total` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_gov_philhealth`
--

LOCK TABLES `_node_gov_philhealth` WRITE;
/*!40000 ALTER TABLE `_node_gov_philhealth` DISABLE KEYS */;
INSERT INTO `_node_gov_philhealth` VALUES (1,0.00,0.00,8999.99,100.00,100.00,200.00),(2,9000.00,9000.00,9999.99,112.50,112.50,225.00),(3,10000.00,10000.00,10999.99,125.00,125.00,250.00),(4,11000.00,11000.00,11999.99,137.50,137.50,275.00),(5,12000.00,12000.00,12999.99,150.00,150.00,300.00),(6,13000.00,13000.00,13999.99,162.50,162.50,325.00),(7,14000.00,14000.00,14999.99,175.00,175.00,350.00),(8,15000.00,15000.00,15999.99,187.50,187.50,375.00),(9,16000.00,16000.00,16999.99,200.00,200.00,400.00),(10,17000.00,17000.00,17999.99,212.50,212.50,425.00),(11,18000.00,18000.00,18999.99,225.00,225.00,450.00),(12,19000.00,19000.00,19999.99,237.50,237.50,475.00),(13,20000.00,20000.00,20999.99,250.00,250.00,500.00),(14,21000.00,21000.00,21999.99,262.50,262.50,525.00),(15,22000.00,22000.00,22999.99,275.00,275.00,550.00),(16,23000.00,23000.00,23999.99,287.50,287.50,575.00),(17,24000.00,24000.00,24999.99,300.00,300.00,600.00),(18,25000.00,25000.00,25999.99,312.50,312.50,625.00),(19,26000.00,26000.00,26999.99,325.00,325.00,650.00),(20,27000.00,27000.00,27999.99,337.50,337.50,675.00),(21,28000.00,28000.00,28999.99,350.00,350.00,700.00),(22,29000.00,29000.00,29999.99,362.50,362.50,725.00),(23,30000.00,30000.00,30999.99,375.00,375.00,750.00),(24,31000.00,31000.00,31999.99,387.50,387.50,775.00),(25,32000.00,32000.00,32999.99,400.00,400.00,800.00),(26,33000.00,33000.00,33999.99,412.50,412.50,825.00),(27,34000.00,34000.00,34999.99,425.00,425.00,850.00),(28,35000.00,35000.00,99999999.00,437.50,437.50,875.00);
/*!40000 ALTER TABLE `_node_gov_philhealth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_gov_sss`
--

DROP TABLE IF EXISTS `_node_gov_sss`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_gov_sss` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `start` double(10,2) DEFAULT NULL,
  `end` double(10,2) DEFAULT NULL,
  `salary` double(10,2) DEFAULT NULL,
  `employer` double(10,2) DEFAULT NULL,
  `employee` double(10,2) DEFAULT NULL,
  `total` double(10,2) DEFAULT NULL,
  `ecc` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_gov_sss`
--

LOCK TABLES `_node_gov_sss` WRITE;
/*!40000 ALTER TABLE `_node_gov_sss` DISABLE KEYS */;
INSERT INTO `_node_gov_sss` VALUES (1,1000.00,1249.99,1000.00,73.70,36.30,110.00,10.00),(2,1250.00,1749.99,1500.00,110.50,54.50,165.00,10.00),(3,1750.00,2249.99,2000.00,147.30,72.70,220.00,10.00),(4,2250.00,2749.99,2500.00,184.20,90.80,275.00,10.00),(5,2750.00,3249.99,3000.00,221.00,109.00,330.00,10.00),(6,3250.00,3749.99,3500.00,257.80,127.20,385.00,10.00),(7,3750.00,4249.99,4000.00,294.70,145.30,440.00,10.00),(8,4250.00,4749.99,4500.00,331.50,163.50,495.00,10.00),(9,4750.00,5249.99,5000.00,368.30,181.70,550.00,10.00),(10,5250.00,5749.99,5500.00,405.20,199.80,605.00,10.00),(11,5750.00,6249.99,6000.00,442.00,218.00,660.00,10.00),(12,6250.00,6749.99,6500.00,478.80,236.20,715.00,10.00),(13,6750.00,7249.99,7000.00,515.70,254.30,770.00,10.00),(14,7250.00,7749.99,7500.00,552.50,272.50,825.00,10.00),(15,7750.00,8249.99,8000.00,589.30,290.70,880.00,10.00),(16,8250.00,8749.99,8500.00,626.20,308.80,935.00,10.00),(17,8750.00,9249.99,9000.00,663.00,327.00,990.00,10.00),(18,9250.00,9749.99,9500.00,699.80,345.20,1045.00,10.00),(19,9750.00,10249.99,10000.00,736.70,363.30,1100.00,10.00),(20,10250.00,10749.99,10500.00,773.50,381.50,1155.00,10.00),(21,10750.00,11249.99,11000.00,810.30,399.70,1210.00,10.00),(22,11250.00,11749.99,11500.00,847.20,417.80,1265.00,10.00),(23,11750.00,12249.99,12000.00,884.00,436.00,1320.00,10.00),(24,12250.00,12749.99,12500.00,920.80,454.20,1375.00,10.00),(25,12750.00,13249.99,13000.00,957.70,472.30,1430.00,10.00),(26,13250.00,13749.99,13500.00,994.50,490.50,1485.00,10.00),(27,13750.00,14249.99,14000.00,1031.30,508.70,1540.00,10.00),(28,14250.00,14749.99,14500.00,1068.20,526.80,1595.00,10.00),(29,14750.00,15249.99,1500.00,1105.00,545.00,1650.00,30.00),(30,15250.00,15749.99,15500.00,1141.80,563.20,1705.00,30.00),(31,15750.00,9999999.00,16000.00,1178.70,581.30,1760.00,30.00);
/*!40000 ALTER TABLE `_node_gov_sss` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_gov_tax`
--

DROP TABLE IF EXISTS `_node_gov_tax`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_gov_tax` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `deduction_date` varchar(100) DEFAULT NULL,
  `type` int(12) DEFAULT NULL,
  `salary` double(10,2) DEFAULT NULL,
  `end` double(10,2) DEFAULT NULL,
  `deductions` double(10,2) DEFAULT NULL,
  `additional` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_gov_tax`
--

LOCK TABLES `_node_gov_tax` WRITE;
/*!40000 ALTER TABLE `_node_gov_tax` DISABLE KEYS */;
INSERT INTO `_node_gov_tax` VALUES (1,'3',1,0.00,32.99,0.00,0.05),(2,'3',1,33.00,98.99,1.65,0.10),(3,'3',1,99.00,230.99,8.25,0.15),(4,'3',1,231.00,461.99,28.05,0.20),(5,'3',1,462.00,824.99,74.26,0.25),(6,'3',1,825.00,1649.99,165.02,0.30),(7,'3',1,1650.00,99999.99,412.54,0.32),(8,'3',2,165.00,197.99,0.00,0.05),(9,'3',2,198.00,263.99,1.65,0.10),(10,'3',2,264.00,395.99,8.25,0.15),(11,'3',2,396.00,626.99,28.05,0.20),(12,'3',2,627.00,989.99,74.26,0.25),(13,'3',2,990.00,1814.99,165.02,0.30),(14,'3',2,1815.00,99999.99,412.54,0.32),(15,'3',3,248.00,280.99,0.00,0.05),(16,'3',3,281.00,346.99,1.65,0.10),(17,'3',3,347.00,478.99,8.25,0.15),(18,'3',3,479.00,709.99,28.05,0.20),(19,'3',3,710.00,1072.99,74.26,0.25),(20,'3',3,1073.00,1897.99,165.02,0.30),(21,'3',3,1898.00,99999.99,412.54,0.32),(22,'3',4,330.00,362.99,0.00,0.05),(23,'3',4,363.00,428.99,1.65,0.10),(24,'3',4,429.00,560.99,8.25,0.15),(25,'3',4,561.00,791.99,28.05,0.20),(26,'3',4,792.00,1154.99,74.26,0.25),(27,'3',4,1155.00,1979.99,165.02,0.30),(28,'3',4,1980.00,99999.99,412.54,0.32),(29,'3',5,413.00,445.99,0.00,0.05),(30,'3',5,446.00,511.99,1.65,0.10),(31,'3',5,512.00,643.99,8.25,0.15),(32,'3',5,644.00,874.99,28.05,0.20),(33,'3',5,875.00,1237.99,74.26,0.25),(34,'3',5,1238.00,2062.99,165.02,0.30),(35,'3',5,2063.00,99999.99,412.54,0.32),(36,'3',6,495.00,527.99,0.00,0.05),(37,'3',6,528.00,593.99,1.65,0.10),(38,'3',6,594.00,725.99,8.25,0.15),(39,'3',6,726.00,956.99,28.05,0.20),(40,'3',6,957.00,1319.99,74.26,0.25),(41,'3',6,1320.00,2144.99,165.02,0.30),(42,'3',6,2145.00,99999.99,412.54,0.32),(43,'4',1,0.00,191.99,0.00,0.05),(44,'4',1,192.00,576.99,9.62,0.10),(45,'4',1,577.00,1345.99,48.08,0.15),(46,'4',1,1346.00,2691.00,163.36,0.20),(47,'4',1,2692.00,4807.99,432.69,0.25),(48,'4',1,4808.00,9614.99,961.54,0.30),(49,'4',1,9615.00,100000.00,2403.85,0.32),(50,'4',2,962.00,1153.99,0.00,0.05),(51,'4',2,1154.00,1537.99,9.62,0.00),(52,'4',2,1538.00,2307.99,48.08,0.15),(53,'4',2,2308.00,3653.99,163.36,0.20),(54,'4',2,3654.00,5768.99,432.69,0.25),(55,'4',2,5769.00,10576.99,961.54,0.30),(56,'4',2,10577.00,99999.99,2403.85,0.32),(57,'4',3,1442.00,1635.99,0.00,0.05),(58,'4',3,1635.00,2018.90,9.62,0.10),(59,'4',3,2019.00,2787.99,48.08,0.15),(60,'4',3,2788.00,4134.99,163.36,0.20),(61,'4',3,4135.00,6249.99,432.69,0.25),(62,'4',3,6250.00,11057.99,961.54,0.30),(63,'4',3,11058.00,99999.99,2403.85,0.32),(64,'4',4,1923.00,2114.99,0.00,0.05),(65,'4',4,2115.00,2499.99,9.62,0.10),(66,'4',4,2500.00,3268.99,48.08,0.15),(67,'4',4,3269.00,4615.99,163.36,0.20),(68,'4',4,4615.00,6730.99,432.69,0.25),(69,'4',4,6731.00,11537.99,961.54,0.30),(70,'4',4,11538.00,99999.99,2403.85,0.32),(71,'4',5,2404.00,2595.99,0.00,0.05),(72,'4',5,2596.00,2980.99,9.62,0.10),(73,'4',5,2981.00,3749.99,48.08,0.15),(74,'4',5,3750.00,5095.99,163.36,0.20),(75,'4',5,5096.00,7211.99,432.69,0.25),(76,'4',5,7212.00,12018.99,961.54,0.30),(77,'4',5,12019.00,99999.99,2403.85,0.32),(78,'4',6,2885.00,3076.99,0.00,0.05),(79,'4',6,3077.00,3461.99,9.62,0.10),(80,'4',6,3462.00,4230.99,48.08,0.15),(81,'4',6,4231.00,5576.99,163.36,0.20),(82,'4',6,5577.00,7692.99,432.69,0.25),(83,'4',6,7692.00,23499.99,961.54,0.30),(84,'4',6,12500.00,99999.99,2403.85,0.32),(85,'1',1,0.00,416.99,0.00,0.05),(86,'1',1,417.00,1249.99,20.83,0.10),(87,'1',1,1250.00,2916.99,104.17,0.15),(88,'1',1,2917.00,5832.99,354.17,0.20),(89,'1',1,5833.00,10416.99,937.50,0.25),(90,'1',1,10417.00,20832.99,2083.33,0.30),(91,'1',1,20833.00,99999.99,5208.33,0.32),(92,'1',2,2083.00,2499.99,0.00,0.05),(93,'1',2,2500.00,3332.99,20.83,0.10),(94,'1',2,3333.00,4999.99,104.17,0.15),(95,'1',2,5000.00,7916.99,354.17,0.20),(96,'1',2,7917.00,12499.99,937.50,0.25),(97,'1',2,12500.00,22916.99,2083.33,0.30),(98,'1',2,22917.00,99999.99,5208.33,0.32),(99,'1',3,3125.00,3541.99,0.00,0.05),(100,'1',3,3542.00,4374.99,20.83,0.10),(101,'1',3,4375.00,6041.99,104.17,0.15),(102,'1',3,6042.00,8957.99,354.17,0.20),(103,'1',3,8958.00,13541.99,937.50,0.25),(104,'1',3,13542.00,23957.99,2083.33,0.30),(105,'1',3,23958.00,99999.99,5208.33,0.32),(106,'1',4,4167.00,4582.99,0.00,0.05),(107,'1',4,4583.00,5416.99,20.83,0.10),(108,'1',4,5417.00,7082.99,104.17,0.15),(109,'1',4,7083.00,9999.99,354.17,0.20),(110,'1',4,10000.00,14582.99,937.50,0.25),(111,'1',4,14583.00,24999.99,2083.33,0.30),(112,'1',4,25000.00,99999.99,5208.33,0.32),(113,'1',5,5208.00,5624.99,0.00,0.05),(114,'1',5,5625.00,6457.99,20.83,0.10),(115,'1',5,6458.00,8124.99,104.17,0.15),(116,'1',5,8125.00,11041.99,354.17,0.20),(117,'1',5,11042.00,15624.99,937.50,0.25),(118,'1',5,15625.00,26041.99,2083.33,0.30),(119,'1',5,26042.00,99999.99,5208.33,0.32),(120,'1',5,6250.00,6666.99,0.00,0.05),(121,'1',6,6667.00,7499.99,20.83,0.10),(122,'1',6,7500.00,9166.99,104.17,0.15),(123,'1',6,9167.00,12082.99,354.17,0.20),(124,'1',6,12083.00,16666.99,937.50,0.25),(125,'1',6,16667.00,27082.99,2083.33,0.30),(126,'1',6,27083.00,99999.99,5208.33,0.32),(127,'2',1,0.00,832.99,0.00,0.05),(128,'2',1,833.00,2499.99,41.67,0.10),(129,'2',1,2500.00,5832.99,208.33,0.15),(130,'2',1,5833.00,11666.99,708.33,0.20),(131,'2',1,11667.00,20832.99,1875.00,0.25),(132,'2',1,20833.00,41666.99,4166.67,0.30),(133,'2',1,41667.00,99999.99,10416.67,0.32),(134,'2',2,4167.00,4999.99,0.00,0.05),(135,'2',2,5000.00,6666.99,41.67,0.10),(136,'2',2,6667.00,9999.99,208.33,0.15),(137,'2',2,10000.00,15832.99,708.33,0.20),(138,'2',2,15833.00,24999.99,1875.00,0.25),(139,'2',2,25000.00,45832.99,4166.67,0.30),(140,'2',2,45833.00,99999.99,10416.67,0.32),(141,'2',3,6250.00,7082.99,0.00,0.05),(142,'2',3,7083.00,8751.99,41.67,0.10),(143,'2',3,8750.00,12082.99,208.33,0.15),(144,'2',3,12083.00,17916.99,708.33,0.20),(145,'2',3,17917.00,27082.99,1875.00,0.25),(146,'2',3,27083.00,57916.99,4166.67,0.30),(147,'2',3,47917.00,99999.99,10416.67,0.32),(148,'2',4,8333.00,9166.99,0.00,0.05),(149,'2',4,9167.00,10832.99,41.67,0.10),(150,'2',4,10833.00,14166.99,208.33,0.15),(151,'2',4,14167.00,19999.99,708.33,0.20),(152,'2',4,20000.00,29166.99,1875.00,0.25),(153,'2',4,29167.00,49999.99,4166.67,0.30),(154,'2',4,50000.00,99999.99,10416.67,0.32),(155,'2',5,10417.00,11249.99,0.00,0.05),(156,'2',5,11250.00,12916.99,41.67,0.10),(157,'2',5,12917.00,16249.99,208.33,0.15),(158,'2',5,16250.00,22082.99,708.33,0.20),(159,'2',5,22083.00,31259.99,1875.00,0.25),(160,'2',5,31250.00,52082.99,4166.67,0.30),(161,'2',5,52083.00,99999.99,10416.67,0.32),(162,'2',6,12500.00,13332.99,0.00,0.05),(163,'2',6,13333.00,14999.99,41.67,0.10),(164,'2',6,15000.00,18332.99,208.33,0.15),(165,'2',6,18333.00,24166.99,708.33,0.20),(166,'2',6,24167.00,33332.99,1875.00,0.25),(167,'2',6,33333.00,54166.99,4166.67,0.30),(168,'2',6,54167.00,99999.99,10416.67,0.32);
/*!40000 ALTER TABLE `_node_gov_tax` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_job_allowance`
--

DROP TABLE IF EXISTS `_node_job_allowance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_job_allowance` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(50) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_job_allowance`
--

LOCK TABLES `_node_job_allowance` WRITE;
/*!40000 ALTER TABLE `_node_job_allowance` DISABLE KEYS */;
INSERT INTO `_node_job_allowance` VALUES (1,'Transpo',100.00),(2,'Food',100.00);
/*!40000 ALTER TABLE `_node_job_allowance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_job_employment_stat`
--

DROP TABLE IF EXISTS `_node_job_employment_stat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_job_employment_stat` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_job_employment_stat`
--

LOCK TABLES `_node_job_employment_stat` WRITE;
/*!40000 ALTER TABLE `_node_job_employment_stat` DISABLE KEYS */;
INSERT INTO `_node_job_employment_stat` VALUES (1,'Candidate'),(2,'Probationary'),(3,'Contractual'),(4,'Project'),(5,'Regular'),(6,'Resign');
/*!40000 ALTER TABLE `_node_job_employment_stat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_job_pay_grade`
--

DROP TABLE IF EXISTS `_node_job_pay_grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_job_pay_grade` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `pay_grade` varchar(50) DEFAULT NULL,
  `min_sal` decimal(10,2) DEFAULT NULL,
  `max_sal` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_job_pay_grade`
--

LOCK TABLES `_node_job_pay_grade` WRITE;
/*!40000 ALTER TABLE `_node_job_pay_grade` DISABLE KEYS */;
INSERT INTO `_node_job_pay_grade` VALUES (1,'Junior',20000.00,25000.00),(2,'asdas',12.00,1231.00),(5,'asdasd',1111.00,111.00);
/*!40000 ALTER TABLE `_node_job_pay_grade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_job_title`
--

DROP TABLE IF EXISTS `_node_job_title`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_job_title` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `job_title` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `details` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_job_title`
--

LOCK TABLES `_node_job_title` WRITE;
/*!40000 ALTER TABLE `_node_job_title` DISABLE KEYS */;
INSERT INTO `_node_job_title` VALUES (1,'Programmer','Create a programe','asd.pdf'),(2,'HR Manager','Manage Hr','asd.pdf'),(3,'IS Manager','Operations manager in Information System Department','asd.pdf'),(5,'Senior Programmer','team lead','making merge for branches'),(6,'Room Attendant','sample','sample');
/*!40000 ALTER TABLE `_node_job_title` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_job_work_shift`
--

DROP TABLE IF EXISTS `_node_job_work_shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_job_work_shift` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `shift_name` varchar(50) DEFAULT NULL,
  `shift_from` varchar(20) DEFAULT NULL,
  `shift_to` varchar(20) DEFAULT NULL,
  `shift_type` enum('Broken','On-Call','Part Time','Regular Schedule') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_job_work_shift`
--

LOCK TABLES `_node_job_work_shift` WRITE;
/*!40000 ALTER TABLE `_node_job_work_shift` DISABLE KEYS */;
INSERT INTO `_node_job_work_shift` VALUES (1,'regular','8:00','6:30','Regular Schedule'),(6,'broken','12:00','6:00','Broken');
/*!40000 ALTER TABLE `_node_job_work_shift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_loan_details`
--

DROP TABLE IF EXISTS `_node_loan_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_loan_details` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `loan_id` int(11) DEFAULT NULL,
  `amount_paid` double(10,2) DEFAULT NULL,
  `payroll_id` int(11) DEFAULT NULL,
  `loan_type` int(11) DEFAULT NULL,
  `date_paid` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_loan_details`
--

LOCK TABLES `_node_loan_details` WRITE;
/*!40000 ALTER TABLE `_node_loan_details` DISABLE KEYS */;
INSERT INTO `_node_loan_details` VALUES (1,8,2083.33,78,1,'2018-07-21 17:26:49'),(2,8,2083.33,80,1,'2018-07-21 17:26:49'),(3,8,2083.33,82,1,'2018-07-21 17:26:49'),(4,8,2083.33,84,1,'2018-07-21 17:26:49'),(5,8,2083.33,86,1,'2018-07-21 17:26:49'),(6,8,2083.33,92,1,'2018-07-21 17:26:49'),(7,8,2083.33,94,1,'2018-07-21 17:26:49'),(8,8,2083.33,98,1,'2018-07-21 17:26:49'),(9,8,2083.33,100,1,'2018-07-21 17:26:49'),(10,8,2083.33,102,1,'2018-07-21 17:26:49'),(11,8,2083.33,104,1,'2018-07-21 17:26:49'),(12,8,2083.33,106,1,'2018-07-21 17:26:49'),(13,8,2083.33,108,1,'2018-07-21 17:26:49'),(14,9,20.83,109,1,'2018-09-24 03:38:14'),(15,9,20.83,110,1,'2018-09-24 03:42:53'),(16,9,20.83,111,1,'2018-09-24 03:56:49'),(17,9,20.83,112,1,'2018-09-24 04:06:31'),(18,9,20.83,113,1,'2018-09-24 04:09:14'),(19,9,20.83,115,1,'2018-09-24 04:13:00'),(20,9,20.83,117,1,'2018-09-24 04:17:54'),(21,9,20.83,118,1,'2018-09-24 04:19:56');
/*!40000 ALTER TABLE `_node_loan_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_loan_payment`
--

DROP TABLE IF EXISTS `_node_loan_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_loan_payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_added` datetime DEFAULT CURRENT_TIMESTAMP,
  `amount_paid` decimal(19,2) NOT NULL,
  `payroll_transaction_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_loan_payment`
--

LOCK TABLES `_node_loan_payment` WRITE;
/*!40000 ALTER TABLE `_node_loan_payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `_node_loan_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_loan_request`
--

DROP TABLE IF EXISTS `_node_loan_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_loan_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emp_id` varchar(12) NOT NULL,
  `loan_type` int(11) NOT NULL,
  `amount` decimal(19,2) NOT NULL,
  `months_to_pay` int(11) NOT NULL,
  `date_added` datetime DEFAULT CURRENT_TIMESTAMP,
  `term` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_loan_request`
--

LOCK TABLES `_node_loan_request` WRITE;
/*!40000 ALTER TABLE `_node_loan_request` DISABLE KEYS */;
INSERT INTO `_node_loan_request` VALUES (8,'18-0411181',1,25000.00,12,'2018-06-30 18:30:16','Monthly'),(9,'18-0411183',1,1000.00,24,'2018-08-02 17:27:19','Semi-Monthly');
/*!40000 ALTER TABLE `_node_loan_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_loan_type`
--

DROP TABLE IF EXISTS `_node_loan_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_loan_type` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(50) DEFAULT NULL,
  `link` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_loan_type`
--

LOCK TABLES `_node_loan_type` WRITE;
/*!40000 ALTER TABLE `_node_loan_type` DISABLE KEYS */;
INSERT INTO `_node_loan_type` VALUES (1,'SSS- Social Secrutiy System','SSS'),(2,'PagIbig','pag-ibig'),(3,'Salary Loan','salary-loan'),(4,'Calamity Loan','calamity-loan'),(5,'Cash Advance','cash-advance'),(6,'Maternity Loan','maternity-loan');
/*!40000 ALTER TABLE `_node_loan_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_loans`
--

DROP TABLE IF EXISTS `_node_loans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_loans` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `loan_type_id` int(12) DEFAULT NULL,
  `emp_id` varchar(50) DEFAULT NULL,
  `loan_amount` double(10,2) DEFAULT NULL,
  `amount_paid` double(10,2) DEFAULT NULL,
  `months_to_pay` int(12) DEFAULT NULL,
  `term` enum('Monthly','Semi-Monthly') DEFAULT NULL,
  `monthly_payment` double(10,2) DEFAULT NULL,
  `loan_status` varchar(50) DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  `date_update` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_loans`
--

LOCK TABLES `_node_loans` WRITE;
/*!40000 ALTER TABLE `_node_loans` DISABLE KEYS */;
INSERT INTO `_node_loans` VALUES (1,1,'18-0411181',6212.40,517.70,24,'Semi-Monthly',258.85,'Unpaid','2018-04-23',NULL),(2,2,'18-0411181',6212.40,258.85,24,'Monthly',258.85,'Unpaid','2018-04-23','2018-04-23'),(3,3,'18-0411181',6212.40,258.85,24,'Monthly',258.85,'Unpaid','2018-04-23','2018-04-23');
/*!40000 ALTER TABLE `_node_loans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_main_link`
--

DROP TABLE IF EXISTS `_node_main_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_main_link` (
  `id` varchar(12) NOT NULL,
  `link_title` varchar(50) DEFAULT NULL,
  `link_page` varchar(50) DEFAULT NULL,
  `sub_link` varchar(2) DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_main_link`
--

LOCK TABLES `_node_main_link` WRITE;
/*!40000 ALTER TABLE `_node_main_link` DISABLE KEYS */;
INSERT INTO `_node_main_link` VALUES ('1','Home','/home/dashboard','0','icon-home3'),('2','User Management',NULL,'0','icon-users3'),('3','Organization',NULL,'0','icon-office'),('4','Job Category',NULL,'0','icon-gears'),('5','Regions','/region','16',''),('7','User List','/userList','2',NULL),('8','User Role','/userRole','2',NULL),('9','Client','/org','3',NULL),('10','Department','/org_dept','3',NULL),('11','Job Title','/job_title','4',NULL),('12','Employment Status','/job_employment_stat','4',NULL),('13','Pay Grade','/job_pay_grade','4',NULL),('14','Allowance','/job_allowance','4',NULL),('15','Work Shift','/job_shift','4',NULL),('16','Recruitment',NULL,'0','icon-archive2'),('17','Candidate Info','/rec_candidate','16',NULL),('18','Vacancy','/vacancies','16',NULL),('19','Change Status','/change_stat','16',NULL),('20','Discipline','/discipline','16',NULL),('21','Job Offer','/job_offer','16',''),('22','SSS Loans','/sss','21',NULL),('23','PagIbig Loans','/pagibig','21',NULL),('24','Salary Loans','/sal_loan','21',NULL),('25','Calamity Loans','/cal_loan','21',NULL),('26','Cash Advance','/cash_advance','21',NULL),('27','Maternity Loan','/maternity','21',NULL),('28','Service Incentive Leave','/sil','0','icon-birthday-cake'),('29','Add Loans','/add_loans','21',NULL),('30','Payroll','/payroll','0','icon-money'),('31','New Loan',NULL,'0','icon-bank'),('32','SSS','/new-loan/sss','31',NULL),('33','Salary Loans','/new-loan/salary-loan','31',NULL),('34','PAG-IBIG','/new-loan/pag-ibig','31',NULL),('35','Payroll History','/payroll-history','43',NULL),('36','13 MONTH','/thirtheen-month','43',NULL),('37','Calamity Loan','/new-loan/calamity-loan','31',NULL),('38','Cash Advance','/new-loan/cash-advance','31',NULL),('39','Maternity Loan','/new-loan/maternity-loan','31',NULL),('40','Payroll Benifits','/payroll-benifits','43','icon-money'),('41','Payroll Rate','/payroll-rate','43','icon-money'),('42','ATM','/atm-list','43','icon-list'),('43','Reports',NULL,'0','icon-stats-dots'),('44','Contract','/contract','16',NULL),('45','Employee List','/employee','0','icon-user5'),('46','Payroll History','/payroll-client-history','43',NULL),('47','Payroll History Detail','/payroll-history-detail','43',NULL);
/*!40000 ALTER TABLE `_node_main_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_menu`
--

DROP TABLE IF EXISTS `_node_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_menu` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `menu` varchar(100) DEFAULT NULL,
  `link_page` varchar(100) DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_menu`
--

LOCK TABLES `_node_menu` WRITE;
/*!40000 ALTER TABLE `_node_menu` DISABLE KEYS */;
INSERT INTO `_node_menu` VALUES (1,'Home','/home/dashboard','icon-home3'),(2,'User Management',NULL,'icon-users3'),(3,'Organization',NULL,'icon-office'),(4,'Job Category',NULL,'icon-gears'),(5,'Employee List','/employee','icon-user5'),(6,'Job Category',NULL,'icon-gears'),(7,'Recruitment',NULL,'icon-archive2'),(8,'Service Incentive Leave','/sil','icon-birthday-cake'),(9,'New Loan',NULL,'icon-bank'),(10,'Gov\'t Table',NULL,'icon-stackoverflow'),(11,'Payroll','/payrolNew','icon-money'),(12,'Reports',NULL,'icon-stats-dots');
/*!40000 ALTER TABLE `_node_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_org_client`
--

DROP TABLE IF EXISTS `_node_org_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_org_client` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `client_name` varchar(50) DEFAULT NULL,
  `_add` text,
  `contact_name` varchar(50) DEFAULT NULL,
  `contact_position` varchar(50) DEFAULT NULL,
  `contact_no` varchar(20) DEFAULT NULL,
  `contract_start` date DEFAULT NULL,
  `contract_end` date DEFAULT NULL,
  `region` int(12) DEFAULT NULL,
  `statury_deduc_sched` int(12) DEFAULT NULL,
  `sss_deduc_basis` int(2) DEFAULT NULL,
  `philhealth_deduc_basis` int(2) DEFAULT NULL,
  `Wtax_sched` int(2) DEFAULT NULL,
  `Wtax_deduc_basis` int(2) DEFAULT NULL,
  `admin_fee` decimal(10,2) DEFAULT NULL,
  `status` enum('Active','Deactive','For Renewal','Negotiation') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_org_client`
--

LOCK TABLES `_node_org_client` WRITE;
/*!40000 ALTER TABLE `_node_org_client` DISABLE KEYS */;
INSERT INTO `_node_org_client` VALUES (1,'Tagaytay','asddddddddddddddddddddddddddddddd','lester','manager','1234567890','2018-04-01','2020-04-02',1,2,2,1,2,1,0.12,'Active'),(3,'Grab - NCR','asddddddddddddddddddddddddddddddd','lester','manager','1234567890','2018-04-01','2020-04-02',1,2,2,2,2,2,0.12,'Active'),(4,'sample',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `_node_org_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_org_dept`
--

DROP TABLE IF EXISTS `_node_org_dept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_org_dept` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_org_dept`
--

LOCK TABLES `_node_org_dept` WRITE;
/*!40000 ALTER TABLE `_node_org_dept` DISABLE KEYS */;
INSERT INTO `_node_org_dept` VALUES (1,'HR Department'),(2,'Information System'),(8,'Programmer'),(9,'Janitor'),(10,'Driver'),(11,'Waitress'),(12,'wautr');
/*!40000 ALTER TABLE `_node_org_dept` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_ot_settings`
--

DROP TABLE IF EXISTS `_node_ot_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_ot_settings` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `ot` double(10,2) DEFAULT NULL,
  `nd` double(10,2) DEFAULT NULL,
  `ot_nd` double(10,2) DEFAULT NULL,
  `lh_rate` double(10,2) DEFAULT NULL,
  `lh_ot` double(10,2) DEFAULT NULL,
  `lh_nd` double(10,2) DEFAULT NULL,
  `lh_ot_nd` double(10,2) DEFAULT NULL,
  `sh_rate` double(10,2) DEFAULT NULL,
  `sh_ot` double(10,2) DEFAULT NULL,
  `sh_nd` double(10,2) DEFAULT NULL,
  `sh_ot_nd` double(10,2) DEFAULT NULL,
  `sh_rdot` double(10,2) DEFAULT NULL,
  `lh_rdot` double(10,2) DEFAULT NULL,
  `day_off` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_ot_settings`
--

LOCK TABLES `_node_ot_settings` WRITE;
/*!40000 ALTER TABLE `_node_ot_settings` DISABLE KEYS */;
INSERT INTO `_node_ot_settings` VALUES (1,1.25,0.10,2.00,1.00,2.60,0.10,2.00,0.30,1.69,0.10,1.50,1.95,3.38,1.30);
/*!40000 ALTER TABLE `_node_ot_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_payroll`
--

DROP TABLE IF EXISTS `_node_payroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_payroll` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(25) DEFAULT NULL,
  `phil_health` int(11) NOT NULL,
  `sss` int(11) NOT NULL,
  `pag_ibig` int(11) NOT NULL,
  `tax` int(11) NOT NULL,
  `date_from` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_to` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `payroll_settings` int(11) DEFAULT NULL,
  `e_philhealth` decimal(19,2) DEFAULT NULL,
  `e_sss` decimal(19,2) DEFAULT NULL,
  `e_pagibig` decimal(19,2) DEFAULT NULL,
  `add_tax` decimal(19,2) DEFAULT NULL,
  `work_hours` decimal(19,2) DEFAULT NULL,
  `payment_id` int(1) DEFAULT NULL,
  `net` decimal(19,2) DEFAULT NULL,
  `rate` decimal(19,4) DEFAULT NULL,
  `gross` decimal(19,2) DEFAULT NULL,
  `payout_month` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_payroll`
--

LOCK TABLES `_node_payroll` WRITE;
/*!40000 ALTER TABLE `_node_payroll` DISABLE KEYS */;
INSERT INTO `_node_payroll` VALUES (91,'18-0411182',300,581,100,637,'2018-06-29 16:00:00','2018-07-13 16:00:00',1,300.00,1178.70,100.00,568.18,80.00,1,12017.56,1136.3600,14204.10,NULL),(92,'18-0411181',138,418,100,0,'2018-06-29 16:00:00','2018-07-13 16:00:00',1,137.50,847.20,100.00,0.00,80.00,1,4425.52,521.0000,7164.15,NULL),(93,'18-0411182',0,0,0,0,'2018-07-14 16:00:00','2018-07-29 16:00:00',1,0.00,0.00,0.00,568.18,80.00,1,13635.92,1136.3600,14204.10,NULL),(94,'18-0411181',0,0,0,0,'2018-07-14 16:00:00','2018-07-29 16:00:00',1,0.00,0.00,0.00,0.00,80.00,1,4429.57,521.0000,6512.90,NULL),(95,'18-0411183',69,104,50,0,'2018-06-29 16:00:00','2018-07-13 16:00:00',4,68.75,211.80,50.00,0.00,80.00,1,6289.70,521.0000,6512.90,NULL),(96,'-9315',69,104,50,0,'2018-06-29 16:00:00','2018-07-13 16:00:00',4,68.75,211.80,50.00,0.00,80.00,1,6289.70,521.0000,6512.90,NULL),(97,'18-0411182',300,581,250,607,'0000-00-00 00:00:00','0000-00-00 00:00:00',1,300.00,1178.70,250.00,1420.45,80.00,1,15306.64,1136.3600,18465.45,NULL),(98,'18-0411181',138,418,115,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',1,137.50,847.20,114.62,0.00,80.00,1,4410.90,521.0000,7164.15,NULL),(99,'18-0411182',0,0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',1,0.00,0.00,0.00,852.27,80.00,1,14772.28,1136.3600,15624.55,NULL),(100,'18-0411181',0,0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',1,0.00,0.00,0.00,0.00,80.00,1,6383.32,521.0000,8466.65,NULL),(101,'18-0411182',300,581,250,607,'0000-00-00 00:00:00','0000-00-00 00:00:00',1,300.00,1178.70,250.00,0.00,25.00,1,1812.64,1136.3600,3551.00,NULL),(102,'18-0411181',138,418,115,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',1,137.50,847.20,114.62,0.00,25.00,1,-1125.00,521.0000,1628.25,NULL),(103,'18-0411182',0,0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',1,0.00,0.00,0.00,4545.44,NULL,1,18181.76,1136.3600,22727.20,NULL),(104,'18-0411181',0,0,0,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',1,0.00,0.00,0.00,0.00,80.00,1,3127.07,521.0000,5210.40,NULL),(105,'18-0411182',300,581,250,607,'0000-00-00 00:00:00','0000-00-00 00:00:00',1,300.00,1178.70,250.00,0.00,80.00,1,9624.84,1136.3600,11363.20,NULL),(106,'18-0411181',138,418,115,0,'0000-00-00 00:00:00','0000-00-00 00:00:00',1,137.50,847.20,114.62,0.00,80.00,2,2457.15,521.0000,5210.40,NULL),(107,'18-0411182',0,0,0,0,'2018-08-15 16:00:00','2018-09-25 16:00:00',1,0.00,0.00,0.00,0.00,80.00,1,11363.20,1136.3600,11363.20,NULL),(108,'18-0411181',0,0,0,0,'2018-08-15 16:00:00','2018-09-25 16:00:00',1,0.00,0.00,0.00,0.00,80.00,1,3127.07,521.0000,5210.40,NULL),(109,'18-0411183',69,104,57,0,'2018-09-23 16:00:00','2018-10-08 16:00:00',4,68.75,211.80,57.31,0.00,80.00,1,5461.56,521.0000,6512.90,'October 2018'),(110,'18-0411183',69,104,57,0,'2018-09-23 16:00:00','2018-10-08 16:00:00',4,68.75,211.80,57.31,0.00,80.00,1,4961.56,521.0000,6512.90,'October 2018'),(111,'18-0411183',69,104,57,0,'2018-09-23 16:00:00','2018-10-08 16:00:00',4,68.75,211.80,57.31,0.00,80.00,1,4280.06,521.0000,5731.40,'October 2018'),(112,'18-0411183',69,104,57,0,'2018-09-23 16:00:00','2018-10-08 16:00:00',4,68.75,211.80,57.31,0.00,80.00,1,4280.06,521.0000,5731.40,'October 2018'),(113,'18-0411183',69,104,57,0,'2018-09-23 16:00:00','2018-10-08 16:00:00',4,68.75,211.80,57.31,0.00,80.00,1,4180.06,521.0000,5731.40,'October 2018'),(114,'18-9315',69,104,57,0,'2018-09-23 16:00:00','2018-10-08 16:00:00',4,68.75,211.80,57.31,0.00,80.00,1,5331.14,521.0000,5861.65,'October 2018'),(115,'18-0411183',69,104,57,0,'2018-09-23 16:00:00','2018-10-08 16:00:00',4,68.75,211.80,57.31,0.00,50.00,1,3907.66,521.0000,4559.00,'October 2018'),(116,'18-9315',69,104,57,0,'2018-09-23 16:00:00','2018-10-08 16:00:00',4,68.75,211.80,57.31,0.00,80.00,1,5282.39,521.0000,6512.90,'October 2018'),(117,'18-0411183',69,104,57,0,'2018-09-23 16:00:00','2018-10-08 16:00:00',4,68.75,211.80,57.31,0.00,80.00,1,5961.56,521.0000,6512.90,'October 2018'),(118,'18-0411183',69,104,57,0,'2018-09-23 16:00:00','2018-10-08 16:00:00',4,68.75,211.80,57.31,0.00,80.00,1,4510.31,521.0000,5861.65,'October 2018'),(119,'18-9315',69,104,57,0,'2018-09-23 16:00:00','2018-10-08 16:00:00',4,68.75,211.80,57.31,0.00,50.00,1,4028.49,521.0000,4559.00,'October 2018');
/*!40000 ALTER TABLE `_node_payroll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_payroll_details`
--

DROP TABLE IF EXISTS `_node_payroll_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_payroll_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(100) NOT NULL,
  `hours` decimal(19,2) DEFAULT NULL,
  `payroll_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_payroll_details`
--

LOCK TABLES `_node_payroll_details` WRITE;
/*!40000 ALTER TABLE `_node_payroll_details` DISABLE KEYS */;
INSERT INTO `_node_payroll_details` VALUES (31,'ot',10.00,91),(32,'ot',15.00,92),(33,'ot',10.00,93),(34,'ot',10.00,94),(35,'ot',10.00,95),(36,'ot',10.00,96),(37,'ot',25.00,97),(38,'ot',15.00,98),(39,'ot',15.00,99),(40,'ot',25.00,100),(41,'nd',80.00,103),(42,'ot',10.00,109),(43,'ot',10.00,110),(44,'ot',4.00,111),(45,'ot',4.00,112),(46,'o',4.00,113),(47,'d',3.00,113),(48,'t',1.00,113),(49,'o',5.00,114),(50,'t',3.00,114),(51,'o',1.00,115),(52,'d',3.00,115),(53,'t',1.00,115),(54,'o',1.00,116),(55,'t',1.00,116),(56,'ot',10.00,117),(57,'ot',5.00,118),(58,'djustAmount',100.00,118),(59,'ther_deducAmount',1000.00,118),(60,'ot',10.00,119),(61,'ther_deducAmount',300.00,119);
/*!40000 ALTER TABLE `_node_payroll_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_payroll_settings`
--

DROP TABLE IF EXISTS `_node_payroll_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_payroll_settings` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int(12) DEFAULT NULL,
  `job_id` int(12) DEFAULT NULL,
  `dept_id` int(12) DEFAULT NULL,
  `cola` double(10,2) DEFAULT NULL,
  `sea` double(10,2) DEFAULT NULL,
  `ctpa` double(10,2) DEFAULT NULL,
  `rate` double(10,2) DEFAULT NULL,
  `ot` double(10,2) DEFAULT NULL,
  `nd` double(10,2) DEFAULT NULL,
  `ot_nd` double(10,2) DEFAULT NULL,
  `lh_rate` double(10,2) DEFAULT NULL,
  `lh_ot` double(10,2) DEFAULT NULL,
  `lh_nd` double(10,2) DEFAULT NULL,
  `lh_ot_nd` double(10,2) DEFAULT NULL,
  `sh_rate` double(10,2) DEFAULT NULL,
  `sh_ot` double(10,2) DEFAULT NULL,
  `sh_nd` double(10,2) DEFAULT NULL,
  `sh_ot_nd` double(10,2) DEFAULT NULL,
  `sh_rdot` double(10,2) DEFAULT NULL,
  `lh_rdot` double(10,2) DEFAULT NULL,
  `day_off` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_payroll_settings`
--

LOCK TABLES `_node_payroll_settings` WRITE;
/*!40000 ALTER TABLE `_node_payroll_settings` DISABLE KEYS */;
INSERT INTO `_node_payroll_settings` VALUES (1,1,1,1,10.00,0.00,0.00,1136.36,2.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00),(2,1,2,1,10.00,0.00,0.00,1.00,2.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00),(3,3,1,1,10.00,0.00,0.00,521.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00),(4,3,2,1,10.00,0.00,0.00,1.00,2.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00),(6,1,6,NULL,10.00,0.00,0.00,502.00,1.25,0.10,2.00,0.10,0.10,0.10,0.10,0.10,0.10,0.10,0.10,0.10,0.10,0.10);
/*!40000 ALTER TABLE `_node_payroll_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_ph_deduc_include`
--

DROP TABLE IF EXISTS `_node_ph_deduc_include`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_ph_deduc_include` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int(12) DEFAULT NULL,
  `cola` int(2) DEFAULT NULL,
  `sea` int(2) DEFAULT NULL,
  `ctpa` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_ph_deduc_include`
--

LOCK TABLES `_node_ph_deduc_include` WRITE;
/*!40000 ALTER TABLE `_node_ph_deduc_include` DISABLE KEYS */;
INSERT INTO `_node_ph_deduc_include` VALUES (1,1,1,1,1),(2,2,1,1,1);
/*!40000 ALTER TABLE `_node_ph_deduc_include` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_region`
--

DROP TABLE IF EXISTS `_node_region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_region` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `region_code` varchar(50) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_region`
--

LOCK TABLES `_node_region` WRITE;
/*!40000 ALTER TABLE `_node_region` DISABLE KEYS */;
INSERT INTO `_node_region` VALUES (1,'NCR','National Capital Region'),(2,'Reg I','Region 1'),(3,'Reg II','Region 2'),(4,'Reg III','Region 3'),(6,'Reg IV','Region 4'),(7,'Reg V','Region 5');
/*!40000 ALTER TABLE `_node_region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_sss_deduc_include`
--

DROP TABLE IF EXISTS `_node_sss_deduc_include`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_sss_deduc_include` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int(12) DEFAULT NULL,
  `cola` int(2) DEFAULT NULL,
  `sea` int(2) DEFAULT NULL,
  `ctpa` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_sss_deduc_include`
--

LOCK TABLES `_node_sss_deduc_include` WRITE;
/*!40000 ALTER TABLE `_node_sss_deduc_include` DISABLE KEYS */;
INSERT INTO `_node_sss_deduc_include` VALUES (1,1,1,1,1),(2,2,2,2,1);
/*!40000 ALTER TABLE `_node_sss_deduc_include` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_sub_menu`
--

DROP TABLE IF EXISTS `_node_sub_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_sub_menu` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `menu_id` int(12) DEFAULT NULL,
  `sub_menu` varchar(100) DEFAULT NULL,
  `link_page` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_sub_menu`
--

LOCK TABLES `_node_sub_menu` WRITE;
/*!40000 ALTER TABLE `_node_sub_menu` DISABLE KEYS */;
INSERT INTO `_node_sub_menu` VALUES (1,2,'User List','/userList'),(2,2,'User Role','/userRole'),(3,3,'Client','/org'),(4,3,'Department','/org_dept'),(5,4,'Job Title','/job_title'),(6,4,'Employment Status','/job_employment_stat'),(7,4,'Pay Grade','/job_pay_grade'),(8,4,'Allowance','/job_allowance'),(9,4,'Work Shift','/job_shift'),(10,7,'Candidate Info','/rec_candidate'),(11,7,'Vacancy','/vacancies'),(12,7,'Job Offer','/job_offer'),(13,7,'Contract','/contract'),(14,7,'Change Status','/change_stat'),(15,7,'Discipline','/discipline'),(16,4,'Regions','/region'),(17,9,'SSS','/new-loan/sss'),(18,9,'PAG-IBIG','/new-loan/pag-ibig'),(19,9,'Salary Loans','/new-loan/salary-loan'),(20,9,'Cash Advance','/new-loan/cash-advance'),(21,9,'Maternity Loan','/new-loan/maternity-loan'),(22,9,'Calamity Loan','/new-loan/calamity-loan'),(23,10,'SSS','/sss'),(24,10,'PagIbig','/pagibig'),(25,10,'TaxTable','/taxtable'),(26,12,'Employee w/ ATM','/atm-list'),(27,12,'Payroll History - Employee','/payroll-history'),(28,12,'Payroll History - Client','/payroll-client-history'),(29,12,'Payroll History Detail','/payroll-history-detail'),(30,12,'Payroll Rate','/payroll-rate'),(31,12,'Payroll Benifits','/payroll-benifits'),(32,12,'13 Months Pay','/thirtheen-month');
/*!40000 ALTER TABLE `_node_sub_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_tax_table`
--

DROP TABLE IF EXISTS `_node_tax_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_tax_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start` decimal(19,2) NOT NULL,
  `end` decimal(19,2) NOT NULL,
  `excess` decimal(19,2) NOT NULL,
  `add_ons` decimal(19,2) NOT NULL,
  `over` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_tax_table`
--

LOCK TABLES `_node_tax_table` WRITE;
/*!40000 ALTER TABLE `_node_tax_table` DISABLE KEYS */;
INSERT INTO `_node_tax_table` VALUES (1,0.00,250000.00,0.00,0.00,0.00),(2,250000.00,400000.00,0.20,0.00,250000.00),(3,400000.00,800000.00,0.25,30000.00,400000.00),(4,800000.00,2000000.00,0.30,130000.00,800000.00),(5,2000000.00,8000000.00,0.32,490000.00,2000000.00);
/*!40000 ALTER TABLE `_node_tax_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_user_information`
--

DROP TABLE IF EXISTS `_node_user_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_user_information` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `emp_id` varchar(50) DEFAULT NULL,
  `vacancy_id` int(12) DEFAULT NULL,
  `candidate_id` int(12) DEFAULT NULL,
  `company_id` int(12) DEFAULT NULL,
  `job_id` int(12) DEFAULT NULL,
  `dept_id` int(12) DEFAULT NULL,
  `region_id` int(12) DEFAULT NULL,
  `pay_grade_id` int(12) DEFAULT NULL,
  `salary_type` varchar(50) DEFAULT NULL,
  `basic_sal` double(10,2) DEFAULT NULL,
  `cstom_sal` double(10,2) DEFAULT NULL,
  `allowance` varchar(50) DEFAULT NULL,
  `work_shift_id` int(12) DEFAULT NULL,
  `contract_start` date DEFAULT NULL,
  `contract_end` date DEFAULT NULL,
  `emp_status` int(12) DEFAULT NULL,
  `date_update` date DEFAULT NULL,
  `prev_update` date DEFAULT NULL,
  `print_contract` int(12) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_user_information`
--

LOCK TABLES `_node_user_information` WRITE;
/*!40000 ALTER TABLE `_node_user_information` DISABLE KEYS */;
INSERT INTO `_node_user_information` VALUES (1,'18-0411182',2,1,1,1,1,1,1,'Basic',1136.36,NULL,NULL,1,'2018-04-11','2018-10-11',3,'2018-04-11',NULL,2),(2,'18-0411181',2,2,1,1,1,1,1,'Basic',521.00,NULL,NULL,1,'2018-04-11','2018-10-11',4,'2018-04-11',NULL,1),(3,'18-0411183',2,3,3,1,1,1,4,'Basic',521.00,NULL,NULL,1,'2018-04-11','2018-10-11',3,'2018-04-11',NULL,6),(4,'18-9315',2,4,3,1,1,1,4,'Basic',521.00,NULL,NULL,1,'2018-04-11','2018-10-11',3,'2018-04-11',NULL,6),(5,'18-0705',6,5,1,6,1,1,1,NULL,502.00,NULL,NULL,6,'2018-08-01','2018-08-31',2,'2018-08-02',NULL,1),(6,'18-0707',6,7,1,6,1,1,1,NULL,502.00,NULL,NULL,6,'2018-08-01','2018-11-21',2,'2018-08-02',NULL,1);
/*!40000 ALTER TABLE `_node_user_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_user_role`
--

DROP TABLE IF EXISTS `_node_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_user_role` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_user_role`
--

LOCK TABLES `_node_user_role` WRITE;
/*!40000 ALTER TABLE `_node_user_role` DISABLE KEYS */;
INSERT INTO `_node_user_role` VALUES (1,'Administrator'),(2,'HR Manager'),(3,'Sr. Programmer'),(4,'IS Manager'),(5,'Network Admin'),(6,'Network Technician'),(7,'Jr Programmer'),(8,'Account Manager');
/*!40000 ALTER TABLE `_node_user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_users`
--

DROP TABLE IF EXISTS `_node_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_users` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `emp_id` varchar(50) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `user_role` int(12) DEFAULT NULL,
  `date_created` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_users`
--

LOCK TABLES `_node_users` WRITE;
/*!40000 ALTER TABLE `_node_users` DISABLE KEYS */;
INSERT INTO `_node_users` VALUES (4,'18-0411183','sample','sample',1,'2018-04-23'),(5,'18-0411181','asdasd','asdasd',2,'2018-04-23');
/*!40000 ALTER TABLE `_node_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_vacancies`
--

DROP TABLE IF EXISTS `_node_vacancies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_vacancies` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` int(12) DEFAULT NULL,
  `job_id` int(12) DEFAULT NULL,
  `region_id` int(12) DEFAULT NULL,
  `total_position` int(12) DEFAULT NULL,
  `dept_id` int(12) DEFAULT NULL,
  `shift_id` int(12) DEFAULT NULL,
  `date_created` varchar(50) DEFAULT NULL,
  `date_update` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_vacancies`
--

LOCK TABLES `_node_vacancies` WRITE;
/*!40000 ALTER TABLE `_node_vacancies` DISABLE KEYS */;
INSERT INTO `_node_vacancies` VALUES (1,1,1,2,21,1,1,'2018-4-13 14:00:43',NULL),(2,1,1,2,23,8,1,'2018-4-15 23:38:16',NULL);
/*!40000 ALTER TABLE `_node_vacancies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_vacancy`
--

DROP TABLE IF EXISTS `_node_vacancy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_vacancy` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `comp_id` int(12) DEFAULT NULL,
  `job_id` int(12) DEFAULT NULL,
  `dept_id` int(12) DEFAULT NULL,
  `total_position` int(12) DEFAULT NULL,
  `region_id` int(12) DEFAULT NULL,
  `range_from` double(10,2) DEFAULT NULL,
  `range_to` double(10,2) DEFAULT NULL,
  `work_shift` int(12) DEFAULT NULL,
  `deploy` int(12) DEFAULT '0',
  `date_created` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_vacancy`
--

LOCK TABLES `_node_vacancy` WRITE;
/*!40000 ALTER TABLE `_node_vacancy` DISABLE KEYS */;
INSERT INTO `_node_vacancy` VALUES (1,1,1,8,2328,1,3333.00,333333.00,6,0,'2018-01-23'),(2,2,2,9,2328,1,3333.00,333333.00,6,0,'2018-11-23'),(3,3,3,10,2328,1,3333.00,333333.00,6,0,'2018-10-23'),(4,1,2,11,2328,1,3333.00,333333.00,6,2,'2018-09-23'),(5,2,3,8,2328,1,3333.00,333333.00,6,4,'2018-08-23'),(6,1,6,9,2326,1,3333.00,333333.00,6,5,'2018-07-23'),(7,1,3,10,2328,1,3333.00,333333.00,6,4,'2018-06-23'),(8,2,4,11,2328,1,3333.00,333333.00,6,8,'2018-05-23'),(9,3,9,8,2328,1,3333.00,333333.00,6,5,'2018-04-23'),(10,1,10,8,2328,1,3333.00,333333.00,6,2,'2018-03-23'),(11,2,11,10,2328,1,3333.00,333333.00,6,7,'2018-02-23'),(12,3,12,12,2328,1,3333.00,333333.00,6,10,'2018-12-23'),(13,1,13,12,2328,1,3333.00,333333.00,6,23,'2018-12-23'),(14,1,2,1,11,1,11111.00,22222.00,1,41,'2018-06-09'),(15,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10,NULL);
/*!40000 ALTER TABLE `_node_vacancy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_node_wage_settings`
--

DROP TABLE IF EXISTS `_node_wage_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node_wage_settings` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int(12) DEFAULT NULL,
  `job_id` int(12) DEFAULT NULL,
  `dept_id` int(12) DEFAULT NULL,
  `cola` double(10,2) DEFAULT NULL,
  `sea` double(10,2) DEFAULT NULL,
  `ctpa` double(10,2) DEFAULT NULL,
  `rate` double(10,2) DEFAULT NULL,
  `ot` double(10,2) DEFAULT NULL,
  `nd` double(10,2) DEFAULT NULL,
  `ot_nd` double(10,2) DEFAULT NULL,
  `lh_rate` double(10,2) DEFAULT NULL,
  `lh_ot` double(10,2) DEFAULT NULL,
  `lh_nd` double(10,2) DEFAULT NULL,
  `lh_ot_nd` double(10,2) DEFAULT NULL,
  `sh_rate` double(10,2) DEFAULT NULL,
  `sh_ot` double(10,2) DEFAULT NULL,
  `sh_nd` double(10,2) DEFAULT NULL,
  `sh_ot_nd` double(10,2) DEFAULT NULL,
  `sh_rdot` double(10,2) DEFAULT NULL,
  `lh_rdot` double(10,2) DEFAULT NULL,
  `day_off` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_node_wage_settings`
--

LOCK TABLES `_node_wage_settings` WRITE;
/*!40000 ALTER TABLE `_node_wage_settings` DISABLE KEYS */;
INSERT INTO `_node_wage_settings` VALUES (1,1,1,1,2.00,2.00,2.00,521.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00,2.00),(2,3,2,1,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00);
/*!40000 ALTER TABLE `_node_wage_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deduction_details`
--

DROP TABLE IF EXISTS `deduction_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deduction_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `s_from` decimal(19,2) DEFAULT NULL,
  `s_to` decimal(19,2) DEFAULT NULL,
  `value` decimal(19,2) NOT NULL,
  `deduction_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deduction_details`
--

LOCK TABLES `deduction_details` WRITE;
/*!40000 ALTER TABLE `deduction_details` DISABLE KEYS */;
INSERT INTO `deduction_details` VALUES (1,10000.00,15000.00,200.00,1),(2,15001.00,20000.00,300.00,1),(3,20001.00,25000.00,400.00,1),(4,25001.00,30000.00,400.00,1),(5,10000.00,15000.00,100.00,2),(6,15001.00,20000.00,200.00,2),(7,20001.00,25000.00,200.00,2),(8,25001.00,30000.00,200.00,2),(9,10000.00,15000.00,100.00,3),(10,15001.00,20000.00,200.00,3),(11,20001.00,25000.00,300.00,3),(12,25001.00,30000.00,400.00,3),(13,10000.00,25000.00,0.00,4),(14,25001.00,30000.00,10.00,4),(15,30001.00,35000.00,15.00,4),(16,35001.00,40000.00,20.00,4);
/*!40000 ALTER TABLE `deduction_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deductions`
--

DROP TABLE IF EXISTS `deductions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deductions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deductions`
--

LOCK TABLES `deductions` WRITE;
/*!40000 ALTER TABLE `deductions` DISABLE KEYS */;
INSERT INTO `deductions` VALUES (1,'PHILHEALTH',1),(2,'SSS',1),(3,'PAG-IBIG',1),(4,'TAX',2);
/*!40000 ALTER TABLE `deductions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-25  3:35:02
