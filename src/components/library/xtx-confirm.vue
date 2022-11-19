<template>
  <div class="xtx-confirm">
    <div class="wrapper" :class="{ fade }">
      <div class="header">
        <h3>{{title}}</h3>
        <a href="javascript:;" @click="cancel" class="iconfont icon-close-new"></a>
      </div>
      <div class="body">
        <i class="iconfont icon-warning"></i>
        <span>{{text}}</span>
      </div>
      <div class="footer">
        <XtxButton @click="cancel" size="mini" type="gray">取消</XtxButton>
        <XtxButton @click="submit" size="mini" type="primary">确认</XtxButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '温馨提示'
  },
  text: {
    type: String,
    default: ''
  },
  cancelCallback: {
    type: Function
  },
  submitCallback: {
    type: Function
  }
});
// 对话框默认隐藏
const fade = ref(false);
// 组件渲染完毕后
onMounted(() => {
  // 过渡效果需要元素创建完毕后延迟一会儿再加上
  setTimeout(() => {
    fade.value = true;
  }, 0);
});

// 取消
const cancel = () => {
  props.cancelCallback!();
};

// 确认
const submit = () => {
  props.submitCallback!();
};
</script>

<style scoped lang="less"></style>
