import { getAppChanges } from "../applications/app";
import { toBootStrapPromise } from "../lifecycles/bootstrap";
import { toLoadPromise } from "../lifecycles/load";
import { toMountPromise } from "../lifecycles/mount";
import { toUnmountPromise } from "../lifecycles/unmount";
import { started } from "../start";
import "./navigator-enents";

// 核心应用处理方法
export function reroute() {
  const {
    appsToLoad, // 获取要去加载的app
    appsToMount, // 获取要被挂载的
    appsToUnmount, // 获取要被卸载的
  } = getAppChanges();
  // console.log(appsToUnmount, appsToLoad, appsToMount);
  // 打印了两次loadApp...的原因: start方法调用时是同步的,但是加载流程是异步的
  if (started) {
    // app装载
    // console.log("调用start方法");
    return performAppChanges();
  } else {
    // 注册应用时需要预先加载
    // console.log("调用register");
    return loadApps();
  }
  // 预加载应用(获取bootstrap/mount/unmount方法放在app上)
  async function loadApps() {
    // (并行执行)
    let apps = await Promise.all(appsToLoad.map(toLoadPromise));
    // console.log(apps);
  }
  // 根据路径来装载应用
  async function performAppChanges() {
    // 1.卸载不需要的应用
    let toUnmountPromises = appsToUnmount.map(toUnmountPromise);
    // 2.加载需要的应用
    appsToLoad.map(async (app) => {
      // 将需要加载的应用拿到=>加载=>启动=>挂载
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

// 加载app1的时候,这个时候切换到了app2,这是app1就不需要加载了

// 这个流程是用于初始化操作的,我们还需要在路径切换时重新加载应用reroute
// 拦截路径切换操作--重写路由相关的方法
