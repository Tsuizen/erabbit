import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';

//数据懒加载函数
export const useLazyData = (apiFn: () => Promise<any>) => {
  // 需要被观察的对象
  // 不同的api函数
  const target = ref(null);
  const result = ref([]);
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        stop();
        // 调用API获取数据
        apiFn().then((data) => {
          result.value = data.result;
        });
      }
    }
  );
  return { target, result };
};
