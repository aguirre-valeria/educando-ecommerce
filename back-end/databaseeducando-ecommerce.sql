

-- -----------------------------------------------------
-- Schema educandoecommerce-2023
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `educandoecommerce-2023` ;

-- -----------------------------------------------------
-- Schema educandoecommerce-2023
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `educandoecommerce-2023` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
USE `educandoecommerce-2023` ;

-- -----------------------------------------------------
-- Table `Carrito`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Carrito` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Carrito` (
  `idCarrito` INT NOT NULL,
  `idCurso` INT NULL,
  `NombreCurso` VARCHAR(45) NULL,
  `IdEmail` VARCHAR(45) NULL,
  `Cantidad` INT NULL,
  `Totalsuma` FLOAT NULL,
  PRIMARY KEY (`idCarrito`))
ENGINE = InnoDB;

SHOW WARNINGS;
INSERT INTO `Carrito` (`idCarrito`, `idCurso`, `NombreCurso`, `IdEmail`, `Cantidad`, `Totalsuma`) 
VALUES (1, 2, 'Programacion', 'correo@ejemplo.com', 3, 150.00);

SELECT * FROM `Carrito`;
-- -----------------------------------------------------
-- Table `Categoria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Categoria` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Categoria` (
  `idCategoria` INT NOT NULL,
  `idUsuario` INT NULL,
  `idRol` INT NULL,
  `Nombre` VARCHAR(45) NULL,
  `Curso` INT NULL,
  `Descripcion` VARCHAR(45) NULL,
  PRIMARY KEY (`idCategoria`))
ENGINE = InnoDB;

SHOW WARNINGS;
INSERT INTO Categoria (idCategoria, idUsuario, idRol, Nombre, Curso, Descripcion)
VALUES (2, 1, 2, 'Categoria 2', 101, 'Descripción de la categoría 2');

SELECT * FROM Categoria WHERE idCategoria = 2;

-- -----------------------------------------------------
-- Table `Curso`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Curso` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Curso` (
  `idCurso` INT NOT NULL,
  `idRol` INT NULL,
  `idCategoria` INT NULL,
  `NombreCurso` VARCHAR(45) NULL,
  `Duracion` INT NULL,
  `Precio` INT NULL,
  
  PRIMARY KEY (`idCurso`))
ENGINE = InnoDB;

SHOW WARNINGS;
INSERT INTO Curso (idCurso, idRol, idCategoria, NombreCurso, Duracion, Precio)
VALUES (2, 2, 3, 'Introducción a MySQL', 30, 50);

SELECT * FROM Curso WHERE idCurso = 2;
-- -----------------------------------------------------
-- Table `Foro`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Foro` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Foro` (
  `idForo` INT NOT NULL,
  `idUsuarios` INT NULL,
  `idRol` INT NULL,
  `Nombre` VARCHAR(45) NULL,
  `Mensaje` VARCHAR(200) NULL,
  PRIMARY KEY (`idForo`))
ENGINE = InnoDB;

SHOW WARNINGS;

INSERT INTO Foro (idForo, idUsuarios, idRol, Nombre, Mensaje)
VALUES (5, 1, 2, 'Florencia Turletti', 'Hola a todos, estoy feliz de unirme a esta comunidad educativa');

SELECT * FROM Foro WHERE idForo = 5;

-- -----------------------------------------------------
-- Table `Rol`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Rol` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Rol` (
  `idRol` INT NOT NULL,
  `AltaRol` DATETIME NULL,
  `BajaRol` DATETIME NULL,
  PRIMARY KEY (`idRol`))
ENGINE = InnoDB;

SHOW WARNINGS;
INSERT INTO Rol (idRol, AltaRol, BajaRol) VALUES (1, '2022-05-03 12:00:00', '2023-05-03 12:00:00');

SELECT * FROM Rol WHERE idRol = 1;
-- -----------------------------------------------------
-- Table `Usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Usuario` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Usuario` (
  `idUsuario` INT NOT NULL,
  `Id-Usuario` VARCHAR(45) NULL,
  `id_Email` VARCHAR(45) NULL,
  `Nombre` VARCHAR(45) NULL,
  `Apellido` VARCHAR(45) NULL,
  `Contraseña` VARCHAR(45) NULL,
  `FechaAltaUsuario` DATETIME NULL,
  `FechaBajaUsuario` DATETIME NULL,
  `BlanquearContraseña` VARCHAR(45) NULL,
 
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;


SHOW WARNINGS;

INSERT INTO Usuario (idUsuario, `Id-Usuario`, id_Email, Nombre, Apellido, Contraseña, FechaAltaUsuario, FechaBajaUsuario, BlanquearContraseña)
VALUES (1, 'romeomoreno', 'romeomoreno20@hotmail.com', 'Romeo', 'Moreno', 'mypassword', NOW(), NULL, NULL);

SELECT * FROM Usuario;

-- -----------------------------------------------------
-- Table `contacto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `contacto` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `contacto` (
  `idForo` INT NOT NULL,
  `idUsuarios` INT NULL,
  `idRol` INT NULL,
  `Nombre` VARCHAR(45) NULL,
  `Mensaje` VARCHAR(200) NULL,
  PRIMARY KEY (`idForo`))
ENGINE = InnoDB;

SHOW WARNINGS;
INSERT INTO contacto (idForo, idUsuarios, idRol, Nombre, Mensaje) 
VALUES (1, 123, 456, 'Romeo Moreno', 'Hola, quisiera más información sobre sus cursos.');

SELECT * FROM contacto;

