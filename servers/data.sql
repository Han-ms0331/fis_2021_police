CREATE TABLE `login` (
  `id` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `logs` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `login` VALUES ('a','12345','developer');
INSERT INTO `login` VALUES ('b','23456','database administrator');
INSERT INTO `login` VALUES ('c','34567','data scientist, developer');