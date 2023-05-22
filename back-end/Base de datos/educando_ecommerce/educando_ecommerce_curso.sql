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
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curso` (
  `id_curso` int NOT NULL AUTO_INCREMENT,
  `nombre_curso` varchar(80) DEFAULT NULL,
  `duracion` int DEFAULT NULL,
  `precio` int DEFAULT NULL,
  `calificacion` double DEFAULT NULL,
  `fecha_alta_curso` datetime(6) DEFAULT NULL,
  `imagen_url` varchar(500) DEFAULT NULL,
  `id_categoria_id` int DEFAULT NULL,
  PRIMARY KEY (`id_curso`),
  KEY `curso_id_categoria_id_38ef8005_fk_categoria_id_categoria` (`id_categoria_id`),
  CONSTRAINT `curso_id_categoria_id_38ef8005_fk_categoria_id_categoria` FOREIGN KEY (`id_categoria_id`) REFERENCES `categoria` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (1,'JAVA',6,1500,5,'2023-05-20 17:26:25.056784','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH1dF6i1ISXyHXKWvZ9YFwKJzXPk7INEGKXgXoHuPj-QNwH-SyMHVJboXYtZpZ7qFaD10&usqp=CAU%27',1),(2,'PYTHON',7,1600,5,'2023-05-20 17:41:09.934681','https://www.azulweb.net/wp-content/uploads/2017/05/Curso-completo-de-Python-totalmente-gratis.jpg',1),(3,'HTML/ CSS',12,2000,5,'2023-05-20 17:44:02.198699','https://i.ytimg.com/vi/ni3LEc3kvas/maxresdefault.jpg',2),(4,'JAVASCRIPT',6,2500,5,'2023-05-20 17:47:46.909516','https://i.ytimg.com/vi/RqQ1d1qEWlE/maxresdefault.jpg',2);
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-20 15:27:20
