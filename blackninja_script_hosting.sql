-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- Servidor: sql107.byethost.com
-- Tiempo de generación: 05-05-2019 a las 08:23:52
-- Versión del servidor: 5.6.41-84.1
-- Versión de PHP: 5.3.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `b9_23751306_blackninja`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `identificador` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `foto` varchar(250) NOT NULL,
  `nivel1` tinyint(4) DEFAULT NULL,
  `ptje1` int(11) DEFAULT NULL,
  `nivel2` tinyint(255) DEFAULT NULL,
  `ptje2` int(11) DEFAULT NULL,
  `nivel3` tinyint(255) DEFAULT NULL,
  `ptje3` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=36 ;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `identificador`, `nombre`, `foto`, `nivel1`, `ptje1`, `nivel2`, `ptje2`, `nivel3`, `ptje3`) VALUES
(7, 'mabc@live.cl', 'Marcelo Bravo', 'views/img/intro/pedro.png', 1, 271, 1, 418, 1, 829),
(35, 'juanshoalbo1987@gmail.com', 'juan', 'views/img/intro/anonymous.png', NULL, 0, NULL, 0, NULL, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
