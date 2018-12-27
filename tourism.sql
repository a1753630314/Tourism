/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50550
Source Host           : localhost:3306
Source Database       : tourism

Target Server Type    : MYSQL
Target Server Version : 50550
File Encoding         : 65001

Date: 2018-12-14 15:07:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `details`
-- ----------------------------
DROP TABLE IF EXISTS `details`;
CREATE TABLE `details` (
  `did` int(10) NOT NULL AUTO_INCREMENT,
  `id` int(10) NOT NULL,
  `family` varchar(300) DEFAULT NULL COMMENT '家人姓名',
  `start_time` date DEFAULT NULL,
  `flight` varchar(200) DEFAULT NULL COMMENT '航班',
  `time` varchar(10) DEFAULT NULL COMMENT '时间',
  `destination` varchar(500) DEFAULT NULL COMMENT '目的地',
  `telephone` varchar(11) DEFAULT NULL COMMENT '联系方式',
  `members` varchar(300) DEFAULT NULL COMMENT '同组成员',
  `remarks` varchar(3000) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`did`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of details
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `uname` varchar(50) DEFAULT NULL,
  `upass` varchar(50) DEFAULT NULL,
  `company` varchar(200) DEFAULT NULL,
  `role` int(1) DEFAULT NULL COMMENT '用户角色总账户0，一级账户1，二级账户2',
  `uid` int(10) DEFAULT NULL COMMENT '下一级用户id',
  `linkman` varchar(50) DEFAULT NULL,
  `linktel` bigint(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', 'admin', '超级管理员', '0', '0', '超级管理员', null);
