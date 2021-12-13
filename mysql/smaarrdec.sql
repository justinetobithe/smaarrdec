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
-- Table structure for table `agencies`
--

CREATE TABLE `agencies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `agency_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo_url` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `site_url` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `acronym` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `region` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_carousel` int(11) NOT NULL COMMENT '0 = Hidden, 1 = Visible',
  `status` int(11) NOT NULL COMMENT '0 = Unactive, 1 = Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `agencies`
--

INSERT INTO `agencies` (`id`, `agency_name`, `content`, `logo_url`, `site_url`, `acronym`, `region`, `display_carousel`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Agricultural Training Institute', NULL, 'ATI-Logo.png', NULL, 'ATI', 'XI', 1, 1, '2021-07-26 06:41:35', '2021-07-26 06:41:35'),
(2, 'Bureau of Agricultural Research', NULL, 'BAR-Logo.png', NULL, 'BAR', '', 1, 1, '2021-07-26 06:41:35', '2021-07-26 06:41:35'),
(3, 'Bureau of Fisheries and Aquatic Resources', NULL, 'BFAR-Logo.png', NULL, 'BFAR', '', 1, 1, '2021-07-26 06:41:35', '2021-07-26 06:41:35'),
(4, 'Bureau of Plant Industry-Davao National Crops Research & Development Center', NULL, 'BPI-Logo.png', NULL, 'BPI-DNCRDC', '', 1, 1, '2021-07-26 06:41:35', '2021-07-26 06:41:35'),
(5, 'City Government of Davao', NULL, 'DC-Logo.png', NULL, '', 'XI', 1, 1, '2021-07-26 06:41:35', '2021-07-26 06:41:35'),
(6, 'Davao Integrated Development Program', NULL, 'DIDP-Logo.png', NULL, 'DIDP', '', 1, 1, '2021-07-26 06:41:35', '2021-07-26 06:41:35'),
(7, 'Davao Oriental State College of Science and Technology', NULL, 'DOSCST-Logo.png', NULL, 'DOSCST', '', 1, 1, '2021-07-26 06:41:35', '2021-07-26 06:41:35'),
(8, 'Department of Agriculture', NULL, 'DA-Logo.png', NULL, 'DA-RFU', 'XI', 1, 1, '2021-07-26 06:41:35', '2021-07-26 06:41:35'),
(9, 'Department of Environment and Natural Resource', NULL, 'DENR-Logo.png', NULL, 'DENR', 'XI', 1, 1, '2021-07-26 06:41:35', '2021-07-26 06:41:35'),
(10, 'Department of Science and Technology', NULL, 'DOST-Logo.png', NULL, 'DOST', 'XI', 1, 1, '2021-07-26 06:41:35', '2021-07-26 06:41:35'),
(11, 'Department of Trade and Industry', NULL, 'DTI-Logo.png', NULL, 'DTI', 'XI', 1, 1, '2021-07-26 06:41:35', '2021-07-26 06:41:35'),
(12, 'Department of Tourism', NULL, 'DOT-Logo.png', NULL, 'DoT', 'XI', 1, 1, '2021-07-26 06:41:35', '2021-07-26 06:41:35'),
(13, 'Philippine Fiber Industry Development Authority', NULL, 'FIDA-Logo.png', NULL, 'FIDA', 'XI', 1, 1, '2021-07-26 06:41:35', '2021-07-26 06:41:35'),
(14, 'National Economic and Development Authority', NULL, 'NEDA-Logo.png', NULL, 'NEDA', 'XI', 1, 1, '2021-07-26 06:41:36', '2021-07-26 06:41:36'),
(15, 'Philippine Coconut Authority-Davao Research Center', NULL, 'PCA-Logo.png', NULL, 'PCA-DRC', '', 1, 1, '2021-07-26 06:41:36', '2021-07-26 06:41:36'),
(16, 'Philippine Council for Agriculture Aquatic and Natural Resources Research And Development', NULL, 'PCAARRD-Logo.png', NULL, 'PCAARRD', '', 1, 1, '2021-07-26 06:41:36', '2021-07-26 06:41:36'),
(17, 'Provincial Government of Davao del Norte', NULL, 'DDN-Logo.png', NULL, 'DavNor', '', 1, 1, '2021-07-26 06:41:36', '2021-07-26 06:41:36'),
(18, 'Provincial Government of Davao Oriental', NULL, 'DO.png', NULL, 'DavOr', '', 1, 1, '2021-07-26 06:41:36', '2021-07-26 06:41:36'),
(19, 'Provincial Government of Davao del Sur', NULL, 'DDS-Logo.png', NULL, 'DavSur', '', 1, 1, '2021-07-26 06:41:36', '2021-07-26 06:41:36'),
(20, 'Southern Philippines Agri-business and Marine and Aquatic School of Technology', NULL, 'SPAMAST-Logo.png', NULL, 'SPAMAST', '', 1, 1, '2021-07-26 06:41:36', '2021-07-26 06:41:36'),
(21, 'University of Southeastern Philippines', NULL, 'USEP-Logo.png', NULL, 'USEP', '', 1, 1, '2021-07-26 06:41:36', '2021-07-26 06:41:36'),
(22, 'University of the Philippines-Mindanao', NULL, 'UPM-Logo.png', NULL, 'UP-Min', '', 1, 1, '2021-07-26 06:41:36', '2021-07-26 06:41:36'),
(23, 'Davao del Norte State College', NULL, 'DNSC-Logo.png', NULL, 'DNSC', '', 1, 1, '2021-07-26 06:41:36', '2021-07-26 06:41:36'),
(24, 'Compostela Valley State College', NULL, 'CVSC-Logo.png', NULL, 'CVSC', '', 1, 1, '2021-07-26 06:41:36', '2021-07-26 06:41:36'),
(25, 'Ecosystems Research and Development Bureau', NULL, 'ERDB-Logo.png', NULL, 'ERDB', '', 1, 1, '2021-07-26 06:41:36', '2021-07-26 06:41:36'),
(26, 'Kapalong College of Agriculture Sciences and Technology', NULL, 'KCAST-Logo.png', NULL, 'KCAST', '', 1, 1, '2021-07-26 06:41:36', '2021-07-26 06:41:36'),
(27, 'Philippine Rubber Research Institute', NULL, 'PRRI-Logo.png', NULL, 'PRRI', '', 1, 1, '2021-07-26 06:41:36', '2021-07-26 06:41:36'),
(28, 'Philippine Science High School - Southern Mindanao Campus', NULL, 'PSHS-SMC-Logo.png', NULL, 'PSHSSMC', '', 1, 1, '2021-07-26 06:41:36', '2021-07-26 06:41:36');

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

-- --------------------------------------------------------

--
-- Table structure for table `degrees`
--

CREATE TABLE `degrees` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `degree_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `acronym` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `degrees`
--

INSERT INTO `degrees` (`id`, `degree_name`, `acronym`, `created_at`, `updated_at`) VALUES
(1, 'Master of Arts', 'MA', '2021-07-26 06:41:57', '2021-07-26 06:41:57'),
(2, 'Master of Science', 'MS', '2021-07-26 06:41:57', '2021-07-26 06:41:57'),
(3, 'Doctor of Philosophy', 'PhD', '2021-07-26 06:41:57', '2021-07-26 06:41:57'),
(4, 'Bachelor of Science', 'BS', '2021-07-26 06:41:57', '2021-07-26 06:41:57'),
(5, 'Bachelor of Arts', 'BA', '2021-07-26 06:41:57', '2021-07-26 06:41:57');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `author_id` bigint(20) UNSIGNED NOT NULL,
  `event_title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_content` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_location` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_slug` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_image` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_started` timestamp NULL DEFAULT NULL,
  `date_ended` timestamp NULL DEFAULT NULL,
  `set_as` int(11) NOT NULL DEFAULT 0 COMMENT '0 = Under Way, 1 = On-Going',
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '0 = Unactive, 1 = Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(2, '2021_05_04_063818_create_researchers_table', 1),
(3, '2021_05_04_071110_create_project_categories_table', 1),
(4, '2021_05_04_073307_create_staff_table', 1),
(5, '2021_05_04_084455_create_projects_table', 1),
(6, '2021_05_04_084816_create_degrees_table', 1),
(7, '2021_05_07_035413_create_post_categories_table', 1),
(8, '2021_06_03_020525_create_agencies_table', 1),
(9, '2021_06_04_034804_create_commodities_table', 1),
(10, '2021_06_04_062413_create_staff_qualifications_table', 1),
(11, '2021_06_04_063551 _create_researcher_interests_table', 1),
(12, '2021_06_04_064221_create_researcher_memberships_table', 1),
(13, '2021_06_04_064636_create_researcher_publications_table', 1),
(14, '2021_06_04_072131_create_project_collaborating_agencies_table', 1),
(15, '2021_06_04_072457_create_project_funding_agencies_table', 1),
(16, '2021_06_04_073027_create_project_implementing_agencies_table', 1),
(17, '2021_06_04_073844_create_users_table', 1),
(18, '2021_06_04_075549_create_posts_table', 1),
(19, '2021_06_07_030045_create_programs_table', 1),
(20, '2021_06_18_030901_create_project_members_table', 1),
(21, '2021_06_18_030919_create_program_members_table', 1),
(22, '2021_06_29_080236_create_system_options_table', 1),
(23, '2021_06_30_024937_create_program_funding_agencies_table', 1),
(24, '2021_07_06_081916_create_pages_table', 1),
(25, '2021_07_09_065316_create_project_collaborating_commodities_table', 1),
(26, '2021_07_13_051317_create_events_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `date_published` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `post_title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_content` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `featured_image` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `post_slug` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_category_id` bigint(20) UNSIGNED NOT NULL,
  `visibility` int(11) NOT NULL DEFAULT 1 COMMENT '0 = Draft, 1 = Published',
  `status` int(11) NOT NULL COMMENT '0 = Unactive, 1 = Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post_categories`
--

CREATE TABLE `post_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `post_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_description` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `post_slug` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '0 = Unactive, 1 = Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `post_categories`
--

INSERT INTO `post_categories` (`id`, `post_name`, `post_description`, `post_slug`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Webinar', '', 'webinar', 1, '2021-07-26 06:42:06', '2021-07-26 06:42:06'),
(2, 'Seminar', '', 'seminar', 1, '2021-07-26 06:42:06', '2021-07-26 06:42:06'),
(3, 'News', '', 'news', 1, '2021-07-26 06:42:06', '2021-07-26 06:42:06'),
(4, 'Media', '', 'media', 1, '2021-07-26 06:42:06', '2021-07-26 06:42:06'),
(5, 'Technology', '', 'technology', 1, '2021-07-26 06:42:07', '2021-07-26 06:42:07'),
(6, 'Learning Opportunity', '', 'learning-opportunity', 1, '2021-07-26 06:42:07', '2021-07-26 06:42:07'),
(7, 'Community', '', 'community', 1, '2021-07-26 06:42:07', '2021-07-26 06:42:07');

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `program_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `program_content` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `program_slug` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '0 = Unactive, 1 = Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `programs`
--

INSERT INTO `programs` (`id`, `program_name`, `program_content`, `program_slug`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Rice Program', NULL, 'rice-program', 1, '2021-07-25 22:50:27', '2021-07-25 22:50:27'),
(2, 'Livestock Program', NULL, 'livestock-program', 1, '2021-07-25 22:50:41', '2021-07-25 22:50:41'),
(3, 'Assisted Reproduction, Nutrition and Health Interventions for Enhanced Dairy Cattle Productivity and Milk Safety', NULL, 'assisted-reproduction-nutrition-and-health-interventions-for-enhanced-dairy-cattle-productivity-and-milk-safety', 1, '2021-07-25 22:50:53', '2021-07-25 22:50:53'),
(4, 'Client Based Technology Transfer and Extension Services for ENR Management', NULL, 'client-based-technology-transfer-and-extension-services-for-enr-management', 1, '2021-07-25 22:51:03', '2021-07-25 22:51:03');

-- --------------------------------------------------------

--
-- Table structure for table `program_funding_agencies`
--

CREATE TABLE `program_funding_agencies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `program_id` bigint(20) UNSIGNED NOT NULL,
  `agency_id` bigint(20) UNSIGNED NOT NULL,
  `requested_budget` decimal(18,2) NOT NULL,
  `budget_status` int(11) NOT NULL COMMENT '0 = Passive, 1 = Consumed',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `program_members`
--

CREATE TABLE `program_members` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `program_id` bigint(20) UNSIGNED NOT NULL,
  `member_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `member_type` int(11) NOT NULL COMMENT '0 = Unassigned, 1 = Member, 2 = Program Leader',
  `status` int(11) NOT NULL COMMENT '0 = Unactive, 1 = Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `program_id` int(11) DEFAULT NULL COMMENT '0 = No program headed',
  `researcher_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `project_code` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `project_title` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `project_content` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `project_slug` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `featured_image` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `project_study_site` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `commodity_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `proposed_budget` decimal(18,2) DEFAULT NULL,
  `approved_budget` decimal(18,2) DEFAULT NULL,
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `date_approved` timestamp NULL DEFAULT NULL,
  `date_rejected` timestamp NULL DEFAULT NULL,
  `status` int(11) NOT NULL COMMENT '0 = Pending, 1 = Approved, 2 = Rejected',
  `remarks` int(11) DEFAULT NULL COMMENT '0 = On-Going, 1 = Terminated, 2 = Completed',
  `remarks_description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_categories`
--

CREATE TABLE `project_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(11) NOT NULL COMMENT '0 = Unactive, 1 = Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `project_categories`
--

INSERT INTO `project_categories` (`id`, `category_name`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Development', NULL, 1, '2021-07-26 06:42:15', '2021-07-26 06:42:15'),
(2, 'Extension', NULL, 1, '2021-07-26 06:42:15', '2021-07-26 06:42:15'),
(3, 'Research', NULL, 1, '2021-07-26 06:42:15', '2021-07-26 06:42:15');

-- --------------------------------------------------------

--
-- Table structure for table `project_collaborating_agencies`
--

CREATE TABLE `project_collaborating_agencies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `agency_id` bigint(20) UNSIGNED NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 = Unactive, 1 = Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_collaborating_commodities`
--

CREATE TABLE `project_collaborating_commodities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `commodity_id` bigint(20) UNSIGNED NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 = Unactive, 1 = Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_funding_agencies`
--

CREATE TABLE `project_funding_agencies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `agency_id` bigint(20) UNSIGNED NOT NULL,
  `budget` decimal(18,2) DEFAULT NULL,
  `status` int(11) NOT NULL COMMENT '0 = Unactive, 1 = Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_implementing_agencies`
--

CREATE TABLE `project_implementing_agencies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 = Unactive, 1 = Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_members`
--

CREATE TABLE `project_members` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 = Unactive, 1 = Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `researchers`
--

CREATE TABLE `researchers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fname` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `lname` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_no` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `specialization` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expertise` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resume` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pds` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '0 = Unactive, 1 = Active',
  `rejected_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `researcher_interests`
--

CREATE TABLE `researcher_interests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `researcher_id` bigint(20) UNSIGNED NOT NULL,
  `interest` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 = Unactive, 1 = Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `researcher_memberships`
--

CREATE TABLE `researcher_memberships` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `researcher_id` bigint(20) UNSIGNED NOT NULL,
  `organization` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 = Unactive, 1 = Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `researcher_publications`
--

CREATE TABLE `researcher_publications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `researcher_id` bigint(20) UNSIGNED NOT NULL,
  `publications` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 = Unactive, 1 = Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fname` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `lname` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `mname` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `suffix` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_file` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `place_of_assignment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `org_chart_visiblity` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '0 = Hidden, 1 = Visible',
  `status` int(11) NOT NULL COMMENT '0 = Unactive, 1 = Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `fname`, `lname`, `mname`, `suffix`, `image_file`, `position`, `place_of_assignment`, `org_chart_visiblity`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Rey', 'De Leon', '', '', 'rey-de-leon.png', 'Knowledge Management Cluster Coordinator', '', '', 1, '2021-07-26 06:42:26', '2021-07-26 06:42:26'),
(2, 'Evelyn', 'Gecale', '', '', 'evelyn-gecale.png', 'Technology Transfer Cluster Coordinator', '', '', 1, '2021-07-26 06:42:26', '2021-07-26 06:42:26'),
(3, 'Jonnalyn', 'Sura', '', '', 'jonnalyn-sura.png', 'Science Research Assistant', '', '', 1, '2021-07-26 06:42:26', '2021-07-26 06:42:26'),
(4, 'Mariale', 'Fernandez', '', '', 'mariale-fernandez.png', 'Science Research Assistant', '', '', 1, '2021-07-26 06:42:26', '2021-07-26 06:42:26'),
(5, 'Justine Tobithe', 'Doloiras', '', '', 'justine-tobithe-doloiras.png', 'Science Research Assistant', '', '', 1, '2021-07-26 06:42:26', '2021-07-26 06:42:26');

-- --------------------------------------------------------

--
-- Table structure for table `staff_qualifications`
--

CREATE TABLE `staff_qualifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `degree_id` bigint(20) UNSIGNED NOT NULL,
  `staff_id` bigint(20) UNSIGNED NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 = Unactive, 1 = Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `system_options`
--

CREATE TABLE `system_options` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `option_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `option_value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `system_options`
--

INSERT INTO `system_options` (`id`, `option_name`, `option_value`, `created_at`, `updated_at`) VALUES
(1, 'website_name', 'SMAARRDEC', '2021-07-26 06:42:43', '2021-07-26 06:42:43'),
(2, 'website_logo', 'logo.png', '2021-07-26 06:42:43', '2021-07-26 06:42:43'),
(3, 'website_footer_copyright_text', '© Copyright SMAARRDEC - Since 1987. All Rights Reserved', '2021-07-26 06:42:43', '2021-07-26 06:42:43'),
(4, 'company_email', 'smaarrdec@gmail.com', '2021-07-26 06:42:43', '2021-07-26 06:42:43'),
(5, 'company_email_name', '', '2021-07-26 06:42:43', '2021-07-26 06:42:43'),
(6, 'company_name', 'Southern Mindanao Agriculture, Aquatic, and Natural Resources Research and Development Consortium', '2021-07-26 06:42:43', '2021-07-26 06:42:43'),
(7, 'company_address', '2/f RDE Bldg, University of Southeastern Philippines (USeP), Iñigo St., Bo. Obrero, Davao City', '2021-07-26 06:42:43', '2021-07-26 06:42:43'),
(8, 'company_contact_number', '+(082) 321-2000', '2021-07-26 06:42:43', '2021-07-26 06:42:43'),
(9, 'company_fax_number', '', '2021-07-26 06:42:43', '2021-07-26 06:42:43'),
(10, 'google_maps', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1713.4809813473864!2d125.61652272809243!3d7.085389176474339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDUnMDUuOSJOIDEyNcKwMzYnNTcuOSJF!5e0!3m2!1sen!2sph!4v1621905213914!5m2!1sen!2sph', '2021-07-26 06:42:43', '2021-07-26 06:42:43'),
(11, 'google_recaptcha_secret', '6LfjLDUUAAAAAG8wp9zHdwnJWAiXe58QdPug4yQk', '2021-07-26 06:42:43', '2021-07-26 06:42:43'),
(12, 'google_recaptcha_key', '6LfjLDUUAAAAAGBGbfguKbhSiTVEWClN4AdpjO2X', '2021-07-26 06:42:43', '2021-07-26 06:42:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` int(11) NOT NULL DEFAULT 0 COMMENT '0 = Not yet Verified, 1 = Researcher, 2 = Admin, 3 = Super Admin',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '0 = Unactive, 1 = Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `deleted_at`, `status`, `created_at`, `updated_at`) VALUES
(1, 'James Brown', 'jamesbrown@gmail.com', '$2y$10$LJL9i1S2jXqBtYkxEx9ITOcb3mfdLWQgV6FCMguQ7qrQdxLNzWInK', 0, NULL, 1, '2021-07-25 22:46:43', '2021-07-25 22:46:43'),
(2, 'Anna Beach', 'annabeach@gmail.com', '$2y$10$Y6.3ix/e4O22j.51ceKo0.60T/UckKojvCqk/bOIjvONHEhd6PJOu', 0, NULL, 1, '2021-07-25 22:48:51', '2021-07-25 22:48:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agencies`
--
ALTER TABLE `agencies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `commodities`
--
ALTER TABLE `commodities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `degrees`
--
ALTER TABLE `degrees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `events_author_id_foreign` (`author_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posts_user_id_foreign` (`user_id`),
  ADD KEY `posts_post_category_id_foreign` (`post_category_id`);

--
-- Indexes for table `post_categories`
--
ALTER TABLE `post_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `program_funding_agencies`
--
ALTER TABLE `program_funding_agencies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `program_funding_agencies_program_id_foreign` (`program_id`),
  ADD KEY `program_funding_agencies_agency_id_foreign` (`agency_id`);

--
-- Indexes for table `program_members`
--
ALTER TABLE `program_members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `program_members_program_id_foreign` (`program_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projects_category_id_foreign` (`category_id`);

--
-- Indexes for table `project_categories`
--
ALTER TABLE `project_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_collaborating_agencies`
--
ALTER TABLE `project_collaborating_agencies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_collaborating_agencies_agency_id_foreign` (`agency_id`);

--
-- Indexes for table `project_collaborating_commodities`
--
ALTER TABLE `project_collaborating_commodities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_collaborating_commodities_project_id_foreign` (`project_id`),
  ADD KEY `project_collaborating_commodities_commodity_id_foreign` (`commodity_id`);

--
-- Indexes for table `project_funding_agencies`
--
ALTER TABLE `project_funding_agencies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_funding_agencies_project_id_foreign` (`project_id`),
  ADD KEY `project_funding_agencies_agency_id_foreign` (`agency_id`);

--
-- Indexes for table `project_implementing_agencies`
--
ALTER TABLE `project_implementing_agencies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_implementing_agencies_project_id_foreign` (`project_id`);

--
-- Indexes for table `project_members`
--
ALTER TABLE `project_members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_members_project_id_foreign` (`project_id`);

--
-- Indexes for table `researchers`
--
ALTER TABLE `researchers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `researchers_email_unique` (`email`);

--
-- Indexes for table `researcher_interests`
--
ALTER TABLE `researcher_interests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `researcher_interests_researcher_id_foreign` (`researcher_id`);

--
-- Indexes for table `researcher_memberships`
--
ALTER TABLE `researcher_memberships`
  ADD PRIMARY KEY (`id`),
  ADD KEY `researcher_memberships_researcher_id_foreign` (`researcher_id`);

--
-- Indexes for table `researcher_publications`
--
ALTER TABLE `researcher_publications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `researcher_publications_researcher_id_foreign` (`researcher_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff_qualifications`
--
ALTER TABLE `staff_qualifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `staff_qualifications_degree_id_foreign` (`degree_id`),
  ADD KEY `staff_qualifications_staff_id_foreign` (`staff_id`);

--
-- Indexes for table `system_options`
--
ALTER TABLE `system_options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`) USING HASH;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agencies`
--
ALTER TABLE `agencies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `commodities`
--
ALTER TABLE `commodities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `degrees`
--
ALTER TABLE `degrees`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_categories`
--
ALTER TABLE `post_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `programs`
--
ALTER TABLE `programs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `program_funding_agencies`
--
ALTER TABLE `program_funding_agencies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `program_members`
--
ALTER TABLE `program_members`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_categories`
--
ALTER TABLE `project_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `project_collaborating_agencies`
--
ALTER TABLE `project_collaborating_agencies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_collaborating_commodities`
--
ALTER TABLE `project_collaborating_commodities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_funding_agencies`
--
ALTER TABLE `project_funding_agencies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_implementing_agencies`
--
ALTER TABLE `project_implementing_agencies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_members`
--
ALTER TABLE `project_members`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `researchers`
--
ALTER TABLE `researchers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `researcher_interests`
--
ALTER TABLE `researcher_interests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `researcher_memberships`
--
ALTER TABLE `researcher_memberships`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `researcher_publications`
--
ALTER TABLE `researcher_publications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `staff_qualifications`
--
ALTER TABLE `staff_qualifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `system_options`
--
ALTER TABLE `system_options`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_post_category_id_foreign` FOREIGN KEY (`post_category_id`) REFERENCES `post_categories` (`id`),
  ADD CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `program_funding_agencies`
--
ALTER TABLE `program_funding_agencies`
  ADD CONSTRAINT `program_funding_agencies_agency_id_foreign` FOREIGN KEY (`agency_id`) REFERENCES `agencies` (`id`),
  ADD CONSTRAINT `program_funding_agencies_program_id_foreign` FOREIGN KEY (`program_id`) REFERENCES `programs` (`id`);

--
-- Constraints for table `program_members`
--
ALTER TABLE `program_members`
  ADD CONSTRAINT `program_members_program_id_foreign` FOREIGN KEY (`program_id`) REFERENCES `programs` (`id`);

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `project_categories` (`id`);

--
-- Constraints for table `project_collaborating_agencies`
--
ALTER TABLE `project_collaborating_agencies`
  ADD CONSTRAINT `project_collaborating_agencies_agency_id_foreign` FOREIGN KEY (`agency_id`) REFERENCES `agencies` (`id`);

--
-- Constraints for table `project_collaborating_commodities`
--
ALTER TABLE `project_collaborating_commodities`
  ADD CONSTRAINT `project_collaborating_commodities_commodity_id_foreign` FOREIGN KEY (`commodity_id`) REFERENCES `commodities` (`id`),
  ADD CONSTRAINT `project_collaborating_commodities_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`);

--
-- Constraints for table `project_funding_agencies`
--
ALTER TABLE `project_funding_agencies`
  ADD CONSTRAINT `project_funding_agencies_agency_id_foreign` FOREIGN KEY (`agency_id`) REFERENCES `agencies` (`id`),
  ADD CONSTRAINT `project_funding_agencies_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`);

--
-- Constraints for table `project_implementing_agencies`
--
ALTER TABLE `project_implementing_agencies`
  ADD CONSTRAINT `project_implementing_agencies_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`);

--
-- Constraints for table `project_members`
--
ALTER TABLE `project_members`
  ADD CONSTRAINT `project_members_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`);

--
-- Constraints for table `researcher_interests`
--
ALTER TABLE `researcher_interests`
  ADD CONSTRAINT `researcher_interests_researcher_id_foreign` FOREIGN KEY (`researcher_id`) REFERENCES `researchers` (`id`);

--
-- Constraints for table `researcher_memberships`
--
ALTER TABLE `researcher_memberships`
  ADD CONSTRAINT `researcher_memberships_researcher_id_foreign` FOREIGN KEY (`researcher_id`) REFERENCES `researchers` (`id`);

--
-- Constraints for table `researcher_publications`
--
ALTER TABLE `researcher_publications`
  ADD CONSTRAINT `researcher_publications_researcher_id_foreign` FOREIGN KEY (`researcher_id`) REFERENCES `researchers` (`id`);

--
-- Constraints for table `staff_qualifications`
--
ALTER TABLE `staff_qualifications`
  ADD CONSTRAINT `staff_qualifications_degree_id_foreign` FOREIGN KEY (`degree_id`) REFERENCES `degrees` (`id`),
  ADD CONSTRAINT `staff_qualifications_staff_id_foreign` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
