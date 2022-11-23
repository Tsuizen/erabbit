<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle()">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <div v-if="loading" class="loading"></div>
      <GoodsSku v-else @change="changeSku" :skuId="skuId" :goods="goods!" />
      <XtxButton
        @click="submit"
        v-if="!loading"
        type="primary"
        size="mini"
        style="margin-left: 60px"
        >确认</XtxButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { getGoodsSku } from '@/api/cart';
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';
import GoodsSku from '@/views/goods/components/goods-sku.vue';
import type { Goods } from '@/types/goods';
import type { SkuInfo } from '@/types/goods';

const props = defineProps<{
  attrsText: string;
  skuId: string;
}>();

const emit = defineEmits(['change']);

const visible = ref<boolean>(false);
const goods = ref<Goods>();
const loading = ref<boolean>(false);

// 打开
const open = () => {
  visible.value = true;
  loading.value = true;
  getGoodsSku(props.skuId).then((data) => {
    goods.value = data.result;
    loading.value = false;
  });
};

// 关闭
const close = () => {
  visible.value = false;
};

// 切换
const toggle = () => {
  visible.value ? close() : open();
};

// 点击其他地方关闭
const target = ref<HTMLDivElement>();
onClickOutside(target, () => {
  close();
});

// 监听sku改变的函数，记录sku信息
const currSku = ref<SkuInfo>();
const changeSku = (sku: SkuInfo) => {
  currSku.value = sku;
};

// 点击确认的时候，更改后的sku信息提交给父组件
const submit = () => {
  // 当你currsku有值，且skuId和默认的skuId 不同
  if (
    currSku.value &&
    currSku.value.skuId &&
    currSku.value.skuId !== props.skuId
  ) {
    emit('change', currSku.value);
    close();
  }
};
</script>

<style scoped lang="less">
.cart-sku {
  position: relative;
  display: inline-block;
  padding: 0 6px;
  margin-top: 10px;
  height: 28px;
  border: 1px solid #f5f5f5;

  .attrs {
    line-height: 24px;
    display: flex;

    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }

    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }

  .layer {
    position: absolute;
    top: 40px;
    left: -1px;
    z-index: 10;
    padding: 20px;
    width: 400px;
    font-size: 14px;
    background: #fff;
    border: 1px solid @xtxColor;
    border-radius: 4px;
    /* stylelint-disable-next-line function-no-unknown */
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);

    &::before {
      position: absolute;
      top: -8px;
      left: 12px;
      width: 12px;
      height: 12px;
      background: #fff;
      /* stylelint-disable-next-line string-quotes */
      content: '';
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      transform: scale(0.8, 1) rotate(45deg);
    }

    .loading {
      height: 224px;
      /* stylelint-disable-next-line function-url-quotes */
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
