import {
  LOADING_SOURCE_CODE,
  NOT_BOOTSTRAPPED,
} from "../applications/app.helper";

export async function toLoadPromise(app) {
  app.status = LOADING_SOURCE_CODE;
  let { bootstrap, mount, unmount } = await app.loadApp(app.customProps);
  app.status = NOT_BOOTSTRAPPED;
  // 我希望将多个 promise组合在一起 --> compose
  app.bootstrap = flattenFnArray(bootstrap);
  app.mount = flattenFnArray(mount);
  app.unmount = flattenFnArray(unmount);
  return app;
}

// 把异步函数数组拍平成大的promise 多个方法组合成一个方法(串行执行)
function flattenFnArray(fns) {
  fns = Array.isArray(fns) ? fns : [fns];
  // 通过 promise链来链式调用
  return (props) =>
    fns.reduce((p, fn) => p.then(() => fn(props)), Promise.resolve());
}
