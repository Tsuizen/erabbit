import router from '@/router';
import { useUserStore } from '@/store';
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';
import axios from 'axios';
import { storeToRefs } from 'pinia';

// export const baseURL = 'https://apipc-xiaotuxian-front.itheima.net';
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net';

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 7000
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const userStore = useUserStore();

    const { profile } = storeToRefs(userStore);
    if (profile.value.token) {
      config.headers!.Authorization = `Bearer ${profile.value.token}`;
    }
    return config;
  },
  (err: Error | AxiosError) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res: AxiosResponse<any>) => res.data,
  (err) => {
    const userStore = useUserStore();

    // 401状态码
    if (err.response && err.response.status === 400) {
      // 1.清空无效用户信息
      // 2.跳转到登陆页
      // 3.跳转需要传参给登录页面
      userStore.$reset();
      router.currentRoute.value.fullPath; //就是当前路由地址，router.currentRoute 是ref响应式数据
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath);
      router.push('/login?redirectUrl=' + fullPath);
    }
    return Promise.reject(err);
  }
);

// 请求工具函数
export default (
  url: string,
  method: string,
  submitData?: any
): Promise<any> => {
  return instance({
    url,
    method,
    // 1.如果是get请求，需要使用params来传递submmitData
    // 2.如果不是get请求，需要使用data来传递submmitData
    // []设置一个动态的key，写js表达式，表达式结果当作key
    // method参数
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  });
};
