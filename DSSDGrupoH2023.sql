create database DSSDGrupoH2023;

use DSSDGrupoH2023;

CREATE TABLE `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id_user`)
);

CREATE TABLE `recipe` (
  `id_recipe` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `ingredients` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `steps` varchar(255) NOT NULL,
  `preparation_time` int NOT NULL,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id_recipe`),
  FOREIGN KEY (id_user) REFERENCES users(id_user)
) ;