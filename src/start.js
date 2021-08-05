import { reroute } from "./navigations/reroute";

export let started = false;
export function start() {
  started = true;
  reroute();
  // 需要挂载应用
  // 除了去加載应用还需要去挂载应用
}
