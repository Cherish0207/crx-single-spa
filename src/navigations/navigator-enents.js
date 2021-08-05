import { reroute } from "./reroute";

export const routingEventsListeningTo = ["hashchange", "popstate"];
const capturedEventListeners = {
  // 存储hashchang和popstate注册的方法
  // 后续挂载的事件先暂存起来
  hashchange: [],
  popstate: [],
};
function urlReroute() {
  reroute([], arguments); // 会根据路径重新加載不同的应用
}
window.addEventListener("hashchange", urlReroute);
window.addEventListener("popstate", urlReroute);

// 重写addEventListener方法
// 我们处理应用加载的逻辑是在最前面
const originalAddEventListener = window.addEventListener;
const originalRemoveEventListener = window.removeEventListener;

// 发布订阅
window.addEventListener = function (eventName, fn) {
  if (
    routingEventsListeningTo.indexOf(eventName) >= 0 &&
    !capturedEventListeners[eventName].some((listener) => listener == fn)
  ) {
    capturedEventListeners[eventName].push(fn);
    console.log(capturedEventListeners);
    return;
  }
  return originalAddEventListener.apply(this, arguments);
};
window.removeEventListener = function (eventName, listenerFn) {
  if (routingEventsListeningTo.indexOf(eventName) >= 0) {
    capturedEventListeners[eventName] = capturedEventListeners[
      eventName
    ].filter((fn) => fn !== listenerFn);
    return;
  }
  return originalRemoveEventListener.apply(this, arguments);
};
