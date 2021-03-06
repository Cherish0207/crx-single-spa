import serve from "rollup-plugin-serve";
// rollup可以帮我们打包es6的模块化语法
export default {
  input: "./src/single-spa.js",
  output: {
    file: "./lib/umd/single-spa.js",
    format: "umd",
    name: "singleSpa",
    sourcemap: true,
  },
  plugins: [
    serve({
      open: true,
      openPage: "/index.html",
      contentBase: "", // 要求contentBase不能为undefined
      port: 3000,
    }),
  ],
};
