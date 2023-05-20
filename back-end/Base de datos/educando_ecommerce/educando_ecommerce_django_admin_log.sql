-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: educando_ecommerce
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2023-05-20 17:22:48.217256','1','1',1,'[{\"added\": {}}]',10,1),(2,'2023-05-20 17:24:14.088569','2','2',1,'[{\"added\": {}}]',10,1),(3,'2023-05-20 17:25:52.607752','1','1',1,'[{\"added\": {}}]',7,1),(4,'2023-05-20 17:26:25.056784','1','1',1,'[{\"added\": {}}]',9,1),(5,'2023-05-20 17:39:08.489063','1','1',1,'[{\"added\": {}}]',11,1),(6,'2023-05-20 17:39:43.936758','1','1',2,'[{\"changed\": {\"fields\": [\"Imagen url\"]}}]',9,1),(7,'2023-05-20 17:39:53.999680','1','1',2,'[]',9,1),(8,'2023-05-20 17:41:09.935686','2','2',1,'[{\"added\": {}}]',9,1),(9,'2023-05-20 17:42:26.069739','2','2',1,'[{\"added\": {}}]',7,1),(10,'2023-05-20 17:44:02.199200','3','3',1,'[{\"added\": {}}]',9,1),(11,'2023-05-20 17:46:16.390953','3','3',2,'[{\"changed\": {\"fields\": [\"Nombre curso\", \"Imagen url\"]}}]',9,1),(12,'2023-05-20 17:47:46.910018','4','4',1,'[{\"added\": {}}]',9,1),(13,'2023-05-20 17:47:56.182625','4','4',2,'[{\"changed\": {\"fields\": [\"Nombre curso\"]}}]',9,1),(14,'2023-05-20 17:48:03.903110','1','1',2,'[{\"changed\": {\"fields\": [\"Nombre curso\"]}}]',9,1),(15,'2023-05-20 17:48:10.559598','2','2',2,'[{\"changed\": {\"fields\": [\"Nombre curso\"]}}]',9,1),(16,'2023-05-20 17:51:24.718900','1','1',1,'[{\"added\": {}}]',8,1),(17,'2023-05-20 17:54:41.695016','1','1',1,'[{\"added\": {}}]',12,1),(18,'2023-05-20 17:55:43.070182','1','1',1,'[{\"added\": {}}]',14,1),(19,'2023-05-20 17:59:48.276132','1','Administradores',1,'[{\"added\": {}}]',3,1),(20,'2023-05-20 18:02:57.440041','2','Estudiante',1,'[{\"added\": {}}]',3,1),(21,'2023-05-20 18:04:05.565597','2','Abel',1,'[{\"added\": {}}]',4,1),(22,'2023-05-20 18:04:28.877170','2','Abel',2,'[{\"changed\": {\"fields\": [\"First name\", \"Groups\", \"Last login\"]}}]',4,1),(23,'2023-05-20 18:06:29.228517','3','Estudiante',1,'[{\"added\": {}}]',4,1),(24,'2023-05-20 18:06:51.761712','3','Estudiante',2,'[{\"changed\": {\"fields\": [\"Groups\", \"Last login\"]}}]',4,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-20 15:27:19
