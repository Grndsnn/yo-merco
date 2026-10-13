import { Supermarket, Category, Product } from '@/types';

export const SUPERMARKETS: Supermarket[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Tiendas D1',
    slug: 'd1',
    logo_url: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=120&q=80',
    tier: 'hard_discount',
    website_url: 'https://tiendasd1.com/',
    city: 'Manizales',
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Tiendas Ara',
    slug: 'ara',
    logo_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&q=80',
    tier: 'hard_discount',
    website_url: 'https://tiendasara.com/',
    city: 'Manizales',
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'Mercaldas',
    slug: 'mercaldas',
    logo_url: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=120&q=80',
    tier: 'regional',
    website_url: 'https://www.mercaldas.com/',
    city: 'Manizales',
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    name: 'Supermercado del Centro',
    slug: 'centro',
    logo_url: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=120&q=80',
    tier: 'regional',
    website_url: 'https://supermercadodelcentro.com/',
    city: 'Manizales',
  },
  {
    id: '55555555-5555-5555-5555-555555555555',
    name: 'Éxito',
    slug: 'exito',
    logo_url: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&w=120&q=80',
    tier: 'hypermarket',
    website_url: 'https://www.exito.com/',
    city: 'Manizales',
  },
  {
    id: '66666666-6666-6666-6666-666666666666',
    name: 'Carulla',
    slug: 'carulla',
    logo_url: 'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?auto=format&fit=crop&w=120&q=80',
    tier: 'premium',
    website_url: 'https://www.carulla.com/',
    city: 'Manizales',
  },
];

export const CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Despensa y Granos', icon: '🌾', display_order: 1 },
  { id: 'cat-cereales', name: 'Cereales y Desayuno', icon: '🥣', display_order: 2 },
  { id: 'cat-2', name: 'Lácteos y Quesos', icon: '🧀', display_order: 3 },
  { id: 'cat-4', name: 'Carnes y Charcutería', icon: '🥩', display_order: 4 },
  { id: 'cat-conservas', name: 'Enlatados y Conservas', icon: '🥫', display_order: 5 },
  { id: 'cat-3', name: 'Frutas y Verduras', icon: '🥑', display_order: 6 },
  { id: 'cat-bebidas', name: 'Bebidas y Refrescos', icon: '🥤', display_order: 7 },
  { id: 'cat-7', name: 'Panadería y Café', icon: '☕', display_order: 8 },
  { id: 'cat-5', name: 'Aseo del Hogar', icon: '🧼', display_order: 9 },
  { id: 'cat-6', name: 'Cuidado Personal', icon: '🪥', display_order: 10 },
];

// Matriz de precios por ID de producto y slug de supermercado (en Pesos Colombianos COP)
export const PRODUCT_PRICES_MATRIX: Record<string, Record<string, number>> = {
  // Despensa y Granos
  'prod-1': { d1: 3990, ara: 3850, mercaldas: 4000, centro: 4050, exito: 4400, carulla: 5100 }, // Arroz 1000g (D1 Albar $3.990 real, Mercaldas Roa $4.000 real)
  'prod-2': { d1: 7600, ara: 7800, mercaldas: 8300, centro: 8150, exito: 8900, carulla: 10900 }, // Aceite 1000ml
  'prod-3': { d1: 4900, ara: 5100, mercaldas: 5300, centro: 5200, exito: 5800, carulla: 6900 }, // Frijol Cargamanto 500g
  'prod-4': { d1: 3400, ara: 3500, mercaldas: 3800, centro: 3700, exito: 4200, carulla: 4950 }, // Lenteja 500g
  'prod-5': { d1: 4200, ara: 4300, mercaldas: 4600, centro: 4500, exito: 4950, carulla: 5700 }, // Azúcar Blanca 1000g
  'prod-6': { d1: 1500, ara: 1600, mercaldas: 1800, centro: 1750, exito: 2100, carulla: 2600 }, // Sal Yodada 1000g
  'prod-7': { d1: 4850, ara: 4900, mercaldas: 5200, centro: 5100, exito: 5700, carulla: 6400 }, // Panela Pastilla 1000g
  'prod-8': { d1: 3850, ara: 3900, mercaldas: 4200, centro: 4100, exito: 4600, carulla: 5400 }, // Spaghetti Capitán / Doria 500g (Factura D1: $3.850)
  'prod-9': { d1: 3100, ara: 3200, mercaldas: 3500, centro: 3400, exito: 3850, carulla: 4600 }, // Harina Pan / Arepas 1000g
  'prod-10': { d1: 5200, ara: 5350, mercaldas: 5800, centro: 5700, exito: 6300, carulla: 7500 }, // Atún Lomitos en Aceite

  // Lácteos y Huevos
  'prod-11': { d1: 3100, ara: 3200, mercaldas: 3450, centro: 3400, exito: 3900, carulla: 4600 }, // Leche Entera 900ml
  'prod-12': { d1: 15900, ara: 16200, mercaldas: 16600, centro: 16400, exito: 18500, carulla: 21900 }, // Huevos AA x30
  'prod-13': { d1: 7800, ara: 8100, mercaldas: 8400, centro: 8200, exito: 9200, carulla: 11200 }, // Queso Campesino 500g
  'prod-14': { d1: 4200, ara: 4400, mercaldas: 4800, centro: 4700, exito: 5300, carulla: 6400 }, // Mantequilla / Margarina 250g
  'prod-15': { d1: 6500, ara: 6700, mercaldas: 7100, centro: 6950, exito: 7900, carulla: 9500 }, // Yogur 1000g
  'prod-16': { d1: 3100, ara: 3250, mercaldas: 3500, centro: 3450, exito: 3950, carulla: 4700 }, // Avena en Hojuelas 500g
  'prod-17': { d1: 2900, ara: 3050, mercaldas: 3300, centro: 3200, exito: 3700, carulla: 4400 }, // Crema de Leche 200g
  'prod-18': { d1: 6200, ara: 6400, mercaldas: 6900, centro: 6800, exito: 7700, carulla: 9200 }, // Kumis 1000g

  // Frutas y Verduras (Mercaldas y Centro muy competitivos en frescos)
  'prod-19': { d1: 3600, ara: 3500, mercaldas: 3100, centro: 2950, exito: 4100, carulla: 5300 }, // Plátano Maduro 1kg
  'prod-20': { d1: 3400, ara: 3300, mercaldas: 2800, centro: 2700, exito: 3900, carulla: 4900 }, // Papa Pastusa 1kg
  'prod-21': { d1: 4300, ara: 4200, mercaldas: 3600, centro: 3500, exito: 4900, carulla: 6200 }, // Tomate Chonto 1kg
  'prod-22': { d1: 3800, ara: 3700, mercaldas: 3200, centro: 3100, exito: 4200, carulla: 5400 }, // Cebolla Cabezona 1kg
  'prod-23': { d1: 6900, ara: 6800, mercaldas: 5800, centro: 5600, exito: 7900, carulla: 9800 }, // Aguacate Hass 1kg
  'prod-24': { d1: 2900, ara: 2800, mercaldas: 2400, centro: 2300, exito: 3400, carulla: 4200 }, // Zanahoria 1kg
  'prod-25': { d1: 2700, ara: 2600, mercaldas: 2200, centro: 2100, exito: 3100, carulla: 3900 }, // Banano Criollo 1kg
  'prod-26': { d1: 1800, ara: 1750, mercaldas: 1400, centro: 1300, exito: 2200, carulla: 2900 }, // Mazo de Cilantro/Cebolla

  // Carnes y Pollo (Mercaldas referente tradicional en Caldas)
  'prod-27': { d1: 17500, ara: 17800, mercaldas: 16800, centro: 16900, exito: 19500, carulla: 23500 }, // Pechuga de Pollo 1kg
  'prod-28': { d1: 19800, ara: 20200, mercaldas: 18900, centro: 19100, exito: 22500, carulla: 27800 }, // Carne Molida Especial 1kg
  'prod-29': { d1: 11200, ara: 11500, mercaldas: 10800, centro: 10900, exito: 12900, carulla: 15400 }, // Pierna Pernil 1kg
  'prod-30': { d1: 16900, ara: 17200, mercaldas: 16200, centro: 16400, exito: 19100, carulla: 23800 }, // Chuleta de Cerdo 1kg
  'prod-31': { d1: 7200, ara: 7400, mercaldas: 7800, centro: 7600, exito: 8500, carulla: 10200 }, // Salchicha Tradicional 500g
  'prod-32': { d1: 5800, ara: 6100, mercaldas: 6400, centro: 6300, exito: 7200, carulla: 8900 }, // Jamón Tajado 250g
  'prod-33': { d1: 14500, ara: 14800, mercaldas: 13900, centro: 14100, exito: 16400, carulla: 19800 }, // Tocino / Chicharrón 1kg

  // Aseo Hogar
  'prod-34': { d1: 6800, ara: 7100, mercaldas: 7500, centro: 7400, exito: 8300, carulla: 9900 }, // Detergente en Polvo 1kg
  'prod-35': { d1: 2300, ara: 2400, mercaldas: 2600, centro: 2500, exito: 2900, carulla: 3500 }, // Jabón Rey 300g
  'prod-36': { d1: 3100, ara: 3200, mercaldas: 3500, centro: 3400, exito: 3900, carulla: 4600 }, // Blanqueador / Cloro 1000ml (Factura D1: $3.100)
  'prod-37': { d1: 3900, ara: 4100, mercaldas: 4500, centro: 4400, exito: 4950, carulla: 5900 }, // Crema Lavaplatos 450g
  'prod-38': { d1: 5900, ara: 6200, mercaldas: 6700, centro: 6600, exito: 7400, carulla: 8900 }, // Papel Higiénico x4
  'prod-39': { d1: 5400, ara: 5600, mercaldas: 6100, centro: 6000, exito: 6800, carulla: 8100 }, // Suavizante Ropa 1000ml
  'prod-40': { d1: 3600, ara: 3800, mercaldas: 4200, centro: 4100, exito: 4700, carulla: 5600 }, // Limpiapisos 1000ml

  // Cuidado Personal
  'prod-41': { d1: 4200, ara: 4400, mercaldas: 4800, centro: 4700, exito: 5300, carulla: 6400 }, // Crema Dental 75ml
  'prod-42': { d1: 5800, ara: 6100, mercaldas: 6500, centro: 6400, exito: 7300, carulla: 8700 }, // Jabón de Tocador x3
  'prod-43': { d1: 8900, ara: 9300, mercaldas: 9900, centro: 9700, exito: 11200, carulla: 13900 }, // Champú 400ml
  'prod-44': { d1: 6900, ara: 7200, mercaldas: 7800, centro: 7650, exito: 8700, carulla: 10500 }, // Desodorante Roll-on 50ml
  'prod-45': { d1: 6200, ara: 6500, mercaldas: 6900, centro: 6800, exito: 7700, carulla: 9200 }, // Toallas Higiénicas x10

  // Panadería y Café
  'prod-46': { d1: 16800, ara: 17100, mercaldas: 18500, centro: 18200, exito: 20500, carulla: 25900 }, // Café Molido 500g
  'prod-47': { d1: 2990, ara: 3150, mercaldas: 3800, centro: 3700, exito: 4400, carulla: 5200 }, // Pan Tajado Blanco 450g (Factura D1: $2.990)
  'prod-48': { d1: 7900, ara: 8200, mercaldas: 8700, centro: 8600, exito: 9600, carulla: 11500 }, // Chocolate de Mesa 500g
  'prod-49': { d1: 4100, ara: 4300, mercaldas: 4600, centro: 4500, exito: 5100, carulla: 6100 }, // Galletas Saltín Taco x3
  'prod-50': { d1: 3400, ara: 3600, mercaldas: 3900, centro: 3800, exito: 4300, carulla: 5200 }, // Arepas con Queso x5

  // === NUEVOS PRODUCTOS VERIFICADOS (Factura D1 y Canasta Familiar Ampliada) ===
  // Cereales y Desayuno
  'prod-cereal-hojuelas': { d1: 5850, ara: 5990, mercaldas: 6400, centro: 6300, exito: 7200, carulla: 8500 }, // Hojuelas Azucaradas 500g (Factura D1: $5.850)
  'prod-cereal-granola': { d1: 6900, ara: 7100, mercaldas: 7900, centro: 7800, exito: 8900, carulla: 10500 }, // Granola con Miel 400g
  'prod-cereal-choco': { d1: 5900, ara: 6100, mercaldas: 6800, centro: 6600, exito: 7700, carulla: 9100 }, // Cereal Bolitas Chocolate 400g

  // Lácteos y Quesos
  'prod-queso-doble-crema': { d1: 10500, ara: 10800, mercaldas: 12500, centro: 12200, exito: 13900, carulla: 16500 }, // Queso Doble Crema Tajado 400g (Factura D1: $10.500)
  'prod-queso-mozzarella': { d1: 11200, ara: 11500, mercaldas: 13200, centro: 12900, exito: 14800, carulla: 17500 }, // Queso Mozzarella Tajado 400g
  'prod-leche-deslact': { d1: 3200, ara: 3300, mercaldas: 3800, centro: 3700, exito: 4200, carulla: 4900 }, // Leche Deslactosada UHT 900ml (Factura D1: $3.200)
  'prod-bebida-yogur': { d1: 4250, ara: 4350, mercaldas: 4950, centro: 4800, exito: 5600, carulla: 6800 }, // Bebida con Yogur 1000g (Factura D1: $4.250)

  // Despensa & Panela
  'prod-panela-pulverizada': { d1: 4500, ara: 4650, mercaldas: 5100, centro: 4950, exito: 5600, carulla: 6500 }, // Panela Pulverizada 800g

  // Enlatados y Conservas
  'prod-atun-agua': { d1: 4450, ara: 4600, mercaldas: 5200, centro: 5100, exito: 5900, carulla: 7100 }, // Atún Lomitos en Agua 140g (Factura D1: $4.450)
  'prod-ensalada-rusa': { d1: 5490, ara: 5650, mercaldas: 6200, centro: 6100, exito: 6900, carulla: 8200 }, // Ensalada Rusa 300g (Factura D1: $5.490)
  'prod-mix-verduras': { d1: 5700, ara: 5850, mercaldas: 6500, centro: 6300, exito: 7200, carulla: 8600 }, // Mix de Verduras 500g (Factura D1: $5.700)
  'prod-maiz-tierno': { d1: 3600, ara: 3750, mercaldas: 4300, centro: 4200, exito: 4900, carulla: 5800 }, // Maíz Tierno Dulce 300g

  // Carnes y Charcutería
  'prod-alitas-pollo': { d1: 15700, ara: 15900, mercaldas: 16500, centro: 16200, exito: 18900, carulla: 22900 }, // Alitas de Pollo 1000g (Factura D1: $15.700)
  'prod-mortadela-jamon': { d1: 5990, ara: 6200, mercaldas: 6900, centro: 6700, exito: 7800, carulla: 9200 }, // Mortadela Jamón Tajada 400g (Factura D1: $5.990)

  // Bebidas y Refrescos
  'prod-soda-izots': { d1: 2100, ara: 2200, mercaldas: 2700, centro: 2600, exito: 3100, carulla: 3800 }, // Soda Izots / Bretaña 300ml (Factura D1: $2.100)
  'prod-jugo-nectar': { d1: 3400, ara: 3500, mercaldas: 4100, centro: 3950, exito: 4600, carulla: 5500 }, // Jugo Néctar 1000ml
  'prod-gaseosa-2l': { d1: 3800, ara: 3900, mercaldas: 5200, centro: 4900, exito: 5800, carulla: 6900 }, // Gaseosa Familiar 2L
  'prod-agua-bidon': { d1: 4500, ara: 4600, mercaldas: 5200, centro: 5100, exito: 5900, carulla: 7200 }, // Agua Bidón 5L

  // Aseo del Hogar
  'prod-papel-familiar': { d1: 21200, ara: 21500, mercaldas: 24900, centro: 23800, exito: 27900, carulla: 33500 }, // Papel Megarollo x12 (Factura D1: $21.200)
  'prod-jabon-barra-pack': { d1: 6150, ara: 6300, mercaldas: 6900, centro: 6700, exito: 7500, carulla: 8900 }, // Jabón en Barra Pack x3 (Factura D1: $6.150)
  'prod-servilletas': { d1: 2200, ara: 2300, mercaldas: 2800, centro: 2700, exito: 3200, carulla: 3900 }, // Servilletas x100 (Factura D1: $2.200)

  // === AMPLIACIÓN CANASTA FAMILIAR COMPLETA (Mercado Convencional Colombia) ===
  // Frutas & Verduras
  'prod-limon': { d1: 2800, ara: 2900, mercaldas: 2400, centro: 2300, exito: 3500, carulla: 4600 }, // Limón Tahití 1kg
  'prod-manzana': { d1: 5900, ara: 6100, mercaldas: 6800, centro: 6500, exito: 7800, carulla: 9500 }, // Manzana Roja x4
  'prod-naranja': { d1: 2500, ara: 2600, mercaldas: 2100, centro: 1950, exito: 3200, carulla: 4200 }, // Naranja para Jugo 1kg
  'prod-papaya': { d1: 3200, ara: 3100, mercaldas: 2600, centro: 2400, exito: 3800, carulla: 4900 }, // Papaya Maradol 1kg
  'prod-pina': { d1: 3800, ara: 3700, mercaldas: 3200, centro: 3000, exito: 4500, carulla: 5800 }, // Piña Oro Miel 1kg
  'prod-mango': { d1: 4200, ara: 4100, mercaldas: 3600, centro: 3400, exito: 4900, carulla: 6400 }, // Mango Tommy 1kg
  'prod-mora': { d1: 3900, ara: 4100, mercaldas: 3400, centro: 3200, exito: 4800, carulla: 6100 }, // Mora para Jugo 500g
  'prod-fresas': { d1: 4900, ara: 5200, mercaldas: 4500, centro: 4300, exito: 6200, carulla: 7900 }, // Fresas Seleccionadas 500g
  'prod-guayaba': { d1: 2900, ara: 2800, mercaldas: 2400, centro: 2200, exito: 3400, carulla: 4300 }, // Guayaba Manzana 1kg
  'prod-platano-verde': { d1: 3600, ara: 3500, mercaldas: 3100, centro: 2950, exito: 4100, carulla: 5300 }, // Plátano Verde 1kg
  'prod-papa-criolla': { d1: 4200, ara: 4100, mercaldas: 3500, centro: 3300, exito: 4900, carulla: 6400 }, // Papa Criolla Amarilla 1kg
  'prod-cebolla-junca': { d1: 1900, ara: 1850, mercaldas: 1500, centro: 1400, exito: 2400, carulla: 3200 }, // Cebolla Junca / Larga 500g

  // Carnes, Chorizos & Embutidos
  'prod-chorizo': { d1: 8900, ara: 9200, mercaldas: 10800, centro: 10500, exito: 12500, carulla: 15800 }, // Chorizos Tradicionales / Santarrosano x6 (450g)
  'prod-salchichon': { d1: 6200, ara: 6500, mercaldas: 7200, centro: 7000, exito: 8200, carulla: 9900 }, // Salchichón Cervecero / Tradicional 500g
  'prod-tocineta': { d1: 7900, ara: 8200, mercaldas: 9500, centro: 9200, exito: 10900, carulla: 13500 }, // Tocineta Ahumada Tajada 250g
  'prod-carne-asar': { d1: 24900, ara: 25500, mercaldas: 23800, centro: 23900, exito: 28500, carulla: 35000 }, // Carne de Res para Asar 1kg
  'prod-carne-guisar': { d1: 21500, ara: 21900, mercaldas: 20500, centro: 20700, exito: 24800, carulla: 30500 }, // Carne de Res para Guisar / Murillo 1kg
  'prod-costilla-cerdo': { d1: 18900, ara: 19200, mercaldas: 17900, centro: 18100, exito: 21900, carulla: 27000 }, // Costilla de Cerdo Fresca 1kg

  // Panadería, Galletas & Arepas
  'prod-pan-integral': { d1: 3600, ara: 3800, mercaldas: 4500, centro: 4300, exito: 5200, carulla: 6500 }, // Pan Tajado Integral 450g
  'prod-tostadas': { d1: 3200, ara: 3400, mercaldas: 3900, centro: 3800, exito: 4500, carulla: 5400 }, // Tostadas Tradicionales x24
  'prod-galletas-ducales': { d1: 4500, ara: 4700, mercaldas: 4900, centro: 4850, exito: 5500, carulla: 6600 }, // Galletas Ducales Noel Taco x3
  'prod-galletas-festival': { d1: 3800, ara: 3950, mercaldas: 4400, centro: 4300, exito: 4900, carulla: 5900 }, // Galletas Festival Chocolate Pack x4
  'prod-arepas-chocolo': { d1: 4200, ara: 4400, mercaldas: 4800, centro: 4700, exito: 5400, carulla: 6500 }, // Arepas de Chócolo con Queso x5

  // Lácteos & Quesos tradicionales
  'prod-queso-costeno': { d1: 9800, ara: 10100, mercaldas: 11500, centro: 11200, exito: 12900, carulla: 15500 }, // Queso Costeño 400g
  'prod-queso-parmesano': { d1: 4900, ara: 5200, mercaldas: 6200, centro: 6000, exito: 7200, carulla: 8900 }, // Queso Parmesano Rallado 100g
  'prod-leche-condensada': { d1: 4800, ara: 4950, mercaldas: 5600, centro: 5500, exito: 6200, carulla: 7500 }, // Leche Condensada 380g
  'prod-arequipe': { d1: 3900, ara: 4100, mercaldas: 4700, centro: 4600, exito: 5300, carulla: 6400 }, // Arequipe Colombiano 250g

  // Despensa, Salsas & Condimentos
  'prod-salsa-tomate': { d1: 3400, ara: 3600, mercaldas: 4200, centro: 4100, exito: 4900, carulla: 5900 }, // Salsa de Tomate Ketchup 400g
  'prod-mayonesa': { d1: 4200, ara: 4400, mercaldas: 5100, centro: 4950, exito: 5800, carulla: 7100 }, // Mayonesa 400g
  'prod-mostaza': { d1: 2100, ara: 2200, mercaldas: 2700, centro: 2600, exito: 3100, carulla: 3900 }, // Mostaza 200g
  'prod-caldo-gallina': { d1: 3100, ara: 3250, mercaldas: 3800, centro: 3700, exito: 4300, carulla: 5200 }, // Caldo de Gallina Maggi x12
  'prod-color-triguisar': { d1: 1800, ara: 1900, mercaldas: 2200, centro: 2100, exito: 2600, carulla: 3300 }, // Color / Triguisar Condimento 100g
  'prod-garbanzos': { d1: 3800, ara: 3950, mercaldas: 4400, centro: 4300, exito: 4900, carulla: 5800 }, // Garbanzos 500g
  'prod-arveja-verde': { d1: 2600, ara: 2700, mercaldas: 3100, centro: 3000, exito: 3600, carulla: 4300 }, // Arveja Verde Seca 500g
  'prod-pasta-tornillos': { d1: 1950, ara: 2050, mercaldas: 2400, centro: 2300, exito: 2700, carulla: 3300 }, // Pasta Corta Tornillos 250g
  'prod-azucar-morena': { d1: 4400, ara: 4500, mercaldas: 4800, centro: 4700, exito: 5200, carulla: 5900 }, // Azúcar Morena 1000g

  // Desayuno & Bebidas masivas
  'prod-cafe-instantaneo': { d1: 12900, ara: 13200, mercaldas: 14800, centro: 14500, exito: 16900, carulla: 20500 }, // Café Instantáneo Colcafé 170g
  'prod-chocolate-polvo': { d1: 8900, ara: 9200, mercaldas: 10500, centro: 10200, exito: 11900, carulla: 14500 }, // Chocolate Milo / Chocolisto 400g
  'prod-gaseosa-postobon': { d1: 3900, ara: 4100, mercaldas: 5200, centro: 4900, exito: 5800, carulla: 6900 }, // Gaseosa Postobón Manzana 2L
  'prod-gaseosa-colombiana': { d1: 3900, ara: 4100, mercaldas: 5200, centro: 4900, exito: 5800, carulla: 6900 }, // Gaseosa Colombiana 2L
  'prod-jugo-hit': { d1: 3600, ara: 3800, mercaldas: 4400, centro: 4200, exito: 4900, carulla: 5900 }, // Jugo Hit Frutas 1.5L

  // Aseo & Hogar
  'prod-esponjillas': { d1: 2400, ara: 2500, mercaldas: 2900, centro: 2800, exito: 3400, carulla: 4200 }, // Esponjillas Fibra Verde x3
  'prod-bolsas-basura': { d1: 4500, ara: 4700, mercaldas: 5400, centro: 5200, exito: 6200, carulla: 7500 }, // Bolsas de Basura Cocina x30
  'prod-toallas-cocina': { d1: 3900, ara: 4100, mercaldas: 4800, centro: 4700, exito: 5600, carulla: 6800 }, // Toallas de Cocina Rollo x2
  'prod-desengrasante': { d1: 5200, ara: 5400, mercaldas: 6300, centro: 6100, exito: 7200, carulla: 8900 }, // Desengrasante Cocina 500ml
  'prod-shampoo-savital': { d1: 7900, ara: 8200, mercaldas: 9200, centro: 8900, exito: 10500, carulla: 12900 }, // Shampoo Savital Sábila 400ml
  'prod-desodorante-speed': { d1: 7500, ara: 7800, mercaldas: 8900, centro: 8700, exito: 9900, carulla: 11900 }, // Desodorante Speed Stick 50g
};

export const PRODUCTS: Product[] = [
  // 1-10 Despensa
  {
    id: 'prod-1',
    category_id: 'cat-1',
    name: 'Arroz Blanco Tradicional 1000g',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001010',
    image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&q=80',
    is_essential: true,
    equivalences: {
      d1: { supermarket_id: '111', supermarket_slug: 'd1', store_product_name: 'Arroz Premium Albar 1000g', store_brand: 'Albar', match_confidence: 0.99 },
      ara: { supermarket_id: '222', supermarket_slug: 'ara', store_product_name: 'Arroz Sabrosón 1kg', store_brand: 'Sabrosón', match_confidence: 0.95 },
      mercaldas: { supermarket_id: '333', supermarket_slug: 'mercaldas', store_product_name: 'Arroz Roa Flor Huila 1kg', store_brand: 'Roa', match_confidence: 1.0 },
      centro: { supermarket_id: '444', supermarket_slug: 'centro', store_product_name: 'Arroz Diana Tradicional 1kg', store_brand: 'Diana', match_confidence: 1.0 },
      exito: { supermarket_id: '555', supermarket_slug: 'exito', store_product_name: 'Arroz Éxito Grano Entero 1kg', store_brand: 'Éxito', match_confidence: 0.98 },
      carulla: { supermarket_id: '666', supermarket_slug: 'carulla', store_product_name: 'Arroz Roa Extra Gourmet 1kg', store_brand: 'Roa Gourmet', match_confidence: 1.0 },
    }
  },
  {
    id: 'prod-2',
    category_id: 'cat-1',
    name: 'Aceite Vegetal de Cocina 1000ml',
    unit_of_measure: '1000ml',
    standard_quantity: 1.0,
    barcode: '7702001001020',
    image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=80',
    is_essential: true,
    equivalences: {
      d1: { supermarket_id: '111', supermarket_slug: 'd1', store_product_name: 'Aceite Riquísimo 900ml', store_brand: 'Riquísimo', match_confidence: 0.94 },
      ara: { supermarket_id: '222', supermarket_slug: 'ara', store_product_name: 'Aceite Ideal 1000ml', store_brand: 'Ideal', match_confidence: 0.96 },
      mercaldas: { supermarket_id: '333', supermarket_slug: 'mercaldas', store_product_name: 'Aceite Premier 1000ml', store_brand: 'Premier', match_confidence: 1.0 },
      centro: { supermarket_id: '444', supermarket_slug: 'centro', store_product_name: 'Aceite Oleocali 1000ml', store_brand: 'Oleocali', match_confidence: 0.98 },
      exito: { supermarket_id: '555', supermarket_slug: 'exito', store_product_name: 'Aceite Gourmet Familia 1000ml', store_brand: 'Gourmet', match_confidence: 1.0 },
      carulla: { supermarket_id: '666', supermarket_slug: 'carulla', store_product_name: 'Aceite Canola Life 1000ml', store_brand: 'Canola Life', match_confidence: 1.0 },
    }
  },
  {
    id: 'prod-3',
    category_id: 'cat-1',
    name: 'Frijol Cargamanto Rojo 500g',
    unit_of_measure: '500g',
    standard_quantity: 0.5,
    barcode: '7702001001030',
    image_url: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-4',
    category_id: 'cat-1',
    name: 'Lenteja Seleccionada 500g',
    unit_of_measure: '500g',
    standard_quantity: 0.5,
    barcode: '7702001001040',
    image_url: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-5',
    category_id: 'cat-1',
    name: 'Azúcar Blanca Refinada 1000g',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001050',
    image_url: 'https://images.unsplash.com/photo-1622484212850-cab596d66e74?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-6',
    category_id: 'cat-1',
    name: 'Sal Yodada Refinada 1000g',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001060',
    image_url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-7',
    category_id: 'cat-1',
    name: 'Panela en Pastilla 1000g',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001070',
    image_url: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-8',
    category_id: 'cat-1',
    name: 'Pasta Spaghetti 500g (Capitán / Doria)',
    unit_of_measure: '500g',
    standard_quantity: 0.5,
    barcode: '7700304698356', // Factura D1: SPAGUETTI CAP $3.850
    image_url: 'https://images.unsplash.com/photo-1621996346565-e3adc644d9fa?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-9',
    category_id: 'cat-1',
    name: 'Harina de Maíz Precocida 1000g',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001090',
    image_url: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-10',
    category_id: 'cat-conservas',
    name: 'Atún Lomitos en Aceite 160g',
    unit_of_measure: 'unidad',
    standard_quantity: 1.0,
    barcode: '7702001001100',
    image_url: 'https://images.unsplash.com/photo-1544943910-4c1dc44a0eb5?w=300&q=80',
    is_essential: true,
  },

  // 11-18 Lácteos y Huevos
  {
    id: 'prod-11',
    category_id: 'cat-2',
    name: 'Leche Entera en Bolsa 900ml',
    unit_of_measure: 'litro',
    standard_quantity: 1.0,
    barcode: '7702001001110',
    image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=80',
    is_essential: true,
    equivalences: {
      d1: { supermarket_id: '111', supermarket_slug: 'd1', store_product_name: 'Leche Latti Entera 900ml', store_brand: 'Latti', match_confidence: 0.95 },
      ara: { supermarket_id: '222', supermarket_slug: 'ara', store_product_name: 'Leche Vaca Viva Entera 900ml', store_brand: 'Vaca Viva', match_confidence: 0.95 },
      mercaldas: { supermarket_id: '333', supermarket_slug: 'mercaldas', store_product_name: 'Leche Celema Entera 900ml', store_brand: 'Celema Caldas', match_confidence: 1.0 },
      centro: { supermarket_id: '444', supermarket_slug: 'centro', store_product_name: 'Leche Colanta Entera 900ml', store_brand: 'Colanta', match_confidence: 1.0 },
      exito: { supermarket_id: '555', supermarket_slug: 'exito', store_product_name: 'Leche Alquería Entera 900ml', store_brand: 'Alquería', match_confidence: 1.0 },
      carulla: { supermarket_id: '666', supermarket_slug: 'carulla', store_product_name: 'Leche Alpina Pura Entera 1000ml', store_brand: 'Alpina', match_confidence: 1.0 },
    }
  },
  {
    id: 'prod-12',
    category_id: 'cat-2',
    name: 'Huevos Rojos Tipo AA (Panal x30)',
    unit_of_measure: 'panal_30',
    standard_quantity: 30.0,
    barcode: '7702001001120',
    image_url: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-13',
    category_id: 'cat-2',
    name: 'Queso Campesino o Cuajada 500g',
    unit_of_measure: '500g',
    standard_quantity: 0.5,
    barcode: '7702001001130',
    image_url: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-14',
    category_id: 'cat-2',
    name: 'Mantequilla / Margarina 250g',
    unit_of_measure: '250g',
    standard_quantity: 0.25,
    barcode: '7702001001140',
    image_url: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-15',
    category_id: 'cat-2',
    name: 'Yogur Entero Familiar 1000g',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001150',
    image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-16',
    category_id: 'cat-cereales',
    name: 'Avena en Hojuelas 500g',
    unit_of_measure: '500g',
    standard_quantity: 0.5,
    barcode: '7702001001160',
    image_url: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-17',
    category_id: 'cat-2',
    name: 'Crema de Leche 200g',
    unit_of_measure: '200g',
    standard_quantity: 0.2,
    barcode: '7702001001170',
    image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-18',
    category_id: 'cat-2',
    name: 'Kumis Tradicional 1000g',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001180',
    image_url: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=300&q=80',
    is_essential: false,
  },

  // 19-26 Frutas y Verduras
  {
    id: 'prod-19',
    category_id: 'cat-3',
    name: 'Plátano Maduro o Verde (Kilo)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001190',
    image_url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-20',
    category_id: 'cat-3',
    name: 'Papa Pastusa Lavada (Kilo)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001200',
    image_url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-21',
    category_id: 'cat-3',
    name: 'Tomate Chonto de Guiso (Kilo)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001210',
    image_url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-22',
    category_id: 'cat-3',
    name: 'Cebolla Cabezona Blanca (Kilo)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001220',
    image_url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-23',
    category_id: 'cat-3',
    name: 'Aguacate Hass o Papelillo (Kilo)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001230',
    image_url: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-24',
    category_id: 'cat-3',
    name: 'Zanahoria Seleccionada (Kilo)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001240',
    image_url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-25',
    category_id: 'cat-3',
    name: 'Banano Criollo (Kilo)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001250',
    image_url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-26',
    category_id: 'cat-3',
    name: 'Cilantro y Cebolla Junca (Mazo)',
    unit_of_measure: 'paquete',
    standard_quantity: 1.0,
    barcode: '7702001001260',
    image_url: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=300&q=80',
    is_essential: true,
  },

  // 27-33 Carnes y Pollo
  {
    id: 'prod-27',
    category_id: 'cat-4',
    name: 'Pechuga de Pollo Fresca 1000g',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001270',
    image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-28',
    category_id: 'cat-4',
    name: 'Carne Molida Especial de Res 1000g',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001280',
    image_url: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-29',
    category_id: 'cat-4',
    name: 'Pierna Pernil de Pollo (Kilo)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001290',
    image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-30',
    category_id: 'cat-4',
    name: 'Chuleta de Cerdo (Kilo)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001300',
    image_url: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-31',
    category_id: 'cat-4',
    name: 'Salchicha Tradicional 500g',
    unit_of_measure: '500g',
    standard_quantity: 0.5,
    barcode: '7702001001310',
    image_url: 'https://images.unsplash.com/photo-1629814249584-bd4d53cf0e7d?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-32',
    category_id: 'cat-4',
    name: 'Jamón Tajado de Cerdo 250g',
    unit_of_measure: '250g',
    standard_quantity: 0.25,
    barcode: '7702001001320',
    image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-33',
    category_id: 'cat-4',
    name: 'Tocino para Freír (Kilo)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001330',
    image_url: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=300&q=80',
    is_essential: false,
  },

  // 34-40 Aseo Hogar
  {
    id: 'prod-34',
    category_id: 'cat-5',
    name: 'Detergente en Polvo 1000g',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001340',
    image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-35',
    category_id: 'cat-5',
    name: 'Jabón Rey en Barra 300g',
    unit_of_measure: 'unidad',
    standard_quantity: 1.0,
    barcode: '7702001001350',
    image_url: 'https://images.unsplash.com/photo-1607006314187-b679eb3bc05e?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-36',
    category_id: 'cat-5',
    name: 'Blanqueador Desinfectante 1000ml',
    unit_of_measure: '1000ml',
    standard_quantity: 1.0,
    barcode: '7700304530939', // Factura D1: BLANQUEADOR B $3.100
    image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-37',
    category_id: 'cat-5',
    name: 'Lavaplatos en Crema 450g',
    unit_of_measure: '450g',
    standard_quantity: 0.45,
    barcode: '7702001001370',
    image_url: 'https://images.unsplash.com/photo-1607006314187-b679eb3bc05e?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-38',
    category_id: 'cat-5',
    name: 'Papel Higiénico Doble Hoja (x4)',
    unit_of_measure: 'paquete',
    standard_quantity: 4.0,
    barcode: '7702001001380',
    image_url: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-39',
    category_id: 'cat-5',
    name: 'Suavizante Textil Aroma Floral 1000ml',
    unit_of_measure: '1000ml',
    standard_quantity: 1.0,
    barcode: '7702001001390',
    image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-40',
    category_id: 'cat-5',
    name: 'Limpia Pisos Lavanda 1000ml',
    unit_of_measure: '1000ml',
    standard_quantity: 1.0,
    barcode: '7702001001400',
    image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&q=80',
    is_essential: false,
  },

  // 41-45 Cuidado Personal
  {
    id: 'prod-41',
    category_id: 'cat-6',
    name: 'Crema Dental Triple Acción 75ml',
    unit_of_measure: 'unidad',
    standard_quantity: 1.0,
    barcode: '7702001001410',
    image_url: 'https://images.unsplash.com/photo-1559591937-e62fb330bc1f?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-42',
    category_id: 'cat-6',
    name: 'Jabón de Tocador en Barra (Pack x3)',
    unit_of_measure: 'paquete',
    standard_quantity: 3.0,
    barcode: '7702001001420',
    image_url: 'https://images.unsplash.com/photo-1607006314187-b679eb3bc05e?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-43',
    category_id: 'cat-6',
    name: 'Champú Cuidado Suave 400ml',
    unit_of_measure: '400ml',
    standard_quantity: 0.4,
    barcode: '7702001001430',
    image_url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-44',
    category_id: 'cat-6',
    name: 'Desodorante Antitranspirante Roll-on 50ml',
    unit_of_measure: 'unidad',
    standard_quantity: 1.0,
    barcode: '7702001001440',
    image_url: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-45',
    category_id: 'cat-6',
    name: 'Toallas Higiénicas Buenas Noches (Pack x10)',
    unit_of_measure: 'paquete',
    standard_quantity: 10.0,
    barcode: '7702001001450',
    image_url: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=300&q=80',
    is_essential: true,
  },

  // 46-50 Panadería y Café
  {
    id: 'prod-46',
    category_id: 'cat-7',
    name: 'Café Tostado y Molido Colombiano 500g',
    unit_of_measure: '500g',
    standard_quantity: 0.5,
    barcode: '7702001001460',
    image_url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&q=80',
    is_essential: true,
    equivalences: {
      d1: { supermarket_id: '111', supermarket_slug: 'd1', store_product_name: 'Café Serrano Molido 500g', store_brand: 'Serrano', match_confidence: 0.92 },
      ara: { supermarket_id: '222', supermarket_slug: 'ara', store_product_name: 'Café Catatumbo Suave 500g', store_brand: 'Catatumbo', match_confidence: 0.92 },
      mercaldas: { supermarket_id: '333', supermarket_slug: 'mercaldas', store_product_name: 'Café Sello Rojo Tradicional 500g', store_brand: 'Sello Rojo', match_confidence: 1.0 },
      centro: { supermarket_id: '444', supermarket_slug: 'centro', store_product_name: 'Café Águila Roja 500g', store_brand: 'Águila Roja', match_confidence: 1.0 },
      exito: { supermarket_id: '555', supermarket_slug: 'exito', store_product_name: 'Café Sello Rojo 500g', store_brand: 'Sello Rojo', match_confidence: 1.0 },
      carulla: { supermarket_id: '666', supermarket_slug: 'carulla', store_product_name: 'Café Juan Valdez Colina 454g', store_brand: 'Juan Valdez', match_confidence: 1.0 },
    }
  },
  {
    id: 'prod-47',
    category_id: 'cat-7',
    name: 'Pan Tajado Blanco Familiar 450g',
    unit_of_measure: '450g',
    standard_quantity: 0.45,
    barcode: '7700304167647', // Factura D1: PAN TAJADO BL $2.990
    image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-48',
    category_id: 'cat-7',
    name: 'Chocolate de Mesa en Pastillas 500g',
    unit_of_measure: '500g',
    standard_quantity: 0.5,
    barcode: '7702001001480',
    image_url: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-49',
    category_id: 'cat-7',
    name: 'Galletas Saltín Tradicionales (Taco x3)',
    unit_of_measure: 'paquete',
    standard_quantity: 3.0,
    barcode: '7702001001490',
    image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-50',
    category_id: 'cat-7',
    name: 'Arepas de Maíz con Queso (Pack x5)',
    unit_of_measure: 'paquete',
    standard_quantity: 5.0,
    barcode: '7702001001500',
    image_url: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300&q=80',
    is_essential: true,
  },

  // === CEREALES Y DESAYUNO (Factura D1 y canasta básica) ===
  {
    id: 'prod-cereal-hojuelas',
    category_id: 'cat-cereales',
    name: 'Hojuelas de Maíz Azucaradas 500g',
    unit_of_measure: '500g',
    standard_quantity: 0.5,
    barcode: '7700304462490', // Factura D1: HOJUELAS AZUC $5.850
    image_url: 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=300&q=80',
    is_essential: true,
    equivalences: {
      d1: { supermarket_id: '111', supermarket_slug: 'd1', store_product_name: 'Hojuelas Azucaradas D1 500g', store_brand: 'Golden Choice', match_confidence: 1.0 },
      ara: { supermarket_id: '222', supermarket_slug: 'ara', store_product_name: 'Hojuelas de Maíz Azucaradas Ara 500g', store_brand: 'Sunny Day', match_confidence: 0.95 },
      mercaldas: { supermarket_id: '333', supermarket_slug: 'mercaldas', store_product_name: 'Cereal Zucaritas Kellogg’s 500g', store_brand: 'Kellogg’s', match_confidence: 0.98 },
      centro: { supermarket_id: '444', supermarket_slug: 'centro', store_product_name: 'Cereal Zucaritas Kellogg’s 500g', store_brand: 'Kellogg’s', match_confidence: 0.98 },
      exito: { supermarket_id: '555', supermarket_slug: 'exito', store_product_name: 'Hojuelas de Maíz Azucaradas Éxito 500g', store_brand: 'Éxito', match_confidence: 0.95 },
      carulla: { supermarket_id: '666', supermarket_slug: 'carulla', store_product_name: 'Cereal Zucaritas Kellogg’s 500g', store_brand: 'Kellogg’s', match_confidence: 1.0 },
    }
  },
  {
    id: 'prod-cereal-granola',
    category_id: 'cat-cereales',
    name: 'Granola con Miel y Frutas 400g',
    unit_of_measure: '400g',
    standard_quantity: 0.4,
    barcode: '7702001001510',
    image_url: 'https://images.unsplash.com/photo-1517093708365-51d08c8b67ce?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-cereal-choco',
    category_id: 'cat-cereales',
    name: 'Cereal Bolitas de Chocolate 400g',
    unit_of_measure: '400g',
    standard_quantity: 0.4,
    barcode: '7702001001520',
    image_url: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300&q=80',
    is_essential: false,
  },

  // === QUESOS Y LÁCTEOS (Factura D1 y canasta básica) ===
  {
    id: 'prod-queso-doble-crema',
    category_id: 'cat-2',
    name: 'Queso Doble Crema Tajado 400g',
    unit_of_measure: '400g',
    standard_quantity: 0.4,
    barcode: '7700304827398', // Factura D1: QUESO DOBLE C $10.500
    image_url: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=80',
    is_essential: true,
    equivalences: {
      d1: { supermarket_id: '111', supermarket_slug: 'd1', store_product_name: 'Queso Doble Crema Tajado Latti 400g', store_brand: 'Latti', match_confidence: 1.0 },
      ara: { supermarket_id: '222', supermarket_slug: 'ara', store_product_name: 'Queso Doble Crema Tajado Vaca Viva 400g', store_brand: 'Vaca Viva', match_confidence: 0.95 },
      mercaldas: { supermarket_id: '333', supermarket_slug: 'mercaldas', store_product_name: 'Queso Doble Crema Colanta Tajado 400g', store_brand: 'Colanta', match_confidence: 1.0 },
      centro: { supermarket_id: '444', supermarket_slug: 'centro', store_product_name: 'Queso Doble Crema Celema 400g', store_brand: 'Celema Caldas', match_confidence: 1.0 },
      exito: { supermarket_id: '555', supermarket_slug: 'exito', store_product_name: 'Queso Doble Crema Tajado Éxito 400g', store_brand: 'Éxito', match_confidence: 0.95 },
      carulla: { supermarket_id: '666', supermarket_slug: 'carulla', store_product_name: 'Queso Doble Crema Alpina Tajado 400g', store_brand: 'Alpina', match_confidence: 1.0 },
    }
  },
  {
    id: 'prod-queso-mozzarella',
    category_id: 'cat-2',
    name: 'Queso Mozzarella Tajado 400g',
    unit_of_measure: '400g',
    standard_quantity: 0.4,
    barcode: '7702001001530',
    image_url: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-leche-deslact',
    category_id: 'cat-2',
    name: 'Leche Deslactosada UHT 900ml - 1000ml',
    unit_of_measure: 'litro',
    standard_quantity: 1.0,
    barcode: '7700304822867', // Factura D1: LECHE DESLACT $3.200
    image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=80',
    is_essential: true,
    equivalences: {
      d1: { supermarket_id: '111', supermarket_slug: 'd1', store_product_name: 'Leche Deslactosada Latti 900ml', store_brand: 'Latti', match_confidence: 1.0 },
      ara: { supermarket_id: '222', supermarket_slug: 'ara', store_product_name: 'Leche Deslactosada Vaca Viva 900ml', store_brand: 'Vaca Viva', match_confidence: 0.95 },
      mercaldas: { supermarket_id: '333', supermarket_slug: 'mercaldas', store_product_name: 'Leche Deslactosada Celema 900ml', store_brand: 'Celema Caldas', match_confidence: 1.0 },
      centro: { supermarket_id: '444', supermarket_slug: 'centro', store_product_name: 'Leche Deslactosada Colanta 900ml', store_brand: 'Colanta', match_confidence: 1.0 },
      exito: { supermarket_id: '555', supermarket_slug: 'exito', store_product_name: 'Leche Deslactosada Alquería 900ml', store_brand: 'Alquería', match_confidence: 1.0 },
      carulla: { supermarket_id: '666', supermarket_slug: 'carulla', store_product_name: 'Leche Deslactosada Alpina 1000ml', store_brand: 'Alpina', match_confidence: 1.0 },
    }
  },
  {
    id: 'prod-bebida-yogur',
    category_id: 'cat-2',
    name: 'Bebida de Yogur con Fruta 1000g (Surtida)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7700304660315', // Factura D1: BEBIDA DE YOG $4.250
    image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80',
    is_essential: false,
  },

  // === DESPENSA Y PANELA ===
  {
    id: 'prod-panela-pulverizada',
    category_id: 'cat-1',
    name: 'Panela Pulverizada 100% Pura 800g',
    unit_of_measure: '800g',
    standard_quantity: 0.8,
    barcode: '7702001001540',
    image_url: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&q=80',
    is_essential: true,
  },

  // === ENLATADOS Y CONSERVAS (Factura D1) ===
  {
    id: 'prod-atun-agua',
    category_id: 'cat-conservas',
    name: 'Atún Lomitos en Agua 140g - 170g',
    unit_of_measure: 'unidad',
    standard_quantity: 1.0,
    barcode: '7700304930951', // Factura D1: ATUN EN AGUA $4.450
    image_url: 'https://images.unsplash.com/photo-1544943910-4c1dc44a0eb5?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-ensalada-rusa',
    category_id: 'cat-conservas',
    name: 'Ensalada Rusa con Verduras y Aderezo 300g',
    unit_of_measure: 'unidad',
    standard_quantity: 1.0,
    barcode: '7700304132522', // Factura D1: ENSALADA RUSA $5.490
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-mix-verduras',
    category_id: 'cat-conservas',
    name: 'Mix de Verduras Campesinas Congeladas 500g',
    unit_of_measure: '500g',
    standard_quantity: 0.5,
    barcode: '7700304858132', // Factura D1: MIX DE VERDUR $5.700
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-maiz-tierno',
    category_id: 'cat-conservas',
    name: 'Maíz Tierno Dulce en Grano en Lata 300g',
    unit_of_measure: 'unidad',
    standard_quantity: 1.0,
    barcode: '7702001001550',
    image_url: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=300&q=80',
    is_essential: false,
  },

  // === CARNES Y CHARCUTERÍA (Factura D1) ===
  {
    id: 'prod-alitas-pollo',
    category_id: 'cat-4',
    name: 'Alitas de Pollo Congeladas 1000g',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7700304839223', // Factura D1: ALITAS DE POL $15.700
    image_url: 'https://images.unsplash.com/photo-1527477378407-63e26be80171?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-mortadela-jamon',
    category_id: 'cat-4',
    name: 'Mortadela Especial con Jamón Tajada 400g',
    unit_of_measure: '400g',
    standard_quantity: 0.4,
    barcode: '7700304846535', // Factura D1: MORTADELA JAM $5.990
    image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300&q=80',
    is_essential: false,
  },

  // === BEBIDAS Y REFRESCOS (Factura D1) ===
  {
    id: 'prod-soda-izots',
    category_id: 'cat-bebidas',
    name: 'Soda Saborizada Izots / Bretaña 300ml - 330ml',
    unit_of_measure: 'unidad',
    standard_quantity: 1.0,
    barcode: '7700304095032', // Factura D1: SODA IZOTS 17 $2.100
    image_url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-jugo-nectar',
    category_id: 'cat-bebidas',
    name: 'Jugo Néctar de Fruta (Naranja / Mango) 1000ml',
    unit_of_measure: '1000ml',
    standard_quantity: 1.0,
    barcode: '7702001001560',
    image_url: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-gaseosa-2l',
    category_id: 'cat-bebidas',
    name: 'Gaseosa Familiar 1.5L - 2L (Manzana / Colombiana)',
    unit_of_measure: 'botella',
    standard_quantity: 2.0,
    barcode: '7702001001570',
    image_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-agua-bidon',
    category_id: 'cat-bebidas',
    name: 'Agua Purificada en Bidón 5L - 6L',
    unit_of_measure: 'bidon',
    standard_quantity: 5.0,
    barcode: '7702001001580',
    image_url: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=300&q=80',
    is_essential: false,
  },

  // === ASEO DEL HOGAR (Factura D1) ===
  {
    id: 'prod-papel-familiar',
    category_id: 'cat-5',
    name: 'Papel Higiénico Familiar Megarollo (Pack x12)',
    unit_of_measure: 'paquete_12',
    standard_quantity: 12.0,
    barcode: '7700304288168', // Factura D1: PAPEL HIGIENI $21.200
    image_url: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-jabon-barra-pack',
    category_id: 'cat-5',
    name: 'Jabón en Barra Multiactivo Ropa (Pack x3)',
    unit_of_measure: 'paquete_3',
    standard_quantity: 3.0,
    barcode: '7708276719406', // Factura D1: JABON EN BARR $6.150
    image_url: 'https://images.unsplash.com/photo-1607006314187-b679eb3bc05e?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-servilletas',
    category_id: 'cat-5',
    name: 'Servilletas de Cocina Absorbentes (Pack x100)',
    unit_of_measure: 'paquete',
    standard_quantity: 1.0,
    barcode: '7700304305209', // Factura D1: SERVILLETA CO $2.200
    image_url: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=300&q=80',
    is_essential: true,
  },

  // === FRUTAS Y VERDURAS FRESCAS CONVENCIONALES ===
  {
    id: 'prod-limon',
    category_id: 'cat-3',
    name: 'Limón Tahití Seleccionado (Kilo)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001600',
    image_url: 'https://images.unsplash.com/photo-1533082608670-3156a73ab015?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-manzana',
    category_id: 'cat-3',
    name: 'Manzana Roja Royal Gala (Pack x4 unidades)',
    unit_of_measure: 'paquete',
    standard_quantity: 4.0,
    barcode: '7702001001601',
    image_url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-naranja',
    category_id: 'cat-3',
    name: 'Naranja Valencia / Tangelo para Jugo (Kilo)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001602',
    image_url: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-papaya',
    category_id: 'cat-3',
    name: 'Papaya Maradol Entera (Kilo)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001603',
    image_url: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-pina',
    category_id: 'cat-3',
    name: 'Piña Oro Miel Dulce (Kilo)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001604',
    image_url: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-mango',
    category_id: 'cat-3',
    name: 'Mango Tommy Seleccionado (Kilo)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001605',
    image_url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-mora',
    category_id: 'cat-3',
    name: 'Mora Silvestre de Castilla para Jugo (500g)',
    unit_of_measure: '500g',
    standard_quantity: 0.5,
    barcode: '7702001001606',
    image_url: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-fresas',
    category_id: 'cat-3',
    name: 'Fresas Frescas Seleccionadas (500g)',
    unit_of_measure: '500g',
    standard_quantity: 0.5,
    barcode: '7702001001607',
    image_url: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-guayaba',
    category_id: 'cat-3',
    name: 'Guayaba Manzana / Pera (Kilo)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001608',
    image_url: 'https://images.unsplash.com/photo-1536511135899-75618cf616f0?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-platano-verde',
    category_id: 'cat-3',
    name: 'Plátano Verde para Patacón (Kilo)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001609',
    image_url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-papa-criolla',
    category_id: 'cat-3',
    name: 'Papa Criolla Amarilla Lavada (Kilo)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001610',
    image_url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-cebolla-junca',
    category_id: 'cat-3',
    name: 'Cebolla Junca / Larga Fresca (Mazo 500g)',
    unit_of_measure: '500g',
    standard_quantity: 0.5,
    barcode: '7702001001611',
    image_url: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=300&q=80',
    is_essential: true,
  },

  // === CHORIZOS, CARNES Y EMBUTIDOS ===
  {
    id: 'prod-chorizo',
    category_id: 'cat-4',
    name: 'Chorizo Tradicional Santarrosano / Antioqueño (Pack x6)',
    unit_of_measure: 'paquete_6',
    standard_quantity: 6.0,
    barcode: '7702001001620',
    image_url: 'https://images.unsplash.com/photo-1585325701165-351af916e581?w=300&q=80',
    is_essential: true,
    equivalences: {
      d1: { supermarket_id: '111', supermarket_slug: 'd1', store_product_name: 'Chorizo Tradicional D1 x6', store_brand: 'Sabrovalle', match_confidence: 0.95 },
      ara: { supermarket_id: '222', supermarket_slug: 'ara', store_product_name: 'Chorizo Santarrosano Ara x6', store_brand: 'Montefrío', match_confidence: 0.95 },
      mercaldas: { supermarket_id: '333', supermarket_slug: 'mercaldas', store_product_name: 'Chorizo Santarrosano Santa Rosa x6', store_brand: 'Santa Rosa', match_confidence: 1.0 },
      centro: { supermarket_id: '444', supermarket_slug: 'centro', store_product_name: 'Chorizo Ternera Zenú x6', store_brand: 'Zenú', match_confidence: 1.0 },
      exito: { supermarket_id: '555', supermarket_slug: 'exito', store_product_name: 'Chorizo Antioqueño Zenú x6', store_brand: 'Zenú', match_confidence: 1.0 },
      carulla: { supermarket_id: '666', supermarket_slug: 'carulla', store_product_name: 'Chorizo Parrillero Rica Rondo x6', store_brand: 'Rica', match_confidence: 1.0 },
    }
  },
  {
    id: 'prod-salchichon',
    category_id: 'cat-4',
    name: 'Salchichón Cervecero / Tradicional 500g',
    unit_of_measure: '500g',
    standard_quantity: 0.5,
    barcode: '7702001001621',
    image_url: 'https://images.unsplash.com/photo-1629814249584-bd4d53cf0e7d?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-tocineta',
    category_id: 'cat-4',
    name: 'Tocineta Ahumada Tajada 250g',
    unit_of_measure: '250g',
    standard_quantity: 0.25,
    barcode: '7702001001622',
    image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-carne-asar',
    category_id: 'cat-4',
    name: 'Carne de Res para Asar / Bistec Pulpa Negra (Kilo)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001623',
    image_url: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-carne-guisar',
    category_id: 'cat-4',
    name: 'Carne de Res para Guisar / Murillo (Kilo)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001624',
    image_url: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-costilla-cerdo',
    category_id: 'cat-4',
    name: 'Costilla de Cerdo Fresca en Trozos (Kilo)',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001625',
    image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&q=80',
    is_essential: false,
  },

  // === PANADERÍA, GALLETAS Y DESAYUNO ===
  {
    id: 'prod-pan-integral',
    category_id: 'cat-7',
    name: 'Pan Tajado Integral con Semillas 450g',
    unit_of_measure: '450g',
    standard_quantity: 0.45,
    barcode: '7702001001630',
    image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-tostadas',
    category_id: 'cat-7',
    name: 'Tostadas Tradicionales Tipo Susanita (Paquete x24)',
    unit_of_measure: 'paquete',
    standard_quantity: 1.0,
    barcode: '7702001001631',
    image_url: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-galletas-ducales',
    category_id: 'cat-7',
    name: 'Galletas Ducales Tradicionales (Taco x3)',
    unit_of_measure: 'paquete',
    standard_quantity: 3.0,
    barcode: '7702001001632',
    image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-galletas-festival',
    category_id: 'cat-7',
    name: 'Galletas Festival Rellenas de Chocolate (Pack x4)',
    unit_of_measure: 'paquete',
    standard_quantity: 4.0,
    barcode: '7702001001633',
    image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-arepas-chocolo',
    category_id: 'cat-7',
    name: 'Arepas de Chócolo Dulce con Queso (Pack x5)',
    unit_of_measure: 'paquete',
    standard_quantity: 5.0,
    barcode: '7702001001634',
    image_url: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300&q=80',
    is_essential: false,
  },

  // === QUESOS TRADICIONALES Y DULCES LÁCTEOS ===
  {
    id: 'prod-queso-costeno',
    category_id: 'cat-2',
    name: 'Queso Costeño Tradicional 400g',
    unit_of_measure: '400g',
    standard_quantity: 0.4,
    barcode: '7702001001640',
    image_url: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-queso-parmesano',
    category_id: 'cat-2',
    name: 'Queso Parmesano Rallado 100g',
    unit_of_measure: '100g',
    standard_quantity: 0.1,
    barcode: '7702001001641',
    image_url: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-leche-condensada',
    category_id: 'cat-2',
    name: 'Leche Condensada Tradicional 380g',
    unit_of_measure: '380g',
    standard_quantity: 0.38,
    barcode: '7702001001642',
    image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-arequipe',
    category_id: 'cat-2',
    name: 'Arequipe Colombiano Dulce de Leche 250g',
    unit_of_measure: '250g',
    standard_quantity: 0.25,
    barcode: '7702001001643',
    image_url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=300&q=80',
    is_essential: false,
  },

  // === SALSAS, CONDIMENTOS Y GRANOS ===
  {
    id: 'prod-salsa-tomate',
    category_id: 'cat-1',
    name: 'Salsa de Tomate Ketchup 400g (Fruco / D1)',
    unit_of_measure: '400g',
    standard_quantity: 0.4,
    barcode: '7702001001650',
    image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-mayonesa',
    category_id: 'cat-1',
    name: 'Mayonesa Tradicional 400g (Fruco / D1)',
    unit_of_measure: '400g',
    standard_quantity: 0.4,
    barcode: '7702001001651',
    image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-mostaza',
    category_id: 'cat-1',
    name: 'Mostaza Tradicional 200g',
    unit_of_measure: '200g',
    standard_quantity: 0.2,
    barcode: '7702001001652',
    image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-caldo-gallina',
    category_id: 'cat-1',
    name: 'Caldo de Gallina en Cubos (Caja x12 Maggi)',
    unit_of_measure: 'caja_12',
    standard_quantity: 1.0,
    barcode: '7702001001653',
    image_url: 'https://images.unsplash.com/photo-1544943910-4c1dc44a0eb5?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-color-triguisar',
    category_id: 'cat-1',
    name: 'Color y Condimento con Comino (Triguisar 100g)',
    unit_of_measure: '100g',
    standard_quantity: 0.1,
    barcode: '7702001001654',
    image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-garbanzos',
    category_id: 'cat-1',
    name: 'Garbanzos Seleccionados 500g',
    unit_of_measure: '500g',
    standard_quantity: 0.5,
    barcode: '7702001001655',
    image_url: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-arveja-verde',
    category_id: 'cat-1',
    name: 'Arveja Verde Seca 500g',
    unit_of_measure: '500g',
    standard_quantity: 0.5,
    barcode: '7702001001656',
    image_url: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-pasta-tornillos',
    category_id: 'cat-1',
    name: 'Pasta Corta Tornillos / Conchas 250g',
    unit_of_measure: '250g',
    standard_quantity: 0.25,
    barcode: '7702001001657',
    image_url: 'https://images.unsplash.com/photo-1621996346565-e3adc644d9fa?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-azucar-morena',
    category_id: 'cat-1',
    name: 'Azúcar Morena 1000g',
    unit_of_measure: '1000g',
    standard_quantity: 1.0,
    barcode: '7702001001658',
    image_url: 'https://images.unsplash.com/photo-1622484212850-cab596d66e74?w=300&q=80',
    is_essential: false,
  },

  // === BEBIDAS Y DESAYUNOS MASIVOS ===
  {
    id: 'prod-cafe-instantaneo',
    category_id: 'cat-7',
    name: 'Café Instantáneo Soluble 170g (Colcafé / Nescafé)',
    unit_of_measure: '170g',
    standard_quantity: 0.17,
    barcode: '7702001001660',
    image_url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-chocolate-polvo',
    category_id: 'cat-7',
    name: 'Chocolate en Polvo Modificador de Leche 400g (Milo / Chocolisto)',
    unit_of_measure: '400g',
    standard_quantity: 0.4,
    barcode: '7702001001661',
    image_url: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-gaseosa-postobon',
    category_id: 'cat-bebidas',
    name: 'Gaseosa Postobón Manzana 2 Litros',
    unit_of_measure: 'botella',
    standard_quantity: 2.0,
    barcode: '7702001001662',
    image_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-gaseosa-colombiana',
    category_id: 'cat-bebidas',
    name: 'Gaseosa Colombiana La Nuestra 2 Litros',
    unit_of_measure: 'botella',
    standard_quantity: 2.0,
    barcode: '7702001001663',
    image_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-jugo-hit',
    category_id: 'cat-bebidas',
    name: 'Jugo Hit Frutas Tropicales 1.5L (Mora / Mango)',
    unit_of_measure: 'botella',
    standard_quantity: 1.5,
    barcode: '7702001001664',
    image_url: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&q=80',
    is_essential: false,
  },

  // === ASEO Y LIMPIEZA DEL HOGAR ===
  {
    id: 'prod-esponjillas',
    category_id: 'cat-5',
    name: 'Esponjillas de Fibra Verde / Brillo (Pack x3)',
    unit_of_measure: 'paquete_3',
    standard_quantity: 3.0,
    barcode: '7702001001670',
    image_url: 'https://images.unsplash.com/photo-1607006314187-b679eb3bc05e?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-bolsas-basura',
    category_id: 'cat-5',
    name: 'Bolsas de Basura para Cocina 45x55cm (Rollo x30)',
    unit_of_measure: 'rollo_30',
    standard_quantity: 30.0,
    barcode: '7702001001671',
    image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-toallas-cocina',
    category_id: 'cat-5',
    name: 'Toallas de Papel para Cocina (Rollo x2)',
    unit_of_measure: 'paquete_2',
    standard_quantity: 2.0,
    barcode: '7702001001672',
    image_url: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-desengrasante',
    category_id: 'cat-5',
    name: 'Desengrasante Multiusos en Spray 500ml',
    unit_of_measure: '500ml',
    standard_quantity: 0.5,
    barcode: '7702001001673',
    image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&q=80',
    is_essential: false,
  },
  {
    id: 'prod-shampoo-savital',
    category_id: 'cat-6',
    name: 'Shampoo Familiar con Sábila 400ml (Savital)',
    unit_of_measure: '400ml',
    standard_quantity: 0.4,
    barcode: '7702001001674',
    image_url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&q=80',
    is_essential: true,
  },
  {
    id: 'prod-desodorante-speed',
    category_id: 'cat-6',
    name: 'Desodorante en Barra Antitranspirante 50g (Speed Stick / Rexona)',
    unit_of_measure: 'unidad',
    standard_quantity: 1.0,
    barcode: '7702001001675',
    image_url: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=300&q=80',
    is_essential: true,
  },
];

export const PRESET_BASKETS: import('@/types').PresetBasket[] = [
  {
    id: 'preset-basica',
    title: 'Canasta Básica de Supervivencia',
    subtitle: 'Lo esencial para 1-2 semanas: arroz, frijol, lentejas, aceite, huevos y panela.',
    icon: '🌾',
    badge: 'Máximo Ahorro',
    estimated_price_cop: 58000,
    items: [
      { product_id: 'prod-1', quantity: 2 }, // Arroz 1kg x2
      { product_id: 'prod-2', quantity: 1 }, // Aceite 1L
      { product_id: 'prod-3', quantity: 1 }, // Frijol 500g
      { product_id: 'prod-4', quantity: 1 }, // Lentejas 500g
      { product_id: 'prod-7', quantity: 1 }, // Panela 1kg
      { product_id: 'prod-12', quantity: 1 }, // Huevos panal x30
      { product_id: 'prod-11', quantity: 3 }, // Leche x3
    ],
  },
  {
    id: 'preset-familiar',
    title: 'Mercado Familiar Quincenal',
    subtitle: 'Canasta balanceada para 3-4 personas con carnes, lácteos, despensa y aseo completo.',
    icon: '👨‍👩‍👧‍👦',
    badge: 'Más Popular',
    estimated_price_cop: 185000,
    items: [
      { product_id: 'prod-1', quantity: 3 }, // Arroz x3
      { product_id: 'prod-2', quantity: 2 }, // Aceite x2
      { product_id: 'prod-5', quantity: 2 }, // Azúcar x2
      { product_id: 'prod-11', quantity: 6 }, // Leche x6
      { product_id: 'prod-12', quantity: 1 }, // Huevos x30
      { product_id: 'prod-27', quantity: 2 }, // Pechuga x2
      { product_id: 'prod-28', quantity: 1 }, // Carne molida x1
      { product_id: 'prod-20', quantity: 2 }, // Papa x2
      { product_id: 'prod-21', quantity: 2 }, // Tomate x2
      { product_id: 'prod-34', quantity: 1 }, // Detergente x1
      { product_id: 'prod-35', quantity: 2 }, // Jabón Rey x2
      { product_id: 'prod-38', quantity: 1 }, // Papel Higiénico x1
      { product_id: 'prod-46', quantity: 1 }, // Café 500g
    ],
  },
  {
    id: 'preset-aseo',
    title: 'Combo Limpieza Total Hogar',
    subtitle: 'Todo el aseo del hogar: detergente, cloro, desinfectante, lavaplatos y papel.',
    icon: '🧼',
    badge: 'Higiene & Aseo',
    estimated_price_cop: 42000,
    items: [
      { product_id: 'prod-34', quantity: 2 }, // Detergente x2
      { product_id: 'prod-35', quantity: 3 }, // Jabón Rey x3
      { product_id: 'prod-36', quantity: 2 }, // Blanqueador x2
      { product_id: 'prod-37', quantity: 1 }, // Lavaplatos x1
      { product_id: 'prod-38', quantity: 2 }, // Papel x2
      { product_id: 'prod-39', quantity: 1 }, // Suavizante x1
      { product_id: 'prod-40', quantity: 1 }, // Limpiapisos x1
    ],
  },
  {
    id: 'preset-fit',
    title: 'Mercado Saludable & Proteico',
    subtitle: 'Enfocado en nutrición: pechuga, huevos, atún, avena, aguacate y frutas frescas.',
    icon: '🥑',
    badge: 'Salud & Proteína',
    estimated_price_cop: 95000,
    items: [
      { product_id: 'prod-12', quantity: 1 }, // Huevos x30
      { product_id: 'prod-27', quantity: 2 }, // Pechuga x2
      { product_id: 'prod-10', quantity: 3 }, // Atún x3
      { product_id: 'prod-16', quantity: 2 }, // Avena x2
      { product_id: 'prod-23', quantity: 2 }, // Aguacate x2
      { product_id: 'prod-25', quantity: 2 }, // Banano x2
    ],
  },
];

export const PRICE_DROP_ALERTS: import('@/types').PriceDropAlert[] = [
  {
    id: 'alert-1',
    product_id: 'prod-2',
    product_name: 'Aceite Vegetal de Cocina 1000ml',
    supermarket_name: 'Tiendas D1',
    supermarket_slug: 'd1',
    previous_price: 9200,
    current_price: 7600,
    drop_percentage: 17.4,
    savings_cop: 1600,
    date_detected: 'Detectado hace 2 horas',
    unit_of_measure: '1000ml',
    image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=80',
  },
  {
    id: 'alert-2',
    product_id: 'prod-12',
    product_name: 'Huevos Rojos Tipo AA (Panal x30)',
    supermarket_name: 'Mercaldas',
    supermarket_slug: 'mercaldas',
    previous_price: 19500,
    current_price: 16600,
    drop_percentage: 14.8,
    savings_cop: 2900,
    date_detected: 'Detectado hoy (Manizales)',
    unit_of_measure: 'Panal x30',
    image_url: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&q=80',
  },
  {
    id: 'alert-3',
    product_id: 'prod-46',
    product_name: 'Café Molido Colombiano 500g',
    supermarket_name: 'Tiendas Ara',
    supermarket_slug: 'ara',
    previous_price: 19800,
    current_price: 17100,
    drop_percentage: 13.6,
    savings_cop: 2700,
    date_detected: 'Detectado ayer',
    unit_of_measure: '500g',
    image_url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&q=80',
  },
  {
    id: 'alert-4',
    product_id: 'prod-27',
    product_name: 'Pechuga de Pollo Fresca 1000g',
    supermarket_name: 'Supermercado del Centro',
    supermarket_slug: 'centro',
    previous_price: 19200,
    current_price: 16900,
    drop_percentage: 12.0,
    savings_cop: 2300,
    date_detected: 'Detectado hoy',
    unit_of_measure: '1000g',
    image_url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&q=80',
  },
];
