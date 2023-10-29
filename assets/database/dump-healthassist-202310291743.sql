-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: healthassist
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `arquivos_medico`
--

DROP TABLE IF EXISTS `arquivos_medico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arquivos_medico` (
  `id_medico` int DEFAULT NULL,
  `nome_arquivo` varchar(255) DEFAULT NULL,
  `tipo_mime` varchar(100) DEFAULT NULL,
  `dados_arquivo` longblob,
  `aprovado` tinyint(1) DEFAULT NULL,
  `motivo_inviabilidade` varchar(255) DEFAULT NULL,
  `id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_medico` (`id_medico`),
  CONSTRAINT `arquivos_medico_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `medico` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arquivos_medico`
--

LOCK TABLES `arquivos_medico` WRITE;
/*!40000 ALTER TABLE `arquivos_medico` DISABLE KEYS */;
/*!40000 ALTER TABLE `arquivos_medico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arquivos_paciente`
--

DROP TABLE IF EXISTS `arquivos_paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arquivos_paciente` (
  `id_paciente` int DEFAULT NULL,
  `nome_arquivo` varchar(255) DEFAULT NULL,
  `tipo_mime` varchar(100) DEFAULT NULL,
  `dados_arquivo` longblob,
  `aprovado` tinyint(1) DEFAULT NULL,
  `motivo_inviabilidade` varchar(255) DEFAULT NULL,
  `id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_paciente` (`id_paciente`),
  CONSTRAINT `arquivos_paciente_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arquivos_paciente`
--

LOCK TABLES `arquivos_paciente` WRITE;
/*!40000 ALTER TABLE `arquivos_paciente` DISABLE KEYS */;
/*!40000 ALTER TABLE `arquivos_paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliar_consulta`
--

DROP TABLE IF EXISTS `avaliar_consulta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliar_consulta` (
  `id_consulta` int DEFAULT NULL,
  `titulo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `comentario` text,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_consulta` (`id_consulta`),
  CONSTRAINT `avaliar_consulta_ibfk_1` FOREIGN KEY (`id_consulta`) REFERENCES `consulta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliar_consulta`
--

LOCK TABLES `avaliar_consulta` WRITE;
/*!40000 ALTER TABLE `avaliar_consulta` DISABLE KEYS */;
/*!40000 ALTER TABLE `avaliar_consulta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consulta`
--

DROP TABLE IF EXISTS `consulta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consulta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_medico` int DEFAULT NULL,
  `id_paciente` int DEFAULT NULL,
  `data` date DEFAULT NULL,
  `horario_inicio` time DEFAULT NULL,
  `horario_fim` time DEFAULT NULL,
  `resposta_anamnese` text,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_medico` (`id_medico`),
  KEY `id_paciente` (`id_paciente`),
  CONSTRAINT `consulta_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `medico` (`id`),
  CONSTRAINT `consulta_ibfk_2` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consulta`
--

LOCK TABLES `consulta` WRITE;
/*!40000 ALTER TABLE `consulta` DISABLE KEYS */;
/*!40000 ALTER TABLE `consulta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dia_da_semana`
--

DROP TABLE IF EXISTS `dia_da_semana`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dia_da_semana` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome_dia` enum('SEGUNDA','TERCA','QUARTA','QUINTA','SEXTA','SABADO','DOMINGO') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dia_da_semana`
--

LOCK TABLES `dia_da_semana` WRITE;
/*!40000 ALTER TABLE `dia_da_semana` DISABLE KEYS */;
/*!40000 ALTER TABLE `dia_da_semana` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disponibilidade_de_horario`
--

DROP TABLE IF EXISTS `disponibilidade_de_horario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `disponibilidade_de_horario` (
  `id_medico` int DEFAULT NULL,
  `horario_incio` time DEFAULT NULL,
  `horario_fim` time DEFAULT NULL,
  `dia_da_semana` int DEFAULT NULL,
  `id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_medico` (`id_medico`),
  KEY `dia_da_semana` (`dia_da_semana`),
  CONSTRAINT `disponibilidade_de_horario_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `medico` (`id`),
  CONSTRAINT `disponibilidade_de_horario_ibfk_2` FOREIGN KEY (`dia_da_semana`) REFERENCES `dia_da_semana` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disponibilidade_de_horario`
--

LOCK TABLES `disponibilidade_de_horario` WRITE;
/*!40000 ALTER TABLE `disponibilidade_de_horario` DISABLE KEYS */;
/*!40000 ALTER TABLE `disponibilidade_de_horario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialidade_medico`
--

DROP TABLE IF EXISTS `especialidade_medico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialidade_medico` (
  `id` int NOT NULL AUTO_INCREMENT,
  `especialidade` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidade_medico`
--

LOCK TABLES `especialidade_medico` WRITE;
/*!40000 ALTER TABLE `especialidade_medico` DISABLE KEYS */;
/*!40000 ALTER TABLE `especialidade_medico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medico`
--

DROP TABLE IF EXISTS `medico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medico` (
  `id` int NOT NULL AUTO_INCREMENT,
  `endereco` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `data_nasc` date DEFAULT NULL,
  `código_de_registro` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_especialidade_medico` int DEFAULT NULL,
  `nome_completo` varchar(100) DEFAULT NULL,
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `código_de_registro` (`código_de_registro`),
  KEY `id_especialidade_medico` (`id_especialidade_medico`),
  KEY `medico_FK` (`id_usuario`),
  CONSTRAINT `medico_FK` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `medico_ibfk_1` FOREIGN KEY (`id_especialidade_medico`) REFERENCES `especialidade_medico` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medico`
--

LOCK TABLES `medico` WRITE;
/*!40000 ALTER TABLE `medico` DISABLE KEYS */;
/*!40000 ALTER TABLE `medico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paciente`
--

DROP TABLE IF EXISTS `paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paciente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `endereco` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `data_nasc` date DEFAULT NULL,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `nome_completo` varchar(100) DEFAULT NULL,
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `paciente_FK` (`id_usuario`),
  CONSTRAINT `paciente_FK` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente`
--

LOCK TABLES `paciente` WRITE;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
/*!40000 ALTER TABLE `paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `apelido` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `autorizacao` enum('MEDICO','PACIENTE','ADMINISTRADOR') DEFAULT NULL,
  `data_criacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-29 17:43:59
