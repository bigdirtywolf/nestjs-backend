export const NOTOKEN = [
  /^\/financial\/list$/, // 金融列表
  /^\/program\/list$/, // 项目列表
  /^\/message\/list\/program$/, // 项目列表
  /^\/message\/list\/financial$/, // 金融列表
  /^\/group\/list$/, // 消息列表
  /^\/shop\/products\/\d+$/, // 电商
  /^\/shop\/products$/, // 电商
  /^\/shop\/products\/recommend$/, // 电商
  /^\/shop\/products\/sec-products$/, // 电商
  /^\/shop\/products\/coupon-products$/, // 电商
  /^\/shop\/category$/, // 电商分类
  /^\/industry\/list$/, // 行业列表
  /^\/advert\/splash$/, // 广告
  /^\/advert\/popup$/, // 广告
  /^\/advert\/carousel$/, // 广告
  /^\/advert\/company$/, // 广告公司
  /^\/mid\/auth\/login$/, // 登录
  /^\/mid\/auth\/login\/jwt$/, // 登录
  /^\/mid\/auth\/register$/, // 注册
  /^\/mid\/auth\/forget-password$/, // 忘记密码
  /^\/mid\/sms\/send$/, // 发送手机验证码
  /^\/mid\/captcha\/generate$/, // 生成验证码
  /^\/mid\/switch\//, // 开关配置（金融、分销）
  /^\/mid\/profit\/shop$/, // 商品分润 API
  /^\/mid\/profit\/program$/, // 项目分润 API
  /^\/mid\/sms\/sms_verification$/, // 验证手机验证码 API
  /^\/mid\/version\/check-version$/, // APP版本检查
  /^\/mid\/version\/latest-version$/, // APP最新版本
  /^\/mid\/payment\/alipay\/notify$/, // 支付宝H5
  /^\/mid\/payment\/alipay\/notifyApp$/, // 支付宝APP
  /^\/mid\/rongdou\/charging$/, // 充值，内部调用
  /^\/agents\/login$/, // 代理登录
  /^\/agents\/apply$/, // 代理申请
  /^\/system\/maintenance-status$/, // 检查维护模式
  /^\/region\/provinces$/, // 省市区
];