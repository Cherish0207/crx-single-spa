// 描述应用的整个状态
export const NOT_LOADED = "NOT_LOADED"; // 应用初始状态,默认状态,没有加载过
export const LOADING_SOURCE_CODE = "LOADING_SOURCE_CODE"; // 调用了loadapp方法 加载原代码资源中
export const NOT_BOOTSTRAPPED = "NOT_BOOTSTRAPPED"; // 没有启动 还没有调用bootstrap方法
export const BOOTSTRAPPING = "BOOTSTRAPPING"; // 启动中 正在调用异步的bootstrap方法
export const NOT_MOUNTED = "NOT_MOUNTED"; // 没有挂载 还没有调用异步的mount方法
export const MOUNTING = "MOUNTING"; // 挂载中 正在调用异步的的mount方法
export const MOUNTED = "MOUNTED"; // 挂载完毕
export const UPDATING = "UPDATING"; // 更新中
export const UNMOUNTING = "UNMOUNTING"; // 卸载中 只是解除绑定
export const UNLOADING = "UNLOADING"; // 没有加载中 完全卸载
export const LOAD_ERROR = "LOAD_ERROR"; // 文件资源加载失败
export const SKIP_BECAUSE_BROKEN = "SKIP_BECAUSE_BROKEN"; // 代码异常,运行出错

// 当前app应用是否已经挂载 被激活
export function isActive(app) {
  return app.status === MOUNTED;
}
// 当前app是否应该激活/初始化等一系列操作
export function shouldBeActive(app) {
  return app.activeWhen(window.location);
}
