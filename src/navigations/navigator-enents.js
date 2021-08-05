import { reroute } from "./reroute";

export const routingEventsListeningTo = ["hashchange", "popstate"];
const capturedEventListeners = {
  // 存储hashchang和popstate注册的方法
  // 后续挂载的事件先暂存起来
  hashchange: [],
  popstate: [], // 当应用切换完成后可以调用
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

// 如果是hash路由,hash变化时可以切换
// 如果是浏览器路由,浏览器路由是h5 api,切换时不会触发popstate
function patchedUpdateState(updateState, methodName) {
  return function () {
    const urlBefore = window.location.href;
    const result = updateState.apply(this, arguments);
    const urlAfter = window.location.href;
    if (urlBefore !== urlAfter) {
      // 重新加载应用传入事件源
      urlReroute(new PopStateEvent("popstate")); // 构建一个popstate事件源
    }
    return result;
  };
}
// 重写pushState 和 repalceState方法
window.history.pushState = patchedUpdateState(
  window.history.pushState,
  "pushState"
);
window.history.replaceState = patchedUpdateState(
  window.history.replaceState,
  "replaceState"
);

// 在子应用加载完毕后调用此方法，执行拦截的逻辑（保证子应用加载完后执行）
export function callCapturedEventListeners(eventArguments) {
  if (eventArguments) {
    const eventType = eventArguments[0].type;
    if (routingEventsListeningTo.indexOf(eventType) >= 0) {
      capturedEventListeners[eventType].forEach((listener) => {
        listener.apply(this, eventArguments);
      });
    }
  }
}
