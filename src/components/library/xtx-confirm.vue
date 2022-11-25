<template>
  <div class="xtx-confirm">
    <div class="wrapper" :class="{ fade }">
      <div class="header">
        <h3>{{ title }}</h3>
        <a
          href="javascript:;"
          @click="cancel"
          class="iconfont icon-close-new"
        ></a>
      </div>
      <div class="body">
        <i class="iconfont icon-warning"></i>
        <span>{{ text }}</span>
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

<style scoped lang="less">
.xtx-confirm {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8888;
  width: 100%;
  height: 100%;
  background: rgb(0 0 0 / 0%);

  &.fade {
    background: rgb(0 0 0 / 50%);
    transition: all 0.4s;
  }

  .wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    background: #fff;
    border-radius: 4px;
    opacity: 0;
    transform: translate(-50%, -50%);

    &.fade {
      opacity: 1;
      transition: all 0.4s;
      transform: translate(-50%, -50%);
    }

    .header,
    .footer {
      padding: 0 20px;
      height: 50px;
      line-height: 50px;
    }

    .body {
      padding: 20px 40px;
      font-size: 16px;

      .icon-warning {
        margin-right: 3px;
        font-size: 16px;
        color: @priceColor;
      }
    }

    .footer {
      text-align: right;

      .xtx-button {
        margin-left: 20px;
      }
    }

    .header {
      position: relative;

      h3 {
        font-weight: normal;
        font-size: 18px;
      }

      a {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 20px;
        height: 20px;
        font-size: 20px;
        text-align: center;
        color: #999;
        line-height: 20px;

        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
