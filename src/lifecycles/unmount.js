import { MOUNTED, NOT_MOUNTED, UNMOUNTING } from "../applications/app.helper";

export async function toUnmountPromise(app) {
  if (app.status != MOUNTED) return app;
  app.status = UNMOUNTING;
  await app.unmount(app);
  app.status = NOT_MOUNTED;
  return app;
}
