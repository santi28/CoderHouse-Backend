--- Creación de la base de datos
CREATE DATABASE mybase;
USE mybase;

--- Creación de la tabla con los campos (id, nombre, apellido, edad, email)
CREATE TABLE persona (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    edad INT UNSIGNED NOT NULL,
    email VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

--- Inserción de datos
INSERT INTO persona (nombre, apellido, edad, email) VALUES ('Santiago', 'de Nicolás', 21, 'santidenicolas@gmail.com');

--- Consulta todos los datos de la tabla usuarios
SELECT * FROM persona;

--- Borrar los usuarios donde el id sea igual a 2
DELETE FROM persona WHERE id = 2;

--- Actualizar el nombre del usuario con id 1
UPDATE persona SET nombre = 'Santi' WHERE id = 1;