import vueIcon from '@/assets/icons/tech/vue.svg';
import supabaseIcon from '@/assets/icons/supabase.svg';
import inertiaIcon from '@/assets/icons/tech/inertia.svg';
import compositionApiIcon from '@/assets/icons/tech/composition-api.svg';
import tailwindIcon from '@/assets/icons/tech/tailwindcss.svg';
import dompdfIcon from '@/assets/icons/tech/dompdf.svg';
import codeigniterIcon from '@/assets/icons/tech/codeigniter.svg';
import laravelExcelIcon from '@/assets/icons/tech/laravel-excel.svg';
import apexchartsIcon from '@/assets/icons/tech/apexcharts.svg';
import sweetalert2Icon from '@/assets/icons/tech/sweetalert2.svg';
import jwtIcon from '@/assets/icons/tech/jwt.svg';
import stripeIcon from '@/assets/icons/tech/stripe.svg';
import sanctumIcon from '@/assets/icons/tech/sanctum.svg';
import vuedraggableIcon from '@/assets/icons/tech/vuedraggable.svg';
import phpunitIcon from '@/assets/icons/tech/phpunit.svg';
import websocketsIcon from '@/assets/icons/tech/websockets.svg';
import chartjsIcon from '@/assets/icons/tech/chartjs.svg';

const assetIconMap = {
  vuejs: vueIcon,
  vue: vueIcon,
  supabase: supabaseIcon,
  inertia: inertiaIcon,
  'inertia-ssr': inertiaIcon,
  'composition-api': compositionApiIcon,
  tailwindcss: tailwindIcon,
  dompdf: dompdfIcon,
  codeigniter: codeigniterIcon,
  'laravel-excel': laravelExcelIcon,
  apexcharts: apexchartsIcon,
  sweetalert2: sweetalert2Icon,
  jwt: jwtIcon,
  stripe: stripeIcon,
  sanctum: sanctumIcon,
  vuedraggable: vuedraggableIcon,
  phpunit: phpunitIcon,
  websockets: websocketsIcon,
  chartjs: chartjsIcon,
};

const classIconMap = {
  vitejs: 'devicon-vitejs-plain',
  mysql: 'devicon-mysql-plain',
  javascript: 'devicon-javascript-plain',
  php: 'devicon-php-plain',
  laravel: 'devicon-laravel-plain',
  postman: 'devicon-postman-plain',
  html5: 'devicon-html5-plain',
  css3: 'devicon-css3-plain',
  nodejs: 'devicon-nodejs-plain',
  python: 'devicon-python-plain',
  postgresql: 'devicon-postgresql-plain',
  git: 'devicon-git-plain',
  docker: 'devicon-docker-plain',
  amazonwebservices: 'devicon-amazonwebservices-original',
};

const aliasMap = {
  'vue 3': 'vuejs',
  'vue.js': 'vuejs',
  vue: 'vuejs',
  'inertia.js': 'inertia',
  'inertia js': 'inertia',
  inertiajs: 'inertia',
  'inertia.js ssr': 'inertia',
  'inertia ssr': 'inertia',
  'composition api': 'composition-api',
  'php 8.2': 'php',
  'php 8.1': 'php',
  'php 8': 'php',
  'laravel 12': 'laravel',
  'laravel 11': 'laravel',
  'codeigniter 4': 'codeigniter',
  codeigniter: 'codeigniter',
  'tailwind css 4': 'tailwindcss',
  'tailwind css': 'tailwindcss',
  'laravel excel': 'laravel-excel',
  'laravel sanctum': 'sanctum',
  vuedraggable: 'vuedraggable',
  phpunit: 'phpunit',
  jwt: 'jwt',
  stripe: 'stripe',
  dompdf: 'dompdf',
  apexcharts: 'apexcharts',
  sweetalert2: 'sweetalert2',
  websockets: 'websockets',
  chartjs: 'chartjs',
  supabase: 'supabase',
};

export const normalizeTechIconKey = (value) => {
  const raw = String(value || '').toLowerCase().trim();
  return aliasMap[raw] || raw;
};

export const resolveTechIcon = (value) => {
  const key = normalizeTechIconKey(value);

  if (assetIconMap[key]) {
    return { type: 'asset', value: assetIconMap[key] };
  }

  if (classIconMap[key]) {
    return { type: 'class', value: classIconMap[key] };
  }

  return null;
};
