-- phpMyAdmin SQL Dump
-- version 4.1.9
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2015-01-01 13:26:05
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
(1, 'railgun', 'Public/images/hero/hero1.jpg');

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
  `atk` int(2) NOT NULL,
  `hp` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `card_saber`
--

INSERT INTO `card_saber` (`id`, `name`, `normalAvatar`, `select_list`, `character_main`, `battleAvatar`, `atk`, `hp`) VALUES
(1, '默认', 'normalAvatar/card_3_5.png', 'select_list/card_1_4.png', 'character_main/card_4_1.png', 'battleAvatar/card_1_2.png', 3, 7);

-- --------------------------------------------------------

--
-- 表的结构 `client_tokens`
--

CREATE TABLE IF NOT EXISTS `client_tokens` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `client_token` varchar(64) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- 转存表中的数据 `client_tokens`
--

INSERT INTO `client_tokens` (`id`, `client_token`) VALUES
(1, '89eb56dX2a039ccaX197'),
(2, '9c835aeX1ea4b5edX013a'),
(3, '63936fbX1cc93ac4X62'),
(13, '803359dX722de39X25f2');

-- --------------------------------------------------------

--
-- 表的结构 `user_cards`
--

CREATE TABLE IF NOT EXISTS `user_cards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `all_cards` varchar(128) DEFAULT NULL,
  `deck_cards` text,
  `deck_cards_2` text,
  `deck_cards_3` text,
  `deck_cards_4` text,
  `deck_cards_5` text,
  `deck_cards_6` text,
  `deck_cards_7` text,
  `deck_cards_8` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `user_cards`
--

INSERT INTO `user_cards` (`id`, `uid`, `all_cards`, `deck_cards`, `deck_cards_2`, `deck_cards_3`, `deck_cards_4`, `deck_cards_5`, `deck_cards_6`, `deck_cards_7`, `deck_cards_8`) VALUES
(1, 10, 'a:1:{i:0;s:5:"card1";}', 'a:2:{s:4:"hero";s:5:"hero1";s:4:"deck";a:10:{i:0;s:5:"card1";i:1;s:5:"card1";i:2;s:5:"card1";i:3;s:5:"card1";i:4;s:5:"card1";i:5;s:5:"card1";i:6;s:5:"card1";i:7;s:5:"card1";i:8;s:5:"card1";i:9;s:5:"card1";}}', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
  PRIMARY KEY (`id`),
  KEY `user_token` (`user_token`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- 转存表中的数据 `user_list`
--

INSERT INTO `user_list` (`id`, `client_token`, `user_token`, `username`, `character`) VALUES
(10, '803359dX722de39X25f2', 'b9b3917X70636acX115', 'heroXX', '/Public/images/character/card_1_2.png');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
