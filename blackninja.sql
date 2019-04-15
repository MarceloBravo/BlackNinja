/*
Navicat MySQL Data Transfer

Source Server         : MySql
Source Server Version : 50723
Source Host           : 127.0.0.1:3306
Source Database       : blackninja

Target Server Type    : MYSQL
Target Server Version : 50723
File Encoding         : 65001

Date: 2019-04-12 20:00:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for usuarios
-- ----------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
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
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of usuarios
-- ----------------------------
INSERT INTO `usuarios` VALUES ('7', 'mabc@live.cl', 'Marcelo Bravo', 'views/img/intro/pedro.png', '1', '271', '1', '418', '1', '829');
