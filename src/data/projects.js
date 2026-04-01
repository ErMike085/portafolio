export const projectsData = [
  {
    id: 1,
    title: 'POS Comercial Multisucursal',
    description:
      'Sistema web de gestion comercial y POS para operacion por sucursales. Controla ventas, clientes, inventario, despachos, turnos y reportes; incluye ventas presenciales y a credito, impresion de facturas y etiquetas, y exportacion a PDF y Excel.',
    image: '/images/projects/pos/dashboard.png',
    images: [
      {
        src: '/images/projects/pos/dashboard.png',
        zoom: 1.16,
        position: '50% 14%',
      },
      {
        src: '/images/projects/pos/sales.png',
        zoom: 1.2,
        position: '50% 22%',
      },
      {
        src: '/images/projects/pos/cart.png',
        zoom: 1.28,
        position: '50% 28%',
      },
      {
        src: '/images/projects/pos/clients.png',
        zoom: 1.15,
        position: '50% 18%',
      },
      {
        src: '/images/projects/pos/dispatches.png',
        zoom: 1.18,
        position: '50% 18%',
      },
      {
        src: '/images/projects/pos/sales-report.png',
        zoom: 1.26,
        position: '50% 32%',
      },
    ],
    technologies: [
      'PHP 8.2',
      'Laravel 12',
      'Vue 3',
      'Inertia.js',
      'Tailwind CSS 4',
      'DOMPDF',
      'Laravel Excel',
      'ApexCharts',
      'SweetAlert2',
      'MySQL',
    ],
    github: null,
    demo: '',
    featured: true,
  },
  {
    id: 2,
    title: "Adam's Discount Tires",
    description: `Aplicación web para la gestión y venta de llantas, rines y servicios automotrices, con interfaz pública para clientes y panel administrativo para pedidos, inventario, usuarios y reportes, centralizando procesos comerciales y mejorando la atención.
                  
                  Mi participación activa contribuyó a la creación de funcionalidades clave y a su mantenimiento continuo, asegurando la estabilidad y evolución del sistema.`,
    image: '/images/projects/adams/home.png',
    images: [
      {
        src: '/images/projects/adams/home.png',
        zoom: 1.06,
        position: '50% 28%',
      },
      {
        src: '/images/projects/adams/products.png',
        zoom: 1.14,
        position: '50% 24%',
      },
      {
        src: '/images/projects/adams/services.png',
        zoom: 1.1,
        position: '50% 24%',
      },
      {
        src: '/images/projects/adams/orders.png',
        zoom: 1.12,
        position: '50% 24%',
      },
      {
        src: '/images/projects/adams/inventory-logs.png',
        zoom: 1.16,
        position: '50% 26%',
      },
      {
        src: '/images/projects/adams/customers.png',
        zoom: 1.1,
        position: '50% 22%',
      },
    ],
    technologies: [
      'Vue 3',
      'JavaScript',
      'Sass',
      'SweetAlert2',
      'Swiper',
      'Font Awesome',
      'Netlify',
      'dotenv',
    ],
    github: null,
    demo: 'https://adamtires.com',
    featured: true,
  },
  {
    id: 3,
    title: 'Touris World',
    description: `Plataforma integral para la gestión y reserva de alojamientos y experiencias turísticas, desarrollada con Laravel y Vue.js (Inertia). Permite administrar hoteles, habitaciones, tipologías, reservas, usuarios y experiencias, además de gestionar pagos y reseñas. Incluye flujos de checkout optimizados, confirmaciones y notificaciones automatizadas, brindando una experiencia ágil tanto para usuarios como para administradores.

                  Mi participación activa contribuyó a la creación de funcionalidades clave, como la integración de la pasarela de pagos Wompi y la gestión de servicios hoteleros, además de su mantenimiento continuo, asegurando la estabilidad y evolución del sistema.`,
    image: '/images/projects/touris/home-hotels.png',
    images: [
      {
        src: '/images/projects/touris/home-hotels.png',
        zoom: 1.05,
        position: '50% 22%',
      },
      {
        src: '/images/projects/touris/home-activities.png',
        zoom: 1.05,
        position: '50% 22%',
      },
      {
        src: '/images/projects/touris/hotel-info.png',
        zoom: 1.08,
        position: '50% 22%',
      },
      {
        src: '/images/projects/touris/checkout.png',
        zoom: 1.12,
        position: '50% 26%',
      },
      {
        src: '/images/projects/touris/hotel-dashboard.png',
        zoom: 1.08,
        position: '50% 24%',
      },
      {
        src: '/images/projects/touris/rooms.png',
        zoom: 1.08,
        position: '50% 22%',
      },
    ],
    technologies: [
      'PHP 8.3',
      'Laravel 12',
      'Vue 3',
      'Inertia.js',
      'Tailwind CSS',
      'Spatie Permission',
      'Filament',
      'Wompi',
      'AWS S3',
      'Intervention Image',
      'Spatie Image Optimizer',
      'Ziggy',
      'Predis',
      'Pest',
      'Pint',
    ],
    github: null,
    demo: 'https://touris.world',
    featured: true,
  },
  {
    id: 4,
    title: 'TaskFlow',
    description:
      'Desarrollo de una plataforma visual de gestion de tareas con tableros, listas y tarjetas arrastrables. Permite crear, editar y eliminar tableros, controlar permisos por rol, compartir tableros publicos y trabajar con una experiencia moderna y responsiva enfocada en productividad.',
    image: '/images/projects/taskflow/taskflow-home.svg',
    images: [
      {
        src: '/images/projects/taskflow/home.png',
        zoom: 1.04,
        position: '50% 34%',
      },
      {
        src: '/images/projects/taskflow/demo-mode.png',
        zoom: 1.18,
        position: '50% 36%',
      },
      {
        src: '/images/projects/taskflow/registered-mode.png',
        zoom: 1.15,
        position: '50% 34%',
      },
      {
        src: '/images/projects/taskflow/dashboard.png',
        zoom: 1.1,
        position: '50% 28%',
      },
      {
        src: '/images/projects/taskflow/dashboard-config.png',
        zoom: 1.12,
        position: '50% 30%',
      },
    ],
    technologies: [
      'Laravel 12',
      'PHP 8.2',
      'Vue 3',
      'Composition API',
      'Inertia.js',
      'Tailwind CSS',
      'MySQL',
      'Laravel Sanctum',
      'VueDraggable',
    ],
    github: null,
    demo: '',
    featured: true,
  },
]
