-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.5.8 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for care_point
CREATE DATABASE IF NOT EXISTS `care_point` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `care_point`;

-- Dumping structure for table care_point.customer_receive_item
CREATE TABLE IF NOT EXISTS `customer_receive_item` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `qty` int(10) NOT NULL,
  `job_card` int(10) NOT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_t_customer_item_t_job_card1_idx` (`job_card`),
  CONSTRAINT `fk_t_customer_item_t_job_card1` FOREIGN KEY (`job_card`) REFERENCES `t_job_card` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.customer_receive_item: ~2 rows (approximately)
/*!40000 ALTER TABLE `customer_receive_item` DISABLE KEYS */;
INSERT INTO `customer_receive_item` (`index_no`, `name`, `qty`, `job_card`) VALUES
	(1, 'jsbgfghfhre', 3, 2),
	(2, 'test 01', 1, 4);
/*!40000 ALTER TABLE `customer_receive_item` ENABLE KEYS */;

-- Dumping structure for table care_point.employee_assingment
CREATE TABLE IF NOT EXISTS `employee_assingment` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `employee` int(10) NOT NULL,
  `bay` int(10) NOT NULL,
  `in_time` datetime NOT NULL,
  `out_time` datetime DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_employee_assingment_m_employee1_idx` (`employee`),
  KEY `fk_employee_assingment_m_bay1_idx` (`bay`),
  CONSTRAINT `fk_employee_assingment_m_bay1` FOREIGN KEY (`bay`) REFERENCES `m_bay` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_assingment_m_employee1` FOREIGN KEY (`employee`) REFERENCES `m_employee` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.employee_assingment: ~0 rows (approximately)
/*!40000 ALTER TABLE `employee_assingment` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_assingment` ENABLE KEYS */;

-- Dumping structure for table care_point.m_bank
CREATE TABLE IF NOT EXISTS `m_bank` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `code` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`index_no`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.m_bank: ~2 rows (approximately)
/*!40000 ALTER TABLE `m_bank` DISABLE KEYS */;
INSERT INTO `m_bank` (`index_no`, `name`, `code`) VALUES
	(4, 'HSBC', NULL),
	(6, 'HNB', NULL);
/*!40000 ALTER TABLE `m_bank` ENABLE KEYS */;

-- Dumping structure for table care_point.m_bank_branch
CREATE TABLE IF NOT EXISTS `m_bank_branch` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `code` varchar(25) DEFAULT NULL,
  `bank` int(10) NOT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_m_bank_branch_m_bank1_idx` (`bank`),
  CONSTRAINT `fk_m_bank_branch_m_bank1` FOREIGN KEY (`bank`) REFERENCES `m_bank` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.m_bank_branch: ~4 rows (approximately)
/*!40000 ALTER TABLE `m_bank_branch` DISABLE KEYS */;
INSERT INTO `m_bank_branch` (`index_no`, `name`, `code`, `bank`) VALUES
	(1, 'Panadura', NULL, 6),
	(2, 'Galle', NULL, 6),
	(3, 'Galle', NULL, 4),
	(4, 'Panadura', NULL, 4);
/*!40000 ALTER TABLE `m_bank_branch` ENABLE KEYS */;

-- Dumping structure for table care_point.m_bay
CREATE TABLE IF NOT EXISTS `m_bay` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `max_vehicle` int(10) NOT NULL,
  `max_employee` int(10) NOT NULL,
  `x` int(10) NOT NULL,
  `y` int(10) NOT NULL,
  `w` int(10) NOT NULL,
  `h` int(10) NOT NULL,
  `type` varchar(25) DEFAULT NULL,
  `assign_employee` tinyint(1) NOT NULL,
  `assign_vehicle` tinyint(1) NOT NULL,
  `color` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`index_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.m_bay: ~0 rows (approximately)
/*!40000 ALTER TABLE `m_bay` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_bay` ENABLE KEYS */;

-- Dumping structure for table care_point.m_branch
CREATE TABLE IF NOT EXISTS `m_branch` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `branch_code` varchar(45) NOT NULL,
  `reg_number` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `address_line1` varchar(45) DEFAULT NULL,
  `address_line2` varchar(45) DEFAULT NULL,
  `address_line3` varchar(45) DEFAULT NULL,
  `telephone_number` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`index_no`,`branch_code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.m_branch: ~2 rows (approximately)
/*!40000 ALTER TABLE `m_branch` DISABLE KEYS */;
INSERT INTO `m_branch` (`index_no`, `branch_code`, `reg_number`, `name`, `address_line1`, `address_line2`, `address_line3`, `telephone_number`) VALUES
	(1, '111', 'e-83737', 'kellapatha', NULL, NULL, NULL, NULL),
	(2, '222', 'e-83737', 'nittambuwa', NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `m_branch` ENABLE KEYS */;

-- Dumping structure for table care_point.m_brand
CREATE TABLE IF NOT EXISTS `m_brand` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  PRIMARY KEY (`index_no`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.m_brand: ~1 rows (approximately)
/*!40000 ALTER TABLE `m_brand` DISABLE KEYS */;
INSERT INTO `m_brand` (`index_no`, `name`) VALUES
	(1, 'brand x');
/*!40000 ALTER TABLE `m_brand` ENABLE KEYS */;

-- Dumping structure for table care_point.m_card_type
CREATE TABLE IF NOT EXISTS `m_card_type` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`index_no`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.m_card_type: ~3 rows (approximately)
/*!40000 ALTER TABLE `m_card_type` DISABLE KEYS */;
INSERT INTO `m_card_type` (`index_no`, `name`) VALUES
	(1, 'VISA'),
	(2, 'MASTER'),
	(5, 'American Express');
/*!40000 ALTER TABLE `m_card_type` ENABLE KEYS */;

-- Dumping structure for table care_point.m_category
CREATE TABLE IF NOT EXISTS `m_category` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `colour` varchar(25) NOT NULL,
  `view_approve` tinyint(1) NOT NULL,
  `image` varchar(100) NOT NULL,
  `static_feild` tinyint(1) DEFAULT NULL,
  `static_feild_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`index_no`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.m_category: ~9 rows (approximately)
/*!40000 ALTER TABLE `m_category` DISABLE KEYS */;
INSERT INTO `m_category` (`index_no`, `name`, `colour`, `view_approve`, `image`, `static_feild`, `static_feild_name`) VALUES
	(1, 'DETAILING', '#66BB6A', 1, '01.png', 0, NULL),
	(2, 'GENERAL MIANTENANCE', '#A1887F', 1, '02.png', 0, NULL),
	(3, 'LUBRIACTION SERVICES', '#4FC3F7', 1, '01.png', 0, NULL),
	(4, 'QUICK DETAILING', '#90A4AE', 1, '01.png', 0, NULL),
	(5, 'TECHNICAL SERVICES', '#ef5350', 1, '01.png', 0, NULL),
	(6, 'VALUE ADDED SERVICES', '#26A69A', 1, '01.png', 0, NULL),
	(7, 'WHEEL ALLINGMENT SERVICES', '#EC407A', 1, '01.png', 0, NULL),
	(8, 'STOCK ITEMS', '#FB8C00', 1, '01.png', 1, 'STOCK'),
	(9, 'PACKAGE', '#3F51B5', 1, '01.png', 1, 'PACKAGE');
/*!40000 ALTER TABLE `m_category` ENABLE KEYS */;

-- Dumping structure for table care_point.m_client
CREATE TABLE IF NOT EXISTS `m_client` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `address_line1` varchar(100) DEFAULT NULL,
  `address_line2` varchar(50) DEFAULT NULL,
  `address_line3` varchar(50) DEFAULT NULL,
  `mobile` varchar(25) DEFAULT NULL,
  `nic` varchar(25) DEFAULT NULL,
  `branch` int(10) NOT NULL,
  PRIMARY KEY (`index_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.m_client: ~2 rows (approximately)
/*!40000 ALTER TABLE `m_client` DISABLE KEYS */;
INSERT INTO `m_client` (`index_no`, `name`, `address_line1`, `address_line2`, `address_line3`, `mobile`, `nic`, `branch`) VALUES
	(1, 'Kavish Manjitha Perera', NULL, NULL, NULL, '0714303339', NULL, 1),
	(2, 'thilina kalum', NULL, NULL, NULL, '0745555668', NULL, 1);
/*!40000 ALTER TABLE `m_client` ENABLE KEYS */;

-- Dumping structure for table care_point.m_employee
CREATE TABLE IF NOT EXISTS `m_employee` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `address_line1` varchar(100) DEFAULT NULL,
  `address_line2` varchar(50) DEFAULT NULL,
  `address_line3` varchar(50) DEFAULT NULL,
  `mobile` varchar(25) DEFAULT NULL,
  `branch` int(10) NOT NULL,
  `type` varchar(25) NOT NULL,
  `rol` varchar(25) NOT NULL,
  `image` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`index_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.m_employee: ~0 rows (approximately)
/*!40000 ALTER TABLE `m_employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_employee` ENABLE KEYS */;

-- Dumping structure for table care_point.m_item
CREATE TABLE IF NOT EXISTS `m_item` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `barcode` varchar(25) DEFAULT NULL,
  `print_description` varchar(50) DEFAULT NULL,
  `unit` varchar(25) DEFAULT NULL,
  `supplier` int(10) DEFAULT NULL,
  `department` int(10) NOT NULL,
  `brand` int(10) NOT NULL,
  `category` int(10) NOT NULL,
  `sub_category` int(10) NOT NULL,
  `price_category` int(10) DEFAULT NULL,
  `sale_price_normal` decimal(10,4) NOT NULL,
  `sale_price_register` decimal(10,4) NOT NULL,
  `cost_price` decimal(10,4) NOT NULL,
  `type` varchar(25) NOT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_m_item_m_item_department1_idx` (`department`),
  KEY `fk_m_item_m_category1_idx` (`category`),
  KEY `fk_m_item_m_brand1_idx` (`brand`),
  KEY `fk_m_item_m_sub_category1_idx` (`sub_category`),
  KEY `fk_m_item_m_price_category1_idx` (`price_category`),
  KEY `fk_m_item_m_supplier1_idx` (`supplier`),
  CONSTRAINT `fk_m_item_m_brand1` FOREIGN KEY (`brand`) REFERENCES `m_brand` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_m_item_m_category1` FOREIGN KEY (`category`) REFERENCES `m_category` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_m_item_m_item_department1` FOREIGN KEY (`department`) REFERENCES `m_item_department` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_m_item_m_price_category1` FOREIGN KEY (`price_category`) REFERENCES `m_price_category` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_m_item_m_sub_category1` FOREIGN KEY (`sub_category`) REFERENCES `m_sub_category` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_m_item_m_supplier1` FOREIGN KEY (`supplier`) REFERENCES `m_supplier` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.m_item: ~67 rows (approximately)
/*!40000 ALTER TABLE `m_item` DISABLE KEYS */;
INSERT INTO `m_item` (`index_no`, `name`, `barcode`, `print_description`, `unit`, `supplier`, `department`, `brand`, `category`, `sub_category`, `price_category`, `sale_price_normal`, `sale_price_register`, `cost_price`, `type`) VALUES
	(1, 'ACID RAIN REMOVING', 'none', 'none', '1', 1, 1, 1, 1, 1, 1, 1500.0000, 1000.0000, 1000.0000, 'SERVICE'),
	(2, 'BONET POLISHING', 'none', 'none', '1', NULL, 1, 1, 1, 1, 1, 1500.0000, 1000.0000, 1000.0000, 'SERVICE'),
	(4, 'ENGINE GLASING', 'none', 'none', '1', NULL, 1, 1, 1, 1, 1, 1500.0000, 1000.0000, 1000.0000, 'SERVICE'),
	(5, 'EXPRESS DETAILING - ED', 'none', 'none', '1', NULL, 1, 1, 1, 1, 1, 1500.0000, 1000.0000, 1000.0000, 'SERVICE'),
	(6, 'EXTERIOR', 'none', 'none', '1', NULL, 1, 1, 1, 1, 1, 1500.0000, 1000.0000, 1000.0000, 'SERVICE'),
	(7, 'FULL DETAILING', 'none', 'none', '1', NULL, 1, 1, 1, 1, 1, 1500.0000, 1000.0000, 1000.0000, 'SERVICE'),
	(8, 'FULL DETAILING & LETHER TRAETMENT', 'none', 'none', '1', NULL, 1, 1, 1, 1, 1, 1500.0000, 1000.0000, 1000.0000, 'SERVICE'),
	(9, 'GENERAL CLEAN UP', 'none', 'none', '1', NULL, 1, 1, 1, 1, 1, 1500.0000, 1000.0000, 1000.0000, 'SERVICE'),
	(10, 'HEAD LAMP POLISH', 'none', 'none', '1', NULL, 1, 1, 1, 1, 1, 1500.0000, 1000.0000, 1000.0000, 'SERVICE'),
	(11, 'HOOD CLEANING', 'none', 'none', '1', NULL, 1, 1, 1, 1, 1, 1500.0000, 1000.0000, 1000.0000, 'SERVICE'),
	(12, 'INTERIOR', 'none', 'none', '1', NULL, 1, 1, 1, 1, 1, 1500.0000, 1000.0000, 1000.0000, 'SERVICE'),
	(13, 'LEATHER TRAETMENT', 'none', 'none', '1', NULL, 1, 1, 1, 1, 1, 1500.0000, 1000.0000, 1000.0000, 'SERVICE'),
	(14, 'SEAT CLEANING (Per 1 Seat)', 'none', 'none', '1', NULL, 1, 1, 1, 1, 1, 1500.0000, 1000.0000, 1000.0000, 'SERVICE'),
	(15, 'WINDSCREEN POLISH ACID RAIN', 'none', 'none', '1', NULL, 1, 1, 1, 1, 1, 1500.0000, 1000.0000, 1000.0000, 'SERVICE'),
	(16, 'WINDSCREEN POLISH-NORMAL', 'none', 'none', '1', NULL, 1, 1, 1, 1, 1, 1500.0000, 1000.0000, 1000.0000, 'SERVICE'),
	(17, 'ENGINE WASH', 'none', 'none', '1', NULL, 1, 1, 2, 1, 1, 2500.0000, 2000.0000, 2000.0000, 'SERVICE'),
	(18, 'QUICK WASH', 'none', 'none', '1', NULL, 1, 1, 2, 1, 1, 2500.0000, 2000.0000, 2000.0000, 'SERVICE'),
	(19, 'UNDER WASH', 'none', 'none', '1', NULL, 1, 1, 2, 1, 1, 2500.0000, 2000.0000, 2000.0000, 'SERVICE'),
	(20, 'UNDERCOATING-Rust Stop', 'none', 'none', '1', NULL, 1, 1, 2, 1, 1, 2500.0000, 2000.0000, 2000.0000, 'SERVICE'),
	(21, 'VACUUM ONLY', 'none', 'none', '1', NULL, 1, 1, 2, 1, 1, 2500.0000, 2000.0000, 2000.0000, 'SERVICE'),
	(22, 'WASH & VACUM', 'none', 'none', '1', NULL, 1, 1, 2, 1, 1, 2500.0000, 2000.0000, 2000.0000, 'SERVICE'),
	(23, 'GREASED NIPPLE (per unit)', 'none', 'none', '1', NULL, 1, 1, 3, 1, 1, 3500.0000, 3000.0000, 3000.0000, 'SERVICE'),
	(24, 'LEATH LABOUR CHARGES', 'none', 'none', '1', NULL, 1, 1, 3, 1, 1, 3500.0000, 3000.0000, 3000.0000, 'SERVICE'),
	(25, 'THROTTLE PLATE CLEAN LABOUR CHARGES', 'none', 'none', '1', NULL, 1, 1, 3, 1, 1, 3500.0000, 3000.0000, 3000.0000, 'SERVICE'),
	(26, 'LABOUR CHARGE FOR OTHER WORK', 'none', 'none', '1', NULL, 1, 1, 3, 1, 1, 3500.0000, 3000.0000, 3000.0000, 'SERVICE'),
	(27, 'WASH & WAX', 'none', 'none', '1', NULL, 1, 1, 4, 1, 1, 4500.0000, 4000.0000, 4000.0000, 'SERVICE'),
	(28, 'MACHINE WAXING CHARGES', 'none', 'none', '1', NULL, 1, 1, 4, 1, 1, 4500.0000, 4000.0000, 4000.0000, 'SERVICE'),
	(29, 'PAINT PROTECTION BODY WAX', 'none', 'none', '1', NULL, 1, 1, 4, 1, 1, 4500.0000, 4000.0000, 4000.0000, 'SERVICE'),
	(30, 'PAINT PROTECTION BODY WAX WITH WASH', 'none', 'none', '1', NULL, 1, 1, 4, 1, 1, 4500.0000, 4000.0000, 4000.0000, 'SERVICE'),
	(31, 'PAINT PROTECTION BODY WAXING & QUICK DETAILING', 'none', 'none', '1', NULL, 1, 1, 4, 1, 1, 4500.0000, 4000.0000, 4000.0000, 'SERVICE'),
	(32, 'ANALYZING REPORT', 'none', 'none', '1', NULL, 1, 1, 5, 1, 1, 5500.0000, 5000.0000, 5000.0000, 'SERVICE'),
	(33, 'AUTO TRANSMISSION FLUID CHANGE', 'none', 'none', '1', NULL, 1, 1, 5, 1, 1, 5500.0000, 5000.0000, 5000.0000, 'SERVICE'),
	(34, 'BREAK CLEANER ( Brake Pad & linners )', 'none', 'none', '1', NULL, 1, 1, 5, 1, 1, 5500.0000, 5000.0000, 5000.0000, 'SERVICE'),
	(35, 'BATTERY TERMINAL PROTECTION', 'none', 'none', '1', NULL, 1, 1, 6, 1, 1, 5500.0000, 5000.0000, 5000.0000, 'SERVICE'),
	(36, 'V BELT PROTECTION CHARGES', 'none', 'none', '1', NULL, 1, 1, 6, 1, 1, 5500.0000, 5000.0000, 5000.0000, 'SERVICE'),
	(37, 'NITROGEN AIR', 'none', 'none', '1', NULL, 1, 1, 6, 1, 1, 5500.0000, 5000.0000, 5000.0000, 'SERVICE'),
	(38, 'PAINT SEALENT', 'none', 'none', '1', NULL, 1, 1, 6, 1, 1, 5500.0000, 5000.0000, 5000.0000, 'SERVICE'),
	(39, 'PLASTIC & RUBBER CONDITIONING', 'none', 'none', '1', NULL, 1, 1, 6, 1, 1, 5500.0000, 5000.0000, 5000.0000, 'SERVICE'),
	(40, 'POLISHING SPECIAL WORK', 'none', 'none', '1', NULL, 1, 1, 6, 1, 1, 5500.0000, 5000.0000, 5000.0000, 'SERVICE'),
	(41, 'RAIN X WINDSCREEN TREATMENT', 'none', 'none', '1', NULL, 1, 1, 6, 1, 1, 5500.0000, 5000.0000, 5000.0000, 'SERVICE'),
	(42, 'SAND PAPER CUTTING CHARGES', 'none', 'none', '1', NULL, 1, 1, 6, 1, 1, 5500.0000, 5000.0000, 5000.0000, 'SERVICE'),
	(43, 'TAR & OCZIDR R.CHARGES', 'none', 'none', '1', NULL, 1, 1, 6, 1, 1, 5500.0000, 5000.0000, 5000.0000, 'SERVICE'),
	(44, 'ALLOYWHEEL CLEANING - 2 WHEELS', 'none', 'none', '1', NULL, 1, 1, 6, 1, 1, 5500.0000, 5000.0000, 5000.0000, 'SERVICE'),
	(45, 'ALLOYWHEEL CLEANING - 4 WHEELS', 'none', 'none', '1', NULL, 1, 1, 6, 1, 1, 5500.0000, 5000.0000, 5000.0000, 'SERVICE'),
	(46, 'FULLY FUEL INJECTOR CLEANER SYSTEMS CHARGES', 'none', 'none', '1', NULL, 1, 1, 6, 1, 1, 5500.0000, 5000.0000, 5000.0000, 'SERVICE'),
	(47, 'FULLY FUEL INJECTOR CLEANER SYSTEMS CHARGES (Hybri', 'none', 'none', '1', NULL, 1, 1, 6, 1, 1, 5500.0000, 5000.0000, 5000.0000, 'SERVICE'),
	(48, 'RUBBER BEADING CONDITIONER CHARGES', 'none', 'none', '1', NULL, 1, 1, 6, 1, 1, 5500.0000, 5000.0000, 5000.0000, 'SERVICE'),
	(49, 'OVER SPRAY & OCZID SURFACE CHARGES', 'none', 'none', '1', NULL, 1, 1, 6, 1, 1, 5500.0000, 5000.0000, 5000.0000, 'SERVICE'),
	(50, 'WHEEL BALANCING', 'none', 'none', '1', NULL, 1, 1, 7, 1, 1, 6000.0000, 5500.0000, 5000.0000, 'SERVICE'),
	(51, 'STICKER WEIGHT REPLACE - 1g', 'none', 'none', '1', NULL, 1, 1, 7, 1, 1, 6000.0000, 5500.0000, 5000.0000, 'SERVICE'),
	(52, 'WHEEL ALLINGMENT - FRONT & REAR', 'none', 'none', '1', NULL, 1, 1, 7, 1, 1, 6000.0000, 5500.0000, 5000.0000, 'SERVICE'),
	(53, 'CLIP WEIGHT REPLACE - 1g', 'none', 'none', '1', NULL, 1, 1, 7, 1, 1, 6000.0000, 5500.0000, 5000.0000, 'SERVICE'),
	(54, 'TUBLESS PACTH', 'none', 'none', '1', NULL, 1, 1, 7, 1, 1, 6000.0000, 5500.0000, 5000.0000, 'SERVICE'),
	(55, 'TUBLESS VALVE REPLACING', 'none', 'none', '1', NULL, 1, 1, 7, 1, 1, 6000.0000, 5500.0000, 5000.0000, 'SERVICE'),
	(56, 'VIC 110 OIL FILTERE', '56', 'none', 'none', 1, 1, 1, 8, 1, 1, 5000.0000, 4000.0000, 3800.0000, 'STOCK'),
	(57, 'OIL 10L', '57', 'NONE', '10L', 1, 1, 1, 8, 1, 1, 5000.0000, 2000.0000, 1500.0000, 'STOCK'),
	(58, 'FULE FILTER', '58', 'none', 'none', 1, 1, 1, 8, 1, 2, 6000.0000, 5000.0000, 4000.0000, 'STOCK'),
	(59, 'A/C FILTER', 'NONE', 'NONE', 'NONE', NULL, 1, 1, 8, 1, 2, 8000.0000, 7000.0000, 6000.0000, 'STOCK'),
	(60, 'AIR FILTER', 'NONE', 'NONE', 'NONE', NULL, 1, 1, 8, 1, 2, 10000.0000, 8000.0000, 7000.0000, 'STOCK'),
	(61, 'SAKURA OIL FILTER', 'NONE', 'NONE', 'NONE', NULL, 1, 1, 8, 1, 2, 5000.0000, 4000.0000, 3000.0000, 'STOCK'),
	(62, 'N T B PROMOTION - FULL DETAILING 20%', 'N T B PROMOTION', 'N T B PROMOTION', 'NONE', NULL, 1, 1, 9, 1, 1, 12000.0000, 10000.0000, 9500.0000, 'PACKAGE'),
	(63, 'N T B PROMOTION - QUICK DETAILING 15%', 'QUICK DETAILING 15%', 'NONE', 'NONE', NULL, 1, 1, 9, 1, 1, 8000.0000, 7000.0000, 7000.0000, 'PACKAGE'),
	(64, '31423', 'nonr', 'nonr', 'none', NULL, 1, 1, 1, 1, 1, 1000.0000, 1000.0000, 2000.0000, 'STOCK'),
	(65, '345423534', 'none', 'none', 'none', NULL, 1, 1, 1, 1, 1, 1000.0000, 1000.0000, 1000.0000, 'STOCK'),
	(66, '3452345', 'none', 'none', 'none', NULL, 1, 1, 1, 1, 1, 1000.0000, 15000.0000, 1000.0000, 'STOCK'),
	(67, '3452345', 'none', 'none', 'none', NULL, 1, 1, 1, 1, 1, 1000.0000, 15000.0000, 1000.0000, 'STOCK'),
	(68, 'asdASD', 'SDAsd', 'asda', 'sdasd', NULL, 1, 1, 1, 1, NULL, 1000.0000, 1000.0000, 10000.0000, 'NON-STOCK');
/*!40000 ALTER TABLE `m_item` ENABLE KEYS */;

-- Dumping structure for table care_point.m_item_department
CREATE TABLE IF NOT EXISTS `m_item_department` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`index_no`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.m_item_department: ~1 rows (approximately)
/*!40000 ALTER TABLE `m_item_department` DISABLE KEYS */;
INSERT INTO `m_item_department` (`index_no`, `name`) VALUES
	(1, 'item department');
/*!40000 ALTER TABLE `m_item_department` ENABLE KEYS */;

-- Dumping structure for table care_point.m_item_units
CREATE TABLE IF NOT EXISTS `m_item_units` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `item` int(10) NOT NULL,
  `name` varchar(25) NOT NULL,
  `qty` decimal(10,4) NOT NULL,
  `sale_price_normal` decimal(10,4) NOT NULL,
  `sale_price_register` decimal(10,4) NOT NULL,
  `cost_price` decimal(10,4) NOT NULL,
  `item_unit_type` varchar(25) NOT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_m_item_units_m_item1_idx` (`item`),
  CONSTRAINT `fk_m_item_units_m_item1` FOREIGN KEY (`item`) REFERENCES `m_item` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=big5;

-- Dumping data for table care_point.m_item_units: ~12 rows (approximately)
/*!40000 ALTER TABLE `m_item_units` DISABLE KEYS */;
INSERT INTO `m_item_units` (`index_no`, `item`, `name`, `qty`, `sale_price_normal`, `sale_price_register`, `cost_price`, `item_unit_type`) VALUES
	(2, 56, 'OIT', 1.0000, 1000.0000, 1000.0000, 1000.0000, 'NORMAL'),
	(3, 56, 'VIC 110 OIL FILTERE', 1.0000, 5000.0000, 4000.0000, 3800.0000, 'MAIN'),
	(4, 57, 'OIL 10L', 1.0000, 5000.0000, 2000.0000, 1500.0000, 'MAIN'),
	(5, 58, 'FULE FILTER', 1.0000, 6000.0000, 5000.0000, 4000.0000, 'MAIN'),
	(6, 59, 'A/C FILTER', 1.0000, 8000.0000, 7000.0000, 6000.0000, 'MAIN'),
	(7, 60, 'AIR FILTER', 1.0000, 10000.0000, 8000.0000, 7000.0000, 'MAIN'),
	(8, 61, 'SAKURA OIL FILTER', 1.0000, 5000.0000, 4000.0000, 3000.0000, 'MAIN'),
	(9, 64, '31423', 1.0000, 1000.0000, 1000.0000, 2000.0000, 'MAIN'),
	(10, 65, '345423534', 1.0000, 1000.0000, 1000.0000, 1000.0000, 'MAIN'),
	(11, 66, '3452345', 1.0000, 1000.0000, 15000.0000, 1000.0000, 'MAIN'),
	(12, 67, '3452345', 1.0000, 1000.0000, 15000.0000, 1000.0000, 'MAIN'),
	(13, 57, 'OIL 5L', 0.5000, 1000.0000, 1000.0000, 1000.0000, 'NORMAL');
/*!40000 ALTER TABLE `m_item_units` ENABLE KEYS */;

-- Dumping structure for table care_point.m_price_category
CREATE TABLE IF NOT EXISTS `m_price_category` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`index_no`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.m_price_category: ~3 rows (approximately)
/*!40000 ALTER TABLE `m_price_category` DISABLE KEYS */;
INSERT INTO `m_price_category` (`index_no`, `name`) VALUES
	(1, 'SUV'),
	(2, 'CAR'),
	(3, 'VAN');
/*!40000 ALTER TABLE `m_price_category` ENABLE KEYS */;

-- Dumping structure for table care_point.m_store
CREATE TABLE IF NOT EXISTS `m_store` (
  `index_no` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `number` int(10) NOT NULL,
  `type` varchar(25) NOT NULL,
  `branch` int(10) NOT NULL,
  PRIMARY KEY (`index_no`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.m_store: ~5 rows (approximately)
/*!40000 ALTER TABLE `m_store` DISABLE KEYS */;
INSERT INTO `m_store` (`index_no`, `name`, `number`, `type`, `branch`) VALUES
	(1, 'store 01', 123, 'MAIN', 1),
	(2, 'store 02', 123, 'MAIN', 1),
	(3, 'store 03', 123, 'MAIN', 1),
	(4, 'MAIN_STOCK', 124, 'MAIN_STOCK', 1),
	(5, 'Main Stock', 7, 'MAIN_STOCK', 2);
/*!40000 ALTER TABLE `m_store` ENABLE KEYS */;

-- Dumping structure for table care_point.m_sub_category
CREATE TABLE IF NOT EXISTS `m_sub_category` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`index_no`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.m_sub_category: ~1 rows (approximately)
/*!40000 ALTER TABLE `m_sub_category` DISABLE KEYS */;
INSERT INTO `m_sub_category` (`index_no`, `name`) VALUES
	(1, 'sub category');
/*!40000 ALTER TABLE `m_sub_category` ENABLE KEYS */;

-- Dumping structure for table care_point.m_sub_item
CREATE TABLE IF NOT EXISTS `m_sub_item` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `branch` int(10) NOT NULL,
  `sub_name` varchar(25) NOT NULL,
  `short_order` int(10) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `item` int(10) NOT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_m_sub_item_m_item1_idx` (`item`),
  CONSTRAINT `fk_m_sub_item_m_item1` FOREIGN KEY (`item`) REFERENCES `m_item` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.m_sub_item: ~0 rows (approximately)
/*!40000 ALTER TABLE `m_sub_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_sub_item` ENABLE KEYS */;

-- Dumping structure for table care_point.m_supplier
CREATE TABLE IF NOT EXISTS `m_supplier` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `contact_name` varchar(50) DEFAULT NULL,
  `contact_no` varchar(25) DEFAULT NULL,
  `address_line_1` varchar(25) DEFAULT NULL,
  `address_line_2` varchar(25) DEFAULT NULL,
  `address_line_3` varchar(25) DEFAULT NULL,
  `credit_period` int(10) DEFAULT NULL,
  PRIMARY KEY (`index_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.m_supplier: ~2 rows (approximately)
/*!40000 ALTER TABLE `m_supplier` DISABLE KEYS */;
INSERT INTO `m_supplier` (`index_no`, `name`, `contact_name`, `contact_no`, `address_line_1`, `address_line_2`, `address_line_3`, `credit_period`) VALUES
	(1, 'kasun', '.com', '0711727579', NULL, NULL, NULL, NULL),
	(2, 'nidura', '.com', '0711727579', NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `m_supplier` ENABLE KEYS */;

-- Dumping structure for table care_point.m_vehicle
CREATE TABLE IF NOT EXISTS `m_vehicle` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `client` int(10) NOT NULL,
  `vehicle_no` varchar(25) DEFAULT NULL,
  `vehicle_type` int(10) DEFAULT NULL,
  `year` int(10) DEFAULT NULL,
  `engine_no` varchar(50) DEFAULT NULL,
  `chasis_no` varchar(50) DEFAULT NULL,
  `insurance_expiry_date` date DEFAULT NULL,
  `revenue_expiry_date` date DEFAULT NULL,
  `last_milage` int(10) NOT NULL,
  `next_milage` int(10) DEFAULT NULL,
  `colour` varchar(25) DEFAULT NULL,
  `price_category` int(10) NOT NULL,
  `type` varchar(25) NOT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_m_vehicle_m_client_idx` (`client`),
  KEY `fk_m_vehicle_m_vehicle_type1_idx` (`vehicle_type`),
  KEY `fk_m_vehicle_m_price_category1_idx` (`price_category`),
  CONSTRAINT `fk_m_vehicle_m_client` FOREIGN KEY (`client`) REFERENCES `m_client` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_m_vehicle_m_price_category1` FOREIGN KEY (`price_category`) REFERENCES `m_price_category` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_m_vehicle_m_vehicle_type1` FOREIGN KEY (`vehicle_type`) REFERENCES `m_vehicle_type` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.m_vehicle: ~2 rows (approximately)
/*!40000 ALTER TABLE `m_vehicle` DISABLE KEYS */;
INSERT INTO `m_vehicle` (`index_no`, `client`, `vehicle_no`, `vehicle_type`, `year`, `engine_no`, `chasis_no`, `insurance_expiry_date`, `revenue_expiry_date`, `last_milage`, `next_milage`, `colour`, `price_category`, `type`) VALUES
	(1, 1, 'KR 8755', 3, NULL, NULL, '123456', NULL, NULL, 1000, NULL, NULL, 1, 'NORMAL'),
	(2, 2, 'CR 5588', 3, NULL, NULL, '6444', NULL, NULL, 2000, NULL, NULL, 1, 'NORMAL');
/*!40000 ALTER TABLE `m_vehicle` ENABLE KEYS */;

-- Dumping structure for table care_point.m_vehicle_image
CREATE TABLE IF NOT EXISTS `m_vehicle_image` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `job_card` int(10) NOT NULL,
  `path` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `type` varchar(25) NOT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_m_vehicle_image_t_job_card1_idx` (`job_card`),
  CONSTRAINT `fk_m_vehicle_image_t_job_card1` FOREIGN KEY (`job_card`) REFERENCES `t_job_card` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.m_vehicle_image: ~0 rows (approximately)
/*!40000 ALTER TABLE `m_vehicle_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_vehicle_image` ENABLE KEYS */;

-- Dumping structure for table care_point.m_vehicle_type
CREATE TABLE IF NOT EXISTS `m_vehicle_type` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `make` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL,
  `version` varchar(50) NOT NULL,
  `fuel_type` varchar(25) NOT NULL,
  `price_category` int(10) NOT NULL COMMENT 'Default price category for type',
  `type` varchar(25) NOT NULL COMMENT 'CAR, VAN, JEEP',
  PRIMARY KEY (`index_no`),
  KEY `fk_m_vehicle_type_m_price_category1_idx` (`price_category`),
  CONSTRAINT `fk_m_vehicle_type_m_price_category1` FOREIGN KEY (`price_category`) REFERENCES `m_price_category` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.m_vehicle_type: ~3 rows (approximately)
/*!40000 ALTER TABLE `m_vehicle_type` DISABLE KEYS */;
INSERT INTO `m_vehicle_type` (`index_no`, `make`, `model`, `version`, `fuel_type`, `price_category`, `type`) VALUES
	(3, '1', 'VAN', '1', 'P', 3, '1'),
	(4, '1', 'JEEP', '1', 'P', 1, '1'),
	(5, '1', 'CAR', '1', 'P', 2, '1');
/*!40000 ALTER TABLE `m_vehicle_type` ENABLE KEYS */;

-- Dumping structure for table care_point.r_package_item
CREATE TABLE IF NOT EXISTS `r_package_item` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `package` int(10) NOT NULL,
  `item` int(10) NOT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_r_package_item_m_item2_idx` (`item`),
  KEY `fk_r_package_item_m_item1` (`package`),
  CONSTRAINT `fk_r_package_item_m_item1` FOREIGN KEY (`package`) REFERENCES `m_item` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_r_package_item_m_item2` FOREIGN KEY (`item`) REFERENCES `m_item` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.r_package_item: ~0 rows (approximately)
/*!40000 ALTER TABLE `r_package_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `r_package_item` ENABLE KEYS */;

-- Dumping structure for table care_point.t_customer_ledger
CREATE TABLE IF NOT EXISTS `t_customer_ledger` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `invoice` int(10) NOT NULL,
  `payment` int(10) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `debit_amount` decimal(10,4) DEFAULT NULL,
  `credit_amount` decimal(10,4) DEFAULT NULL,
  `type` varchar(25) DEFAULT NULL,
  `client` int(10) NOT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_t_customer_payment_t_invoice1_idx` (`invoice`),
  KEY `fk_t_customer_payment_t_payment1_idx` (`payment`),
  KEY `fk_t_customer_ledger_m_client1_idx` (`client`),
  CONSTRAINT `fk_t_customer_ledger_m_client1` FOREIGN KEY (`client`) REFERENCES `m_client` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_customer_payment_t_invoice1` FOREIGN KEY (`invoice`) REFERENCES `t_invoice` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_customer_payment_t_payment1` FOREIGN KEY (`payment`) REFERENCES `t_payment` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.t_customer_ledger: ~18 rows (approximately)
/*!40000 ALTER TABLE `t_customer_ledger` DISABLE KEYS */;
INSERT INTO `t_customer_ledger` (`index_no`, `invoice`, `payment`, `date`, `debit_amount`, `credit_amount`, `type`, `client`) VALUES
	(5, 3, NULL, '2017-05-23', NULL, 23500.0000, 'INVOICE_CREATE', 1),
	(6, 3, 3, '2017-05-23', 5000.0000, NULL, 'INVOICE_PAYMENT', 1),
	(7, 3, 3, '2017-05-23', 5000.0000, NULL, 'INVOICE_PAYMENT', 1),
	(8, 3, 3, '2017-05-23', 5000.0000, NULL, 'INVOICE_PAYMENT', 1),
	(9, 3, 3, '2017-05-23', 1000.0000, NULL, 'INVOICE_PAYMENT', 1),
	(10, 3, 3, '2017-05-23', 1000.0000, NULL, 'INVOICE_PAYMENT', 1),
	(11, 4, NULL, '2017-05-23', NULL, 16000.0000, 'INVOICE_CREATE', 1),
	(12, 4, 4, '2017-05-23', 5000.0000, NULL, 'INVOICE_PAYMENT', 1),
	(13, 4, 4, '2017-05-23', 3000.0000, NULL, 'INVOICE_PAYMENT', 1),
	(14, 4, 4, '2017-05-23', 3000.0000, NULL, 'INVOICE_PAYMENT', 1),
	(15, 4, 4, '2017-05-23', 3000.0000, NULL, 'INVOICE_PAYMENT', 1),
	(16, 4, 4, '2017-05-23', 2000.0000, NULL, 'INVOICE_PAYMENT', 1),
	(17, 5, NULL, '2017-05-23', NULL, 8500.0000, 'INVOICE_CREATE', 2),
	(18, 5, 5, '2017-05-23', 1000.0000, NULL, 'INVOICE_PAYMENT', 2),
	(19, 5, 5, '2017-05-23', 1000.0000, NULL, 'INVOICE_PAYMENT', 2),
	(20, 5, 5, '2017-05-23', 1000.0000, NULL, 'INVOICE_PAYMENT', 2),
	(21, 5, 5, '2017-05-23', 1000.0000, NULL, 'INVOICE_PAYMENT', 2),
	(22, 5, 5, '2017-05-23', 4500.0000, NULL, 'INVOICE_PAYMENT', 2);
/*!40000 ALTER TABLE `t_customer_ledger` ENABLE KEYS */;

-- Dumping structure for table care_point.t_daily_check_list
CREATE TABLE IF NOT EXISTS `t_daily_check_list` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `branch` int(10) DEFAULT NULL,
  `transaction` int(10) DEFAULT NULL,
  `complete` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`index_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.t_daily_check_list: ~0 rows (approximately)
/*!40000 ALTER TABLE `t_daily_check_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_daily_check_list` ENABLE KEYS */;

-- Dumping structure for table care_point.t_grn
CREATE TABLE IF NOT EXISTS `t_grn` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `supplier` int(10) NOT NULL,
  `number` int(10) NOT NULL,
  `date` date NOT NULL,
  `amount` decimal(10,4) NOT NULL,
  `ref_number` varchar(25) DEFAULT NULL,
  `branch` int(10) NOT NULL,
  `nbt` decimal(10,4) DEFAULT NULL,
  `nbt_value` decimal(10,4) DEFAULT NULL,
  `vat` decimal(10,4) DEFAULT NULL,
  `vat_value` decimal(10,4) DEFAULT NULL,
  `grand_amount` decimal(10,4) DEFAULT NULL,
  `pay_amount` decimal(10,4) DEFAULT NULL,
  `balance_amount` decimal(10,4) DEFAULT NULL,
  `return_value` decimal(10,4) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `is_nbt` tinyint(1) DEFAULT NULL,
  `is_vat` tinyint(1) DEFAULT NULL,
  `credit_period` int(10) DEFAULT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_t_grn_m_supplier1_idx` (`supplier`),
  CONSTRAINT `fk_t_grn_m_supplier1` FOREIGN KEY (`supplier`) REFERENCES `m_supplier` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.t_grn: ~4 rows (approximately)
/*!40000 ALTER TABLE `t_grn` DISABLE KEYS */;
INSERT INTO `t_grn` (`index_no`, `supplier`, `number`, `date`, `amount`, `ref_number`, `branch`, `nbt`, `nbt_value`, `vat`, `vat_value`, `grand_amount`, `pay_amount`, `balance_amount`, `return_value`, `status`, `type`, `is_nbt`, `is_vat`, `credit_period`) VALUES
	(1, 1, 0, '2017-05-23', 66500.0000, 'rer', 1, 0.0000, 0.0000, 0.0000, 0.0000, 66500.0000, 0.0000, 66500.0000, 0.0000, 'APPROVED', 'direct grn', 0, 0, 10),
	(2, 1, 0, '2017-05-23', 66500.0000, 'rer', 1, 0.0000, 0.0000, 0.0000, 0.0000, 66500.0000, 0.0000, 66500.0000, 0.0000, 'APPROVED', 'direct grn', 0, 0, 10),
	(3, 1, 0, '2017-05-23', 114000.0000, 'sd', 1, 2.0000, 2280.0000, NULL, NULL, 116280.0000, 0.0000, 116280.0000, 0.0000, 'APPROVED', 'direct grn', 0, 0, 9),
	(4, 1, 0, '2017-05-23', 266000.0000, 'fg', 1, 0.0000, 0.0000, 0.0000, 0.0000, 266000.0000, 0.0000, 266000.0000, 0.0000, 'APPROVED', 'direct grn', 0, 0, 9);
/*!40000 ALTER TABLE `t_grn` ENABLE KEYS */;

-- Dumping structure for table care_point.t_grn_item
CREATE TABLE IF NOT EXISTS `t_grn_item` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `purchase_order_item` int(10) DEFAULT NULL,
  `grn` int(10) NOT NULL,
  `item` int(10) DEFAULT NULL,
  `price` decimal(10,4) DEFAULT NULL,
  `qty` decimal(10,4) DEFAULT NULL,
  `value` decimal(10,4) DEFAULT NULL,
  `discount` decimal(10,4) DEFAULT NULL,
  `discount_value` decimal(10,4) DEFAULT NULL,
  `net_value` decimal(10,4) DEFAULT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_m_item_has_t_grn_t_grn1_idx` (`grn`),
  KEY `fk_t_grn_item_t_purchase_order_detail1_idx` (`purchase_order_item`),
  CONSTRAINT `fk_m_item_has_t_grn_t_grn1` FOREIGN KEY (`grn`) REFERENCES `t_grn` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_grn_item_t_purchase_order_detail1` FOREIGN KEY (`purchase_order_item`) REFERENCES `t_purchase_order_detail` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.t_grn_item: ~6 rows (approximately)
/*!40000 ALTER TABLE `t_grn_item` DISABLE KEYS */;
INSERT INTO `t_grn_item` (`index_no`, `purchase_order_item`, `grn`, `item`, `price`, `qty`, `value`, `discount`, `discount_value`, `net_value`) VALUES
	(1, NULL, 1, 56, 3800.0000, 10.0000, 38000.0000, 0.0000, 0.0000, 38000.0000),
	(2, NULL, 1, 57, 1500.0000, 20.0000, 30000.0000, 5.0000, 1500.0000, 28500.0000),
	(3, NULL, 2, 56, 3800.0000, 10.0000, 38000.0000, 0.0000, 0.0000, 38000.0000),
	(4, NULL, 2, 57, 1500.0000, 20.0000, 30000.0000, 5.0000, 1500.0000, 28500.0000),
	(5, NULL, 3, 56, 3800.0000, 30.0000, 114000.0000, 0.0000, 0.0000, 114000.0000),
	(6, NULL, 4, 56, 3800.0000, 70.0000, 266000.0000, 0.0000, 0.0000, 266000.0000);
/*!40000 ALTER TABLE `t_grn_item` ENABLE KEYS */;

-- Dumping structure for table care_point.t_invoice
CREATE TABLE IF NOT EXISTS `t_invoice` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `job_card` int(10) NOT NULL,
  `date` date NOT NULL,
  `number` int(10) NOT NULL,
  `amount` decimal(10,4) NOT NULL,
  `discount_rate` int(10) DEFAULT NULL,
  `discount_amount` decimal(10,4) DEFAULT NULL,
  `net_amount` decimal(10,4) NOT NULL,
  `branch` int(10) NOT NULL,
  `status` varchar(25) NOT NULL COMMENT 'invoice fill completed or pending\n',
  PRIMARY KEY (`index_no`),
  UNIQUE KEY `job_card_UNIQUE` (`job_card`),
  KEY `fk_t_invoice_t_job_card1_idx` (`job_card`),
  CONSTRAINT `fk_t_invoice_t_job_card1` FOREIGN KEY (`job_card`) REFERENCES `t_job_card` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.t_invoice: ~3 rows (approximately)
/*!40000 ALTER TABLE `t_invoice` DISABLE KEYS */;
INSERT INTO `t_invoice` (`index_no`, `job_card`, `date`, `number`, `amount`, `discount_rate`, `discount_amount`, `net_amount`, `branch`, `status`) VALUES
	(3, 1, '2017-05-23', 1, 23500.0000, 0, 0.0000, 23500.0000, 1, 'INVOICE_FORM'),
	(4, 2, '2017-05-23', 2, 16000.0000, 0, 0.0000, 16000.0000, 1, 'INVOICE_FORM'),
	(5, 4, '2017-05-23', 3, 8500.0000, 0, 0.0000, 8500.0000, 1, 'INVOICE_FORM');
/*!40000 ALTER TABLE `t_invoice` ENABLE KEYS */;

-- Dumping structure for table care_point.t_job_card
CREATE TABLE IF NOT EXISTS `t_job_card` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `vehicle` int(10) NOT NULL,
  `number` int(10) NOT NULL,
  `branch` int(10) NOT NULL,
  `client` int(10) NOT NULL,
  `date` date NOT NULL,
  `transaction` int(10) NOT NULL,
  `price_category` int(10) NOT NULL,
  `in_time` datetime NOT NULL,
  `out_time` datetime DEFAULT NULL,
  `in_mileage` int(10) NOT NULL,
  `next_mileage` int(10) DEFAULT NULL,
  `status` varchar(25) NOT NULL,
  `bay` int(10) NOT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_t_job_card_m_client1_idx` (`client`),
  KEY `fk_t_job_card_m_vehicle1_idx` (`vehicle`),
  CONSTRAINT `fk_t_job_card_m_client1` FOREIGN KEY (`client`) REFERENCES `m_client` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_job_card_m_vehicle1` FOREIGN KEY (`vehicle`) REFERENCES `m_vehicle` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.t_job_card: ~4 rows (approximately)
/*!40000 ALTER TABLE `t_job_card` DISABLE KEYS */;
INSERT INTO `t_job_card` (`index_no`, `vehicle`, `number`, `branch`, `client`, `date`, `transaction`, `price_category`, `in_time`, `out_time`, `in_mileage`, `next_mileage`, `status`, `bay`) VALUES
	(1, 1, 1, 1, 1, '2017-05-23', 1, 1, '2017-05-23 02:15:08', NULL, 1000, NULL, 'FINISHED', 1),
	(2, 1, 2, 1, 1, '2017-05-23', 1, 1, '2017-05-23 03:00:55', NULL, 1000, NULL, 'FINISHED', 1),
	(3, 1, 3, 1, 1, '2017-05-23', 1, 1, '2017-05-23 03:08:01', NULL, 1000, NULL, 'PENDING', 1),
	(4, 2, 4, 1, 2, '2017-05-23', 1, 1, '2017-05-23 06:08:21', NULL, 2000, NULL, 'FINISHED', 1);
/*!40000 ALTER TABLE `t_job_card` ENABLE KEYS */;

-- Dumping structure for table care_point.t_job_item
CREATE TABLE IF NOT EXISTS `t_job_item` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `job_card` int(10) NOT NULL,
  `item` int(10) DEFAULT NULL,
  `item_unit` int(10) DEFAULT NULL,
  `item_type` varchar(25) NOT NULL,
  `quantity` decimal(10,4) NOT NULL,
  `stock_remove_qty` decimal(10,4) DEFAULT NULL,
  `price` decimal(10,4) NOT NULL,
  `value` decimal(10,4) NOT NULL,
  `order_status` varchar(25) NOT NULL,
  `job_status` varchar(25) NOT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_t_job_item_t_job_card1_idx` (`job_card`),
  KEY `fk_t_job_item_m_item1_idx` (`item`),
  KEY `fk_t_job_item_m_item_units1_idx` (`item_unit`),
  CONSTRAINT `fk_t_job_item_m_item1` FOREIGN KEY (`item`) REFERENCES `m_item` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_job_item_m_item_units1` FOREIGN KEY (`item_unit`) REFERENCES `m_item_units` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_job_item_t_job_card1` FOREIGN KEY (`job_card`) REFERENCES `t_job_card` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.t_job_item: ~13 rows (approximately)
/*!40000 ALTER TABLE `t_job_item` DISABLE KEYS */;
INSERT INTO `t_job_item` (`index_no`, `job_card`, `item`, `item_unit`, `item_type`, `quantity`, `stock_remove_qty`, `price`, `value`, `order_status`, `job_status`) VALUES
	(1, 1, 56, 2, 'STOCK_ITEM', 1.0000, 1.0000, 1000.0000, 1000.0000, 'COMPLITED', 'PENDING'),
	(2, 1, 50, NULL, 'SERVICE_ITEM', 1.0000, NULL, 6000.0000, 6000.0000, 'PENDING', 'PENDING'),
	(3, 1, 29, NULL, 'SERVICE_ITEM', 1.0000, NULL, 4500.0000, 4500.0000, 'PENDING', 'PENDING'),
	(4, 1, 62, NULL, 'PACKAGE_ITEM', 1.0000, NULL, 12000.0000, 12000.0000, 'PENDING', 'PENDING'),
	(5, 2, 56, 3, 'STOCK_ITEM', 1.0000, 1.0000, 5000.0000, 5000.0000, 'PENDING', 'PENDING'),
	(6, 2, 36, NULL, 'SERVICE_ITEM', 1.0000, NULL, 5500.0000, 5500.0000, 'PENDING', 'PENDING'),
	(7, 2, 39, NULL, 'SERVICE_ITEM', 1.0000, NULL, 5500.0000, 5500.0000, 'PENDING', 'PENDING'),
	(8, 3, 56, 3, 'STOCK_ITEM', 1.0000, 1.0000, 5000.0000, 5000.0000, 'PENDING', 'PENDING'),
	(9, 3, 4, NULL, 'SERVICE_ITEM', 1.0000, NULL, 1500.0000, 1500.0000, 'PENDING', 'PENDING'),
	(10, 3, 7, NULL, 'SERVICE_ITEM', 1.0000, NULL, 1500.0000, 1500.0000, 'PENDING', 'PENDING'),
	(11, 4, 56, 2, 'STOCK_ITEM', 2.0000, 2.0000, 1000.0000, 2000.0000, 'COMPLITED', 'PENDING'),
	(12, 4, 57, 13, 'STOCK_ITEM', 1.0000, 0.5000, 1000.0000, 1000.0000, 'COMPLITED', 'PENDING'),
	(13, 4, 36, NULL, 'SERVICE_ITEM', 1.0000, NULL, 5500.0000, 5500.0000, 'PENDING', 'PENDING');
/*!40000 ALTER TABLE `t_job_item` ENABLE KEYS */;

-- Dumping structure for table care_point.t_job_item_employee
CREATE TABLE IF NOT EXISTS `t_job_item_employee` (
  `job_item` int(10) NOT NULL,
  `employee` int(10) NOT NULL,
  KEY `fk_t_job_item_employee_t_job_item1_idx` (`job_item`),
  KEY `fk_t_job_item_employee_m_employee1_idx` (`employee`),
  CONSTRAINT `fk_t_job_item_employee_m_employee1` FOREIGN KEY (`employee`) REFERENCES `m_employee` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_job_item_employee_t_job_item1` FOREIGN KEY (`job_item`) REFERENCES `t_job_item` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.t_job_item_employee: ~0 rows (approximately)
/*!40000 ALTER TABLE `t_job_item_employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_job_item_employee` ENABLE KEYS */;

-- Dumping structure for table care_point.t_normal_invoice_item
CREATE TABLE IF NOT EXISTS `t_normal_invoice_item` (
  `index_no` int(10) NOT NULL,
  `invoice` int(10) NOT NULL,
  `item` int(10) DEFAULT NULL,
  `item_unit` int(10) DEFAULT NULL,
  `quantity` decimal(10,4) NOT NULL,
  `price` decimal(10,4) NOT NULL,
  `value` decimal(10,4) NOT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_t_normal_invoice_item_t_invoice1_idx` (`invoice`),
  KEY `fk_t_normal_invoice_item_m_item1_idx` (`item`),
  KEY `fk_t_normal_invoice_item_m_item_units1_idx` (`item_unit`),
  CONSTRAINT `fk_t_normal_invoice_item_m_item1` FOREIGN KEY (`item`) REFERENCES `m_item` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_normal_invoice_item_m_item_units1` FOREIGN KEY (`item_unit`) REFERENCES `m_item_units` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_normal_invoice_item_t_invoice1` FOREIGN KEY (`invoice`) REFERENCES `t_invoice` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.t_normal_invoice_item: ~0 rows (approximately)
/*!40000 ALTER TABLE `t_normal_invoice_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_normal_invoice_item` ENABLE KEYS */;

-- Dumping structure for table care_point.t_payment
CREATE TABLE IF NOT EXISTS `t_payment` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `number` int(10) NOT NULL,
  `total_amount` decimal(10,4) NOT NULL,
  `cash_amount` decimal(10,4) DEFAULT NULL,
  `cheque_amount` decimal(10,4) DEFAULT NULL,
  `card_amount` decimal(10,4) DEFAULT NULL,
  PRIMARY KEY (`index_no`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.t_payment: ~3 rows (approximately)
/*!40000 ALTER TABLE `t_payment` DISABLE KEYS */;
INSERT INTO `t_payment` (`index_no`, `number`, `total_amount`, `cash_amount`, `cheque_amount`, `card_amount`) VALUES
	(3, 0, 17000.0000, 5000.0000, 10000.0000, 2000.0000),
	(4, 0, 16000.0000, 5000.0000, 6000.0000, 5000.0000),
	(5, 0, 8500.0000, 1000.0000, 2000.0000, 5500.0000);
/*!40000 ALTER TABLE `t_payment` ENABLE KEYS */;

-- Dumping structure for table care_point.t_payment_information
CREATE TABLE IF NOT EXISTS `t_payment_information` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `payment` int(10) NOT NULL,
  `number` varchar(50) DEFAULT NULL,
  `cheque_date` date DEFAULT NULL,
  `amount` decimal(10,4) NOT NULL,
  `type` varchar(25) NOT NULL COMMENT 'cash,card,cheque',
  `form_name` varchar(25) NOT NULL,
  `bank` int(10) DEFAULT NULL,
  `bank_branch` int(10) DEFAULT NULL,
  `card_type` int(10) DEFAULT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_t_card_detail_t_payment1_idx` (`payment`),
  KEY `fk_t_payment_information_m_bank1_idx` (`bank`),
  KEY `fk_t_payment_information_m_bank_branch1_idx` (`bank_branch`),
  KEY `fk_t_payment_information_m_card_type1_idx` (`card_type`),
  CONSTRAINT `fk_t_card_detail_t_payment1` FOREIGN KEY (`payment`) REFERENCES `t_payment` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_payment_information_m_bank1` FOREIGN KEY (`bank`) REFERENCES `m_bank` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_payment_information_m_bank_branch1` FOREIGN KEY (`bank_branch`) REFERENCES `m_bank_branch` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_payment_information_m_card_type1` FOREIGN KEY (`card_type`) REFERENCES `m_card_type` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.t_payment_information: ~15 rows (approximately)
/*!40000 ALTER TABLE `t_payment_information` DISABLE KEYS */;
INSERT INTO `t_payment_information` (`index_no`, `payment`, `number`, `cheque_date`, `amount`, `type`, `form_name`, `bank`, `bank_branch`, `card_type`) VALUES
	(1, 3, NULL, NULL, 5000.0000, 'CASH', 'INVOICE_FORM', NULL, NULL, NULL),
	(2, 3, '2341234', '2017-01-01', 5000.0000, 'CHEQUE', 'INVOICE_FORM', 4, 4, NULL),
	(3, 3, '46546464', '2017-01-01', 5000.0000, 'CHEQUE', 'INVOICE_FORM', 6, 2, NULL),
	(4, 3, '7586875', NULL, 1000.0000, 'CARD', 'INVOICE_FORM', NULL, NULL, 5),
	(5, 3, '4643563', NULL, 1000.0000, 'CARD', 'INVOICE_FORM', NULL, NULL, 1),
	(6, 4, NULL, NULL, 5000.0000, 'CASH', 'INVOICE_FORM', NULL, NULL, NULL),
	(7, 4, '453425', '2017-01-01', 3000.0000, 'CHEQUE', 'INVOICE_FORM', 4, 4, NULL),
	(8, 4, '7786786', '2017-01-01', 3000.0000, 'CHEQUE', 'INVOICE_FORM', 4, 4, NULL),
	(9, 4, '9789678', NULL, 3000.0000, 'CARD', 'INVOICE_FORM', NULL, NULL, 1),
	(10, 4, '3252345', NULL, 2000.0000, 'CARD', 'INVOICE_FORM', NULL, NULL, 1),
	(11, 5, NULL, NULL, 1000.0000, 'CASH', 'INVOICE_FORM', NULL, NULL, NULL),
	(12, 5, '532534', '2017-01-01', 1000.0000, 'CHEQUE', 'INVOICE_FORM', 4, 4, NULL),
	(13, 5, '45234534', '2017-01-01', 1000.0000, 'CHEQUE', 'INVOICE_FORM', 4, 4, NULL),
	(14, 5, '432523452', NULL, 1000.0000, 'CARD', 'INVOICE_FORM', NULL, NULL, 1),
	(15, 5, '432534523', NULL, 4500.0000, 'CARD', 'INVOICE_FORM', NULL, NULL, 1);
/*!40000 ALTER TABLE `t_payment_information` ENABLE KEYS */;

-- Dumping structure for table care_point.t_purchase_order
CREATE TABLE IF NOT EXISTS `t_purchase_order` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `supplier` int(10) NOT NULL,
  `number` int(10) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `deliver_date` date DEFAULT NULL,
  `approved_date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL COMMENT 'pending/approve\n',
  `is_view` tinyint(1) DEFAULT NULL,
  `form_name` varchar(50) DEFAULT NULL COMMENT 'purchase order form/grn return form\n',
  `item_value` decimal(10,4) DEFAULT NULL,
  `vat` decimal(10,4) DEFAULT NULL,
  `vat_value` decimal(10,4) DEFAULT NULL,
  `nbt` decimal(10,4) DEFAULT NULL,
  `nbt_value` decimal(10,4) DEFAULT NULL,
  `branch` int(10) NOT NULL,
  `grand_total` decimal(10,4) DEFAULT NULL,
  `return_status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_t_purchasse_order_m_supplier1_idx` (`supplier`),
  CONSTRAINT `fk_t_purchasse_order_m_supplier1` FOREIGN KEY (`supplier`) REFERENCES `m_supplier` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.t_purchase_order: ~0 rows (approximately)
/*!40000 ALTER TABLE `t_purchase_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_purchase_order` ENABLE KEYS */;

-- Dumping structure for table care_point.t_purchase_order_detail
CREATE TABLE IF NOT EXISTS `t_purchase_order_detail` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `purchase_order` int(10) NOT NULL,
  `item` int(10) NOT NULL,
  `price` decimal(10,4) DEFAULT NULL,
  `qty` decimal(10,4) DEFAULT NULL,
  `value` decimal(10,4) DEFAULT NULL,
  `discount` decimal(10,4) DEFAULT NULL,
  `discount_value` decimal(10,4) DEFAULT NULL,
  `net_value` decimal(10,4) DEFAULT NULL,
  `stock_qty` decimal(10,4) DEFAULT NULL,
  `order_qty` decimal(10,4) DEFAULT NULL,
  `receive_qty` decimal(10,4) DEFAULT NULL,
  `balance_qty` decimal(10,4) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_t_purchase_order_detail_t_purchasse_order1_idx` (`purchase_order`),
  KEY `fk_t_purchase_order_detail_m_item1_idx` (`item`),
  CONSTRAINT `fk_t_purchase_order_detail_m_item1` FOREIGN KEY (`item`) REFERENCES `m_item` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_purchase_order_detail_t_purchasse_order1` FOREIGN KEY (`purchase_order`) REFERENCES `t_purchase_order` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.t_purchase_order_detail: ~0 rows (approximately)
/*!40000 ALTER TABLE `t_purchase_order_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_purchase_order_detail` ENABLE KEYS */;

-- Dumping structure for table care_point.t_stock_ledger
CREATE TABLE IF NOT EXISTS `t_stock_ledger` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `item` int(10) NOT NULL,
  `store` int(11) NOT NULL,
  `date` date NOT NULL,
  `in_qty` decimal(10,4) DEFAULT NULL,
  `out_qty` decimal(10,4) DEFAULT NULL,
  `avarage_price_in` decimal(10,4) DEFAULT NULL,
  `avarage_price_out` decimal(10,4) DEFAULT NULL,
  `form_index_no` int(10) NOT NULL,
  `form` varchar(25) NOT NULL,
  `branch` int(10) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_m_store_has_m_item_m_item1_idx` (`item`),
  KEY `fk_m_store_has_m_item_m_store1_idx` (`store`),
  CONSTRAINT `fk_m_store_has_m_item_m_item1` FOREIGN KEY (`item`) REFERENCES `m_item` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_m_store_has_m_item_m_store1` FOREIGN KEY (`store`) REFERENCES `m_store` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.t_stock_ledger: ~14 rows (approximately)
/*!40000 ALTER TABLE `t_stock_ledger` DISABLE KEYS */;
INSERT INTO `t_stock_ledger` (`index_no`, `item`, `store`, `date`, `in_qty`, `out_qty`, `avarage_price_in`, `avarage_price_out`, `form_index_no`, `form`, `branch`, `type`) VALUES
	(1, 56, 1, '2017-05-23', 1000.0000, 0.0000, 100.0000, 1000.0000, 1, 'GRN', 1, 'PENDING'),
	(2, 56, 1, '2017-05-23', 0.0000, 1.0000, NULL, NULL, 1, 'STOCK_FORM', 1, NULL),
	(3, 56, 4, '2017-05-23', 10.0000, 0.0000, 38000.0000, 0.0000, 1, 'DIRECT_GRN_FORM', 1, NULL),
	(4, 57, 4, '2017-05-23', 20.0000, 0.0000, 28500.0000, 0.0000, 1, 'DIRECT_GRN_FORM', 1, NULL),
	(5, 56, 4, '2017-05-23', 10.0000, 0.0000, 38000.0000, 0.0000, 2, 'DIRECT_GRN_FORM', 1, NULL),
	(6, 57, 4, '2017-05-23', 20.0000, 0.0000, 28500.0000, 0.0000, 2, 'DIRECT_GRN_FORM', 1, NULL),
	(7, 56, 4, '2017-05-23', 30.0000, 0.0000, 114000.0000, 0.0000, 3, 'DIRECT_GRN_FORM', 1, NULL),
	(8, 56, 4, '2017-05-23', 0.0000, 49.0000, 0.0000, 8833.0791, 1, 'BRANCH_TRANSFER_OUT', 1, NULL),
	(9, 56, 5, '2017-05-23', 49.0000, 0.0000, 8833.0791, 0.0000, 1, 'BRANCH_TRANSFER_IN', 2, NULL),
	(10, 56, 4, '2017-05-23', 70.0000, 0.0000, 266000.0000, 0.0000, 4, 'DIRECT_GRN_FORM', 1, NULL),
	(11, 56, 4, '2017-05-23', 0.0000, 20.0000, 0.0000, 8341.4378, 2, 'INTERNAL_TRANSFER_OUT', 1, NULL),
	(12, 56, 1, '2017-05-23', 20.0000, 0.0000, 8341.4378, 0.0000, 2, 'INTERNAL_TRANSFER_IN', 1, NULL),
	(13, 57, 1, '2017-05-23', 0.0000, 0.5000, NULL, NULL, 4, 'STOCK_FORM', 1, NULL),
	(14, 56, 1, '2017-05-23', 0.0000, 2.0000, NULL, NULL, 4, 'STOCK_FORM', 1, NULL);
/*!40000 ALTER TABLE `t_stock_ledger` ENABLE KEYS */;

-- Dumping structure for table care_point.t_stock_transfer
CREATE TABLE IF NOT EXISTS `t_stock_transfer` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `in_number` int(10) DEFAULT NULL,
  `out_number` int(10) NOT NULL,
  `in_date` date DEFAULT NULL,
  `out_date` date DEFAULT NULL,
  `from_branch` int(10) NOT NULL,
  `from_store` int(10) NOT NULL,
  `to_branch` int(10) NOT NULL,
  `to_store` int(10) NOT NULL,
  `ref_number` varchar(25) DEFAULT NULL,
  `remarks` varchar(50) DEFAULT NULL,
  `type` varchar(25) NOT NULL COMMENT 'internal/external',
  `status` varchar(25) NOT NULL COMMENT 'approve/pending\\n',
  PRIMARY KEY (`index_no`),
  KEY `fk_t_stock_transfer_m_branch1_idx` (`from_branch`),
  KEY `fk_t_stock_transfer_m_branch2_idx` (`to_branch`),
  KEY `fk_t_stock_transfer_m_store1_idx` (`from_store`),
  KEY `fk_t_stock_transfer_m_store2_idx` (`to_store`),
  CONSTRAINT `fk_t_stock_transfer_m_branch1` FOREIGN KEY (`from_branch`) REFERENCES `m_branch` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_stock_transfer_m_branch2` FOREIGN KEY (`to_branch`) REFERENCES `m_branch` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_stock_transfer_m_store1` FOREIGN KEY (`from_store`) REFERENCES `m_store` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_stock_transfer_m_store2` FOREIGN KEY (`to_store`) REFERENCES `m_store` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.t_stock_transfer: ~2 rows (approximately)
/*!40000 ALTER TABLE `t_stock_transfer` DISABLE KEYS */;
INSERT INTO `t_stock_transfer` (`index_no`, `in_number`, `out_number`, `in_date`, `out_date`, `from_branch`, `from_store`, `to_branch`, `to_store`, `ref_number`, `remarks`, `type`, `status`) VALUES
	(1, 1, 1, '2017-05-23', '2017-05-23', 1, 4, 2, 5, 'sd', 'sd', 'EXTERNAL_TRANSFER', 'FINISHED'),
	(2, 2, 1, '2017-05-25', '2017-05-23', 1, 4, 1, 1, 'df', 'df', 'INTERNAL_TRANSFER_IN', 'FINISHED');
/*!40000 ALTER TABLE `t_stock_transfer` ENABLE KEYS */;

-- Dumping structure for table care_point.t_stock_transfer_item
CREATE TABLE IF NOT EXISTS `t_stock_transfer_item` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `item` int(10) NOT NULL,
  `stock_transfer` int(10) NOT NULL,
  `qty` decimal(10,4) NOT NULL,
  `cost` decimal(10,4) NOT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_t_stock_transfer_m_item1_idx` (`item`),
  KEY `fk_t_stock_transfer_item_t_stock_transfer1_idx` (`stock_transfer`),
  CONSTRAINT `fk_t_stock_transfer_item_t_stock_transfer1` FOREIGN KEY (`stock_transfer`) REFERENCES `t_stock_transfer` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_stock_transfer_m_item1` FOREIGN KEY (`item`) REFERENCES `m_item` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.t_stock_transfer_item: ~2 rows (approximately)
/*!40000 ALTER TABLE `t_stock_transfer_item` DISABLE KEYS */;
INSERT INTO `t_stock_transfer_item` (`index_no`, `item`, `stock_transfer`, `qty`, `cost`) VALUES
	(1, 56, 1, 49.0000, 180.2669),
	(2, 56, 2, 20.0000, 417.0719);
/*!40000 ALTER TABLE `t_stock_transfer_item` ENABLE KEYS */;

-- Dumping structure for table care_point.t_sub_item_check_result
CREATE TABLE IF NOT EXISTS `t_sub_item_check_result` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `checked` tinyint(1) NOT NULL,
  `sub_item` int(10) NOT NULL,
  `reason` varchar(50) DEFAULT NULL,
  `comfirmation` tinyint(1) DEFAULT NULL,
  `time` varchar(25) DEFAULT NULL,
  `daily_check_list` int(10) NOT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_t_check_result_m_sub_item1_idx` (`sub_item`),
  KEY `fk_t_sub_item_check_result_t_daily_check_list1_idx` (`daily_check_list`),
  CONSTRAINT `fk_t_check_result_m_sub_item1` FOREIGN KEY (`sub_item`) REFERENCES `m_sub_item` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_sub_item_check_result_t_daily_check_list1` FOREIGN KEY (`daily_check_list`) REFERENCES `t_daily_check_list` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.t_sub_item_check_result: ~0 rows (approximately)
/*!40000 ALTER TABLE `t_sub_item_check_result` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_sub_item_check_result` ENABLE KEYS */;

-- Dumping structure for table care_point.t_supplier_ledger
CREATE TABLE IF NOT EXISTS `t_supplier_ledger` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `branch` int(10) NOT NULL,
  `date` date NOT NULL,
  `form_name` varchar(50) NOT NULL COMMENT 'grn form,return form,supplier payment form',
  `grn` int(10) DEFAULT NULL,
  `payment` int(10) DEFAULT NULL,
  `supplier_return` int(10) DEFAULT NULL,
  `supplier` int(10) NOT NULL,
  `credit_amount` decimal(10,4) DEFAULT NULL,
  `debit_amount` decimal(10,4) DEFAULT NULL,
  `ref_number` int(10) DEFAULT NULL COMMENT 'grn,return,payment table indexNo',
  `is_delete` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_t_supplier_ledger_m_supplier1_idx` (`supplier`),
  KEY `fk_t_supplier_ledger_t_grn1_idx` (`grn`),
  KEY `fk_t_supplier_ledger_t_payment1_idx` (`payment`),
  CONSTRAINT `fk_t_supplier_ledger_m_supplier1` FOREIGN KEY (`supplier`) REFERENCES `m_supplier` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_supplier_ledger_t_grn1` FOREIGN KEY (`grn`) REFERENCES `t_grn` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_supplier_ledger_t_payment1` FOREIGN KEY (`payment`) REFERENCES `t_payment` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.t_supplier_ledger: ~2 rows (approximately)
/*!40000 ALTER TABLE `t_supplier_ledger` DISABLE KEYS */;
INSERT INTO `t_supplier_ledger` (`index_no`, `branch`, `date`, `form_name`, `grn`, `payment`, `supplier_return`, `supplier`, `credit_amount`, `debit_amount`, `ref_number`, `is_delete`) VALUES
	(1, 1, '2017-05-23', 'DIRECT_GRN_FORM', 3, NULL, NULL, 1, 116280.0000, 0.0000, NULL, 0),
	(2, 1, '2017-05-23', 'DIRECT_GRN_FORM', 4, NULL, NULL, 1, 266000.0000, 0.0000, NULL, 0);
/*!40000 ALTER TABLE `t_supplier_ledger` ENABLE KEYS */;

-- Dumping structure for table care_point.t_vehicle_assignment
CREATE TABLE IF NOT EXISTS `t_vehicle_assignment` (
  `index_no` int(10) NOT NULL AUTO_INCREMENT,
  `job_card` int(10) NOT NULL,
  `bay` int(10) NOT NULL,
  `in_time` datetime NOT NULL,
  `out_time` datetime DEFAULT NULL,
  `branch` int(10) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`index_no`),
  KEY `fk_t_vehicle_assignment_t_job_card1_idx` (`job_card`),
  KEY `fk_t_vehicle_assignment_m_bay1_idx` (`bay`),
  CONSTRAINT `fk_t_vehicle_assignment_m_bay1` FOREIGN KEY (`bay`) REFERENCES `m_bay` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_vehicle_assignment_t_job_card1` FOREIGN KEY (`job_card`) REFERENCES `t_job_card` (`index_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table care_point.t_vehicle_assignment: ~0 rows (approximately)
/*!40000 ALTER TABLE `t_vehicle_assignment` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_vehicle_assignment` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
