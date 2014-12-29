-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2014-12-29 02:47:40
-- 服务器版本： 5.5.20-log
-- PHP Version: 5.3.10

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
-- 表的结构 `card_saber`
--

CREATE TABLE IF NOT EXISTS `card_saber` (
`id` int(4) NOT NULL,
  `name` varchar(256) CHARACTER SET utf8 NOT NULL,
  `normalAvatar` varchar(256) CHARACTER SET utf8 NOT NULL,
  `select_list` varchar(256) CHARACTER SET utf8 NOT NULL,
  `character_main` varchar(256) CHARACTER SET utf8 NOT NULL,
  `battleAvatar` varchar(256) CHARACTER SET utf8 NOT NULL,
  `atk` int(2) NOT NULL,
  `hp` int(2) NOT NULL
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
`id` int(8) NOT NULL,
  `client_token` varchar(64) CHARACTER SET latin1 NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `client_tokens`
--

INSERT INTO `client_tokens` (`id`, `client_token`) VALUES
(1, '89eb56dX2a039ccaX197'),
(2, '9c835aeX1ea4b5edX013a'),
(3, '63936fbX1cc93ac4X62');

-- --------------------------------------------------------

--
-- 表的结构 `user_cards`
--

CREATE TABLE IF NOT EXISTS `user_cards` (
`id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `all_cards` varchar(128) NOT NULL,
  `deck_cards` text NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `user_cards`
--

INSERT INTO `user_cards` (`id`, `uid`, `all_cards`, `deck_cards`) VALUES
(1, 1, 'a:1:{i:0;s:5:"card1";}', 'a:10:{i:0;s:5:"card1";i:1;s:5:"card1";i:2;s:5:"card1";i:3;s:5:"card1";i:4;s:5:"card1";i:5;s:5:"card1";i:6;s:5:"card1";i:7;s:5:"card1";i:8;s:5:"card1";i:9;s:5:"card1";}');

-- --------------------------------------------------------

--
-- 表的结构 `user_list`
--

CREATE TABLE IF NOT EXISTS `user_list` (
`id` int(11) NOT NULL,
  `client_token` varchar(64) NOT NULL,
  `user_token` varchar(64) NOT NULL,
  `username` varchar(256) NOT NULL,
  `character` varchar(64) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `user_list`
--

INSERT INTO `user_list` (`id`, `client_token`, `user_token`, `username`, `character`) VALUES
(1, '63936fbX1cc93ac4X62', '93129c7X28b5be66X272', '一号user', '/Public/images/character/card_1_2.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `card_saber`
--
ALTER TABLE `card_saber`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client_tokens`
--
ALTER TABLE `client_tokens`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_cards`
--
ALTER TABLE `user_cards`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_list`
--
ALTER TABLE `user_list`
 ADD PRIMARY KEY (`id`), ADD KEY `user_token` (`user_token`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `card_saber`
--
ALTER TABLE `card_saber`
MODIFY `id` int(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `client_tokens`
--
ALTER TABLE `client_tokens`
MODIFY `id` int(8) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `user_cards`
--
ALTER TABLE `user_cards`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `user_list`
--
ALTER TABLE `user_list`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
