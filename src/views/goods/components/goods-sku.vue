<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            v-if="val.picture"
            :title="val.name"
            :src="val.picture"
            @click="changeSku(item, val)"
            :class="{ selected: val.selected, disabled: val.disabled }"
          />
          <span
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="changeSku(item, val)"
            v-else
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<script setup lang="ts">
import type { Goods, GoodsSku } from '@/types/goods';
import powerSet from '@/vender/power-set';
import type { GoodsSpecs, SpecsValues } from '@/types/goods';

const props = defineProps<{
  goods: Goods;
  skuId?: string;
}>();

const emit = defineEmits(['change']);

const spliter = '★';
// 得到一个路径字典对象
const getPathMap = (skus: GoodsSku[]) => {
  // 1.得到所有sku集合
  // 2.筛选出有效的sku
  // 3.根据有效的sku使用powe-set算法得到子集
  // 4.根句子集往路径字典中存储key- value
  const pathMap = {};
  skus.forEach((sku) => {
    if (sku.inventory > 0) {
      // 计算当前有库存的sku的子集
      // 例如：[1,2,3] ==> [[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]
      // 可选值数组
      const valueArr = sku.specs.map((val) => val.valueName);
      // 可选值数组子集
      const valueArrPowerSet = powerSet(valueArr);
      // 遍历子集，往pathMap插入数据
      valueArrPowerSet.forEach((arr) => {
        // 根据arr得到的字符串key, 约定key是：['蓝色','美国'] ==〉"蓝色★美国"
        const key = arr.join(spliter);
        // 给pathMap设置数据
        if (pathMap[key]) {
          pathMap[key].push(sku.id);
        } else {
          pathMap[key] = [sku.id];
        }
      });
    }
  });
  return pathMap;
};

// 获取已选中的数组
const getSelectedValues = (specs: GoodsSpecs[]) => {
  const arr: (string | undefined)[] = [];
  specs.forEach((item) => {
    const selectedVal = item.values.find((val) => val.selected);
    arr.push(selectedVal ? selectedVal.name : undefined);
  });
  return arr;
};

// 更新按钮禁用状态
const updateDisabledStatus = <T>(specs: GoodsSpecs[], pathMap: T) => {
  // 1.约定每一个按钮的状态由本身的disabled数据来控制
  specs.forEach((item, i) => {
    const selectedValue = getSelectedValues(specs);
    item.values.forEach((val) => {
      // 2.判断当前是否选中
      if (val.selected) {
        return;
      }
      // 3.拿当前的值按照顺序套入选中的值数组
      selectedValue[i] = val.name;
      // 4.剔除undefined数据，按照分隔符拼接key
      const key = selectedValue.filter((value) => value).join(spliter);
      // 5.拿着key去路径字典找是否有数据，有可以点击，没有就禁用
      val.disabled = !pathMap[key];
    });
  });
};

// 默认选中
const initDefaultSelected = (goods: Goods, skuId: string) => {
  // 1.找出sku的信息
  // 2.遍历每一个按钮，按钮的值和sku记录的值相同，就选中
  const sku = goods.skus.find((sku) => sku.id === skuId);
  goods.specs.forEach((item, i) => {
    const val = item.values.find((val) => val.name === sku?.specs[i].valueName);
    val!.selected = true;
  });
};

const pathMap = getPathMap(props.goods.skus);
// 根据skuId初始化选中
if (props.skuId) {
  initDefaultSelected(props.goods, props.skuId);
}
// 组件初始化 更新按钮禁用状态
updateDisabledStatus(props.goods.specs, pathMap);
// 1.选中与取消选中，每一个按钮都有自己的选中状态selected
// 1.1 点击的是已选中，只需要取消当前的选中
// 1.2 点击的是未选中，把同一个规格的按钮改成未选中，当前点击的改成选中
const changeSku = (item: GoodsSpecs, val: SpecsValues) => {
  // 按钮是禁用的直接返回
  if (val.disabled) {
    return;
  }

  if (val.selected) {
    val.selected = false;
  } else {
    item.values.forEach((valItem) => {
      valItem.selected = false;
    });
    val.selected = true;
  }

  // 点击按钮时，更新按钮禁用状态
  updateDisabledStatus(props.goods.specs, pathMap);
  // 将你选择的sku信息通知父组件
  // 1.选择完整的sku组合按钮，才可以拿到这些信息，提交父组件
  // 2.不是完整的sku组合按钮，提交空对象到父组件
  const validSelectedValues = getSelectedValues(props.goods.specs).filter(
    (v) => v
  );
  if (validSelectedValues.length === props.goods.specs.length) {
    const skuIds = pathMap[validSelectedValues.join(spliter)];
    const sku = props.goods.skus.find(
      (sku) => sku.id === skuIds[0]
    ) as GoodsSku;

    emit('change', {
      skuId: sku.id,
      price: sku.price,
      oldPrice: sku.oldPrice,
      inventory: sku.inventory,
      specsText: sku.specs
        .reduce((p, c) => `${p} ${c.name}: ${c.valueName}`, '')
        .trim()
    });
  } else {
    // 不完整
    // 父组件需要判断是否规格选择完整，不完整不能加购物车
    emit('change', {});
  }
};
</script>

<style scoped lang="less">
.sku-state-mixin () {
  margin-right: 10px;
  border: 1px solid #e4e4e4;
  cursor: pointer;

  &.selected {
    border-color: @xtxColor;
  }

  &.disabled {
    border-style: dashed;
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-top: 20px;
  padding-left: 10px;

  dl {
    display: flex;
    align-items: center;
    padding-bottom: 20px;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }

      > span {
        display: inline-block;
        padding: 0 20px;
        height: 30px;
        line-height: 28px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
