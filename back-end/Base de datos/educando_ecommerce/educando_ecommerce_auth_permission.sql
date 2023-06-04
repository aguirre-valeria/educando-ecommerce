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
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add Categoria de curso',7,'add_categoria'),(26,'Can change Categoria de curso',7,'change_categoria'),(27,'Can delete Categoria de curso',7,'delete_categoria'),(28,'Can view Categoria de curso',7,'view_categoria'),(29,'Can add Consulta de usuario',8,'add_contacto'),(30,'Can change Consulta de usuario',8,'change_contacto'),(31,'Can delete Consulta de usuario',8,'delete_contacto'),(32,'Can view Consulta de usuario',8,'view_contacto'),(33,'Can add Curso',9,'add_curso'),(34,'Can change Curso',9,'change_curso'),(35,'Can delete Curso',9,'delete_curso'),(36,'Can view Curso',9,'view_curso'),(37,'Can add Rol de usuario',10,'add_rol'),(38,'Can change Rol de usuario',10,'change_rol'),(39,'Can delete Rol de usuario',10,'delete_rol'),(40,'Can view Rol de usuario',10,'view_rol'),(41,'Can add Usuario registrado mediante el front',11,'add_usuario'),(42,'Can change Usuario registrado mediante el front',11,'change_usuario'),(43,'Can delete Usuario registrado mediante el front',11,'delete_usuario'),(44,'Can view Usuario registrado mediante el front',11,'view_usuario'),(45,'Can add Mi Curso comprado',12,'add_miscurso'),(46,'Can change Mi Curso comprado',12,'change_miscurso'),(47,'Can delete Mi Curso comprado',12,'delete_miscurso'),(48,'Can view Mi Curso comprado',12,'view_miscurso'),(49,'Can add Foro de consulta',13,'add_foro'),(50,'Can change Foro de consulta',13,'change_foro'),(51,'Can delete Foro de consulta',13,'delete_foro'),(52,'Can view Foro de consulta',13,'view_foro'),(53,'Can add Curso seleccionado para comprar',14,'add_carrito'),(54,'Can change Curso seleccionado para comprar',14,'change_carrito'),(55,'Can delete Curso seleccionado para comprar',14,'delete_carrito'),(56,'Can view Curso seleccionado para comprar',14,'view_carrito');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
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
