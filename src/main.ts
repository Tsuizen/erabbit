import '@/assets/styles/common.less';
import component from '@/components/library';
import 'normalize.css';
import { createPinia } from 'pinia';
import PersistedState from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// 创建一个vue应用实例
const app = createApp(App);

const store = createPinia();
store.use(({ store }) => {
  const initialState = JSON.parse(JSON.stringify(store.$state));

  store.$reset = () => {
    store.$state = JSON.parse(JSON.stringify(initialState));
  };
});

store.use(PersistedState);

app.use(store).use(router).use(component).mount('#app');
