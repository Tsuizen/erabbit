<template>
  <div class="goods-comment">
    <!-- 评价头部 -->
    <div v-if="commentInfo" class="head">
      <div class="data">
        <p>
          <span>{{ commentInfo.salesCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span
          ><span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            v-for="(item, i) in commentInfo.tags"
            :key="item.title"
            href="javascript:;"
            :class="{ active: currentTagIndex === i }"
            @click="changeTag(i)"
            >{{ item.title }}（{{ item.tagCount }}）</a
          >
        </div>
      </div>
    </div>
    <div v-if="commentInfo" class="sort">
      <span>排序：</span>
      <a
        href="javascipt:;"
        :class="{ active: reqParams.sortField === null }"
        @click="changeSort(null)"
        >默认</a
      >
      <a
        href="javascipt:;"
        :class="{ active: reqParams.sortField === 'createTime' }"
        @click="changeSort('createTime')"
        >最新</a
      >
      <a
        href="javascipt:;"
        :class="{ active: reqParams.sortField === 'praiseCount' }"
        @click="changeSort('praiseCount')"
        >最热</a
      >
    </div>
    <!-- 评价列表 -->
    <div v-if="commentList" class="list">
      <div v-for="item in commentList" :key="item.id" class="item">
        <div class="user">
          <img :src="item.member.avatar" alt="" />
          <span>{{ formatNickname(item.member.nickname) }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i
              v-for="i in item.score"
              :key="i + 's'"
              class="iconfont icon-wjx01"
            ></i>
            <i
              v-for="i in 5 - item.score"
              :key="i + 'k'"
              class="iconfont icon-wjx02"
            ></i>
            <span class="attr">{{ formatSpecs(item.orderInfo.specs) }}</span>
          </div>
          <div class="text">{{ item.content }}</div>
          <!-- 图片评论组件 -->
          <GoodsCommentImage
            v-if="item.pictures.length"
            :pictures="item.pictures"
          />
          <div class="time">
            <span>{{ item.createTime }}</span>
            <span class="zan"
              ><i class="iconfont icon-dianzan"></i>{{ item.praiseCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
    <XtxPagination
      v-if="total"
      :page-size="reqParams.pageSize"
      :current-page="reqParams.page"
      @current-change="changePagerFn"
    />
  </div>
</template>

<script setup lang="ts">
import { findGoodsCommentInfo, findGoodsCommentList } from '@/api/product';
import type { Goods } from '@/types/goods';
import { inject, reactive, ref, watch, type Ref } from 'vue';
import GoodsCommentImage from './goods-comment-image.vue';

interface CommentInfo {
  salesCount: number;
  praisePercent: string;
  evaluateCount: number;
  hasPictureCount: number;
  tags: {
    type: string;
    title: string;
    tagCount: string;
  }[];
}

interface ReqParam {
  page: number;
  pageSize: number;
  hasPicture: boolean;
  tag: string | null;
  sortField: 'praiseCount' | 'createTime' | null;
}

interface SpecOfComment {
  name: string;
  nameValue: string;
}

interface ItemOfComment {
  id: string;
  orderInfo: {
    specs: SpecOfComment[];
    quantity: number;
    createTime: string;
  };
  member: {
    id: string;
    nickname: string;
    avatar: string;
  };
  score: number;
  tags: string[];
  content: string;
  pictures: string[];
  officialReply: string;
  praiseCount: number;
  createTime: string;
}

const commentInfo = ref<CommentInfo>();
const goods = inject<Ref<Goods>>('goods');
// 准备筛选条件数据
const reqParams = reactive<ReqParam>({
  page: 1,
  pageSize: 10,
  hasPicture: false,
  tag: null,
  // 排序方式：praiseCount 热度  createTime 最新
  sortField: null
});

findGoodsCommentInfo(goods!.value.id).then((data) => {
  data.result.tags.unshift({
    title: '有图',
    tagCount: data.result.hasPictureCount,
    type: 'img'
  });
  data.result.tags.unshift({
    title: '全部评价',
    tagCount: data.result.evaluateCount,
    type: 'all'
  });
  // 设置数据之前，tags数组前追加 有图tag  全部评价tag
  commentInfo.value = data.result;
});

// 激活tag
const currentTagIndex = ref(0);
const changeTag = (i: number) => {
  currentTagIndex.value = i;
  // 点击tag修改筛选条件
  const tag = commentInfo.value?.tags[i];
  // 情况1: 全部评价
  // 情况2: 有图
  // 情况3: 正常tag
  if (tag?.type === 'all') {
    reqParams.hasPicture = false;
    reqParams.tag = null;
  } else if (tag?.type === 'img') {
    reqParams.hasPicture = true;
    reqParams.tag = null;
  } else {
    reqParams.hasPicture = false;
    reqParams.tag = tag!.title;
  }
  reqParams.pageSize = 1;
};

const changeSort = (sortField: 'praiseCount' | 'createTime' | null) => {
  reqParams.sortField = sortField;
  // 重制页码
  reqParams.page = 1;
};

// 初始化和筛选条件改变需要请求
const commentList = ref<ItemOfComment[]>([]);
const total = ref(0);
watch(
  reqParams,
  () => {
    findGoodsCommentList(goods!.value.id, reqParams).then((data) => {
      commentList.value = data.result.items;
      total.value = data.result.counts;
    });
  },
  { immediate: true }
);

// 定义转换数据的函数
const formatSpecs = (sepcs: SpecOfComment[]) => {
  return sepcs.reduce((p, c) => `${p} ${c.name}: ${c.nameValue}`, '').trim();
};

const formatNickname = (nickname: string) => {
  return nickname.slice(0, 1) + '****' + nickname.slice(-1);
};

// 分页切换
const changePagerFn = (newPage: number) => {
  reqParams.page = newPage;
};
</script>

<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;

    .data {
      display: flex;
      padding: 20px;
      width: 340px;

      p {
        flex: 1;
        text-align: center;

        span {
          display: block;

          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }

          &:last-child {
            color: #999;
          }
        }
      }
    }

    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;

      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }

      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;

        > a {
          margin-bottom: 20px;
          margin-left: 20px;
          width: 132px;
          height: 42px;
          text-align: center;
          color: #999;
          background: #f5f5f5;
          border: 1px solid #e4e4e4;
          border-radius: 4px;
          line-height: 40px;

          &:hover {
            color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            border-color: @xtxColor;
          }

          &.active {
            color: #fff;
            background: @xtxColor;
            border-color: @xtxColor;
          }
        }
      }
    }
  }

  .sort {
    margin: 0 20px;
    height: 60px;
    color: #666;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;

    > span {
      margin-left: 20px;
    }

    > a {
      margin-left: 30px;

      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }

  .list {
    padding: 0 20px;

    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;

      .user {
        width: 160px;

        img {
          overflow: hidden;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        span {
          padding-left: 10px;
          color: #666;
        }
      }

      .body {
        flex: 1;

        .score {
          line-height: 40px;

          .iconfont {
            padding-right: 3px;
            color: #ff9240;
          }

          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }

      .text {
        color: #666;
        line-height: 24px;
      }

      .time {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
        color: #999;
      }
    }
  }
}
</style>
