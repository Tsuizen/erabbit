import request from '@/utils/request';

/* 账号密码登录 */
export const userAccountLogin = ({
  account,
  password
}: {
  account: string;
  password: string;
}) => {
  return request('/login', 'post', { account, password });
};

/* 获取手机短信验证码 */
export const userMobileLoginMsg = (mobile: string) => {
  return request('/login/code', 'get', { mobile });
};

/* 手机号登录 */
export const userMobileLogin = ({
  mobile,
  code
}: {
  mobile: string;
  code: string;
}) => {
  return request('/login/code', 'post', { mobile, code });
};

/* qq登录 */
export const userQQLogin = (unionId: string, source = 1) => {
  return request('/login/social', 'post', { unionId, source });
};

/* 获取绑定qq的短信验证码 */
export const userQQBindCode = (mobile: string) => {
  return request('/login/social/code', 'get', { mobile });
};

/* QQ登录-绑定账号 */
export const userQQBindLogin = ({
  unionId,
  mobile,
  code
}: {
  unionId: string;
  mobile: string;
  code: string;
}) => {
  return request('/login/social/bind', 'post', { unionId, mobile, code });
};

/* 校验用户是否存在 */
export const userAccountCheck = (account: string) => {
  return request('/register/check', 'get', { account });
};

/* 获取用户QQ完善信息的短信验证码 */
export const userQQPatchCode = (mobile: string) => {
  return request('/register/code', 'get', { mobile });
};

/* QQ登录-完善信息 */
export const userPatchLogin = ({
  unionId,
  mobile,
  code,
  account,
  password
}: {
  unionId: string;
  mobile: string;
  code: string;
  account: string;
  password: string;
}) => {
  return request(`/login/social/${unionId}/complement`, 'post', {
    unionId,
    mobile,
    code,
    account,
    password
  });
};
