<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li>
            <RouterLink to="/member"
              ><i class="iconfont icon-user"></i
              >{{ profile.account }}</RouterLink
            >
          </li>
          <li><a href="javascript:;" @click="logout">退出登录</a></li>
        </template>
        <template v-else>
          <li><RouterLink to="/login">请先登录</RouterLink></li>
          <li><a href="javascript">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import router from '@/router';
import { useCartStore, useUserStore } from '@/store';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const cartStore = useCartStore();
const { profile } = storeToRefs(userStore);

// 退出登录
// 1. 清空本地存储信息和pinia的用户信息
// 2. 跳转登录
const logout = () => {
  userStore.setUser({});
  cartStore.setCartNotLogin([]);
  router.push('/login');
};
</script>

<style scoped lang="less">
.app-topnav {
  background: #333;

  ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 53px;

    li {
      a {
        display: inline-block;
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;

        i {
          margin-right: 2px;
          font-size: 14px;
        }

        &:hover {
          color: @xtxColor;
        }
      }

      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
// ~ 选择器作用：选择当前选择器后的所有元素
</style>
