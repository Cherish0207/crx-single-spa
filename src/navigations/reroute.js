import { started } from "../start";

// 核心应用处理方法
export function reroute() {
  // 1.获取要加载的应用
  // 2.获取要被挂载的应用
  // 3.哪些应用需要被卸载
  if (started) {
    // app装载
    console.log("调用start方法");
    return performAppChanges();
  } else {
    // 注册应用时需要预先加载
    console.log("调用register");
    return loadApps();
  }
  // 预加载应用
  function loadApps() {}
  // 根据路径来装载应用
  function performAppChanges() {}
}
