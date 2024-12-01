CREATE DATABASE  IF NOT EXISTS `cafe_finder_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cafe_finder_db`;
-- MySQL dump 10.13  Distrib 8.0.38, for macos14 (arm64)
--
-- Host: 127.0.0.1    Database: cafe_finder_db
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Amenities`
--

DROP TABLE IF EXISTS `Amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Amenities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `category` enum('basic','comfort','tech','food','other') DEFAULT 'other',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `name_3` (`name`),
  UNIQUE KEY `name_4` (`name`),
  UNIQUE KEY `name_5` (`name`),
  UNIQUE KEY `name_6` (`name`),
  UNIQUE KEY `name_7` (`name`),
  UNIQUE KEY `name_8` (`name`),
  UNIQUE KEY `name_9` (`name`),
  UNIQUE KEY `name_10` (`name`),
  UNIQUE KEY `name_11` (`name`),
  UNIQUE KEY `name_12` (`name`),
  UNIQUE KEY `name_13` (`name`),
  UNIQUE KEY `name_14` (`name`),
  UNIQUE KEY `name_15` (`name`),
  UNIQUE KEY `name_16` (`name`),
  UNIQUE KEY `name_17` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Amenities`
--

LOCK TABLES `Amenities` WRITE;
/*!40000 ALTER TABLE `Amenities` DISABLE KEYS */;
INSERT INTO `Amenities` VALUES (1,'WiFi',NULL,'tech','2024-12-01 21:05:28','2024-12-01 21:05:28'),(2,'Power Outlets',NULL,'tech','2024-12-01 21:05:28','2024-12-01 21:05:28'),(3,'Parking',NULL,'comfort','2024-12-01 21:05:28','2024-12-01 21:05:28'),(4,'Outdoor Seating',NULL,'comfort','2024-12-01 21:05:28','2024-12-01 21:05:28');
/*!40000 ALTER TABLE `Amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CafeAmenities`
--

DROP TABLE IF EXISTS `CafeAmenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CafeAmenities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `details` varchar(255) DEFAULT NULL,
  `CafeId` int DEFAULT NULL,
  `AmenityId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `CafeId` (`CafeId`),
  KEY `AmenityId` (`AmenityId`),
  CONSTRAINT `CafeAmenities_ibfk_33` FOREIGN KEY (`CafeId`) REFERENCES `Cafes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CafeAmenities_ibfk_34` FOREIGN KEY (`AmenityId`) REFERENCES `Amenities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CafeAmenities`
--

LOCK TABLES `CafeAmenities` WRITE;
/*!40000 ALTER TABLE `CafeAmenities` DISABLE KEYS */;
INSERT INTO `CafeAmenities` VALUES (1,NULL,1,4,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(2,NULL,1,3,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(3,NULL,2,4,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(4,NULL,2,3,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(5,NULL,3,4,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(6,NULL,3,3,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(7,NULL,4,4,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(8,NULL,4,3,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(9,NULL,5,4,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(10,NULL,5,3,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(11,NULL,6,4,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(12,NULL,6,3,'2024-12-01 21:05:28','2024-12-01 21:05:28');
/*!40000 ALTER TABLE `CafeAmenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cafes`
--

DROP TABLE IF EXISTS `Cafes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cafes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `postalCode` varchar(255) DEFAULT NULL,
  `country` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `avgRating` decimal(2,1) DEFAULT '0.0',
  `priceRange` enum('$','$$','$$$','$$$$') DEFAULT '$$',
  `isVerified` tinyint(1) DEFAULT '0',
  `status` enum('active','closed','temporary_closed') DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cafes`
--

LOCK TABLES `Cafes` WRITE;
/*!40000 ALTER TABLE `Cafes` DISABLE KEYS */;
INSERT INTO `Cafes` VALUES (1,'Cozy Coffee','A cozy little coffee shop with great ambiance.','123 Coffee Lane','Copenhagen','2200','Denmark','+45 1234 5678','contact@cozycoffee.dk','http://cozycoffee.dk',55.67609800,12.56833700,4.5,'$$',1,NULL,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(2,'Espresso Express','Fast and fresh coffee on the go.','456 Java Ave','Aarhus','8000','Denmark','+45 8765 4321','info@espressoexpress.dk','http://espressoexpress.dk',56.16293900,10.20392100,4.0,'$',0,'active','2024-12-01 21:05:28','2024-12-01 21:05:28'),(3,'Brew & Chill','Relax with a freshly brewed cup of coffee.','789 Brew Street','Odense','5000','Denmark','+45 4567 8910','hello@brewchill.dk','http://brewchill.dk',55.40375600,10.40237000,4.7,'$$$',1,'active','2024-12-01 21:05:28','2024-12-01 21:05:28'),(4,'Nordic Beans','Scandinavian coffee at its finest.','321 Bean Boulevard','Aalborg','9000','Denmark','+45 9876 5432','contact@nordicbeans.dk','http://nordicbeans.dk',57.04881900,9.92174700,4.3,'$$',1,'active','2024-12-01 21:05:28','2024-12-01 21:05:28'),(5,'The Daily Grind','Your daily dose of caffeine.','654 Grind Lane','Esbjerg','6700','Denmark','+45 6543 2109','support@dailygrind.dk','http://dailygrind.dk',55.46756400,8.45206100,4.1,'$',0,'active','2024-12-01 21:05:28','2024-12-01 21:05:28'),(6,'Café Hygge','Experience true Danish hygge with great coffee.','987 Hygge Way','Roskilde','4000','Denmark','+45 7890 1234','hygge@cafehygge.dk','http://cafehygge.dk',55.64191000,12.08784500,4.8,'$$$',1,'active','2024-12-01 21:05:28','2024-12-01 21:05:28');
/*!40000 ALTER TABLE `Cafes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Favorites`
--

DROP TABLE IF EXISTS `Favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `notes` text,
  `UserId` int DEFAULT NULL,
  `CafeId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_cafe_favorite` (`UserId`,`CafeId`),
  KEY `CafeId` (`CafeId`),
  CONSTRAINT `Favorites_ibfk_33` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Favorites_ibfk_34` FOREIGN KEY (`CafeId`) REFERENCES `Cafes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Favorites`
--

LOCK TABLES `Favorites` WRITE;
/*!40000 ALTER TABLE `Favorites` DISABLE KEYS */;
INSERT INTO `Favorites` VALUES (1,'Love this place!',1,1,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(2,'Great coffee on the go.',2,2,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(3,'Best place to work!',3,3,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(4,'Love the Scandinavian vibe!',4,4,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(5,'Good coffee, but no power outlets.',5,5,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(6,'My favorite spot for hygge!',1,6,'2024-12-01 21:05:28','2024-12-01 21:05:28');
/*!40000 ALTER TABLE `Favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OpeningHours`
--

DROP TABLE IF EXISTS `OpeningHours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OpeningHours` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dayOfWeek` enum('monday','tuesday','wednesday','thursday','friday','saturday','sunday') NOT NULL,
  `openTime` time NOT NULL,
  `closeTime` time NOT NULL,
  `isClosed` tinyint(1) DEFAULT '0',
  `cafeId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cafeId` (`cafeId`),
  CONSTRAINT `OpeningHours_ibfk_1` FOREIGN KEY (`cafeId`) REFERENCES `Cafes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OpeningHours`
--

LOCK TABLES `OpeningHours` WRITE;
/*!40000 ALTER TABLE `OpeningHours` DISABLE KEYS */;
INSERT INTO `OpeningHours` VALUES (1,'monday','09:00:00','17:00:00',0,1,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(2,'monday','09:00:00','17:00:00',0,2,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(3,'monday','09:00:00','17:00:00',0,3,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(4,'monday','09:00:00','17:00:00',0,4,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(5,'monday','09:00:00','17:00:00',0,5,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(6,'monday','09:00:00','17:00:00',0,6,'2024-12-01 21:05:28','2024-12-01 21:05:28');
/*!40000 ALTER TABLE `OpeningHours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reviews`
--

DROP TABLE IF EXISTS `Reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rating` int NOT NULL,
  `content` text,
  `noise_level` enum('quiet','moderate','loud') NOT NULL,
  `wifi_quality` int DEFAULT NULL,
  `power_outlets` enum('none','limited','plenty') DEFAULT NULL,
  `cafeId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cafeId` (`cafeId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Reviews_ibfk_31` FOREIGN KEY (`cafeId`) REFERENCES `Cafes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Reviews_ibfk_32` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reviews`
--

LOCK TABLES `Reviews` WRITE;
/*!40000 ALTER TABLE `Reviews` DISABLE KEYS */;
INSERT INTO `Reviews` VALUES (1,5,'Fantastic place to relax and enjoy a cup of coffee!','quiet',5,'plenty',1,1,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(2,3,'Good for a quick coffee, but lacks seating space.','loud',3,'limited',2,2,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(3,4,'Great coffee, but the parking can be a hassle.','moderate',4,'plenty',3,3,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(4,4,'Love the Scandinavian vibe and the coffee is great!','quiet',4,'plenty',4,4,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(5,2,'Not a fan of the coffee here, but the WiFi is good.','moderate',4,'none',5,5,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(6,5,'Hygge at its best! Love the atmosphere and the coffee.','quiet',5,'plenty',6,1,'2024-12-01 21:05:28','2024-12-01 21:05:28');
/*!40000 ALTER TABLE `Reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20241201180000-create-users.js'),('20241201180500-create-cafes.js'),('20241201181000-create-amenities.js'),('20241201181500-create-cafe-amenities.js'),('20241201182000-create-favorites.js'),('20241201182500-create-reviews.js'),('20241201183000-create-opening-hours.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `isVerified` tinyint(1) DEFAULT '1',
  `lastLogin` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username_2` (`username`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `username_3` (`username`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `username_4` (`username`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `username_5` (`username`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `username_6` (`username`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `username_7` (`username`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `username_8` (`username`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `username_9` (`username`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `username_10` (`username`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `username_11` (`username`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `username_12` (`username`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `username_13` (`username`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `username_14` (`username`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `username_15` (`username`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `username_16` (`username`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `username_17` (`username`),
  UNIQUE KEY `email_17` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'john_doe','john.doe@example.com','$2b$10$z52hxjv8NI8wm1Z.GIL.KuZir5rxv0e8hRosRMuiv21/5rwduMZyi','user',1,'2024-12-01 22:40:47','2024-12-01 21:05:28','2024-12-01 22:40:47'),(2,'jane_smith','jane.smith@example.com','$2b$10$Vf/p0t6NozZUn7EhdivvI.1XVdHNvaudX632SEV0/s8y9k6GWv9K6','user',1,'2024-12-01 21:58:53','2024-12-01 21:05:28','2024-12-01 21:58:53'),(3,'admin_user','admin@example.com','$2b$10$neHMBqD32YQeG3WLI2Sc3envtdisNi8wonPWUofXIKY343ta4C.AW','admin',1,NULL,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(4,'test_user1','test1@example.com','$2b$10$MflnwKfSAekpMKkoLkrLteipceLDv0Bq0b4v4AG46VvnBIPts0sA6','user',0,NULL,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(5,'test_user2','test2@example.com','$2b$10$npJ7WjAtWVOAlYVci9noVuXM8n6G4jkdhiaXJmjStq7TSKkg/g.OG','user',0,NULL,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(6,'guest_user','guest@example.com','$2b$10$gTXLY36xbZMCd5QLqCO15.DWVY2YFOYUI1UlssM5EJK.BcvvzRZXu','user',1,NULL,'2024-12-01 21:05:28','2024-12-01 21:05:28'),(7,'vsjlkopdfg','dsfdfsd@user.dk','$2a$12$L8oRVUjP8BjUVjKm26RKyu3BPPEiNpz1pA6F/Kbhq6J1bkglEOKvm','user',1,NULL,'2024-12-01 22:20:41','2024-12-01 22:20:41');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'cafe_finder_db'
--

--
-- Dumping routines for database 'cafe_finder_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-01 23:50:21
