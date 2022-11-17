<template>
  <div class="account-box">
    <div class="toggle">
      <a href="javascript:;"><i class="icon-font icon-user"></i>使用账号</a>
      <a href="javascript:;"><i class="icon-font icon-msg"></i>使用短信登录</a>
    </div>
    <Form target="formCom"></Form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import schema from '@/utils/vee-validate-schema';
import { Form, Field } from 'vee-validate';
import {useCartStore, useUserStore} from '@/store'
import { useRoute, useRouter } from 'vue-router';
import { userMobileLogin } from '@/api/user';

// 切换短信登录
const isMsgLogin = ref(false);
// 表单数据对象
const form = reactive({
  isAgree: true,
  account: '',
  password: '',
  mobile: '',
  code: ''
});

// vee-validate 校验基本步骤
// 1. 导入 Form Field 组件 将 form 和 input 进行替换，需要加上name用来指定将来的校验规则函数的
// 2. Field 需要进行数据绑定，字段名称最好和后台接口需要的一致
// 3. 定义Field的name属性指定的校验规则函数，Form的validation-schema接受定义好的校验规则是对象
// 4. 自定义组件需要校验必须先支持v-model 然后Field使用as指定为组件名称
const myScheme = {
  // 校验函数规则: 返回true就是校验成功，返回字符串就是失败，字符串就是错误提示
  account: schema.account,
  password: schema.password,
  mobile: schema.mobile,
  code: schema.code,
  isAgree: schema.isAgree
};

// 监听isMsgLogin重置表单(数据+清除校验效果)
const formCom = ref<any>(null);
watch(isMsgLogin, () => {
  // 重置数据
  form.isAgree = true;
  form.account = null;
  form.password = null;
  form.mobile = null;
  form.code = null;
  // 如果是没有销毁Field组件，之前的校验结果是不会清除  例如：v-show切换的
  // Form组件提供了一个 resetForm 函数清除校验结果
  formCom.value.resetFrom();
});

// 需要在点击登录的时候对整体表单进行校验
const router= useRouter()
const route = useRoute()
const login = async () => {
  // Form组件提供了一个validate函数作为整体表单校验，返回的是一个promise
  const valid = await formCom.value.validate();
  if (valid) {
    try {
      let data = null;
      if (isMsgLogin.value) {
            // **手机号登录
            // 2.1. 准备一个API做手机号登录
            // 2.2. 调用API函数
            // 2.3. 成功：存储用户信息 + 跳转至来源页或者首页 + 消息提示
            // 2.4. 失败：消息提示
        const { mobile, code } = form;
        data = await userMobileLogin({mobile, code})
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
