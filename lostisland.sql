-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2014-12-22 03:38:55
-- 服务器版本： 5.6.20
-- PHP Version: 5.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

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
  `charater_main` varchar(256) CHARACTER SET utf8 NOT NULL,
  `battleAvatar` varchar(256) CHARACTER SET utf8 NOT NULL,
  `atk` int(2) NOT NULL,
  `hp` int(2) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `card_saber`
--

INSERT INTO `card_saber` (`id`, `name`, `normalAvatar`, `select_list`, `charater_main`, `battleAvatar`, `atk`, `hp`) VALUES
(1, '默认', 'normalAvatar/card_3_5.png', 'select_list/card_1_4.png', 'character_main/card_4_1.png', 'battleAvatar/card_1_2.png', 3, 7);

-- --------------------------------------------------------

--
-- 表的结构 `client_tokens`
--

CREATE TABLE IF NOT EXISTS `client_tokens` (
`id` int(8) NOT NULL,
  `client_token` varchar(64) CHARACTER SET latin1 NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `client_tokens`
--

INSERT INTO `client_tokens` (`id`, `client_token`) VALUES
(1, '89eb56dX2a039ccaX197'),
(2, '9c835aeX1ea4b5edX013a');

-- --------------------------------------------------------

--
-- 表的结构 `user_cards`
--

CREATE TABLE IF NOT EXISTS `user_cards` (
`id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `all_cards` varchar(128) NOT NULL,
  `deck_cards` text NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `user_cards`
--

INSERT INTO `user_cards` (`id`, `uid`, `all_cards`, `deck_cards`) VALUES
(1, 1, 'a:10:{i:0;i:1;i:1;i:1;i:2;i:1;i:3;i:1;i:4;i:1;i:5;i:1;i:6;i:1;i:7;i:1;i:8;i:1;i:9;i:1;}', 'a:10:{i:0;i:1;i:1;i:1;i:2;i:1;i:3;i:1;i:4;i:1;i:5;i:1;i:6;i:1;i:7;i:1;i:8;i:1;i:9;i:1;}'),
(2, 2, 'a:10:{i:0;i:1;i:1;i:1;i:2;i:1;i:3;i:1;i:4;i:1;i:5;i:1;i:6;i:1;i:7;i:1;i:8;i:1;i:9;i:1;}', 'a:10:{i:0;i:1;i:1;i:1;i:2;i:1;i:3;i:1;i:4;i:1;i:5;i:1;i:6;i:1;i:7;i:1;i:8;i:1;i:9;i:1;}');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `user_list`
--

INSERT INTO `user_list` (`id`, `client_token`, `user_token`, `username`, `character`) VALUES
(1, '89eb56dX2a039ccaX197', '76f0715X2ff86d25X1cef', 'userInit', '/Public/images/character/card_1_2.png'),
(2, '9c835aeX1ea4b5edX013a', '89704b2X01145de9X149a', '初始2号', '/Public/images/character/card_1_2.png');

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
MODIFY `id` int(8) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `user_cards`
--
ALTER TABLE `user_cards`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `user_list`
--
ALTER TABLE `user_list`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;