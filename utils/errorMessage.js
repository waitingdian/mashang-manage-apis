
const errorCode = require('./errorCode');
/**
 *
 * 错误信息信息
 */
module.exports = {
  [errorCode.SUCCESS]: '请求成功',
  [errorCode.NOT_FOUND]: '找不到接口',
  [errorCode.FREQUENT_REQUEST]: '请求过快，请稍后重试',
  [errorCode.PARAMS_ERROR]: '参数错误',
  [errorCode.SYSTEM_ERROR]: '系统错误',
  [errorCode.TOKEN_ERROR]: '登陆失效，请从新登陆',
  // 后台管理用户
  [errorCode.ADMIN_USER.NOT_FOUND]: '不存在的的用户',
  [errorCode.ADMIN_USER.PWD_IS_ERROR]: '密码错误',
  [errorCode.ADMIN_USER.NOT_FOUND_OR_NOT_AUTH]: '用户没权限或者不存在的用户',
  [errorCode.ADMIN_USER.USER_IX_EXISTS]: '此账号已存在',
  [errorCode.ADMIN_USER.MUST_UPDATE_ONE]: '请至少修改一样',
  [errorCode.ADMIN_USER.NOT_AUTH_MODIFY_OTHER]: '没有权限修改其他管理员',
  [errorCode.ADMIN_USER.NOT_AUTH_REMOVE]: '没有权限删除管理员'
};
