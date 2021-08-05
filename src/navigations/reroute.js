import { getAppChanges } from "../applications/app";
import { toBootStrapPromise } from "../lifecycles/bootstrap";
import { toLoadPromise } from "../lifecycles/load";
import { toMountPromise } from "../lifecycles/mount";
import { toUnmountPromise } from "../lifecycles/unmount";
import { started } from "../start";

// 核心应用处理方法
export function reroute() {
  const {
    appsToLoad, // 获取要去加载的app
    appsToMount, // 获取要被挂载的
    appsToUnmount, // 获取要被卸载的
  } = getAppChanges();
  // console.log(appsToUnmount, appsToLoad, appsToMount);
  if (started) {
    // app装载
    console.log("调用start方法");
    return performAppChanges();
  } else {
    // 注册应用时需要预先加载
    console.log("调用register");
    return loadApps();
  }
  // 预加载应用(获取bootstrap/mount/unmount方法放在app上)
  async function loadApps() {
    // (并行执行)
    let apps = await Promise.all(appsToLoad.map(toLoadPromise));
    console.log(apps);
  }
  // 根据路径来装载应用
  async function performAppChanges() {
    // 1.卸载不需要的应用
    let toUnmountPromises = appsToUnmount.map(toUnmountPromise);
    // 2.加载需要的应用
    appsToLoad.map(async (app) => {
      app = await toLoadPromise(app);
      app = await toBootStrapPromise(app);
      return toMountPromise(app);
    });
    appsToMount.map(async (app) => {
      app = await toBootStrapPromise(app);
      return toMountPromise(app);
    });
  }
}
// 卸载和装载可以并行执行
