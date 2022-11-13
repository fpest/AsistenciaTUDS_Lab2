-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-10-2022 a las 03:47:30
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

CREATE TABLE `alumno` (
  `id` int(11) NOT NULL,
  `legajo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`id`, `legajo`) VALUES
(4, NULL),
(5, NULL),
(6, NULL),
(7, NULL),
(8, NULL),
(9, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

CREATE TABLE `asistencia` (
  `idAlumno` int(11) NOT NULL,
  `idHorario` int(11) NOT NULL,
  `presente` tinyint(1) NOT NULL,
  `diaHoraRegistro` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `asistencia`
--

INSERT INTO `asistencia` (`idAlumno`, `idHorario`, `presente`, `diaHoraRegistro`) VALUES
(4, 1, 1, '2022-06-21 22:10:01'),
(4, 2, 1, '2022-06-21 22:10:36'),
(6, 3, 1, '2022-06-21 22:10:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coordinador`
--

CREATE TABLE `coordinador` (
  `id` int(11) NOT NULL,
  `legajo` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `coordinador`
--

INSERT INTO `coordinador` (`id`, `legajo`) VALUES
(1, '1111');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursa`
--

CREATE TABLE `cursa` (
  `idAlumno` int(11) NOT NULL,
  `idMateria` int(11) NOT NULL,
  `validado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cursa`
--

INSERT INTO `cursa` (`idAlumno`, `idMateria`, `validado`) VALUES
(4, 1, 1),
(4, 2, 1),
(5, 1, 1),
(6, 2, 0),
(6, 3, 1),
(7, 2, 1),
(8, 1, 1),
(8, 3, 1),
(9, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dicta`
--

CREATE TABLE `dicta` (
  `idDicta` int(11) NOT NULL,
  `idMateria` int(11) NOT NULL,
  `idProfesor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `dicta`
--

INSERT INTO `dicta` (`idDicta`, `idMateria`, `idProfesor`) VALUES
(1, 1, 2),
(2, 2, 3),
(3, 3, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gestionhorario`
--

CREATE TABLE `gestionhorario` (
  `id` int(11) NOT NULL,
  `idMateria` int(11) NOT NULL,
  `diaSemana` varchar(10) NOT NULL,
  `horaInicio` time NOT NULL,
  `duracion` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `gestionhorario`
--

INSERT INTO `gestionhorario` (`id`, `idMateria`, `diaSemana`, `horaInicio`, `duracion`) VALUES
(1, 1, 'Lunes', '00:00:15', 3),
(2, 1, 'Miercoles', '00:00:18', 2),
(3, 2, 'Martes', '00:00:15', 3),
(4, 2, 'Jueves', '00:00:18', 2),
(5, 3, 'Jueves', '00:00:15', 3),
(6, 3, 'Viernes', '00:00:14', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE `horario` (
  `id` int(11) NOT NULL,
  `diaHoraInicio` datetime NOT NULL,
  `duracion` double NOT NULL,
  `seDicta` tinyint(1) NOT NULL,
  `idMateria` int(11) NOT NULL,
  `idDicta` int(11) NOT NULL,
  `periodoMateria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `horario`
--

INSERT INTO `horario` (`id`, `diaHoraInicio`, `duracion`, `seDicta`, `idMateria`, `idDicta`, `periodoMateria`) VALUES
(1, '2022-06-06 15:00:00', 3, 1, 1, 1, 2022),
(2, '2022-06-08 18:00:00', 2, 1, 1, 1, 2022),
(3, '2022-06-07 15:00:00', 3, 1, 2, 1, 2022),
(4, '2022-06-09 18:00:00', 2, 1, 2, 1, 2022),
(5, '2022-06-09 15:00:00', 3, 1, 3, 1, 2022),
(6, '2022-06-10 14:00:00', 3, 1, 3, 1, 2022);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `idMateria` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `fechaInicioCursada` date DEFAULT NULL,
  `fechaFinCursada` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`idMateria`, `nombre`, `fechaInicioCursada`, `fechaFinCursada`) VALUES
(1, 'Matematicas', NULL, NULL),
(2, 'Laboratorio II', NULL, NULL),
(3, 'Administracion Bases de Datos', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `idPersona` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `eMail` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `habilitado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`idPersona`, `nombre`, `apellido`, `eMail`, `password`, `habilitado`) VALUES
(1, 'Juan', 'Perez', 'juan@gmail.com', '1234', 0),
(2, 'Pedro', 'Fernandez', 'pedro@gmail.com', '1234', 0),
(3, 'Julian', 'Ramirez', 'julian@gmail.com', '1234', 0),
(4, 'Emilia', 'Lopez', 'emilia@gmail.com', '1234', 0),
(5, 'Santiago', 'Abdala', 'santiago@gmail.com', '1234', 0),
(6, 'Francisco', 'Gil', 'francisco@gmail.com', '1234', 0),
(7, 'Sofia', 'Cino', 'sofia@gmail.com', '1234', 0),
(8, 'Paz', 'Amaya', 'paz@gmail.com', '1234', 0),
(9, 'Pilar', 'Martinez', 'pilar@gmail.com', '1234', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

CREATE TABLE `profesor` (
  `id` int(11) NOT NULL,
  `legajo` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `profesor`
--

INSERT INTO `profesor` (`id`, `legajo`) VALUES
(2, '2222'),
(3, '3333');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD UNIQUE KEY `idalumno` (`id`),
  ADD UNIQUE KEY `legalumno` (`legajo`);

--
-- Indices de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD KEY `idAsistencia` (`idAlumno`,`idHorario`),
  ADD KEY `idHorario` (`idHorario`);

--
-- Indices de la tabla `coordinador`
--
ALTER TABLE `coordinador`
  ADD UNIQUE KEY `idcoordinador` (`id`);

--
-- Indices de la tabla `cursa`
--
ALTER TABLE `cursa`
  ADD UNIQUE KEY `idCursa` (`idAlumno`,`idMateria`),
  ADD KEY `idMateria` (`idMateria`);

--
-- Indices de la tabla `dicta`
--
ALTER TABLE `dicta`
  ADD PRIMARY KEY (`idDicta`),
  ADD UNIQUE KEY `idDicta` (`idMateria`,`idProfesor`),
  ADD KEY `idProfesor` (`idProfesor`);

--
-- Indices de la tabla `gestionhorario`
--
ALTER TABLE `gestionhorario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idMateriaPeriodo` (`idMateria`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idMateria` (`idMateria`),
  ADD KEY `idDicta` (`idDicta`),
  ADD KEY `idDicta_2` (`idDicta`);

--
-- Indices de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`idMateria`),
  ADD UNIQUE KEY `nombremateria` (`nombre`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`idPersona`),
  ADD UNIQUE KEY `mail` (`eMail`);

--
-- Indices de la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD UNIQUE KEY `idprofesor` (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `dicta`
--
ALTER TABLE `dicta`
  MODIFY `idDicta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `gestionhorario`
--
ALTER TABLE `gestionhorario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `horario`
--
ALTER TABLE `horario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `idMateria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `idPersona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD CONSTRAINT `alumno_ibfk_1` FOREIGN KEY (`id`) REFERENCES `persona` (`idPersona`);

--
-- Filtros para la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD CONSTRAINT `asistencia_ibfk_1` FOREIGN KEY (`idAlumno`) REFERENCES `alumno` (`id`),
  ADD CONSTRAINT `asistencia_ibfk_2` FOREIGN KEY (`idHorario`) REFERENCES `horario` (`id`);

--
-- Filtros para la tabla `coordinador`
--
ALTER TABLE `coordinador`
  ADD CONSTRAINT `coordinador_ibfk_1` FOREIGN KEY (`id`) REFERENCES `persona` (`idPersona`);

--
-- Filtros para la tabla `cursa`
--
ALTER TABLE `cursa`
  ADD CONSTRAINT `cursa_ibfk_1` FOREIGN KEY (`idAlumno`) REFERENCES `alumno` (`id`),
  ADD CONSTRAINT `cursa_ibfk_2` FOREIGN KEY (`idMateria`) REFERENCES `materia` (`idMateria`);

--
-- Filtros para la tabla `dicta`
--
ALTER TABLE `dicta`
  ADD CONSTRAINT `dicta_ibfk_1` FOREIGN KEY (`idMateria`) REFERENCES `materia` (`idMateria`),
  ADD CONSTRAINT `dicta_ibfk_2` FOREIGN KEY (`idProfesor`) REFERENCES `profesor` (`id`);

--
-- Filtros para la tabla `gestionhorario`
--
ALTER TABLE `gestionhorario`
  ADD CONSTRAINT `gestionhorario_ibfk_1` FOREIGN KEY (`idMateria`) REFERENCES `materia` (`idMateria`);

--
-- Filtros para la tabla `horario`
--
ALTER TABLE `horario`
  ADD CONSTRAINT `horario_ibfk_1` FOREIGN KEY (`idMateria`) REFERENCES `dicta` (`idMateria`),
  ADD CONSTRAINT `horario_ibfk_2` FOREIGN KEY (`idDicta`) REFERENCES `dicta` (`idDicta`);

--
-- Filtros para la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD CONSTRAINT `profesor_ibfk_1` FOREIGN KEY (`id`) REFERENCES `persona` (`idPersona`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
