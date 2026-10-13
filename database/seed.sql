-- ==============================================================================
-- YO MERCO (COLOMBIA) - SEED DATA: 6 SUPERMERCADOS Y 50 PRODUCTOS ESENCIALES
-- Canasta Básica Familiar Colombiana con Precios de Mercado Realistas (COP)
-- Enfoque Manizales / Caldas
-- ==============================================================================

-- 1. SUPERMERCADOS (6 Cadenas Principales)
INSERT INTO public.supermarkets (id, name, slug, logo_url, tier, website_url, city) VALUES
('11111111-1111-1111-1111-111111111111', 'Tiendas D1', 'd1', 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=120&q=80', 'hard_discount', 'https://tiendasd1.com/', 'Manizales'),
('22222222-2222-2222-2222-222222222222', 'Tiendas Ara', 'ara', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&q=80', 'hard_discount', 'https://tiendasara.com/', 'Manizales'),
('33333333-3333-3333-3333-333333333333', 'Mercaldas', 'mercaldas', 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=120&q=80', 'regional', 'https://www.mercaldas.com/', 'Manizales'),
('44444444-4444-4444-4444-444444444444', 'Supermercado del Centro', 'centro', 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=120&q=80', 'regional', 'https://supermercadodelcentro.com/', 'Manizales'),
('55555555-5555-5555-5555-555555555555', 'Éxito', 'exito', 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&w=120&q=80', 'hypermarket', 'https://www.exito.com/', 'Manizales'),
('66666666-6666-6666-6666-666666666666', 'Carulla', 'carulla', 'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?auto=format&fit=crop&w=120&q=80', 'premium', 'https://www.carulla.com/', 'Manizales')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, tier = EXCLUDED.tier;

-- 2. CATEGORÍAS DE LA CANASTA BÁSICA
INSERT INTO public.categories (id, name, icon, display_order) VALUES
('c1000000-0000-0000-0000-000000000001', 'Despensa y Granos', '🌾', 1),
('c1000000-0000-0000-0000-000000000002', 'Lácteos y Quesos', '🧀', 2),
('c1000000-0000-0000-0000-000000000003', 'Frutas y Verduras', '🥑', 3),
('c1000000-0000-0000-0000-000000000004', 'Carnes y Charcutería', '🥩', 4),
('c1000000-0000-0000-0000-000000000005', 'Aseo Hogar', '🧼', 5),
('c1000000-0000-0000-0000-000000000006', 'Cuidado Personal', '🪥', 6),
('c1000000-0000-0000-0000-000000000007', 'Panadería y Café', '☕', 7),
('c1000000-0000-0000-0000-000000000008', 'Cereales y Desayuno', '🥣', 8),
('c1000000-0000-0000-0000-000000000009', 'Enlatados y Conservas', '🥫', 9),
('c1000000-0000-0000-0000-000000000010', 'Bebidas y Refrescos', '🥤', 10)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon;

-- 3. PRODUCTOS MAESTROS (50 Esenciales de Alta Rotación en Colombia)
INSERT INTO public.products (id, category_id, name, unit_of_measure, standard_quantity, barcode, image_url) VALUES
-- Despensa y Granos (1 - 10)
('10000001-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'Arroz Blanco Tradicional / Roa / Diana 1000g', '1000g', 1.0, '7702001001010', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&q=80'),
('10000001-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'Aceite Vegetal de Cocina 900ml - 1000ml', '1000ml', 1.0, '7702001001020', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=80'),
('10000001-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000001', 'Frijol Cargamanto Rojo 500g', '500g', 0.5, '7702001001030', 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=300&q=80'),
('10000001-0000-0000-0000-000000000004', 'c1000000-0000-0000-0000-000000000001', 'Lenteja Seleccionada 500g', '500g', 0.5, '7702001001040', 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=300&q=80'),
('10000001-0000-0000-0000-000000000005', 'c1000000-0000-0000-0000-000000000001', 'Azúcar Blanca Refinada 1000g', '1000g', 1.0, '7702001001050', 'https://images.unsplash.com/photo-1622484212850-cab596d66e74?w=300&q=80'),
('10000001-0000-0000-0000-000000000006', 'c1000000-0000-0000-0000-000000000001', 'Sal Marina o Refinada Yodada 1000g', '1000g', 1.0, '7702001001060', 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&q=80'),
('10000001-0000-0000-0000-000000000007', 'c1000000-0000-0000-0000-000000000001', 'Panela Redonda / Cuadrada 1000g (Pastilla)', '1000g', 1.0, '7702001001070', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&q=80'),
('10000001-0000-0000-0000-000000000008', 'c1000000-0000-0000-0000-000000000001', 'Pasta Espagueti 250g - 500g', '500g', 0.5, '7702001001080', 'https://images.unsplash.com/photo-1621996346565-e3adc644d9fa?w=300&q=80'),
('10000001-0000-0000-0000-000000000009', 'c1000000-0000-0000-0000-000000000001', 'Harina de Maíz Precocida (Arepas) 1000g', '1000g', 1.0, '7702001001090', 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300&q=80'),
('10000001-0000-0000-0000-000000000010', 'c1000000-0000-0000-0000-000000000001', 'Atún en Lomitos en Aceite o Agua 140g - 170g', 'unidad', 1.0, '7702001001100', 'https://images.unsplash.com/photo-1544943910-4c1dc44a0eb5?w=300&q=80'),

-- Lácteos y Huevos (11 - 18)
('10000001-0000-0000-0000-000000000011', 'c1000000-0000-0000-0000-000000000002', 'Leche Entera en Bolsa 900ml - 1000ml', 'litro', 1.0, '7702001001110', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=80'),
('10000001-0000-0000-0000-000000000012', 'c1000000-0000-0000-0000-000000000002', 'Huevos Rojos Tipo AA (Panal x30 unidades)', 'panal_30', 30.0, '7702001001120', 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&q=80'),
('10000001-0000-0000-0000-000000000013', 'c1000000-0000-0000-0000-000000000002', 'Queso Campesino o Cuajada 500g', '500g', 0.5, '7702001001130', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=80'),
('10000001-0000-0000-0000-000000000014', 'c1000000-0000-0000-0000-000000000002', 'Mantequilla con Sal / Margarina 250g', '250g', 0.25, '7702001001140', 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&q=80'),
('10000001-0000-0000-0000-000000000015', 'c1000000-0000-0000-0000-000000000002', 'Yogur Familiar Entero con Frutas 1000g', '1000g', 1.0, '7702001001150', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80'),
('10000001-0000-0000-0000-000000000016', 'c1000000-0000-0000-0000-000000000002', 'Avena en Hojuelas 500g', '500g', 0.5, '7702001001160', 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300&q=80'),
('10000001-0000-0000-0000-000000000017', 'c1000000-0000-0000-0000-000000000002', 'Crema de Leche 200g', '200g', 0.2, '7702001001170', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=80'),
('10000001-0000-0000-0000-000000000018', 'c1000000-0000-0000-0000-000000000002', 'Kumis Tradicional 1000g', '1000g', 1.0, '7702001001180', 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=300&q=80'),

-- Frutas y Verduras (19 - 26)
('10000001-0000-0000-0000-000000000019', 'c1000000-0000-0000-0000-000000000003', 'Plátano Maduro o Verde (Kilo)', '1000g', 1.0, '7702001001190', 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&q=80'),
('10000001-0000-0000-0000-000000000020', 'c1000000-0000-0000-0000-000000000003', 'Papa Pastusa / Capira Lavada (Kilo)', '1000g', 1.0, '7702001001200', 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&q=80'),
('10000001-0000-0000-0000-000000000021', 'c1000000-0000-0000-0000-000000000003', 'Tomate Chonto de Guiso (Kilo)', '1000g', 1.0, '7702001001210', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&q=80'),
('10000001-0000-0000-0000-000000000022', 'c1000000-0000-0000-0000-000000000003', 'Cebolla Cabezona Blanca / Roja (Kilo)', '1000g', 1.0, '7702001001220', 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300&q=80'),
('10000001-0000-0000-0000-000000000023', 'c1000000-0000-0000-0000-000000000003', 'Aguacate Hass o Papelillo (Kilo)', '1000g', 1.0, '7702001001230', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&q=80'),
('10000001-0000-0000-0000-000000000024', 'c1000000-0000-0000-0000-000000000003', 'Zanahoria Seleccionada (Kilo)', '1000g', 1.0, '7702001001240', 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&q=80'),
('10000001-0000-0000-0000-000000000025', 'c1000000-0000-0000-0000-000000000003', 'Banano Criollo / Urabá (Kilo)', '1000g', 1.0, '7702001001250', 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&q=80'),
('10000001-0000-0000-0000-000000000026', 'c1000000-0000-0000-0000-000000000003', 'Cilantro y Cebolla Junca (Mazo)', 'paquete', 1.0, '7702001001260', 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=300&q=80'),

-- Carnes y Pollo (27 - 33)
('10000001-0000-0000-0000-000000000027', 'c1000000-0000-0000-0000-000000000004', 'Pechuga de Pollo Fresca o Congelada 1000g', '1000g', 1.0, '7702001001270', 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&q=80'),
('10000001-0000-0000-0000-000000000028', 'c1000000-0000-0000-0000-000000000004', 'Carne Molida Especial de Res (Kilo)', '1000g', 1.0, '7702001001280', 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=300&q=80'),
('10000001-0000-0000-0000-000000000029', 'c1000000-0000-0000-0000-000000000004', 'Pierna Pernil de Pollo (Kilo)', '1000g', 1.0, '7702001001290', 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&q=80'),
('10000001-0000-0000-0000-000000000030', 'c1000000-0000-0000-0000-000000000004', 'Carne de Cerdo Chuleta / Cañón (Kilo)', '1000g', 1.0, '7702001001300', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&q=80'),
('10000001-0000-0000-0000-000000000031', 'c1000000-0000-0000-0000-000000000004', 'Salchicha Manguera / Tradicional 500g', '500g', 0.5, '7702001001310', 'https://images.unsplash.com/photo-1629814249584-bd4d53cf0e7d?w=300&q=80'),
('10000001-0000-0000-0000-000000000032', 'c1000000-0000-0000-0000-000000000004', 'Jamón de Cerdo o Pavo Tajado 250g', '250g', 0.25, '7702001001320', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300&q=80'),
('10000001-0000-0000-0000-000000000033', 'c1000000-0000-0000-0000-000000000004', 'Tocino o Chicharrón para Freír (Kilo)', '1000g', 1.0, '7702001001330', 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=300&q=80'),

-- Aseo Hogar (34 - 40)
('10000001-0000-0000-0000-000000000034', 'c1000000-0000-0000-0000-000000000005', 'Detergente en Polvo para Ropa 1000g', '1000g', 1.0, '7702001001340', 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&q=80'),
('10000001-0000-0000-0000-000000000035', 'c1000000-0000-0000-0000-000000000005', 'Jabón Rey en Barra Tradicional 300g', 'unidad', 1.0, '7702001001350', 'https://images.unsplash.com/photo-1607006314187-b679eb3bc05e?w=300&q=80'),
('10000001-0000-0000-0000-000000000036', 'c1000000-0000-0000-0000-000000000005', 'Blanqueador / Cloro Líquido 1000ml', '1000ml', 1.0, '7702001001360', 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&q=80'),
('10000001-0000-0000-0000-000000000037', 'c1000000-0000-0000-0000-000000000005', 'Lavaplatos en Crema o Líquido 450g', '450g', 0.45, '7702001001370', 'https://images.unsplash.com/photo-1607006314187-b679eb3bc05e?w=300&q=80'),
('10000001-0000-0000-0000-000000000038', 'c1000000-0000-0000-0000-000000000005', 'Papel Higiénico Doble Hoja (Paquete x4 rollos)', 'paquete', 4.0, '7702001001380', 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=300&q=80'),
('10000001-0000-0000-0000-000000000039', 'c1000000-0000-0000-0000-000000000005', 'Suavizante para Ropa Aroma Floral 1000ml', '1000ml', 1.0, '7702001001390', 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&q=80'),
('10000001-0000-0000-0000-000000000040', 'c1000000-0000-0000-0000-000000000005', 'Limpia Pisos Desinfectante Lavanda 1000ml', '1000ml', 1.0, '7702001001400', 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&q=80'),

-- Cuidado Personal (41 - 45)
('10000001-0000-0000-0000-000000000041', 'c1000000-0000-0000-0000-000000000006', 'Crema Dental Colgate / Triple Acción 75ml - 100ml', 'unidad', 1.0, '7702001001410', 'https://images.unsplash.com/photo-1559591937-e62fb330bc1f?w=300&q=80'),
('10000001-0000-0000-0000-000000000042', 'c1000000-0000-0000-0000-000000000006', 'Jabón de Tocador en Barra (Pack x3)', 'paquete', 3.0, '7702001001420', 'https://images.unsplash.com/photo-1607006314187-b679eb3bc05e?w=300&q=80'),
('10000001-0000-0000-0000-000000000043', 'c1000000-0000-0000-0000-000000000006', 'Champú Anticaspa o Cuidado Suave 400ml', '400ml', 0.4, '7702001001430', 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&q=80'),
('10000001-0000-0000-0000-000000000044', 'c1000000-0000-0000-0000-000000000006', 'Desodorante Antitranspirante Roll-on 50ml', 'unidad', 1.0, '7702001001440', 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=300&q=80'),
('10000001-0000-0000-0000-000000000045', 'c1000000-0000-0000-0000-000000000006', 'Toallas Higiénicas Buenas Noches (Pack x10)', 'paquete', 10.0, '7702001001450', 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=300&q=80'),

-- Panadería y Café (46 - 50)
('10000001-0000-0000-0000-000000000046', 'c1000000-0000-0000-0000-000000000007', 'Café Tostado y Molido Colombiano Sello Rojo / Águila Roja 500g', '500g', 0.5, '7702001001460', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&q=80'),
('10000001-0000-0000-0000-000000000047', 'c1000000-0000-0000-0000-000000000007', 'Pan Tajado Blanco Familiar Bimbo / Artesanal 450g', '450g', 0.45, '7702001001470', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80'),
('10000001-0000-0000-0000-000000000048', 'c1000000-0000-0000-0000-000000000007', 'Chocolate Corona / Sol de Mesa en Pastillas 500g', '500g', 0.5, '7702001001480', 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=300&q=80'),
('10000001-0000-0000-0000-000000000049', 'c1000000-0000-0000-0000-000000000007', 'Galletas Saltín Noel Tradicionales (Taco x3)', 'paquete', 3.0, '7702001001490', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80'),
('10000001-0000-0000-0000-000000000050', 'c1000000-0000-0000-0000-000000000007', 'Arepas de Maíz Blanco con Queso (Paquete x5)', 'paquete', 5.0, '7702001001500', 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300&q=80'),
-- Nuevos Productos Verificados de Factura D1 y Canasta Familiar
('10000001-0000-0000-0000-000000000051', 'c1000000-0000-0000-0000-000000000008', 'Hojuelas de Maíz Azucaradas D1 500g', '500g', 0.5, '7700304462490', 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=300&q=80'),
('10000001-0000-0000-0000-000000000052', 'c1000000-0000-0000-0000-000000000002', 'Queso Doble Crema Tajado 400g', '400g', 0.4, '7700304827398', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=80'),
('10000001-0000-0000-0000-000000000053', 'c1000000-0000-0000-0000-000000000002', 'Leche Deslactosada UHT 900ml', 'litro', 1.0, '7700304822867', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=80'),
('10000001-0000-0000-0000-000000000054', 'c1000000-0000-0000-0000-000000000002', 'Bebida con Yogur y Fruta 1000g', '1000g', 1.0, '7700304660315', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80'),
('10000001-0000-0000-0000-000000000055', 'c1000000-0000-0000-0000-000000000009', 'Atún Lomitos en Agua 140g', 'unidad', 1.0, '7700304930951', 'https://images.unsplash.com/photo-1544943910-4c1dc44a0eb5?w=300&q=80'),
('10000001-0000-0000-0000-000000000056', 'c1000000-0000-0000-0000-000000000009', 'Ensalada Rusa en Conserva 300g', 'unidad', 1.0, '7700304132522', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&q=80'),
('10000001-0000-0000-0000-000000000057', 'c1000000-0000-0000-0000-000000000009', 'Mix de Verduras Campesinas 500g', '500g', 0.5, '7700304858132', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&q=80'),
('10000001-0000-0000-0000-000000000058', 'c1000000-0000-0000-0000-000000000004', 'Alitas de Pollo Congeladas 1000g', '1000g', 1.0, '7700304839223', 'https://images.unsplash.com/photo-1527477378407-63e26be80171?w=300&q=80'),
('10000001-0000-0000-0000-000000000059', 'c1000000-0000-0000-0000-000000000004', 'Mortadela con Jamón Tajada 400g', '400g', 0.4, '7700304846535', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300&q=80'),
('10000001-0000-0000-0000-000000000060', 'c1000000-0000-0000-0000-000000000010', 'Soda Saborizada Izots / Bretaña 300ml', 'unidad', 1.0, '7700304095032', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=300&q=80'),
('10000001-0000-0000-0000-000000000061', 'c1000000-0000-0000-0000-000000000005', 'Papel Higiénico Familiar Megarollo x12', 'paquete_12', 12.0, '7700304288168', 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=300&q=80'),
('10000001-0000-0000-0000-000000000062', 'c1000000-0000-0000-0000-000000000005', 'Jabón en Barra Multiactivo Ropa Pack x3', 'paquete_3', 3.0, '7708276719406', 'https://images.unsplash.com/photo-1607006314187-b679eb3bc05e?w=300&q=80'),
('10000001-0000-0000-0000-000000000063', 'c1000000-0000-0000-0000-000000000005', 'Servilletas de Cocina Absorbentes x100', 'paquete', 1.0, '7700304305209', 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=300&q=80')
ON CONFLICT (id) DO NOTHING;

-- 4. EQUIVALENCIAS DE PRODUCTOS (Variante Clave: Marca Propia D1/Ara vs Comercial Éxito/Carulla/Mercaldas)
INSERT INTO public.product_equivalences (master_product_id, supermarket_id, store_product_name, store_brand, match_confidence) VALUES
-- Arroz
('10000001-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Arroz Blanco D1 1000g', 'D1 De La Cuesta', 0.95),
('10000001-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 'Arroz Grano Entero Sabrosón 1000g', 'Sabrosón (Ara)', 0.95),
('10000001-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', 'Arroz Roa Flor Huila 1000g', 'Roa', 1.00),
('10000001-0000-0000-0000-000000000001', '44444444-4444-4444-4444-444444444444', 'Arroz Diana Tradicional 1000g', 'Diana', 1.00),
('10000001-0000-0000-0000-000000000001', '55555555-5555-5555-5555-555555555555', 'Arroz Éxito Grano Largo 1000g', 'Marca Éxito', 0.98),
('10000001-0000-0000-0000-000000000001', '66666666-6666-6666-6666-666666666666', 'Arroz Roa Extra Gourmet 1000g', 'Roa Gourmet', 1.00),

-- Leche
('10000001-0000-0000-0000-000000000011', '11111111-1111-1111-1111-111111111111', 'Leche Latti Entera 900ml', 'Latti', 0.95),
('10000001-0000-0000-0000-000000000011', '22222222-2222-2222-2222-222222222222', 'Leche Vaca Viva Entera 900ml', 'Vaca Viva', 0.95),
('10000001-0000-0000-0000-000000000011', '33333333-3333-3333-3333-333333333333', 'Leche Celema Entera 900ml', 'Celema Manizales', 1.00),
('10000001-0000-0000-0000-000000000011', '44444444-4444-4444-4444-444444444444', 'Leche Colanta Entera 900ml', 'Colanta', 1.00),
('10000001-0000-0000-0000-000000000011', '55555555-5555-5555-5555-555555555555', 'Leche Alquería Entera 900ml', 'Alquería', 1.00),
('10000001-0000-0000-0000-000000000011', '66666666-6666-6666-6666-666666666666', 'Leche Alpina Entera Pura 1000ml', 'Alpina', 1.00),

-- Café
('10000001-0000-0000-0000-000000000046', '11111111-1111-1111-1111-111111111111', 'Café Serrano Molido 500g', 'Serrano', 0.92),
('10000001-0000-0000-0000-000000000046', '22222222-2222-2222-2222-222222222222', 'Café Catatumbo Suave 500g', 'Catatumbo', 0.92),
('10000001-0000-0000-0000-000000000046', '33333333-3333-3333-3333-333333333333', 'Café Buendía / Sello Rojo 500g', 'Sello Rojo Caldas', 1.00),
('10000001-0000-0000-0000-000000000046', '44444444-4444-4444-4444-444444444444', 'Café Águila Roja 500g', 'Águila Roja', 1.00),
('10000001-0000-0000-0000-000000000046', '55555555-5555-5555-5555-555555555555', 'Café Sello Rojo Tradicional 500g', 'Sello Rojo', 1.00),
('10000001-0000-0000-0000-000000000046', '66666666-6666-6666-6666-666666666666', 'Café Juan Valdez Colina Molido 454g', 'Juan Valdez', 1.00)
ON CONFLICT (master_product_id, supermarket_id) DO NOTHING;

-- 5. PRECIOS REALISTAS POR TIENDA (COP)
-- Lógica: D1 y Ara lideran precios de descuento; Mercaldas y Centro compiten en frescos y abarrotes; Éxito maneja precios medios/hipermercado; Carulla es gama alta.
DO $$
DECLARE
    p RECORD;
    d1_id UUID := '11111111-1111-1111-1111-111111111111';
    ara_id UUID := '22222222-2222-2222-2222-222222222222';
    mercaldas_id UUID := '33333333-3333-3333-3333-333333333333';
    centro_id UUID := '44444444-4444-4444-4444-444444444444';
    exito_id UUID := '55555555-5555-5555-5555-555555555555';
    carulla_id UUID := '66666666-6666-6666-6666-666666666666';

    base_price NUMERIC;
BEGIN
    FOR p IN SELECT id, category_id FROM public.products LOOP
        -- Asignar precio base realista según la categoría
        IF p.category_id = 'c1000000-0000-0000-0000-000000000001' THEN base_price := 4500;  -- Granos
        ELSIF p.category_id = 'c1000000-0000-0000-0000-000000000002' THEN base_price := 16000; -- Lácteos / Panal Huevos
        ELSIF p.category_id = 'c1000000-0000-0000-0000-000000000003' THEN base_price := 3800;  -- Frutas / Verduras
        ELSIF p.category_id = 'c1000000-0000-0000-0000-000000000004' THEN base_price := 18500; -- Carnes / Pollo
        ELSIF p.category_id = 'c1000000-0000-0000-0000-000000000005' THEN base_price := 7800;  -- Aseo
        ELSIF p.category_id = 'c1000000-0000-0000-0000-000000000006' THEN base_price := 9200;  -- Cuidado Personal
        ELSE base_price := 12500; -- Panadería / Café
        END IF;

        -- Ajustes específicos para productos icónicos
        IF p.id = '10000001-0000-0000-0000-000000000001' THEN base_price := 4100; END IF; -- Arroz
        IF p.id = '10000001-0000-0000-0000-000000000002' THEN base_price := 8400; END IF; -- Aceite
        IF p.id = '10000001-0000-0000-0000-000000000011' THEN base_price := 3400; END IF; -- Leche
        IF p.id = '10000001-0000-0000-0000-000000000012' THEN base_price := 17200; END IF; -- Huevos x30
        IF p.id = '10000001-0000-0000-0000-000000000046' THEN base_price := 18900; END IF; -- Café 500g

        -- Precios D1 (Ahorro líder en abarrotes)
        INSERT INTO public.supermarket_prices (product_id, supermarket_id, price, is_promo)
        VALUES (p.id, d1_id, ROUND(base_price * 0.88), false)
        ON CONFLICT (product_id, supermarket_id) DO UPDATE SET price = EXCLUDED.price;

        -- Precios Ara (Competidor directo D1, muy fuerte en despensa)
        INSERT INTO public.supermarket_prices (product_id, supermarket_id, price, is_promo)
        VALUES (p.id, ara_id, ROUND(base_price * 0.90), false)
        ON CONFLICT (product_id, supermarket_id) DO UPDATE SET price = EXCLUDED.price;

        -- Precios Mercaldas (Líder regional Manizales, rey en carnes y frescos locales)
        INSERT INTO public.supermarket_prices (product_id, supermarket_id, price, is_promo)
        VALUES (p.id, mercaldas_id, 
            CASE 
                WHEN p.category_id IN ('c1000000-0000-0000-0000-000000000003', 'c1000000-0000-0000-0000-000000000004') 
                THEN ROUND(base_price * 0.86) -- Más barato en plaza/frescos
                ELSE ROUND(base_price * 0.98) 
            END, false)
        ON CONFLICT (product_id, supermarket_id) DO UPDATE SET price = EXCLUDED.price;

        -- Precios Supermercado del Centro (Economía tradicional en Manizales)
        INSERT INTO public.supermarket_prices (product_id, supermarket_id, price, is_promo)
        VALUES (p.id, centro_id, ROUND(base_price * 0.95), false)
        ON CONFLICT (product_id, supermarket_id) DO UPDATE SET price = EXCLUDED.price;

        -- Precios Éxito (Hipermercado masivo, surtido completo)
        INSERT INTO public.supermarket_prices (product_id, supermarket_id, price, is_promo)
        VALUES (p.id, exito_id, ROUND(base_price * 1.08), false)
        ON CONFLICT (product_id, supermarket_id) DO UPDATE SET price = EXCLUDED.price;

        -- Precios Carulla (Segmento premium / delicatessen)
        INSERT INTO public.supermarket_prices (product_id, supermarket_id, price, is_promo)
        VALUES (p.id, carulla_id, ROUND(base_price * 1.25), false)
        ON CONFLICT (product_id, supermarket_id) DO UPDATE SET price = EXCLUDED.price;

    END LOOP;
END $$;
