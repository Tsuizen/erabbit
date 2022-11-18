import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PersistedState from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';
import '@/assets/styles/common.less';
import 'normalize.css';
import UI from '@/components/library'
// 创建一个vue应用实例
const store = createPinia();
store.use(({ store }) => {
  const initialState = JSON.parse(JSON.stringify(store.$state));

  store.$reset = () => {
    store.$state = JSON.parse(JSON.stringify(initialState));
  };
});
store.use(PersistedState);
createApp(App).use(store).use(router).use(UI).mount('#app');
