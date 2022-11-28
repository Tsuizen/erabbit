import { useUserStore } from '@/store';
import { h, resolveComponent } from 'vue';
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
const MemberLayout = () => import('@/views/member/Layout.vue');
const MemberHome = () => import('@/views/member/home/index.vue');
const MemberOrder = () => import('@/views/member/order/index.vue');
const MemberOrderDetail = () => import('@/views/member/order/detail.vue');

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
      { path: '/pay/callback', component: PayResult },
      {
        path: '/member',
        component: MemberLayout,
        children: [
          { path: '/member', component: MemberHome },
          {
            path: '/member/order',
            // 在vue3中只有嵌套才能触发上一级路由的模糊匹，为了在/member/order的下级路由中实现嵌套关系。
            // 采用render选项，现在/member/order对应一个router-view
            // 否则需要在MemberOrder中再写一个router-view以实现对MemberOrderDetail的嵌套，少些一层路由
            // vue2: h(<RouterView/>), vue3: h(resolveComponent('router-view'))
            component: { render: () => h(resolveComponent('router-view')) },
            children: [
              { path: '', component: MemberOrder },
              { path: ':id', component: MemberOrderDetail }
            ]
          }
        ]
      }
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
