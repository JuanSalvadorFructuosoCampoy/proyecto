-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-06-2024 a las 23:43:38
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
(2, '2024-04-29', '20:00:00', 'Corte de pelo');

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
(1, 'prueba', 'prueba', NULL, '224f353d391d9183fc467105fc5d453c4960edec6086d4ce1b9e19abb0cedb40', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTc2MjE5MDAsImRhdGEiOnsiaWQiOiIxIiwibm9tYnJlIjoicHJ1ZWJhIn19.R9EEE7HkzL6PyM2hhJ_u9QXq6pLLdybqjB_BR_i8rM8', 1, 'admin'),
(2, 'Melody', 'de la Plata', 'Lario', '2db76f21528566a3f39cdaa9f9c8794ae3193e62c8262fd1a476d9cc335f45b5', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTEwNDE4NDYsImRhdGEiOnsiaWQiOiIyIiwibm9tYnJlIjoiTWVsb2R5In19.2mixB8Pww60rMLwr_s0mKrGxKlg0H7GANuwT_BVPSjA', 1, 'admin');

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
('P0001', 'Keratina', 7, 100),
('P0002', 'Tinte rubio', 3, 30),
('P0003', 'Tinte negro', 0, 28);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_ventas`
--

CREATE TABLE `productos_ventas` (
  `id` int(11) NOT NULL,
  `id_item` varchar(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos_ventas`
--

INSERT INTO `productos_ventas` (`id`, `id_item`, `nombre`, `id_cliente`, `cantidad`, `precio`) VALUES
(45, 'S0008', 'Botox melena', NULL, 1, 38),
(57, 'S0004', 'Corte con estilo', 0, 1, 18),
(58, 'S0008', 'Botox melena', 1, 1, 38),
(59, 'S0007', 'Acabado con plancha', 9, 1, 3),
(60, 'S0003', 'Color raíz', 0, 1, 25),
(61, 'S0001', 'Corte de puntas', 0, 1, 12);

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
('S0005', 'Peinado pelo corto', 25),
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
  `nombreCliente` varchar(100) DEFAULT NULL,
  `direccionCliente` varchar(200) DEFAULT NULL,
  `telefonoCliente` int(20) DEFAULT NULL,
  `idFiscalCliente` varchar(20) DEFAULT NULL,
  `empleado` int(11) DEFAULT NULL,
  `nombreEmpleado` varchar(50) NOT NULL,
  `tipo` varchar(10) NOT NULL COMMENT 'Tarjeta o efectivo',
  `iva` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id`, `fecha`, `total`, `cliente`, `nombreCliente`, `direccionCliente`, `telefonoCliente`, `idFiscalCliente`, `empleado`, `nombreEmpleado`, `tipo`, `iva`) VALUES
(45, '2024-06-05 21:46:00', 38, NULL, NULL, NULL, NULL, NULL, 1, 'prueba', 'tarjeta', 21),
(57, '2024-06-05 22:23:00', 18, NULL, NULL, NULL, NULL, NULL, 1, 'prueba', 'tarjeta', 21),
(58, '2024-06-05 22:29:00', 38, 1, 'Juan Salvador Fructuoso', 'Calle Camino Viejo, 39, 30816', 639445564, '48657980P', 1, 'prueba', 'tarjeta', 21),
(59, '2024-06-05 22:52:00', 3, 9, 'Melody de la Plata Lario', 'Calle Camino Viejo, 39, 30816, La Hoya (Lorca)', 626824195, '23306454W', 1, 'prueba', 'tarjeta', 21),
(60, '2024-06-05 22:55:00', 25, NULL, NULL, NULL, NULL, NULL, 1, 'prueba', 'tarjeta', 21),
(61, '2024-06-05 23:11:00', 12, NULL, NULL, NULL, NULL, NULL, 1, 'prueba', 'tarjeta', 21);

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
  ADD PRIMARY KEY (`id`,`id_item`) USING BTREE,
  ADD KEY `id_cliente` (`id_cliente`);

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
  ADD KEY `empleado` (`empleado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `agenda`
--
ALTER TABLE `agenda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `registro_clientes`
--
ALTER TABLE `registro_clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos_ventas`
--
ALTER TABLE `productos_ventas`
  ADD CONSTRAINT `productos_ventas_ibfk_1` FOREIGN KEY (`id`) REFERENCES `ventas` (`id`);

--
-- Filtros para la tabla `registro_clientes`
--
ALTER TABLE `registro_clientes`
  ADD CONSTRAINT `registro_clientes_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
