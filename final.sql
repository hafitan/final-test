-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2023 at 12:22 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `final`
--

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230606023350-create-users.js'),
('20230606023400-create-siswas.js');

-- --------------------------------------------------------

--
-- Table structure for table `siswas`
--

CREATE TABLE `siswas` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `kelas` varchar(255) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `tempat` varchar(255) DEFAULT NULL,
  `no_telp` varchar(255) DEFAULT NULL,
  `nama_orang_tua` varchar(255) DEFAULT NULL,
  `no_ortu` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `siswas`
--

INSERT INTO `siswas` (`id`, `nama`, `email`, `tgl_lahir`, `kelas`, `alamat`, `tempat`, `no_telp`, `nama_orang_tua`, `no_ortu`, `createdAt`, `updatedAt`) VALUES
(1, 'Muhamad Anval Hafitansyah', 'anval@gmail.com', '2003-12-13', 'matematika', 'dasdas', 'Bogor', '0834294832', 'dgadaskjgd', '08782732647', '2023-06-06 08:39:58', '2023-06-06 10:19:26'),
(2, 'ahmad 3', 'ahmad.pikachu@gmail.com', '0074-03-20', 'ipa', 'dasdasd', 'pdpasud', '093842948437', 'dsajdhashd', '943928409823', '2023-06-06 08:40:54', '2023-06-06 10:15:12'),
(4, 'anvalhaff', 'ips@gmail.com', '2023-06-30', 'ips', 'dadasdas', 'lfljdfh', '08349284237', 'jhdksjhda', '0823783919', '2023-06-06 09:36:26', '2023-06-06 09:36:26'),
(5, 'alululu', 'bahasa@gmail.com', '2002-02-21', 'bahasa', 'asdadpiasd', 'dsagdhas', '038942938', 'dsahdjashash', '0398493847', '2023-06-06 09:37:16', '2023-06-06 09:37:16'),
(6, 'aduuuu', 'bela@gmail.com', '2020-03-02', 'bela diri', 'dasjkgdajg', 'jdasjkdga', '08239894792', 'dasdpsadusi', '084394837', '2023-06-06 09:38:14', '2023-06-06 09:38:14'),
(7, 'khiil', 'tari@gmail.com', '1020-12-12', 'tari', 'pqowuehdbdjj', 'odsausagd', '088347823', 'jdashkdhas', '089217421864', '2023-06-06 09:39:18', '2023-06-06 09:39:18');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','siswa') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'admin@gmail.com', '$2b$10$K9MgmA4LLLXslVTcnjzQfen/Os.fiMyv.czflM9ixzZWoEBAm/vHa', 'admin', '2023-06-06 08:29:23', '2023-06-06 08:29:23'),
(2, 'Muhamad Anval Hafitansyah', 'anval@gmail.com', '$2b$10$6UhDQbLXYGlgBBQ9gzt2a.Dk6dxNUIMw9sNOEACQNbmKJcQDqlIki', 'siswa', '2023-06-06 08:39:58', '2023-06-06 08:39:58'),
(3, 'ahmad', 'ahmad.pikachu@gmail.com', '$2b$10$eLIjtZwIzjGsIIErWqKjNum46FcJOh1ZHShDLeB917wBr6aEEytay', 'siswa', '2023-06-06 08:40:54', '2023-06-06 08:40:54'),
(4, 'anval', 'vall@gmail.com', '$2b$10$M2AU7FPzuii.LMz/JJDM.uHoxcLqRlLBLvCKWJrONp4pr29q8b9/q', 'siswa', '2023-06-06 09:05:17', '2023-06-06 09:05:17'),
(5, 'anvalhaff', 'ips@gmail.com', '$2b$10$Noflt.otgYn5woatjU93h.lRwAP6k6XGAjcjq0VqtjNQ.bRDDWjce', 'siswa', '2023-06-06 09:36:26', '2023-06-06 09:36:26'),
(6, 'alululu', 'bahasa@gmail.com', '$2b$10$.qVPyeo0MYfcHLNFbihn8uFb6DuQk3Vb1nsBXUK7djfOMy7lMQ.Li', 'siswa', '2023-06-06 09:37:16', '2023-06-06 09:37:16'),
(7, 'aduuuu', 'bela@gmail.com', '$2b$10$7H2HMCsPIPnvhN2HkWQimu6PaB.1pgzLeXZw7ojjPOtK3SHN7IyFy', 'siswa', '2023-06-06 09:38:14', '2023-06-06 09:38:14'),
(8, 'khiil', 'tari@gmail.com', '$2b$10$FWpfE3N/me16mGH2rkQ5QuitEGNRfjZtuVP3mmN2SfNJjLzaCdaLe', 'siswa', '2023-06-06 09:39:18', '2023-06-06 09:39:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `siswas`
--
ALTER TABLE `siswas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `siswas`
--
ALTER TABLE `siswas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
