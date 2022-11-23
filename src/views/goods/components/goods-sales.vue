<template>
  <ul class="goods-sales">
    <li>
      <p>销量人气</p>
      <p>200+</p>
      <p><i class="iconfont icon-task-filling"></i>销量人气</p>
    </li>
    <li>
      <p>商品评价</p>
      <p>400+</p>
      <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
    </li>
    <li>
      <p>收藏人气</p>
      <p>600+</p>
      <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
    </li>
    <li>
      <p>品牌信息</p>
      <p>苏宁电器</p>
      <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
    </li>
  </ul>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.goods-sales {
  display: flex;
  align-items: center;
  width: 400px;
  height: 140px;
  text-align: center;

  li {
    flex: 1;
    position: relative;

    ~ li::after {
      position: absolute;
      top: 10px;
      left: 0;
      height: 60px;
      border-left: 1px solid #e4e4e4;
      content: '';
    }

    p {
      &:first-child {
        color: #999;
      }

      &:nth-child(2) {
        margin-top: 10px;
        color: @priceColor;
      }

      &:last-child {
        margin-top: 10px;
        color: #666;

        i {
          margin-right: 2px;
          font-size: 14px;
          color: @xtxColor;
        }

        &:hover {
          color: @xtxColor;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
