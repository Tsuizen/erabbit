import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw
} from 'vue-router';
import TopCategory from '@/views/category/index.vue';
import SubCategory from '@/views/category/sub.vue';

const Layout = () => import('@/views/Layout.vue');
const Home = () => import('@/views/home/index.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: ' /category/sub/:id', component: SubCategory }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
