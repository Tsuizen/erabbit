<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle()" :class="{ active: visible }">
      <span class="placeholder" v-if="!fullLocation">{{ placeholder }}</span>
      <span class="value" v-else>{{ fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>

    <div class="option" v-if="visible">
      <div v-if="loading" class="loading"></div>

      <template v-else>
        <span
          class="ellipsis"
          @click="changeItem(item)"
          v-for="item in currentList"
          :key="item.code"
          >{{ item.name }}</span
        >
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import axios from 'axios';
import { computed, reactive, ref } from 'vue';

defineProps<{
  fullLocation: string;
  placeholder: string;
}>();

const emit = defineEmits(['change']);

interface CityInfo {
  code: string;
  level: number;
  name: string;
  areaList: CityInfo[];
}

interface ChangeInfo {
  provinceCode: string;
  provinceName: string;
  cityCode: string;
  cityName: string;
  countyCode: string;
  countyName: string;
  fullLocation: string;
}

// 显示隐藏数据
const visible = ref(false);
// 所有省市区数据
const allCityData = ref<CityInfo[]>([] as CityInfo[]);
// 正在加载数据
const loading = ref(false);

const target = ref<HTMLDivElement>();
// 定义选择的 省市区 数据
const changeResult = reactive<ChangeInfo>({} as ChangeInfo);
// 提供打开和关闭的函数
const open = () => {
  visible.value = true;
  loading.value = true;
  // 获取地区数据
  getCityData().then((data) => {
    allCityData.value = data as CityInfo[];
    loading.value = false;
  });
  // 清空之前的选择
  for (const key in changeResult) {
    changeResult[key] = '';
  }
};

const close = () => {
  visible.value = false;
};

// 提供一个切换方法给select使用
const toggle = () => {
  visible.value ? close() : open();
};

onClickOutside(target, () => {
  // 参数1：监听那个元素
  // 参数2：点击了该元素外的其他地方触发的函数
  close();
});

const currentList = computed(() => {
  // 默认省一级
  let list: CityInfo[] = allCityData.value;
  // 可能市一级
  if (changeResult.provinceCode && changeResult.provinceName) {
    list = list.find((p) => p.code === changeResult.provinceCode)!.areaList;
  }
  // 可能区县一级
  if (changeResult.cityCode && changeResult.cityName) {
    list = list.find((p) => p.code === changeResult.cityCode)!.areaList;
  }
  return list;
});

// 点击按钮的时候记录
const changeItem = (item: CityInfo) => {
  if (item.level === 0) {
    changeResult.provinceCode = item.code;
    changeResult.provinceName = item.name;
  }
  if (item.level === 1) {
    changeResult.cityCode = item.code;
    changeResult.cityName = item.name;
  }
  if (item.level === 2) {
    changeResult.countyCode = item.code;
    changeResult.countyName = item.name;
    // 完整路径
    changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`;
    // 最后一级了，关闭对话框，通知父组件
    close();
    emit('change', changeResult);
  }
};

// 获取省市区数据函数
const getCityData = () => {
  // 数据：https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
  // 1. 当本地没有缓存，发请求获取数据
  // 2. 当本地缓存，取出本地数据
  // 返回promise在then获取数据，这里可能是异步操作可能是同步操作
  return new Promise((resolve) => {
    // 约定数据存储在window上的cityData字段
    if (window.cityData) {
      resolve(window.cityData);
    } else {
      const url =
        'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json';
      axios.get(url).then((res) => {
        window.cityData = res.data;
        resolve(window.cityData);
      });
    }
  });
};
</script>

<style scoped lang="less">
.xtx-city {
  position: relative;
  z-index: 400;
  display: inline-block;

  .select {
    padding: 0 5px;
    height: 30px;
    border: 1px solid #e4e4e4;
    line-height: 28px;
    cursor: pointer;

    &.active {
      background: #fff;
    }

    .placeholder {
      color: #999;
    }

    .value {
      font-size: 12px;
      color: #666;
    }

    i {
      margin-left: 5px;
      font-size: 12px;
    }
  }

  .option {
    position: absolute;
    top: 29px;
    left: 0;
    display: flex;
    padding: 10px;
    width: 542px;
    min-height: 30px;
    background: #fff;
    border: 1px solid #e4e4e4;
    line-height: 30px;
    flex-wrap: wrap;

    > span {
      padding: 0 3px;
      width: 130px;
      text-align: center;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background: #f5f5f5;
      }
    }

    .loading {
      width: 100%;
      height: 290px;
      /* stylelint-disable-next-line function-url-quotes */
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
