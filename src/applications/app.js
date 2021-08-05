import { reroute } from "../navigations/reroute";
import { NOT_LOADED } from "./app.helper";
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
  reroute()// 加载应用
}
