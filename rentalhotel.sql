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

 Date: 13/12/2022 21:46:20
*/

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

-- ----------------------------
-- Table structure for facilities
-- ----------------------------
DROP TABLE IF EXISTS `facilities`;
CREATE TABLE `facilities`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of facilities
-- ----------------------------
INSERT INTO `facilities` VALUES (1, 'Nice view\r\n');
INSERT INTO `facilities` VALUES (2, 'Wifi availabe');
INSERT INTO `facilities` VALUES (3, 'Funiture is wood and clean');

-- ----------------------------
-- Table structure for payments
-- ----------------------------
DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reservations_id` int(12) NULL DEFAULT NULL,
  `customer_id` int(12) NULL DEFAULT NULL,
  `total_price` int(11) NULL DEFAULT NULL,
  `date` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of payments
-- ----------------------------

-- ----------------------------
-- Table structure for reservations
-- ----------------------------
DROP TABLE IF EXISTS `reservations`;
CREATE TABLE `reservations`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NULL DEFAULT NULL,
  `room_id` int(11) NULL DEFAULT NULL,
  `date` datetime(0) NULL DEFAULT NULL,
  `date_in` date NULL DEFAULT NULL,
  `date_out` date NULL DEFAULT NULL,
  `total_payment` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for rooms
-- ----------------------------
DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `price` int(12) NULL DEFAULT NULL,
  `type` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `bedNum` int(12) NULL DEFAULT NULL,
  `peopleNum` int(12) NULL DEFAULT NULL,
  `img` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `view` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `des` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rooms
-- ----------------------------
INSERT INTO `rooms` VALUES (1, 'Suite Room', 100, 'Small', 1, 2, '/images/room-2.jpg', 'Sea View', 'Lorem Ipsum available,but the majority have suffered alteration in some form,by injected humour,or randomised words which don\'t look even slightly believable.but the majority have suffered alteration in some form,by injected humour');
INSERT INTO `rooms` VALUES (2, 'Standard Room', 200, 'Medium', 2, 4, '/images/room-3.jpg', 'Sea View', 'Lorem Ipsum available,but the majority have suffered alteration in some form,by injected humour,or randomised words which don\'t look even slightly believable.but the majority have suffered alteration in some form,by injected humour');
INSERT INTO `rooms` VALUES (3, 'Family Room', 300, 'Big', 2, 5, '/images/room-4.jpg', 'Sea View', 'Lorem Ipsum available,but the majority have suffered alteration in some form,by injected humour,or randomised words which don\'t look even slightly believable.but the majority have suffered alteration in some form,by injected humour');
INSERT INTO `rooms` VALUES (4, 'Deluxury Room', 100, 'Small', 2, 2, '/images/room-5.jpg', 'Sea View', 'Lorem Ipsum available,but the majority have suffered alteration in some form,by injected humour,or randomised words which don\'t look even slightly believable.but the majority have suffered alteration in some form,by injected humour');
INSERT INTO `rooms` VALUES (5, 'Superior Room', 350, 'Big', 2, 5, '/images/room-6.jpg', 'Sea View', 'Lorem Ipsum available,but the majority have suffered alteration in some form,by injected humour,or randomised words which don\'t look even slightly believable.but the majority have suffered alteration in some form,by injected humour');
INSERT INTO `rooms` VALUES (6, 'Private Room', 70, 'Small', 1, 1, '/images/room-1.jpg', 'Sea View', 'Lorem Ipsum available,but the majority have suffered alteration in some form,by injected humour,or randomised words which don\'t look even slightly believable.but the majority have suffered alteration in some form,by injected humour');
INSERT INTO `rooms` VALUES (7, 'Luxury Room', 220, 'Medium', 2, 3, '/images/room-6.jpg', 'Sea View', 'Lorem Ipsum available,but the majority have suffered alteration in some form,by injected humour,or randomised words which don\'t look even slightly believable.but the majority have suffered alteration in some form,by injected humour');
INSERT INTO `rooms` VALUES (8, 'Sunny Room', 320, 'Big', 2, 5, '/images/room-4.jpg', 'Sea View', 'Lorem Ipsum available,but the majority have suffered alteration in some form,by injected humour,or randomised words which don\'t look even slightly believable.but the majority have suffered alteration in some form,by injected humour');
INSERT INTO `rooms` VALUES (9, 'Cloudy Room', 220, 'Medium', 2, 3, '/images/room-4.jpg', 'Sea View', 'Lorem Ipsum available,but the majority have suffered alteration in some form,by injected humour,or randomised words which don\'t look even slightly believable.but the majority have suffered alteration in some form,by injected humour');
INSERT INTO `rooms` VALUES (10, 'Wood Room', 300, 'Big', 2, 4, '/images/room-1.jpg', 'Sea View', 'Lorem Ipsum available,but the majority have suffered alteration in some form,by injected humour,or randomised words which don\'t look even slightly believable.but the majority have suffered alteration in some form,by injected humour');

-- ----------------------------
-- Table structure for roomtypes
-- ----------------------------
DROP TABLE IF EXISTS `roomtypes`;
CREATE TABLE `roomtypes`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `price` int(12) NULL DEFAULT NULL,
  `bedNum` int(12) NULL DEFAULT NULL,
  `peopleNum` int(12) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roomtypes
-- ----------------------------
INSERT INTO `roomtypes` VALUES (1, 'small', 100, 2, 3);
INSERT INTO `roomtypes` VALUES (2, 'medium', 200, 2, 4);
INSERT INTO `roomtypes` VALUES (3, 'big', 300, 2, 5);

SET FOREIGN_KEY_CHECKS = 1;
