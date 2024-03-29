-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-03-2024 a las 18:14:07
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `peluqueria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agenda`
--

CREATE TABLE `agenda` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `cita` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `agenda`
--

INSERT INTO `agenda` (`id`, `fecha`, `hora`, `cita`) VALUES
(1, '2024-03-04', '09:20:00', 'Cita con Mari para la peluquería'),
(2, '2024-03-04', '10:30:00', 'Cita del día 4'),
(6, '2024-03-05', '15:00:00', 'Cita creada desde la app y editada'),
(7, '2024-03-05', '08:29:00', 'Cita a las 7 y media'),
(10, '2024-03-06', '11:00:00', 'Cita a las 11 de la mañana'),
(11, '2024-03-12', '10:00:00', 'Corte de pelo la semana que viene a las 10 de la mañana');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `id_fiscal` varchar(20) NOT NULL COMMENT 'DNI o NIE',
  `nombre` varchar(50) NOT NULL,
  `apellido1` varchar(80) NOT NULL,
  `apellido2` varchar(80) DEFAULT NULL,
  `telefono` int(11) NOT NULL,
  `direccion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `id_fiscal`, `nombre`, `apellido1`, `apellido2`, `telefono`, `direccion`) VALUES
(1, '23306454W', 'Melody', 'de la Plata', 'Lario', 639445564, 'Calle Camino Viejo, 39, 30816, La Hoya (Lorca)'),
(3, '27454873A', 'Mercedes', 'Campoy', 'Guillén', 626047517, 'Calle Ricardo Gil, 43, 10ºC, 30002, Murcia'),
(6, '48657980P', 'Juan Salvador', 'Fructuoso', 'Campoy', 639445564, 'Calle Camino Viejo, 39, 30816, La Hoya (Lorca)'),
(20, '48657980P', 'Antonio', 'Martínez', 'Gutiérrez', 654321981, 'Calle alguna');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido1` varchar(50) NOT NULL,
  `apellido2` varchar(50) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `token` varchar(200) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `rol` varchar(5) NOT NULL COMMENT 'admin o emple'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `nombre`, `apellido1`, `apellido2`, `password`, `token`, `activo`, `rol`) VALUES
(1, 'prueba', 'prueba', NULL, '224f353d391d9183fc467105fc5d453c4960edec6086d4ce1b9e19abb0cedb40', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDk2NTY1MjYsImRhdGEiOnsiaWQiOiIxIiwibm9tYnJlIjoicHJ1ZWJhIn19.tH7H7-sOzUl_Zhlpn5YHH5zqnWmiYeX24jjjnpjZpZ4', 1, 'admin'),
(2, 'Melody', 'de la Plata', 'Lario', '2db76f21528566a3f39cdaa9f9c8794ae3193e62c8262fd1a476d9cc335f45b5', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDk0NjY1NTgsImRhdGEiOnsiaWQiOiIyIiwibm9tYnJlIjoiTWVsb2R5In19.j3XUDkEAe7ovuLBS3ze7fQwDKkILnYSkWRrml9zNTew', 1, 'admin'),
(15, 'Juan Salvador', 'Fructuoso', 'Campoy', '224f353d391d9183fc467105fc5d453c4960edec6086d4ce1b9e19abb0cedb40', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDk2NTAyNzgsImRhdGEiOnsiaWQiOiIxNSIsIm5vbWJyZSI6Ikp1YW4gU2FsdmFkb3IifX0.awXZv-iUt1hVHPUgU9aAZALNnOrmQk-dQ40xkXXp3JY', 1, 'emple');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` varchar(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `stock` int(11) NOT NULL,
  `precio` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `stock`, `precio`) VALUES
('P0001', 'Keratina', 9, 100),
('P0002', 'Tinte rubio', 0, 30),
('P0003', 'Tinte negro', 2, 28);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_ventas`
--

CREATE TABLE `productos_ventas` (
  `id` int(11) NOT NULL,
  `id_item` varchar(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos_ventas`
--

INSERT INTO `productos_ventas` (`id`, `id_item`, `id_cliente`, `cantidad`, `precio`) VALUES
(16, 'P0001', 0, 1, 100),
(16, 'P0002', 0, 1, 30),
(17, 'P0003', 0, 4, 112),
(18, 'S0009', 3, 1, 48),
(18, 'S0010', 3, 1, 25),
(19, 'P0003', 0, 3, 84),
(20, 'S0001', 20, 1, 12),
(20, 'S0007', 20, 1, 3),
(20, 'S0008', 20, 1, 38),
(21, 'S0001', 0, 1, 12),
(21, 'S0003', 0, 1, 25),
(21, 'S0007', 0, 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_clientes`
--

CREATE TABLE `registro_clientes` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `evento` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro_clientes`
--

INSERT INTO `registro_clientes` (`id`, `id_cliente`, `fecha`, `evento`) VALUES
(1, 1, '2024-02-25 00:00:00', 'Inicio de la aplicación'),
(2, 1, '2024-02-28 00:00:00', 'Sigue la aplicación'),
(10, 1, '2024-02-29 00:00:00', 'Nuevo día');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` varchar(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `precio` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id`, `nombre`, `precio`) VALUES
('S0001', 'Corte de puntas', 12),
('S0002', 'Peinado pelo largo', 16),
('S0003', 'Color raíz', 25),
('S0004', 'Corte con estilo', 18),
('S0005', 'Peinado pelo corto', 13),
('S0006', 'Peinado melena', 15),
('S0007', 'Acabado con plancha', 3),
('S0008', 'Botox melena', 38),
('S0009', 'Botox cabello largo', 48),
('S0010', 'Botox cabello corto', 25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `total` float NOT NULL,
  `cliente` int(11) DEFAULT NULL,
  `empleado` int(11) NOT NULL,
  `tipo` varchar(10) NOT NULL COMMENT 'Tarjeta o efectivo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id`, `fecha`, `total`, `cliente`, `empleado`, `tipo`) VALUES
(16, '2024-03-05 13:14:00', 130, NULL, 1, 'efectivo'),
(17, '2024-03-05 13:16:00', 112, NULL, 1, 'tarjeta'),
(18, '2024-03-04 13:22:00', 73, 3, 1, 'efectivo'),
(19, '2024-03-05 17:35:00', 84, NULL, 1, 'efectivo'),
(20, '2024-03-05 17:51:00', 53, 20, 1, 'tarjeta'),
(21, '2024-03-05 17:54:00', 40, NULL, 1, 'efectivo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agenda`
--
ALTER TABLE `agenda`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos_ventas`
--
ALTER TABLE `productos_ventas`
  ADD PRIMARY KEY (`id`,`id_item`) USING BTREE;

--
-- Indices de la tabla `registro_clientes`
--
ALTER TABLE `registro_clientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `empleado` (`empleado`),
  ADD KEY `clientes_fk` (`cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `agenda`
--
ALTER TABLE `agenda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `registro_clientes`
--
ALTER TABLE `registro_clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `registro_clientes`
--
ALTER TABLE `registro_clientes`
  ADD CONSTRAINT `registro_clientes_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `clientes_fk` FOREIGN KEY (`cliente`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`empleado`) REFERENCES `empleados` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
