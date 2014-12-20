-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: 127.0.0.1
-- 生成日期: 2014 年 12 月 04 日 15:10
-- 服务器版本: 5.1.56-community-log
-- PHP 版本: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `lostisland`
--

-- --------------------------------------------------------

--
-- 表的结构 `card_saber`
--

CREATE TABLE IF NOT EXISTS `card_saber` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) CHARACTER SET utf8 NOT NULL,
  `normalAvatar` varchar(256) CHARACTER SET utf8 NOT NULL,
  `select_list` varchar(256) CHARACTER SET utf8 NOT NULL,
  `charater_main` varchar(256) CHARACTER SET utf8 NOT NULL,
  `battleAvatar` varchar(256) CHARACTER SET utf8 NOT NULL,
  `atk` int(2) NOT NULL,
  `hp` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- 转存表中的数据 `card_saber`
--

INSERT INTO `card_saber` (`id`, `name`, `normalAvatar`, `select_list`, `charater_main`, `battleAvatar`, `atk`, `hp`) VALUES
(1, '默认', 'normalAvatar/card_3_5.png', 'select_list/card_1_4.png', 'character_main/card_4_1.png', 'battleAvatar/card_1_2.png', 3, 7),
(2, '狙击手', 'normalAvatar/card_3_5.png', 'select_list/card_1_4.png', 'character_main/card_4_1.png', 'battleAvatarcard_1_2.png', 33, 4),
(3, '魔法师', 'normalAvatar/card_3_5.png', 'select_list/card_1_4.png', 'character_main/card_4_1.png', 'battleAvatar/card_1_2.png', 2, 5),
(4, '骑兵', 'normalAvatar/card_3_5.png', 'select_list/card_1_4.png', 'character_main/card_4_1.png', 'battleAvatar/card_1_2.png', 1, 1),
(5, '刺客', 'normalAvatar/card_3_5.png', 'select_list/card_1_4.png', 'character_main/card_4_1.png', 'battleAvatar/card_1_2.png', 4, 4);

-- --------------------------------------------------------

--
-- 表的结构 `client_tokens`
--

CREATE TABLE IF NOT EXISTS `client_tokens` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `client_token` varchar(64) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `user_cards`
--

CREATE TABLE IF NOT EXISTS `user_cards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `all_cards` varchar(128) NOT NULL,
  `deck_cards` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `user_list`
--

CREATE TABLE IF NOT EXISTS `user_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_token` varchar(64) NOT NULL,
  `user_token` varchar(64) NOT NULL,
  `username` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_token` (`user_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
