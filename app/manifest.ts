import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Yo Merco Colombia - Optimizador de Presupuesto',
    short_name: 'Yo Merco',
    description: 'Compara precios en D1, Ara, Mercaldas, Centro, Éxito y Carulla en Manizales y Colombia.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#059669',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
