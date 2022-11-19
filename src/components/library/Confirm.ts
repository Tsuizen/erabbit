import { createVNode, render } from 'vue';
import XtxConfirm from './xtx-confirm.vue';

// 准备一个DOM
const div = document.createElement('div');
div.setAttribute('class', 'xtx-confirm-container');
document.body.appendChild(div);

// 返回Promise对象
export default ({ title, text }: { title: string; text: string }) => {
  // 1.导入被创建的组件
  // 2.使用createVNode创建虚拟节点
  // 3.准备一个dom容器装载组件
  // 4.使用redner函数渲染组件到容器
  return new Promise<void>((resolve, reject) => {
    // 点击取消触发的函数
    const cancelCallback = () => {
      render(null, div);
      reject(new Error('点击取消'));
    };

    const submitCallback = () => {
      render(null, div);
      resolve();
    };

    const vn = createVNode(XtxConfirm, {
      title,
      text,
      cancelCallback,
      submitCallback
    });
    render(vn, div);
  });
};
