
const ErrorMessage = require('./errorMessage');
const ErrorCode = require('./errorCode');

class BaseResp {
  constructor(code, content, message) {
      this.code = code;
      this.message = message || ErrorMessage[code] || '系统错误';
      this.content = content;
  }


  static success(content, message) {
    return new BaseResp(ErrorCode.SUCCESS, content || {}, message || '请求成功');
  }

  static error(code, content, message) {
      return new BaseResp(code, content || {}, message || ErrorMessage[code]);
  }
}

module.exports = BaseResp;
