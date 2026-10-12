import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yo Merco Colombia | Optimizador de Presupuesto y Comparador Multicanal',
  description: 'Compara precios en tiempo real entre Tiendas D1, Tiendas Ara, Mercaldas, Supermercado del Centro, Éxito y Carulla. Maximiza tu poder adquisitivo en Manizales y Colombia.',
  keywords: ['Yo Merco', 'Mercado Colombia', 'Precios D1', 'Precios Ara', 'Mercaldas Manizales', 'Ahorro mercado', 'Comparador canasta familiar'],
  authors: [{ name: 'Yo Merco Tech Team' }],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Yo Merco',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#059669',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛒</text></svg>" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
