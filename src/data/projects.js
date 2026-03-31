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
