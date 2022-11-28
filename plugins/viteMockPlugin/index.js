import fs from 'fs';
import path from 'path';

// 获取get中的params
function getQuery(url) {
  const params = url.split('?');
  const result = {};
  if (params.length > 1) {
    const arr = params[1].split('&');
    arr.forEach((item) => {
      const obj = item.split('=');
      result[obj[0]] = obj[1];
    });
  }
  return result;
}

const viteMockPlugin = async () => {
  const mockStat = fs.statSync('mock');
  const isDirectory = mockStat.isDirectory();
  let mockResult = [];
  if (isDirectory) {
    const cwd = process.cwd();
    mockResult = await import(path.join(cwd, 'mock/collect.js'));
  }

  return {
    configureServer(server) {
      // 服务器配置相关
      //req 请求对象
      // res 响应对象
      // next 是否交给下一个中间件
      server.middlewares.use((req, res, next) => {
        const matchItem = mockResult.default.find(
          (mockDescriptor) => mockDescriptor.url === req.url.split('?')[0]
        );
        if (matchItem) {
          const responseData = matchItem.response(getQuery(req.url));
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(responseData));
        } else {
          next();
        }
      });
    }
  };
};

export default viteMockPlugin