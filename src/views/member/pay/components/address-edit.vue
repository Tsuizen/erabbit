<template>
  <XtxDialog
    :title="`${formData.id ? '修改' : '添加'}收货地址`"
    v-model:visible="visibleDialog"
  >
    <!-- 表单 -->
    <div class="address-edit">
      <div class="xtx-form">
        <div class="xtx-form-item">
          <div class="label">收货人：</div>
          <div class="field">
            <input
              v-model="formData.receiver"
              class="input"
              placeholder="请输入收货人"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">手机号：</div>
          <div class="field">
            <input
              v-model="formData.contact"
              class="input"
              placeholder="请输入手机号"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地区：</div>
          <div class="field">
            <XtxCity
              :fullLocation="formData.fullLocation"
              @change="changeCity"
              placeholder="请选择所在地区"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">详细地址：</div>
          <div class="field">
            <input
              v-model="formData.address"
              class="input"
              placeholder="请输入详细地址"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">邮政编码：</div>
          <div class="field">
            <input
              v-model="formData.postalCode"
              class="input"
              placeholder="请输入邮政编码"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地址标签：</div>
          <div class="field">
            <input
              v-model="formData.addressTags"
              class="input"
              placeholder="请输入地址标签，逗号分隔"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <template #footer>
      <XtxButton
        @click="visibleDialog = false"
        type="gray"
        style="margin-right: 20px"
        >取消</XtxButton
      >
      <XtxButton @click="submit" type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
</template>

<script setup lang="ts">
import { addAddress, editAddress } from '@/api/order';
import Message from '@/components/library/Message';
import type { Address } from '@/types/member';
import { ref } from 'vue';

const emit = defineEmits(['on-success']);

// Address类型守卫
const isAddress = (item: Address | Record<string, never>): item is Address => {
  return (item as Address).address !== undefined;
};

const visibleDialog = ref<boolean>(false);
// 表单数据
const formData = ref<Address>({
  receiver: '',
  contact: '',
  provinceCode: '',
  cityCode: '',
  countyCode: '',
  address: '',
  postalCode: '',
  addressTags: '',
  isDefault: 1,
  // 城市组件显示文字（完整行政区地址）
  fullLocation: ''
});

// 打开对话框
const open = (address: Address | Record<string, never>) => {
  visibleDialog.value = true;

  if (isAddress(address)) {
    // 如果修改 填充表单
    for (const key in address) {
      formData.value![key] = address[key];
    }
  } else {
    // 如果添加 清空表单
    for (const key in formData) {
      if (key === 'isDefault') {
        formData.value![key] = 1;
      } else {
        formData.value![key] = '';
      }
    }
  }
};

// 城市选中
const changeCity = (result: Address) => {
  formData.value = {
    ...formData.value,
    provinceCode: result.provinceCode,
    cityCode: result.cityCode,
    countyCode: result.countyCode,
    fullLocation: result.fullLocation
  };
};

// 添加时的提交操作
const submit = () => {
  // 1.省略了校验
  // 2.发送了请求
  if (formData.value.id) {
    // 修改请求
    editAddress(formData.value).then(() => {
      // 提示
      Message({ type: 'success', text: '修改收货地址成功' });
      // 关闭
      visibleDialog.value = false;
      // 触发自定义事件
      emit('on-success', formData.value);
    });
  } else {
    // 添加请求
    addAddress(formData.value).then((data) => {
      // 需要设置id
      formData.value.id = data.result.id;
      // 提示
      Message({ type: 'success', text: '添加收货地址成功' });
      // 关闭
      visibleDialog.value = false;
      emit('on-success', formData.value);
    });
  }
};

defineExpose({ open });
</script>
<style scoped lang="less">
.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;

    .body {
      font-size: 14px;
    }
  }
}

.xtx-form {
  padding: 0;

  input {
    outline: none;

    &::placeholder {
      color: #ccc;
    }
  }
}

.xtx-city {
  width: 320px;

  :deep(.select) {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    height: 50px;
    line-height: 48px;

    .placeholder {
      color: #ccc;
    }

    i {
      font-size: 18px;
      color: #ccc;
    }

    .value {
      font-size: 14px;
    }
  }

  :deep(.option) {
    top: 49px;
  }
}
</style>
