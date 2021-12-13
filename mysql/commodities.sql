-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2021 at 10:06 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smaarrdec`
--

-- --------------------------------------------------------

--
-- Table structure for table `commodities`
--

CREATE TABLE `commodities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `commodity_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `commodity_content` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `commodity_image` text COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default.jpg',
  `commodity_slug` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority_type` int(11) NOT NULL DEFAULT 0 COMMENT '0 = Low Priority, 1 = Priority',
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '0 = Unactive, 1 = Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `commodities`
--

INSERT INTO `commodities` (`id`, `commodity_name`, `commodity_content`, `commodity_image`, `commodity_slug`, `priority_type`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Abaca', NULL, 'default.jpg', 'abaca', 0, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49'),
(2, 'Banana', NULL, 'banana.png', 'banana', 1, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49'),
(3, 'Cacao', NULL, 'cacao.png', 'cacao', 1, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49'),
(4, 'Cassava', NULL, 'default.jpg', 'cassava', 0, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49'),
(5, 'Coastal and Forest', NULL, 'default.jpg', 'costal-and-forest', 0, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49'),
(6, 'Coconut', NULL, 'coconut.png', 'coconut', 1, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49'),
(7, 'Dairy Cattle', NULL, 'default.jpg', 'dairy-cattle', 0, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49'),
(8, 'Durian', NULL, 'durian.png', 'durian', 1, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49'),
(9, 'Forest Trees', NULL, 'default.jpg', 'forest-trees', 0, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49'),
(10, 'Fruits', NULL, 'default.jpg', 'fruits', 0, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49'),
(11, 'Goat', NULL, 'default.jpg', 'goats', 0, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49'),
(12, 'Macapuno', NULL, 'default.jpg', 'macapuno', 0, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49'),
(13, 'Mangosteen', NULL, 'default.jpg', 'mangosteen', 0, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49'),
(14, 'Mushroom', NULL, 'default.jpg', 'mushroom', 0, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49'),
(15, 'Native Chicken', NULL, 'default.jpg', 'native-chicken', 0, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49'),
(16, 'Native Pig', NULL, 'default.jpg', 'native-pig', 0, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49'),
(17, 'Pig', NULL, 'default.jpg', 'pig', 0, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49'),
(18, 'Pummelo', NULL, 'pummelo.png', 'pummelo', 1, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49'),
(19, 'Rice', NULL, 'default.jpg', 'rice', 0, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49'),
(20, 'Rubber', NULL, 'default.jpg', 'rubber', 0, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49'),
(21, 'Soybean', NULL, 'default.jpg', 'soybean', 0, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49'),
(22, 'Vegetables', NULL, 'default.jpg', 'vegetables', 0, 1, '2021-07-26 06:41:49', '2021-07-26 06:41:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `commodities`
--
ALTER TABLE `commodities`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `commodities`
--
ALTER TABLE `commodities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
