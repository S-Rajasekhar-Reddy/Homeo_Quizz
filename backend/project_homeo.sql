-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 13, 2025 at 05:42 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_homeo`
--

-- --------------------------------------------------------

--
-- Table structure for table `credentials`
--

CREATE TABLE `credentials` (
  `Id` int(40) NOT NULL,
  `UserName` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Account_type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `credentials`
--

INSERT INTO `credentials` (`Id`, `UserName`, `Email`, `Password`, `Account_type`) VALUES
(1, 'sri', 'ssri@homeo.edu', '123', 'i'),
(2, 'john', 'djohn@homeo.edu', '123', 's'),
(3, 'michael', 'kmichael@homeo.edu', '123', 's'),
(4, 'ronaldo', 'rcristiano@homeo.edu', '123', 's'),
(5, 'charlesx', 'xcharles@homeo.edu', '123', 's'),
(13, 'sharan', 'bsharan@homeo.edu', '123', 's');

-- --------------------------------------------------------

--
-- Table structure for table `mathematics1`
--

CREATE TABLE `mathematics1` (
  `Question_Number` int(11) NOT NULL,
  `Question` varchar(255) DEFAULT NULL,
  `Option1` varchar(255) DEFAULT NULL,
  `Option2` varchar(255) DEFAULT NULL,
  `Option3` varchar(255) DEFAULT NULL,
  `Option4` varchar(255) DEFAULT NULL,
  `Correct_Answer` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mathematics1`
--

INSERT INTO `mathematics1` (`Question_Number`, `Question`, `Option1`, `Option2`, `Option3`, `Option4`, `Correct_Answer`) VALUES
(1, 'What is the product of 2 and 8 ?', '10', '12', '18', '16', '16'),
(2, 'Calculate the equation \"24/12-4x8\" ?', '24', '-30', '28', '26', '-30'),
(3, 'Which of the following is a prime number ?', '4', '6', '8', '11', '11');

-- --------------------------------------------------------

--
-- Table structure for table `physics_101`
--

CREATE TABLE `physics_101` (
  `Question_Number` int(11) NOT NULL,
  `Question` varchar(255) DEFAULT NULL,
  `Option1` varchar(255) DEFAULT NULL,
  `Option2` varchar(255) DEFAULT NULL,
  `Option3` varchar(255) DEFAULT NULL,
  `Option4` varchar(255) DEFAULT NULL,
  `Correct_Answer` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `physics_101`
--

INSERT INTO `physics_101` (`Question_Number`, `Question`, `Option1`, `Option2`, `Option3`, `Option4`, `Correct_Answer`) VALUES
(1, 'What is the unit of force?', 'Watt', 'Newton', 'Joule', 'Ampere', 'Newton'),
(2, 'Which of the following is a vector quantity?', 'Speed', 'Mass', 'Temperature', 'Velocity', 'Velocity'),
(3, 'What does Ohm’s law state?', 'V=IR', 'F=ma', 'E=mc²', 'P=IV', 'V=IR'),
(4, 'Which of the following particles is negatively charged?', 'Proton', 'Neutron', 'Electron', 'Neutrino', 'Electron'),
(5, 'What is the law of conservation of energy?', 'Energy cannot be created or destroyed, only transferred', 'Energy can be destroyed but not created', 'Energy is only conserved in closed systems', 'Energy is created when needed', 'Energy cannot be created or destroyed, only transferred'),
(6, 'Which of the following materials is a good conductor of electricity?', 'Rubber', 'Wood', 'Copper', 'Plastic', 'Copper'),
(7, 'In which state of matter do particles have the most energy?', 'Solid', 'Liquid', 'Gas', 'Plasma', 'Plasma'),
(8, 'What is the SI unit of electric charge?', 'Volt', 'Coulomb', 'Ampere', 'Ohm', 'Coulomb'),
(9, 'What does the term “inertia” refer to?', 'The resistance of an object to a change in its motion', 'The force exerted by gravity', 'The energy stored in a system', 'The acceleration of an object in free fall', 'The resistance of an object to a change in its motion'),
(10, 'Which of these is an example of potential energy?', 'A moving car', 'A stretched spring', 'A flowing river', 'A rotating fan', 'A stretched spring'),
(11, 'What is the charge of a proton?', 'Negative', 'Neutral', 'Positive', 'Zero', 'Positive');

-- --------------------------------------------------------

--
-- Table structure for table `quiz_index`
--

CREATE TABLE `quiz_index` (
  `Quiz_Number` int(11) NOT NULL,
  `Quiz_Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz_index`
--

INSERT INTO `quiz_index` (`Quiz_Number`, `Quiz_Name`) VALUES
(21, 'Mathematics1'),
(23, 'Science101'),
(24, 'Physics_101');

-- --------------------------------------------------------

--
-- Table structure for table `science101`
--

CREATE TABLE `science101` (
  `Question_Number` int(11) NOT NULL,
  `Question` varchar(255) DEFAULT NULL,
  `Option1` varchar(255) DEFAULT NULL,
  `Option2` varchar(255) DEFAULT NULL,
  `Option3` varchar(255) DEFAULT NULL,
  `Option4` varchar(255) DEFAULT NULL,
  `Correct_Answer` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `science101`
--

INSERT INTO `science101` (`Question_Number`, `Question`, `Option1`, `Option2`, `Option3`, `Option4`, `Correct_Answer`) VALUES
(1, 'What is the chemical symbol for water?', 'H2O', 'O2', 'CO2', 'H2', 'H2O'),
(2, 'What planet is known as the Red Planet?', 'Earth', 'Mars', 'Jupiter', 'Venus', 'Mars'),
(3, 'What is the largest organ in the human body?', 'Heart', 'Lungs', 'Skin', 'Liver', 'Skin'),
(4, 'What is the function of Heart in the human body?', 'Remove waste', 'Pump blood', 'Allows to breathe', 'Breaking down nutrients', 'Pump blood');

-- --------------------------------------------------------

--
-- Table structure for table `student_details`
--

CREATE TABLE `student_details` (
  `Id` int(11) NOT NULL,
  `UserName` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Status` varchar(255) NOT NULL,
  `First_Name` varchar(255) DEFAULT NULL,
  `Last_Name` varchar(255) DEFAULT NULL,
  `Student_Name` varchar(255) DEFAULT NULL,
  `PhoneNum` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_details`
--

INSERT INTO `student_details` (`Id`, `UserName`, `Email`, `Status`, `First_Name`, `Last_Name`, `Student_Name`, `PhoneNum`) VALUES
(2, 'john', 'djohn@homeo.edu', 'Pending', 'John', 'Doe', 'John Doe', '4512983270'),
(3, 'michael', 'kmichael@homeo.edu', 'Approved', 'Michael', 'Kors', 'Michael Kors', '2536147890'),
(4, 'ronaldo', 'rcristiano@homeo.edu', 'Approved', 'Ronaldo', 'Cristiano', 'Cristiano Ronaldo', '3254986170');

-- --------------------------------------------------------

--
-- Table structure for table `student_grade`
--

CREATE TABLE `student_grade` (
  `Id` int(40) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Student_Name` varchar(50) NOT NULL,
  `Quiz_Number` int(30) NOT NULL,
  `Quiz_Name` varchar(255) NOT NULL,
  `Grade` int(30) NOT NULL,
  `Max_Grade` int(255) NOT NULL,
  `Date_Attempted` date NOT NULL,
  `Rem_Attempts` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_grade`
--

INSERT INTO `student_grade` (`Id`, `Username`, `Student_Name`, `Quiz_Number`, `Quiz_Name`, `Grade`, `Max_Grade`, `Date_Attempted`, `Rem_Attempts`) VALUES
(3, 'michael', 'Michael Kors', 21, 'Mathematics1', 2, 3, '2025-01-23', 0),
(4, 'ronaldo', 'Cristiano Ronaldo', 23, 'Science101', 2, 4, '2025-01-23', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `credentials`
--
ALTER TABLE `credentials`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `mathematics1`
--
ALTER TABLE `mathematics1`
  ADD PRIMARY KEY (`Question_Number`);

--
-- Indexes for table `physics_101`
--
ALTER TABLE `physics_101`
  ADD PRIMARY KEY (`Question_Number`);

--
-- Indexes for table `quiz_index`
--
ALTER TABLE `quiz_index`
  ADD PRIMARY KEY (`Quiz_Number`);

--
-- Indexes for table `science101`
--
ALTER TABLE `science101`
  ADD PRIMARY KEY (`Question_Number`);

--
-- Indexes for table `student_details`
--
ALTER TABLE `student_details`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `credentials`
--
ALTER TABLE `credentials`
  MODIFY `Id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `mathematics1`
--
ALTER TABLE `mathematics1`
  MODIFY `Question_Number` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `physics_101`
--
ALTER TABLE `physics_101`
  MODIFY `Question_Number` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `quiz_index`
--
ALTER TABLE `quiz_index`
  MODIFY `Quiz_Number` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `science101`
--
ALTER TABLE `science101`
  MODIFY `Question_Number` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
