import { reroute } from "../navigations/reroute";
import {
  LOADING_SOURCE_CODE,
  MOUNTED,
  NOT_BOOTSTRAPPED,
  NOT_LOADED,
  NOT_MOUNTED,
  shouldBeActive,
  SKIP_BECAUSE_BROKEN,
} from "./app.helper";
const apps = []; // 用来存放所有的应用
/**
 *
 * @param {*} appName 应用名字
 * @param {*} loadApp 加载的应用
 * @param {*} activeWhen 当激活时会调用loadApp方法
 * @param {*} customProps 自定义属性,可用于父子应用通信
 */
export function registerApplication(appName, loadApp, activeWhen, customProps) {
  apps.push({
    name: appName,
    loadApp,
    activeWhen,
    customProps,
    status: NOT_LOADED, // 默认应用为未加载
  });
  // 这里就将应用注册好了
  reroute(); // 加载应用
}
export function getAppChanges() {
  const appsToUnmount = []; // 要被卸载的app
  const appsToLoad = []; // 要加载的app
  const appsToMount = []; // 要挂载的app
  apps.forEach((app) => {
    const appShouldBeActive =
      app.status !== SKIP_BECAUSE_BROKEN && shouldBeActive(app);
    switch (app.status) {
      case NOT_LOADED:
      case LOADING_SOURCE_CODE:
        if (appShouldBeActive) {
          appsToLoad.push(app);
        }
        break;
      case NOT_BOOTSTRAPPED:
      case NOT_MOUNTED:
        if (appShouldBeActive) {
          appsToMount.push(app);
        }
        break;
      case MOUNTED:
        if (!appShouldBeActive) {
          appsToUnmount.push(app);
        }
    }
  });
  return { appsToUnmount, appsToLoad, appsToMount };
}
