//导入 进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/components/Layout/index.vue";

NProgress.configure({ showSpinner: false });
const routes = [
  {
    path: "/",
    name: "Layout",
    meta: {
      name: "Layout",
    },
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        meta: {
          name: "首页",
          keepAlive: true,
        },
        component: () => import("@/views/home/home.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

// 不滚动到顶部的路由名单
const whiteList = ["/message/list", "/home"];

router.afterEach((to) => {
  // 切换就滚动到顶部
  if (!whiteList.includes(to.path)) {
    window.scrollTo({
      top: 0,
    });
  }

  NProgress.done();
});

export default router;
