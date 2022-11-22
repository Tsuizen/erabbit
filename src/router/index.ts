import { useUserStore } from '@/store';
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw
} from 'vue-router';

const Layout = () => import('@/views/Layout.vue');
const Home = () => import('@/views/home/index.vue');
const TopCategory = () => import('@/views/category/index.vue');
const SubCategory = () => import('@/views/category/sub.vue');
const Goods = () => import('@/views/goods/index.vue');
const Login = () => import('@/views/login/index.vue');
const Cart = () => import('@/views/cart/index.vue');
const Checkout = () => import('@/views/member/pay/checkout.vue');
const Pay = () => import('@/views/member/pay/index.vue');
const PayResult = () => import('@/views/member/pay/result.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods },
      { path: '/cart', component: Cart },
      { path: '/member/checkout', component: Checkout },
      { path: '/member/pay', component: Pay },
      { path: '/pay/callback', component: PayResult }
    ]
  },
  { path: '/login', component: Login }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次切换路由的时候滚动到页面顶部
  scrollBehavior() {
    return { left: 0, top: 0 };
  }
});

// 路由守卫
router.beforeEach((to, from, next) => {
  // 需要登录的路由：地址以/member开头
  const user = useUserStore();
  const { profile } = user;
  if (!profile.token && to.path.startsWith('/member')) {
    return next('/login?redirectUrl=' + encodeURIComponent(to.fullPath));
  }
  next();
});

export default router;
