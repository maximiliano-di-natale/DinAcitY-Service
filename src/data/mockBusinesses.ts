import { Business, CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'todos',
    name: 'Todos',
    iconName: 'LayoutGrid',
    description: 'Explora todos los rubros disponibles',
    color: 'bg-slate-100 text-slate-800 border-slate-300'
  },
  {
    id: 'mecanica',
    name: 'Mecánica & Autos',
    iconName: 'Wrench',
    description: 'Talleres mecánicos, gomerías, chapa y pintura',
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'gastronomia',
    name: 'Gastronomía & Catering',
    iconName: 'Utensils',
    description: 'Restaurantes, viandas, panaderías y banquetes',
    color: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: 'reparaciones',
    name: 'Hogar & Reparaciones',
    iconName: 'Hammer',
    description: 'Electricistas, plomeros, pintura y aire acondicionado',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'profesionales',
    name: 'Servicios Profesionales',
    iconName: 'Briefcase',
    description: 'Abogados, contadores, escribanías y asesoría',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  {
    id: 'estetica',
    name: 'Estética & Bienestar',
    iconName: 'Sparkles',
    description: 'Peluquerías, barberías, spa y masajes',
    color: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  {
    id: 'salud',
    name: 'Salud & Cuidado',
    iconName: 'HeartPulse',
    description: 'Kinesiología, nutrición, enfermería y psicología',
    color: 'bg-teal-50 text-teal-700 border-teal-200'
  },
  {
    id: 'mascotas',
    name: 'Mascotas & Veterinaria',
    iconName: 'PawPrint',
    description: 'Clínicas veterinarias, peluquería canina y paseadores',
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  }
];

export const INITIAL_BUSINESSES: Business[] = [
  {
    id: 'biz-1',
    name: 'Taller Integral Dinámica Motor',
    tagline: 'Mecánica ligera, frenos y escaneo computarizado multimarcas',
    category: 'mecanica',
    description: 'Más de 15 años de trayectoria garantizando la seguridad de tu vehículo. Contamos con tecnología de diagnóstico digital para todas las marcas nacionales e importadas. Presupuestos sin cargo en el día.',
    address: 'Av. Libertador 4520',
    city: 'Zona Centro / Norte',
    whatsapp: '5491145678901',
    phone: '11 4567-8901',
    email: 'contacto@dinamicamotor.com',
    instagram: '@dinamica_motor',
    hours: {
      weekdays: 'Lunes a Viernes: 08:30 a 18:30',
      saturday: 'Sábados: 09:00 a 13:00',
      sunday: 'Cerrado'
    },
    services: [
      { id: 's1', name: 'Diagnóstico por Computadora', description: 'Lectura completa de fallas y reseteo de testigos de tablero.', priceEstimate: 'Desde $15.000' },
      { id: 's2', name: 'Service de Aceite y Filtros', description: 'Aceite sintético o semisintético más 4 filtros según fabricante.', priceEstimate: 'Desde $45.000' },
      { id: 's3', name: 'Tren Delantero y Frenos', description: 'Cambio de pastillas, rectificación y alineación/balanceo.', priceEstimate: 'A presupuestar' }
    ],
    rating: 4.9,
    reviewCount: 38,
    imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    isVerified: true,
    createdAt: '2026-01-10T10:00:00.000Z',
    analytics: {
      views: 342,
      contactClicks: 87,
      lastViewedAt: '2026-10-24T18:20:00.000Z'
    }
  },
  {
    id: 'biz-2',
    name: 'ElectroHogar Climatización & Electricidad',
    tagline: 'Instalaciones eléctricas certificadas y reparación de refrigeración',
    category: 'reparaciones',
    description: 'Electricista matriculado con guardia para emergencias residenciales y comerciales. Instalación, service y carga de gas para aires acondicionados frío/calor. Garantía escrita de 6 meses en todas las reparaciones.',
    address: 'Calle Mitre 890 (Atención a domicilio en todo el radio urbano)',
    city: 'Radio Urbano & Alrededores',
    whatsapp: '5491133221144',
    phone: '11 3322-1144',
    email: 'electrohogar.servicios@gmail.com',
    hours: {
      weekdays: 'Lunes a Viernes: 08:00 a 20:00',
      saturday: 'Sábados: 08:00 a 16:00',
      sunday: 'Urgencias 24h por WhatsApp'
    },
    services: [
      { id: 's4', name: 'Instalación de Aire Acondicionado', description: 'Hasta 3 metros de cañería con sellado al vacío profesional.', priceEstimate: 'Desde $65.000' },
      { id: 's5', name: 'Reparación de Cortocircuitos y Tableros', description: 'Detección de fugas eléctricas y recambio de disyuntores térmicos.', priceEstimate: 'Desde $20.000' },
      { id: 's6', name: 'Cableado y Recableado General', description: 'Adecuación a normas de seguridad vigentes.', priceEstimate: 'A presupuestar' }
    ],
    rating: 4.8,
    reviewCount: 52,
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    isVerified: true,
    createdAt: '2026-02-01T12:00:00.000Z',
    analytics: {
      views: 512,
      contactClicks: 143,
      lastViewedAt: '2026-10-25T09:15:00.000Z'
    }
  },
  {
    id: 'biz-3',
    name: 'Sabores Porteños Catering & Viandas',
    tagline: 'Comida casera, menú ejecutivo diario y eventos especiales',
    category: 'gastronomia',
    description: 'Cocina con ingredientes frescos de primera calidad. Ofrecemos servicio de viandas corporativas y particulares con entrega puntual, además de catering para reuniones familiares y empresariales.',
    address: 'Av. San Martín 1234',
    city: 'Zona Oeste',
    whatsapp: '5491177889900',
    instagram: '@saboresportenos.ok',
    hours: {
      weekdays: 'Lunes a Viernes: 09:00 a 16:00 (Pedidos hasta las 11:30)',
      saturday: 'Sábados: 10:00 a 15:00',
      sunday: 'Catering para eventos previa reserva'
    },
    services: [
      { id: 's7', name: 'Pack Semanal de Viandas Saludables (5 días)', description: '5 platos balanceados con opción keto, vegetariana o tradicional.', priceEstimate: '$24.500' },
      { id: 's8', name: 'Servicio de Catering para Eventos', description: 'Finger food, tablas de picada artesanal, cazuelas y postres.', priceEstimate: 'Por persona' },
      { id: 's9', name: 'Almuerzos Corporativos para Empresas', description: 'Facturación directa y entrega puntual programada.', priceEstimate: 'A convenir' }
    ],
    rating: 4.95,
    reviewCount: 64,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    isVerified: true,
    createdAt: '2026-02-15T09:00:00.000Z',
    analytics: {
      views: 420,
      contactClicks: 110,
      lastViewedAt: '2026-10-25T11:00:00.000Z'
    }
  },
  {
    id: 'biz-4',
    name: 'Estudio Jurídico & Contable Nova',
    tagline: 'Asesoramiento legal, laboral y contabilidad para PyMEs y Monotributistas',
    category: 'profesionales',
    description: 'Equipo interdisciplinario de abogados y contadores públicos. Brindamos acompañamiento en constitución de sociedades, liquidación de impuestos, contratos comerciales y defensa laboral.',
    address: 'Torre Empresarial, Piso 7, Of. 702',
    city: 'Centro Financiero',
    whatsapp: '5491155443322',
    phone: '11 5544-3322',
    email: 'consultas@estudionova.com.ar',
    website: 'https://estudionova.com.ar',
    hours: {
      weekdays: 'Lunes a Viernes: 09:00 a 18:00',
      saturday: 'Cerrado',
      sunday: 'Cerrado'
    },
    services: [
      { id: 's10', name: 'Gestión y Alta de Monotributo / Autónomos', description: 'Inscripción en AFIP/ARCA, rentas e ingresos brutos.', priceEstimate: 'Consulta bonificada' },
      { id: 's11', name: 'Revisión y Redacción de Contratos', description: 'Alquileres, acuerdos comerciales y contratos de prestación.', priceEstimate: 'Desde $30.000' },
      { id: 's12', name: 'Auditoría Contable e Impositiva PyME', description: 'Balance anual y optimización de carga tributaria.', priceEstimate: 'A convenir' }
    ],
    rating: 4.7,
    reviewCount: 29,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    isVerified: true,
    createdAt: '2026-01-20T14:30:00.000Z',
    analytics: {
      views: 290,
      contactClicks: 65,
      lastViewedAt: '2026-10-23T16:40:00.000Z'
    }
  },
  {
    id: 'biz-5',
    name: 'Aura Studio & Barbería',
    tagline: 'Estilismo unisex, colorimetría, diseño de barba y cuidado capilar',
    category: 'estetica',
    description: 'Espacio dedicado al cuidado de tu imagen personal. Utilizamos productos de primera línea libres de parabenos. Turnos puntuales y ambiente relajante con cafetería de cortesía.',
    address: 'Boulevard de las Artes 615',
    city: 'Palermo / Recoleta',
    whatsapp: '5491166778899',
    instagram: '@aurastudio_hair',
    hours: {
      weekdays: 'Martes a Viernes: 10:00 a 20:00',
      saturday: 'Sábados: 09:30 a 20:30',
      sunday: 'Lunes y Domingos Cerrado'
    },
    services: [
      { id: 's13', name: 'Corte de Cabello & Perfilado de Barba', description: 'Lavado con masaje capilar, toalla caliente y styling.', priceEstimate: '$12.000' },
      { id: 's14', name: 'Balayage e Iluminación Premium', description: 'Técnica personalizada para realzar tonos naturales.', priceEstimate: 'Desde $40.000' },
      { id: 's15', name: 'Tratamiento Nutrición / Keratina Orgánica', description: 'Hidratación profunda anti-frizz.', priceEstimate: '$22.000' }
    ],
    rating: 4.9,
    reviewCount: 71,
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    isVerified: true,
    createdAt: '2026-02-10T11:20:00.000Z',
    analytics: {
      views: 610,
      contactClicks: 195,
      lastViewedAt: '2026-10-25T11:45:00.000Z'
    }
  },
  {
    id: 'biz-6',
    name: 'Clínica Veterinaria & Spa Huellitas',
    tagline: 'Atención médica integral, cirugías, vacunación y baño para perros y gatos',
    category: 'mascotas',
    description: 'Amamos a los animales tanto como vos. Contamos con quirófano propio, ecografía, farmacia veterinaria y peluquería canina con traslados puerta a puerta.',
    address: 'Av. Belgrano 3120',
    city: 'Zona Sur',
    whatsapp: '5491122338877',
    phone: '11 2233-8877',
    hours: {
      weekdays: 'Lunes a Viernes: 09:00 a 19:30',
      saturday: 'Sábados: 09:00 a 17:00',
      sunday: 'Guardia telefónica activa'
    },
    services: [
      { id: 's16', name: 'Consulta Clínica General & Vacunación', description: 'Revisión preventiva, peso, auscultación y plan de vacunas.', priceEstimate: '$14.000' },
      { id: 's17', name: 'Baño, Corte Higiénico y Deslanado', description: 'Shampoo medicado o neutro, corte de uñas y limpieza de oídos.', priceEstimate: 'Desde $11.000' },
      { id: 's18', name: 'Ecografía Abdominal y Laboratorio', description: 'Resultados en el día para diagnósticos precisos.', priceEstimate: '$25.000' }
    ],
    rating: 4.85,
    reviewCount: 46,
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80',
    isVerified: true,
    createdAt: '2026-02-20T15:10:00.000Z',
    analytics: {
      views: 388,
      contactClicks: 94,
      lastViewedAt: '2026-10-25T10:30:00.000Z'
    }
  }
];
