-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-06-2024 a las 06:48:14
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
-- Estructura de tabla para la tabla `categoria_instrumento`
--

CREATE TABLE `categoria_instrumento` (
  `id` int(11) NOT NULL,
  `denominacion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `categoria_instrumento`
--

INSERT INTO `categoria_instrumento` (`id`, `denominacion`) VALUES
(1, 'Cuerda'),
(2, ' Viento'),
(3, 'Percusión'),
(4, 'Teclado'),
(5, ' Electrónico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instrumento`
--

CREATE TABLE `instrumento` (
  `id` int(11) DEFAULT NULL,
  `instrumento` varchar(100) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `costoEnvio` decimal(10,2) DEFAULT NULL,
  `cantidadVendida` int(11) DEFAULT 0,
  `descripcion` text DEFAULT NULL,
  `idCategoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `instrumento`
--

INSERT INTO `instrumento` (`id`, `instrumento`, `marca`, `modelo`, `imagen`, `precio`, `costoEnvio`, `cantidadVendida`, `descripcion`, `idCategoria`) VALUES
(1, 'Mandolina Instrumento Musical Stagg Sunburst', 'Stagg', 'M20', 'nro10.jpg', 2450.00, 0.00, 28, 'Estas viendo una excelente mandolina de la marca Stagg, con un sonido muy dulce, tapa aros y fondo de tilo, y diapasón de palisandro. Es un instrumento acústico (no se enchufa) de cuerdas dobles (4 pares) con la caja ovalada y cóncava, y el mástil corto. Su utilización abarca variados ámbitos, desde rock, folk, country y ensambles experimentales.', NULL),
(2, 'Pandereta Pandero Instrumento Musical', 'DyM ventas', '32 sonajas', 'nro9.jpg', 325.00, 150.00, 10, '1 Pandereta - 32 sonajas metálicas. Más de 8 años vendiendo con 100 % de calificaciones POSITIVAS y clientes satisfechos !! ', NULL),
(3, 'Triangulo Musical 24 Cm Percusion', 'LBP', '24', 'nro8.jpg', 260.00, 250.00, 3, 'Triangulo Musical de 24 Centímetros De Acero. ENVIOS POR CORREO O ENCOMIENDA: Se le deberán adicionar $40 en concepto de Despacho y el Costo del envío se abonará al recibir el producto en Terminal, Sucursal OCA o Domicilio', NULL),
(4, 'Bar Chimes Lp Cortina Musical 72 Barras', 'FM', 'LATIN', 'nro7.jpg', 2250.00, 0.00, 2, 'BARCHIME CORTINA MUSICAL DE 25 BARRAS LATIN CUSTOM. Emitimos factura A y B', NULL),
(5, 'Shekeres. Instrumento. Música. Artesanía.', 'Azalea Artesanías', 'Cuentas de madera', 'nro6.jpg', 850.00, 300.00, 5, 'Las calabazas utilizadas para nuestras artesanías son sembradas y cosechadas por nosotros, quienes seleccionamos el mejor fruto para garantizar la calidad del producto y ofrecerle algo creativo y original.', NULL),
(6, 'Antiguo Piano Aleman Con Candelabros.', 'Neumeyer', 'Stratus', 'nro3.jpg', 17000.00, 2000.00, 0, 'Buen dia! Sale a la venta este Piano Alemán Neumeyer con candelabros incluidos. Tiene una talla muy bonita en la madera. Una pieza de calidad.', NULL),
(7, 'Guitarra Ukelele Infantil Grande 60cm', 'GUITARRA', 'UKELELE', 'nro4.jpg', 500.00, 0.00, 5, 'Material: Plástico smil madera 4 Cuerdas longitud: 60cm, el mejor regalo para usted, su familia y amigos, adecuado para 3-18 años de edad', NULL),
(8, 'Teclado Organo Electronico Musical Instrumento 54 Teclas', 'GADNIC', 'T01', 'nro2.jpg', 2250.00, 0.00, 1375, 'Organo Electrónico GADNIC T01. Display de Led. 54 Teclas. 100 Timbres / 100 Ritmos. 4 1/2 octavas. 8 Percusiones. 8 Canciones de muestra. Grabación y reproducción. Entrada para Micrófono. Salida de Audio (Auriculares / Amplificador). Vibrato. Sustain Incluye Atril Apoya partitura y Micrófono. Dimensiones: 84,5 x 32,5 x 11 cm', NULL),
(9, 'Instrumentos De Percusión Niños Set Musical Con Estuche', 'KNIGHT', 'LB17', 'nro1.jpg', 2700.00, 300.00, 15, 'Estas viendo un excelente y completísimo set de percusion para niños con estuche rígido, equipado con los instrumentos mas divertidos! De gran calidad y sonoridad. Ideal para jardines, escuelas primarias, musicoterapeutas o chicos que se quieran iniciar en la música de la mejor manera. Es un muy buen producto que garantiza entretenimiento en cualquier casa o reunión, ya que esta equipado para que varias personas al mismo tiempo estén tocando un instrumento.', NULL),
(10, 'Batería Musical Infantil Juguete Niño 9 Piezas Palillos', 'Bateria', 'Infantil', 'nro5.jpg', 850.00, 250.00, 380, 'DESCRIPCIÓN: DE 1 A 3 AÑOS. EL SET INCLUYE 5 TAMBORES, PALILLOS Y EL PLATILLO TAL CUAL LAS FOTOS. SONIDOS REALISTAS Y FÁCIL DE MONTAR. MEDIDAS: 40X20X46 CM', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria_instrumento`
--
ALTER TABLE `categoria_instrumento`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `instrumento`
--
ALTER TABLE `instrumento`
  ADD KEY `fk_categoria_instrumento` (`idCategoria`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `instrumento`
--
ALTER TABLE `instrumento`
  ADD CONSTRAINT `fk_categoria_instrumento` FOREIGN KEY (`idCategoria`) REFERENCES `categoria_instrumento` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
