const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const url = 'https://woogzpsygeggbnqnxhxn.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indvb2d6cHN5Z2VnZ2JucW54aHhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTc1NzYyMCwiZXhwIjoyMTA3MzMzNjIwfQ.0KAjMYUQjcncRojuaDAuGhgzBR8hdH6DOF_cFB6JXtI';

const supabase = createClient(url, serviceKey);

async function seed() {
  console.log('--- Iniciando Seeding en Supabase Cloud ---');

  // 1. Supermercados
  const supermarkets = [
    { id: '11111111-1111-1111-1111-111111111111', name: 'Tiendas D1', slug: 'd1', logo_url: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=120&q=80', tier: 'hard_discount', website_url: 'https://tiendasd1.com/', city: 'Manizales' },
    { id: '22222222-2222-2222-2222-222222222222', name: 'Tiendas Ara', slug: 'ara', logo_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&q=80', tier: 'hard_discount', website_url: 'https://tiendasara.com/', city: 'Manizales' },
    { id: '33333333-3333-3333-3333-333333333333', name: 'Mercaldas', slug: 'mercaldas', logo_url: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=120&q=80', tier: 'regional', website_url: 'https://www.mercaldas.com/', city: 'Manizales' },
    { id: '44444444-4444-4444-4444-444444444444', name: 'Supermercado del Centro', slug: 'centro', logo_url: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=120&q=80', tier: 'regional', website_url: 'https://supermercadodelcentro.com/', city: 'Manizales' },
    { id: '55555555-5555-5555-5555-555555555555', name: 'Éxito', slug: 'exito', logo_url: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&w=120&q=80', tier: 'hypermarket', website_url: 'https://www.exito.com/', city: 'Manizales' },
    { id: '66666666-6666-6666-6666-666666666666', name: 'Carulla', slug: 'carulla', logo_url: 'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?auto=format&fit=crop&w=120&q=80', tier: 'premium', website_url: 'https://www.carulla.com/', city: 'Manizales' }
  ];
  const { error: errSups } = await supabase.from('supermarkets').upsert(supermarkets);
  if (errSups) console.error('Error insertando supermarkets:', errSups);
  else console.log('✓ 6 Supermercados insertados.');

  // 2. Categorías
  const categories = [
    { id: 'c1000000-0000-0000-0000-000000000001', name: 'Despensa y Granos', icon: '🌾', display_order: 1 },
    { id: 'c1000000-0000-0000-0000-000000000002', name: 'Lácteos y Huevos', icon: '🥛', display_order: 2 },
    { id: 'c1000000-0000-0000-0000-000000000003', name: 'Frutas y Verduras', icon: '🥑', display_order: 3 },
    { id: 'c1000000-0000-0000-0000-000000000004', name: 'Carnes y Pollo', icon: '🥩', display_order: 4 },
    { id: 'c1000000-0000-0000-0000-000000000005', name: 'Aseo Hogar', icon: '🧼', display_order: 5 },
    { id: 'c1000000-0000-0000-0000-000000000006', name: 'Cuidado Personal', icon: '🪥', display_order: 6 },
    { id: 'c1000000-0000-0000-0000-000000000007', name: 'Panadería y Café', icon: '☕', display_order: 7 }
  ];
  const { error: errCats } = await supabase.from('categories').upsert(categories);
  if (errCats) console.error('Error insertando categories:', errCats);
  else console.log('✓ 7 Categorías insertadas.');

  // 3. Productos (50 productos básicos)
  const products = [
    { id: '10000001-0000-0000-0000-000000000001', category_id: 'c1000000-0000-0000-0000-000000000001', name: 'Arroz Blanco Tradicional 1000g', unit_of_measure: '1000g', standard_quantity: 1.0, barcode: '7702001001010', image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000002', category_id: 'c1000000-0000-0000-0000-000000000001', name: 'Aceite Vegetal de Cocina 900ml - 1000ml', unit_of_measure: '1000ml', standard_quantity: 1.0, barcode: '7702001001020', image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000003', category_id: 'c1000000-0000-0000-0000-000000000001', name: 'Frijol Cargamanto Rojo 500g', unit_of_measure: '500g', standard_quantity: 0.5, barcode: '7702001001030', image_url: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000004', category_id: 'c1000000-0000-0000-0000-000000000001', name: 'Lenteja Seleccionada 500g', unit_of_measure: '500g', standard_quantity: 0.5, barcode: '7702001001040', image_url: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000005', category_id: 'c1000000-0000-0000-0000-000000000001', name: 'Azúcar Blanca Refinada 1000g', unit_of_measure: '1000g', standard_quantity: 1.0, barcode: '7702001001050', image_url: 'https://images.unsplash.com/photo-1622484212850-cab596d66e74?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000006', category_id: 'c1000000-0000-0000-0000-000000000001', name: 'Sal Marina o Refinada Yodada 1000g', unit_of_measure: '1000g', standard_quantity: 1.0, barcode: '7702001001060', image_url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000007', category_id: 'c1000000-0000-0000-0000-000000000001', name: 'Panela Redonda / Cuadrada 1000g', unit_of_measure: '1000g', standard_quantity: 1.0, barcode: '7702001001070', image_url: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000008', category_id: 'c1000000-0000-0000-0000-000000000001', name: 'Pasta Espagueti 250g - 500g', unit_of_measure: '500g', standard_quantity: 0.5, barcode: '7702001001080', image_url: 'https://images.unsplash.com/photo-1621996346565-e3adc644d9fa?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000009', category_id: 'c1000000-0000-0000-0000-000000000001', name: 'Harina de Maíz Precocida 1000g', unit_of_measure: '1000g', standard_quantity: 1.0, barcode: '7702001001090', image_url: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000010', category_id: 'c1000000-0000-0000-0000-000000000001', name: 'Atún en Lomitos en Aceite 140g - 170g', unit_of_measure: 'unidad', standard_quantity: 1.0, barcode: '7702001001100', image_url: 'https://images.unsplash.com/photo-1544943910-4c1dc44a0eb5?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000011', category_id: 'c1000000-0000-0000-0000-000000000002', name: 'Leche Entera en Bolsa 900ml - 1000ml', unit_of_measure: 'litro', standard_quantity: 1.0, barcode: '7702001001110', image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000012', category_id: 'c1000000-0000-0000-0000-000000000002', name: 'Huevos Rojos Tipo AA (Panal x30)', unit_of_measure: 'panal_30', standard_quantity: 30.0, barcode: '7702001001120', image_url: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000013', category_id: 'c1000000-0000-0000-0000-000000000002', name: 'Queso Campesino o Cuajada 500g', unit_of_measure: '500g', standard_quantity: 0.5, barcode: '7702001001130', image_url: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000014', category_id: 'c1000000-0000-0000-0000-000000000002', name: 'Mantequilla con Sal / Margarina 250g', unit_of_measure: '250g', standard_quantity: 0.25, barcode: '7702001001140', image_url: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000015', category_id: 'c1000000-0000-0000-0000-000000000002', name: 'Yogur Familiar Entero con Frutas 1000g', unit_of_measure: '1000g', standard_quantity: 1.0, barcode: '7702001001150', image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000016', category_id: 'c1000000-0000-0000-0000-000000000002', name: 'Avena en Hojuelas 500g', unit_of_measure: '500g', standard_quantity: 0.5, barcode: '7702001001160', image_url: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000017', category_id: 'c1000000-0000-0000-0000-000000000002', name: 'Crema de Leche 200g', unit_of_measure: '200g', standard_quantity: 0.2, barcode: '7702001001170', image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000018', category_id: 'c1000000-0000-0000-0000-000000000002', name: 'Kumis Tradicional 1000g', unit_of_measure: '1000g', standard_quantity: 1.0, barcode: '7702001001180', image_url: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000019', category_id: 'c1000000-0000-0000-0000-000000000003', name: 'Plátano Maduro o Verde (Kilo)', unit_of_measure: '1000g', standard_quantity: 1.0, barcode: '7702001001190', image_url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000020', category_id: 'c1000000-0000-0000-0000-000000000003', name: 'Papa Pastusa / Capira Lavada (Kilo)', unit_of_measure: '1000g', standard_quantity: 1.0, barcode: '7702001001200', image_url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000021', category_id: 'c1000000-0000-0000-0000-000000000003', name: 'Tomate Chonto de Guiso (Kilo)', unit_of_measure: '1000g', standard_quantity: 1.0, barcode: '7702001001210', image_url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000022', category_id: 'c1000000-0000-0000-0000-000000000003', name: 'Cebolla Cabezona Blanca / Roja (Kilo)', unit_of_measure: '1000g', standard_quantity: 1.0, barcode: '7702001001220', image_url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000023', category_id: 'c1000000-0000-0000-0000-000000000003', name: 'Aguacate Hass o Papelillo (Kilo)', unit_of_measure: '1000g', standard_quantity: 1.0, barcode: '7702001001230', image_url: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000024', category_id: 'c1000000-0000-0000-0000-000000000003', name: 'Zanahoria Seleccionada (Kilo)', unit_of_measure: '1000g', standard_quantity: 1.0, barcode: '7702001001240', image_url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000025', category_id: 'c1000000-0000-0000-0000-000000000003', name: 'Banano Criollo / Urabá (Kilo)', unit_of_measure: '1000g', standard_quantity: 1.0, barcode: '7702001001250', image_url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000026', category_id: 'c1000000-0000-0000-0000-000000000003', name: 'Cilantro y Cebolla Junca (Mazo)', unit_of_measure: 'paquete', standard_quantity: 1.0, barcode: '7702001001260', image_url: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000027', category_id: 'c1000000-0000-0000-0000-000000000004', name: 'Pechuga de Pollo Fresca 1000g', unit_of_measure: '1000g', standard_quantity: 1.0, barcode: '7702001001270', image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000028', category_id: 'c1000000-0000-0000-0000-000000000004', name: 'Carne Molida Especial de Res (Kilo)', unit_of_measure: '1000g', standard_quantity: 1.0, barcode: '7702001001280', image_url: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000029', category_id: 'c1000000-0000-0000-0000-000000000004', name: 'Pierna Pernil de Pollo (Kilo)', unit_of_measure: '1000g', standard_quantity: 1.0, barcode: '7702001001290', image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000030', category_id: 'c1000000-0000-0000-0000-000000000004', name: 'Carne de Cerdo Chuleta (Kilo)', unit_of_measure: '1000g', standard_quantity: 1.0, barcode: '7702001001300', image_url: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000031', category_id: 'c1000000-0000-0000-0000-000000000004', name: 'Salchicha Tradicional 500g', unit_of_measure: '500g', standard_quantity: 0.5, barcode: '7702001001310', image_url: 'https://images.unsplash.com/photo-1629814249584-bd4d53cf0e7d?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000032', category_id: 'c1000000-0000-0000-0000-000000000004', name: 'Jamón Tajado 250g', unit_of_measure: '250g', standard_quantity: 0.25, barcode: '7702001001320', image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000033', category_id: 'c1000000-0000-0000-0000-000000000004', name: 'Tocino para Freír (Kilo)', unit_of_measure: '1000g', standard_quantity: 1.0, barcode: '7702001001330', image_url: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000034', category_id: 'c1000000-0000-0000-0000-000000000005', name: 'Detergente en Polvo 1000g', unit_of_measure: '1000g', standard_quantity: 1.0, barcode: '7702001001340', image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000035', category_id: 'c1000000-0000-0000-0000-000000000005', name: 'Jabón Rey en Barra Tradicional 300g', unit_of_measure: 'unidad', standard_quantity: 1.0, barcode: '7702001001350', image_url: 'https://images.unsplash.com/photo-1607006314187-b679eb3bc05e?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000036', category_id: 'c1000000-0000-0000-0000-000000000005', name: 'Blanqueador Cloro Líquido 1000ml', unit_of_measure: '1000ml', standard_quantity: 1.0, barcode: '7702001001360', image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000037', category_id: 'c1000000-0000-0000-0000-000000000005', name: 'Lavaplatos en Crema 450g', unit_of_measure: '450g', standard_quantity: 0.45, barcode: '7702001001370', image_url: 'https://images.unsplash.com/photo-1607006314187-b679eb3bc05e?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000038', category_id: 'c1000000-0000-0000-0000-000000000005', name: 'Papel Higiénico Doble Hoja (x4)', unit_of_measure: 'paquete', standard_quantity: 4.0, barcode: '7702001001380', image_url: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000039', category_id: 'c1000000-0000-0000-0000-000000000005', name: 'Suavizante para Ropa 1000ml', unit_of_measure: '1000ml', standard_quantity: 1.0, barcode: '7702001001390', image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000040', category_id: 'c1000000-0000-0000-0000-000000000005', name: 'Limpia Pisos Desinfectante 1000ml', unit_of_measure: '1000ml', standard_quantity: 1.0, barcode: '7702001001400', image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000041', category_id: 'c1000000-0000-0000-0000-000000000006', name: 'Crema Dental Triple Acción 75ml', unit_of_measure: 'unidad', standard_quantity: 1.0, barcode: '7702001001410', image_url: 'https://images.unsplash.com/photo-1559591937-e62fb330bc1f?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000042', category_id: 'c1000000-0000-0000-0000-000000000006', name: 'Jabón de Tocador en Barra (Pack x3)', unit_of_measure: 'paquete', standard_quantity: 3.0, barcode: '7702001001420', image_url: 'https://images.unsplash.com/photo-1607006314187-b679eb3bc05e?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000043', category_id: 'c1000000-0000-0000-0000-000000000006', name: 'Champú Cuidado Suave 400ml', unit_of_measure: '400ml', standard_quantity: 0.4, barcode: '7702001001430', image_url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000044', category_id: 'c1000000-0000-0000-0000-000000000006', name: 'Desodorante Antitranspirante 50ml', unit_of_measure: 'unidad', standard_quantity: 1.0, barcode: '7702001001440', image_url: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000045', category_id: 'c1000000-0000-0000-0000-000000000006', name: 'Toallas Higiénicas (Pack x10)', unit_of_measure: 'paquete', standard_quantity: 10.0, barcode: '7702001001450', image_url: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000046', category_id: 'c1000000-0000-0000-0000-000000000007', name: 'Café Colombiano Sello Rojo 500g', unit_of_measure: '500g', standard_quantity: 0.5, barcode: '7702001001460', image_url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000047', category_id: 'c1000000-0000-0000-0000-000000000007', name: 'Pan Tajado Blanco Familiar 450g', unit_of_measure: '450g', standard_quantity: 0.45, barcode: '7702001001470', image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000048', category_id: 'c1000000-0000-0000-0000-000000000007', name: 'Chocolate Corona en Pastillas 500g', unit_of_measure: '500g', standard_quantity: 0.5, barcode: '7702001001480', image_url: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000049', category_id: 'c1000000-0000-0000-0000-000000000007', name: 'Galletas Saltín Tradicionales (x3)', unit_of_measure: 'paquete', standard_quantity: 3.0, barcode: '7702001001490', image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80' },
    { id: '10000001-0000-0000-0000-000000000050', category_id: 'c1000000-0000-0000-0000-000000000007', name: 'Arepas de Maíz Blanco con Queso (x5)', unit_of_measure: 'paquete', standard_quantity: 5.0, barcode: '7702001001500', image_url: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300&q=80' }
  ];
  const { error: errProds } = await supabase.from('products').upsert(products);
  if (errProds) console.error('Error insertando products:', errProds);
  else console.log('✓ 50 Productos insertados.');

  // 4. Precios Realistas para cada Supermercado
  // Multiplicadores relativos: D1 (0.88), Ara (0.90), Mercaldas (0.96), Centro (0.98), Éxito (1.08), Carulla (1.20)
  const multipliers = {
    '11111111-1111-1111-1111-111111111111': 0.88, // D1
    '22222222-2222-2222-2222-222222222222': 0.90, // Ara
    '33333333-3333-3333-3333-333333333333': 0.96, // Mercaldas
    '44444444-4444-4444-4444-444444444444': 0.98, // Centro
    '55555555-5555-5555-5555-555555555555': 1.08, // Éxito
    '66666666-6666-6666-6666-666666666666': 1.20  // Carulla
  };

  const basePrices = {
    'c1000000-0000-0000-0000-000000000001': 4800,  // Granos
    'c1000000-0000-0000-0000-000000000002': 14500, // Lácteos/Huevos
    'c1000000-0000-0000-0000-000000000003': 3800,  // Frutas/Verduras
    'c1000000-0000-0000-0000-000000000004': 17500, // Carnes
    'c1000000-0000-0000-0000-000000000005': 7500,  // Aseo Hogar
    'c1000000-0000-0000-0000-000000000006': 8500,  // Cuidado Personal
    'c1000000-0000-0000-0000-000000000007': 7200   // Pan/Café
  };

  const pricesToInsert = [];
  for (const prod of products) {
    const base = basePrices[prod.category_id] || 5000;
    for (const sup of supermarkets) {
      const mult = multipliers[sup.id];
      const rawPrice = Math.round((base * mult) / 50) * 50;
      pricesToInsert.push({
        product_id: prod.id,
        supermarket_id: sup.id,
        price: rawPrice,
        is_promo: sup.slug === 'd1' || sup.slug === 'ara' ? false : (Math.random() > 0.8),
        stock_status: 'in_stock'
      });
    }
  }

  const { error: errPrices } = await supabase.from('supermarket_prices').upsert(pricesToInsert);
  if (errPrices) console.error('Error insertando precios:', errPrices);
  else console.log(`✓ ${pricesToInsert.length} Precios registrados.`);

  console.log('--- Seeding Completado con Éxito ---');
}

seed();
