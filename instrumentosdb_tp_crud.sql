-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-06-2024 a las 00:51:06
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `instrumentosdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` bigint(20) NOT NULL,
  `denominacion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `denominacion`) VALUES
(1, 'Cuerdas'),
(2, 'Percusión'),
(3, 'Teclados'),
(4, 'Viento'),
(5, 'Accesorios');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instrumento`
--

CREATE TABLE `instrumento` (
  `id` bigint(20) NOT NULL,
  `cantidad_vendida` varchar(255) DEFAULT NULL,
  `costo_envio` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `instrumento` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `precio` varchar(255) DEFAULT NULL,
  `id_categoria` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `instrumento`
--

INSERT INTO `instrumento` (`id`, `cantidad_vendida`, `costo_envio`, `descripcion`, `imagen`, `instrumento`, `marca`, `modelo`, `precio`, `id_categoria`) VALUES
(1, '28', 'G', 'Estas viendo una excelente mandolina de la marca Stagg, con un sonido muy dulce, tapa aros y fondo de tilo, y diapasón de palisandro. Es un instrumento acústico (no se enchufa) de cuerdas dobles (4 pares) con la caja ovalada y cóncava, y el mástil corto. ', 'http://localhost:5173/img/nro10.jpg', 'Mandolina Instrumento Musical Stagg Sunburst', 'Stagg', 'M2', '200', 4),
(2, '10', '150', '1 Pandereta - 32 sonajas metálicas. Más de 8 años vendiendo con 100 % de calificaciones POSITIVAS y clientes satisfechos !! ', 'http://localhost:5173/img/nro9.jpg', 'Pandereta Pandero Instrumento Musical', 'DyM ventas', '32 sonajas', '325', 2),
(3, '3', '250', 'Triangulo Musical de 24 Centímetros De Acero. ENVIOS POR CORREO O ENCOMIENDA: Se le deberán adicionar $40 en concepto de Despacho y el Costo del envío se abonará al recibir el producto en Terminal, Sucursal OCA o Domicilio', 'http://localhost:5173/img/nro8.jpg', 'Triangulo Musical 24 Cm Percusion', 'LBP', '24', '260', 2),
(4, '2', 'G', 'BARCHIME CORTINA MUSICAL DE 25 BARRAS LATIN CUSTOM. Emitimos factura A y B', 'http://localhost:5173/img/nro7.jpg', 'Bar Chimes Lp Cortina Musical 72 Barras', 'FM', 'LATIN', '2250', 2),
(5, '5', '300', 'Las calabazas utilizadas para nuestras artesanías son sembradas y cosechadas por nosotros, quienes seleccionamos el mejor fruto para garantizar la calidad del producto y ofrecerle algo creativo y original.', 'http://localhost:5173/img/nro6.jpg', 'Shekeres. Instrumento. Música. Artesanía.', 'Azalea Artesanías', 'Cuentas de madera', '850', 2),
(6, '0', '2000', 'Buen dia! Sale a la venta este Piano Alemán Neumeyer con candelabros incluidos. Tiene una talla muy bonita en la madera. Una pieza de calidad.', 'http://localhost:5173/img/nro3.jpg', 'Antiguo Piano Aleman Con Candelabros.', 'Neumeyer', 'Stratus', '17000', 3),
(7, '5', 'G', 'Material: Plástico smil madera 4 Cuerdas longitud: 60cm, el mejor regalo para usted, su familia y amigos, adecuado para 3-18 años de edad', 'http://localhost:5173/img/nro4.jpg', 'Guitarra Ukelele Infantil Grande 60cm', 'GUITARRA', 'UKELELE', '500', 1),
(8, '1375', 'G', 'Organo Electrónico GADNIC T01. Display de Led. 54 Teclas. 100 Timbres / 100 Ritmos. 4 1/2 octavas. 8 Percusiones. 8 Canciones de muestra. Grabación y reproducción. Entrada para Micrófono. Salida de Audio (Auriculares / Amplificador). Vibrato. Sustain Incl', 'http://localhost:5173/img/nro2.jpg', 'Teclado Organo Electronico Musical Instrumento 54 Teclas', 'GADNIC', 'T01', '2250', 3),
(9, '15', '300', 'Estas viendo un excelente y completísimo set de percusion para niños con estuche rígido, equipado con los instrumentos mas divertidos! De gran calidad y sonoridad. Ideal para jardines, escuelas primarias, musicoterapeutas o chicos que se quieran iniciar e', 'http://localhost:5173/img/nro1.jpg', 'Instrumentos De Percusión Niños Set Musical Con Estuche', 'KNIGHT', 'LB17', '2700', 2),
(10, '380', '250', 'DESCRIPCIÓN: DE 1 A 3 AÑOS. EL SET INCLUYE 5 TAMBORES, PALILLOS Y EL PLATILLO TAL CUAL LAS FOTOS. SONIDOS REALISTAS Y FÁCIL DE MONTAR. MEDIDAS: 40X20X46 CM', 'http://localhost:5173/img/nro5.jpg', 'Batería Musical Infantil Juguete Niño 9 Piezas Palillos', 'Bateria', 'Infantil', '850', 2),
(11, '28', 'G', 'Estas viendo una excelente mandolina de la marca Stagg, con un sonido muy dulce, tapa aros y fondo de tilo, y diapasón de palisandro. Es un instrumento acústico (no se enchufa) de cuerdas dobles (4 pares) con la caja ovalada y cóncava, y el mástil corto. ', 'http://localhost:5173/img/nro10.jpg', 'Instrumento de prueba', 'Stagg', 'M20', '2450', 1),
(14, '2', 'G', 'descripcion', 'https://th.bing.com/th/id/OIP.MzYGaRQlq07FWQKCWQ36IQHaHa?rs=1&pid=ImgDetMain', 'Nuveo Instrumento', 'violin', 'violin x', '20000', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `instrumento`
--
ALTER TABLE `instrumento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK2n1vv7i28ipnewstcf6skq98p` (`id_categoria`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `instrumento`
--
ALTER TABLE `instrumento`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `instrumento`
--
ALTER TABLE `instrumento`
  ADD CONSTRAINT `FK2n1vv7i28ipnewstcf6skq98p` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
