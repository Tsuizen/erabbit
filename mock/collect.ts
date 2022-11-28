import Mock from 'mockjs';
import type { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/member/collect',
    method: 'get',
    response: ({
      query
    }: {
      query: { page: string; pageSize: string; collectType: string };
    }) => {
      console.log('query', query);
      const items = [];
      for (let i = 0; i < +query.pageSize; i++) {
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
          pageSize: +query.pageSize,
          page: +query.page,
          items
        }
      };
    }
  }
] as MockMethod[];
