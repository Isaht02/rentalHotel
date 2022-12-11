/*
 Navicat Premium Data Transfer

 Source Server         : sampviet
 Source Server Type    : MySQL
 Source Server Version : 100425
 Source Host           : localhost:3306
 Source Schema         : rentalhotel

 Target Server Type    : MySQL
 Target Server Version : 100425
 File Encoding         : 65001

 Date: 11/12/2022 21:04:42
*/
CREATE DATABASE IF NOT EXISTS rentalhotel;
use rentalhotel;
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for accounts
-- ----------------------------
DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `firstname` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `lastname` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phone` int(12) NULL DEFAULT NULL,
  `gender` int(11) NULL DEFAULT NULL,
  `type` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of accounts
-- ----------------------------
INSERT INTO `accounts` VALUES (1, 'lanvo34', '$2b$10$qs5sZqiweccHMt/6LcVCse9xc5ZvXVyCpuUvOp19z10xR/BJsqdri', 'Lan', 'Vo', '24/7 A', 764984824, 0, 0);
INSERT INTO `accounts` VALUES (2, 'v.iaht', '$2b$10$fZpoAeUZtaki13gT8Fxh2e9Y3aAIad1PZW6Lpto6HBK12PsBgD8Qe', 'Thai', 'Vo', '24/7 B', 764984824, 1, 0);

SET FOREIGN_KEY_CHECKS = 1;
