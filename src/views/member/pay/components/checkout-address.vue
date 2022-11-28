<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">
        您需要先添加收货地址才可以提交订单。
      </div>
      <ul v-if="showAddress">
        <li>
          <span>收<i />货<i />人：</span>{{ showAddress.receiver }}
        </li>
        <li>
          <span>联系方式：</span
          >{{
            showAddress.contact.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
          }}
        </li>
        <li>
          <span>收货地址：</span>{{ showAddress.fullLocation?.replace(/ /g, '')
          }}{{ showAddress.address }}
        </li>
      </ul>
      <a
        v-if="showAddress"
        href="javascript:;"
        @click="openAddressEdit(showAddress!)"
        >修改地址</a
      >
    </div>
    <div class="action">
      <XtxButton class="btn" @click="openDialog()">切换地址</XtxButton>
      <XtxButton class="btn" @click="openAddressEdit({})">添加地址</XtxButton>
    </div>
  </div>
  <!-- 对话框组件, 切换收货地址 -->
  <XtxDialog v-model:visible="visibleDialog" title="切换收货地址">
    <div
      v-for="item in list"
      :key="item.id"
      class="text item"
      :class="{
        active: selectedAddress && selectedAddress.id === item.id
      }"
      @click="selectedAddress = item"
    >
      <ul>
        <li>
          <span>收<i />货<i />人：</span>{{ item.receiver }}
        </li>
        <li>
          <span>联系方式：</span
          >{{ item.contact?.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') }}
        </li>
        <li>
          <span>收货地址：</span
          >{{ item.fullLocation?.replace(/ /g, '') + item.address }}
        </li>
      </ul>
    </div>
    <template #footer>
      <XtxButton
        type="gray"
        style="margin-right: 20px"
        @click="visibleDialog = false"
        >取消</XtxButton
      >
      <XtxButton type="primary" @click="confirmAddressFn">确认</XtxButton>
    </template>
  </XtxDialog>

  <AddressEdit ref="addressEdit" @on-success="successHandler" />
</template>

<script setup lang="ts">
import type { Address } from '@/types/member';
import { ref, toRefs } from 'vue';
import AddressEdit from './address-edit.vue';

const props = defineProps<{
  list: Address[];
}>();

// 1.在拥有根元素的组件中，触发自定义事件，有没有emits无所谓
// 2.提倡：发了自定义事件，需要在emits中申明下，提高可读性
const emits = defineEmits(['change', 'update:list']);
emits('change');

// 找到默认收货地址
// 没有默认收货地址，使用第一条收货地址
// 如果没有数据，提示添加
const showAddress = ref<Address>();
const defaultAddress = props.list.find((item) => item.isDefault === 0);
if (defaultAddress) {
  showAddress.value = defaultAddress;
} else {
  if (props.list.length) {
    const { list } = toRefs(props);
    showAddress.value = list.value[0];
  }
}

// 默认通知父组件一个收货地址ID
emits('change', showAddress.value && showAddress.value.id);

// 切换地址对话框现实隐藏
const visibleDialog = ref(false);
// 记录当前你选中的地址ID
const selectedAddress = ref<Address | null>();

const confirmAddressFn = () => {
  // 显示地址换成选中的地址
  showAddress.value = selectedAddress.value as Address;
  // 把显示的地址ID通知结算组件
  emits('change', selectedAddress.value?.id);
  visibleDialog.value = false;
};

const openDialog = () => {
  // 将之前的选中地址改成null
  selectedAddress.value = null;
  visibleDialog.value = true;
};

// 打开添加编辑收货地址组件
const addressEdit = ref<InstanceType<typeof AddressEdit> | null>(null);
const openAddressEdit = (address: Address | Record<string, never>) => {
  // 添加 {}  修改 {数据}
  addressEdit.value!.open(address);
};

const successHandler = (formData: Address) => {
  // 根据formData 中的id去当前地址列表中查找，有就修改，否则添加
  const address = props.list.find((item) => item.id === formData.id);
  if (address) {
    for (const key in address) {
      address[key] = formData[key];
    }
  } else {
    // 如果是添加，往list中追加一条
    // 当你在修改formData的时候，数组中的数据也会更新，因为是同一引用地址。
    // 啥时候修改formData，当你打开对话框需要清空之前的输入信息
    // 克隆formData数据
    const jsonStr = JSON.stringify(formData);
    const list = props.list;
    list.unshift(JSON.parse(jsonStr));
    emits('update:list', list);
  }
};
</script>
<style scoped lang="less">
.xtx-dialog {
  .text {
    display: flex;
    align-items: center;
    min-height: 90px;
    flex: 1;

    &.item {
      margin-bottom: 10px;
      border: 1px solid #f5f5f5;
      cursor: pointer;

      &.active,
      &:hover {
        background: lighten(@xtxColor, 50%);
        border-color: @xtxColor;
      }

      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}

.checkout-address {
  display: flex;
  align-items: center;
  border: 1px solid #f5f5f5;

  .text {
    display: flex;
    align-items: center;
    min-height: 90px;
    flex: 1;

    .none {
      width: 100%;
      text-align: center;
      color: #999;
      line-height: 90px;
    }

    > ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          margin-right: 5px;
          color: #999;

          > i {
            display: inline-block;
            width: 0.5em;
          }
        }
      }
    }

    > a {
      width: 160px;
      height: 90px;
      text-align: center;
      color: @xtxColor;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
