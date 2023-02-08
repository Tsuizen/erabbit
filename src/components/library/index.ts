import defaultImg from '@/assets/images/200.png';
import type { App } from 'vue';
import Confirm from './Confirm';
import Message from './Message';

// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展
export default {
  install(app: App<Element>) {
    // 定义一个指令
    defineDirective(app);

    // 全局组件挂载
    app.config.globalProperties.$message = Message;
    app.config.globalProperties.$confirm = Confirm;
  }
};

const defineDirective = (app: App<Element>) => {
  // 1. 图片懒加载指令 v-lazy
  // 原理：先存储图片地址不能在src上，当图片进入可视区，将你存储图片地址设置给图片元素即可。
  app.directive('lazy', {
    mounted(el, binding) {
      const observe = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 停止观察
            observe.unobserve(el);
            // 3. 把指令的值设置给el的src属性 binding.value就是指令的值
            // 4. 处理图片加载失败 error 图片加载失败的事件 load 图片加载成功
            el.onerror = () => {
              // 加载失败，设置默认图
              el.src = defaultImg;
            };
            el.src = binding.value;
          }
        },
        {
          threshold: 0
        }
      );
      // 开启观察
      observe.observe(el);
    }
  });
};
