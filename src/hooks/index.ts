import { findGoods } from '@/api/product';
import type { Goods } from '@/types/goods';
import { useIntersectionObserver, useIntervalFn } from '@vueuse/core';
import { onUnmounted, type Ref } from 'vue';
import { nextTick, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';

//数据懒加载函数
export const useLazyData = (apiFn: () => Promise<any>) => {
  // 需要被观察的对象
  // 不同的api函数
  const target = ref(null);
  const result = ref([]);
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      stop();
      // 调用API获取数据
      apiFn().then((data) => {
        result.value = data.result;
      });
    }
  });
  return { target, result };
};

// 获取商品详情
export const useGoods = (): Ref<Goods> => {
  // 出现路由地址商品id发生变化，但是不会重新初始化组件
  const goods = ref();
  const route = useRoute();
  watch(
    () => route.params.id,
    (newVal) => {
      if (newVal && `/product/${newVal}` === route.path) {
        findGoods(route.params.id as string).then((data) => {
          // 让商品数据为null后，使用v-if的组件可以重新销毁和创建
          goods.value = null;
          nextTick(() => {
            goods.value = data.result;
          });
        });
      }
    },
    { immediate: true }
  );
  return goods;
};

/* 支付倒计时函数 */
export const usePayTime = () => {
  const time = ref(0);
  const timeText = ref('');

  const { pause, resume } = useIntervalFn(() => {
    time.value--;
    timeText.value = dayjs.unix(time.value).format('mm分ss秒');
    if (time.value <= 0) {
      pause();
    }
  }, 1000);

  onUnmounted(() => {
    pause();
  });

  // 开启定时器 countdown倒计时
  const start = (countdown: number) => {
    time.value = countdown;
    timeText.value = dayjs.unix(time.value).format('mm分ss秒');
    resume();
  };

  return { start, timeText };
};
