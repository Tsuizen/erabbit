// const Mock = require('mockjs');
// import type { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';
export default [
  {
    url: '/member/collect',
    method: 'get',
    response: (req) => {
      const items = [];

      for (let i = 0; i < +req.pageSize; i++) {
        items.push(
          Mock.mock({
            id: '@id',
            name: '@ctitle(10,20)',
            desc: '@ctitle(4,10)',
            price: '@float(100,200,2,2)',
            // http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_7.jpg
            picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock(
              '@integer(1,8)'
            )}.jpg`
          })
        );
      }
      return {
        code: 0,
        message: 'success',
        data: {
          counts: 35,
          pageSize: +req.pageSize,
          page: +req.page,
          items
        }
      };
    }
  }
];
