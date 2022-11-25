<template>
  <div class="cart-none">
    <img src="@/assets/images/none.png" alt="" />
    <p>购物车内暂时没有商品</p>
    <div class="btn">
      <XtxButton type="primary" @click="$router.push('/')">继续逛逛</XtxButton>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.cart-none {
  padding: 150px 0;
  text-align: center;
  background: #fff;

  img {
    width: 180px;
  }

  p {
    padding: 20px 0;
    color: #999;
  }
}
</style>
