先制定使用方法,再去写 single-spa 的源码

- 生命周期
  - 正如 vue 应用有一系列的生命周期,应用页有刚开始---到挂载完成---到最后应用销毁这样一些状态
  - single-spa 主要维护应用从未加载,到加载完毕,到应用销毁,这一系列的状态

(维护应用所有的状态--状态机的概念)

整个 single-spa 其实就是个状态机,可以学到很多异步处理、封装代码的特点

qiankun 源码