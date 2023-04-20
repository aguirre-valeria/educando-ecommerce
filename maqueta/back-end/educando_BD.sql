CREATE SCHEMA IF NOT EXISTS `Educando` DEFAULT CHARACTER SET utf8 ;

USE `Educando` ;

-- -----------------------------------------------------
-- Table `Educando`.`Rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Educando`.`Rol` (
  `id_Rol` INT NOT NULL,
  `Tipo` INT NOT NULL,
  PRIMARY KEY (`id_Rol`))
ENGINE = InnoDB;

select * from rol;

insert into Rol 
(id_rol,tipo) values (1,1);
-- -----------------------------------------------------
-- Table `Educando`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Educando`.`Usuario` (
  `id_Usuario` INT NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Apellido` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Contraseña` VARCHAR(45) NOT NULL,
  `Posts` VARCHAR(45) NULL,
  `Rol_id_Rol` INT NOT NULL,
  PRIMARY KEY (`id_Usuario`, `Rol_id_Rol`),
  INDEX `fk_Usuario_Rol_idx` (`Rol_id_Rol` ASC) )
ENGINE = InnoDB;

select* from Usuario;

insert INTO Usuario
  (id_Usuario,Nombre,Apellido,Email,Contraseña,posts, rol_id_rol)
  VALUES (1,'Dario','Lopez','prueba@hotmail.com',12345,'Comentario',1);

-- -----------------------------------------------------
-- Table `Educando`.`Categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Educando`.`Categoria` (
  `id_Categoria` INT NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_Categoria`))
ENGINE = InnoDB;

select* from categoria;

insert INTO categoria
  (id_Categoria,Nombre,Descripcion)
  VALUES (1,'Educando','Prueba');

-- -----------------------------------------------------
-- Table `Educando`.`Posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Educando`.`Posts` (
  `id_Posts` INT NOT NULL,
  `Fecha` DATE NOT NULL,
  `Contenido` VARCHAR(45) NOT NULL,
  `Etiqueta` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_Posts`))
ENGINE = InnoDB;

select* from posts;

insert INTO Posts
  (id_Posts,Fecha,Contenido,Etiqueta)
  VALUES (1,'2022-11-22','posteo','Primer posts');

-- -----------------------------------------------------
-- Table `Educando`.`Curso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Educando`.`Curso` (
  `id_Curso` INT NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Usuario_id_Usuario` INT NOT NULL,
  `Usuario_Rol_id_Rol` INT NOT NULL,
  `Mensaje` VARCHAR(45) NULL,
  PRIMARY KEY (`id_Curso`, `Usuario_id_Usuario`, `Usuario_Rol_id_Rol`))
ENGINE = InnoDB;

select* from Curso;

insert INTO Curso
  (id_Curso,Nombre,Usuario_id_Usuario,Usuario_Rol_id_Rol,Mensaje)
  VALUES (1,'Matematica',1,1,'Matematica1');
-- -----------------------------------------------------
-- Table `Educando`.`usuariosporcurso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Educando`.`usuariosporcurso` (
  `usuarioporcurso` INT NOT NULL,
  `id_Curso1` VARCHAR(45) NULL,
  `id_Usuario1` VARCHAR(45) NULL,
  PRIMARY KEY (`usuarioporcurso`))
ENGINE = InnoDB;

