CREATE TABLE `competencia` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(70) NOT NULL DEFAULT '',
  `genero_id` int(11) unsigned NULL,
  `actor_id` int(11) unsigned  NULL,
  `director_id` int(11) unsigned NULL,
  PRIMARY KEY (`id`),
  KEY `FK_competencia_genero` (`genero_id`),
  CONSTRAINT `FK_competencia_genero` FOREIGN KEY (`genero_id`) REFERENCES `genero` (`id`),
  KEY `FK_competencia_actor` (`actor_id`),
  CONSTRAINT `FK_competencia_actor` FOREIGN KEY (`actor_id`) REFERENCES `actor` (`id`),
   KEY `FK_competencia_director` (`director_id`),
  CONSTRAINT `FK_competencia_director` FOREIGN KEY (`director_id`) REFERENCES `director` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `voto` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `competencia_id` int(11) unsigned NULL,
  `pelicula_id` int(11) unsigned  NULL,
  PRIMARY KEY (`id`),
  KEY `FK_voto_competencia` (`competencia_id`),
  CONSTRAINT `FK_voto_competencia` FOREIGN KEY (`competencia_id`) REFERENCES `competencia` (`id`),
  KEY `FK_voto_pelicula` (`pelicula_id`),
  CONSTRAINT `FK_voto_pelicula` FOREIGN KEY (`pelicula_id`) REFERENCES `pelicula` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;