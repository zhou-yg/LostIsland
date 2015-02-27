-- phpMyAdmin SQL Dump
-- version 4.1.9
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2015-02-24 12:17:33
-- 服务器版本： 5.6.22
-- PHP Version: 5.5.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `lostisland`
--

-- --------------------------------------------------------

--
-- 表的结构 `card_hero`
--

CREATE TABLE IF NOT EXISTS `card_hero` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `img` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `card_hero`
--

INSERT INTO `card_hero` (`id`, `name`, `img`) VALUES
(1, 'railgun', 'hero1.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `card_saber`
--

CREATE TABLE IF NOT EXISTS `card_saber` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) CHARACTER SET utf8 NOT NULL,
  `normalAvatar` varchar(256) CHARACTER SET utf8 NOT NULL,
  `select_list` varchar(256) CHARACTER SET utf8 NOT NULL,
  `character_main` varchar(256) CHARACTER SET utf8 NOT NULL,
  `battleAvatar` varchar(256) CHARACTER SET utf8 NOT NULL,
  `type` varchar(4) NOT NULL,
  `atk` int(2) NOT NULL,
  `hp` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `card_saber`
--

INSERT INTO `card_saber` (`id`, `name`, `normalAvatar`, `select_list`, `character_main`, `battleAvatar`, `type`, `atk`, `hp`) VALUES
(1, '默认', 'card1/normalAvatar/card_3_5.png', 'card1/select_list/card_1_4.png', 'card1/character_main/card_4_1.png', 'card1/battleAvatar/card_1_2.png', 's', 3, 7),
(2, 'name', 'card2/battleAvatar/panda49.jpg', 'card2/character_main/panda49.png', 'card2/normalAvatar/panda49.jpg', 'card2/select_list/panda49.jpg', 'j', 12, 4);

-- --------------------------------------------------------

--
-- 表的结构 `client_tokens`
--

CREATE TABLE IF NOT EXISTS `client_tokens` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `client_token` varchar(64) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=29 ;

--
-- 转存表中的数据 `client_tokens`
--

INSERT INTO `client_tokens` (`id`, `client_token`) VALUES
(1, '89eb56dX2a039ccaX197'),
(2, '9c835aeX1ea4b5edX013a'),
(3, '63936fbX1cc93ac4X62'),
(13, '803359dX722de39X25f2'),
(17, 'afb0193X22b5eaafX278'),
(18, '93a795bX2ea15b3bXc10'),
(19, '92e30d4X2e461f23X2b4'),
(20, 'b9b5523X24856ed3X12b0'),
(21, '7691959X18b8351dX1a6c'),
(22, '932d4b9X187d4a55X2f'),
(24, '6cbe70bXced0260X57'),
(25, '937556bX305632fdX15a'),
(26, '89eda25X0b5f7b2X0318'),
(28, 'a658093X01aba5d5Xaf');

-- --------------------------------------------------------

--
-- 表的结构 `user_cards`
--

CREATE TABLE IF NOT EXISTS `user_cards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `all_heroes` varchar(128) NOT NULL,
  `all_cards` varchar(128) DEFAULT NULL,
  `all_decks` text NOT NULL,
  `deck_cards` text,
  `deck_cards_2` text,
  `deck_cards_3` text,
  `deck_cards_4` text,
  `deck_cards_5` text,
  `deck_cards_6` text,
  `deck_cards_7` text,
  `deck_cards_8` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- 转存表中的数据 `user_cards`
--

INSERT INTO `user_cards` (`id`, `uid`, `all_heroes`, `all_cards`, `all_decks`, `deck_cards`, `deck_cards_2`, `deck_cards_3`, `deck_cards_4`, `deck_cards_5`, `deck_cards_6`, `deck_cards_7`, `deck_cards_8`) VALUES
(7, 16, 'a:1:{i:0;s:5:"hero1";}', 'a:1:{i:0;s:5:"card1";}', 'a:3:{s:6:"result";b:1;s:4:"data";a:2:{s:5:"cards";s:9:"["card1"]";s:6:"heroes";s:9:"["hero1"]";}i:1;s:75:"O:8:"stdClass":2:{s:4:"hero";s:5:"hero1";s:4:"deck";a:1:{i:0;s:5:"card1";}}";}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 18, 'a:1:{i:0;s:5:"hero1";}', 'a:1:{i:0;s:5:"card1";}', 'a:3:{s:5:"cards";s:9:"["card1"]";s:6:"heroes";s:9:"["hero1"]";i:1;s:91:"O:8:"stdClass":2:{s:4:"hero";s:5:"hero1";s:4:"deck";a:2:{i:0;s:5:"card1";i:1;s:5:"card1";}}";}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 19, 'a:1:{i:0;s:5:"hero1";}', 'a:1:{i:0;s:5:"card1";}', 'a:1:{i:0;a:2:{s:4:"hero";s:5:"hero1";s:4:"deck";a:10:{i:0;s:5:"card1";i:1;s:5:"card1";i:2;s:5:"card1";i:3;s:5:"card1";i:4;s:5:"card1";i:5;s:5:"card1";i:6;s:5:"card1";i:7;s:5:"card1";i:8;s:5:"card1";i:9;s:5:"card1";}}}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 20, 'a:1:{i:0;s:5:"hero1";}', 'a:1:{i:0;s:5:"card1";}', 'a:3:{i:0;O:8:"stdClass":2:{s:4:"hero";s:5:"hero1";s:4:"deck";a:4:{i:0;s:5:"card1";i:1;s:5:"card1";i:2;s:5:"card1";i:3;s:5:"card1";}}i:1;O:8:"stdClass":2:{s:4:"hero";s:5:"hero1";s:4:"deck";a:4:{i:0;s:5:"card1";i:1;s:5:"card1";i:2;s:5:"card1";i:3;s:5:"card1";}}i:2;O:8:"stdClass":2:{s:4:"hero";s:5:"hero1";s:4:"deck";a:4:{i:0;s:5:"card1";i:1;s:5:"card1";i:2;s:5:"card1";i:3;s:5:"card1";}}}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `user_list`
--

CREATE TABLE IF NOT EXISTS `user_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_token` varchar(64) NOT NULL,
  `user_token` varchar(64) NOT NULL,
  `username` varchar(256) NOT NULL,
  `character` varchar(64) NOT NULL,
  `win` int(8) NOT NULL,
  `lose` int(8) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_token` (`user_token`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- 转存表中的数据 `user_list`
--

INSERT INTO `user_list` (`id`, `client_token`, `user_token`, `username`, `character`, `win`, `lose`) VALUES
(15, '7691959X18b8351dX1a6c', '634cf33X1eae19b0X134', '啦啦啦', '/Public/images/character/card_1_2.png', 0, 0),
(16, '932d4b9X187d4a55X2f', '6d39005X1e7293d1X16ab', '呜呜', '/Public/images/character/card_1_2.png', 0, 0),
(18, '6cbe70bXced0260X57', 'a6ba333Xcecf2c0X57', '呜呜d', '/Public/images/character/card_1_2.png', 0, 0),
(19, '937556bX305632fdX15a', '769114dX364c2df3X2e', '呜呜2', '/Public/images/character/card_1_2.png', 0, 0),
(20, '89eda25X0b5f7b2X0318', '634cf83X0b5f815X150', '呜呜3', '/Public/images/character/card_1_2.png', 0, 0),
(22, 'a658093X01aba5d5Xaf', 'b9536b1X01aba266X0277', '呜呜3d', '/Public/images/character/card_1_2.png', 0, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
