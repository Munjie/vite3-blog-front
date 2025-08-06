
// @ts-ignore
import App from "./App.vue";
import { createApp } from "vue";
// @ts-ignore
import router from "./router";
import { createPinia } from "pinia"; //引入pinia
import "./assets/css/iconFont/iconfont.css";
import "element-plus/dist/index.css"; // 引入样式
import "element-plus/theme-chalk/dark/css-vars.css";
// animate
import "animate.css";
// tailwind.css  https://www.tailwindcss.cn/docs
import "./styles/tailwind.css";


const app = createApp(App);
app.use(router).use(createPinia()).mount("#app");
