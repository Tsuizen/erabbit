<template>
  <p class="g-name">{{ goods.name }}</p>
  <p class="g-desc">{{ goods.desc }}</p>
  <p class="g-price">
    <span>{{ goods.price }}</span>
    <span>{{ goods.oldPrice }}</span>
  </p>
  <div class="g-service">
    <dl>
      <dt>促销</dt>
      <dd>12月好物放送，App领券购买直降120元</dd>
    </dl>
    <dl>
      <dt>配送</dt>
      <dd>
        至<XtxCity :full-location="fullLocation" @change="changeCity"></XtxCity>
      </dd>
    </dl>
    <dl>
      <dt>服务</dt>
      <dd>
        <span>无忧退货</span>
        <span>快速退款</span>
        <span>免费包邮</span>
        <a href="javascript:;">了解详情</a>
      </dd>
    </dl>
  </div>
</template>

<script setup lang="ts">
import type { Goods, UserAddress } from '@/types/goods';
import { ref } from 'vue';
const props = defineProps<{
  goods: Goods;
}>();

// 提供给后台的四项数据（未登录）
const provinceCode = ref('110000');
const cityCode = ref('119900');
const countyCode = ref('110101');
const fullLocation = ref('北京市 市辖区 东城区');
// 取出用户收获地址中的默认地址给四个数据赋值
if (props.goods.userAddresses) {
  const defaultAddress = props.goods.userAddresses.find(
    (item) => item.isDefault === 1
  );
  if (defaultAddress) {
    provinceCode.value = defaultAddress.provinceCode;
    cityCode.value = defaultAddress.cityCode;
    countyCode.value = defaultAddress.countyCode;
    fullLocation.value = defaultAddress.fullLocation;
  }
}
//城市选中事件处理
const changeCity = (result: UserAddress) => {
  provinceCode.value = result.provinceCode;
  cityCode.value = result.cityCode;
  countyCode.value = result.countyCode;
  fullLocation.value = result.fullLocation;
};
</script>

<style scoped lang="less">
.g-name {
  font-size: 22px;
}

.g-desc {
  margin-top: 10px;
  color: #999;
}

.g-price {
  margin-top: 10px;

  span {
    &::before {
      content: '¥';
      font-size: 14px;
    }

    &:first-child {
      margin-right: 10px;
      font-size: 22px;
      color: @priceColor;
    }

    &:last-child {
      font-size: 16px;
      text-decoration: line-through;
      color: #999;
    }
  }
}

.g-service {
  padding: 20px 10px 0;
  margin-top: 10px;
  width: 500px;
  background: #f5f5f5;

  dl {
    display: flex;
    align-items: center;
    padding-bottom: 20px;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      color: #666;

      &:last-child {
        span {
          margin-right: 10px;

          &::before {
            margin-right: 2px;
            color: @xtxColor;
            content: '•';
          }
        }

        a {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
