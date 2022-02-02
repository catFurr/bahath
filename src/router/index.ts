import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/index.vue";
import NotFound from "../views/not-found.vue";
import Callback from "@/components/callback.vue";

// import { authenticationGuard } from "@/services/authentication-guard";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/about.vue"),
    // beforeEnter: authenticationGuard,
  },
  {
    path: "/docs",
    component: () => import("@/views/docs/index.vue"),
  },
  // {
  //   path: "/dashboard",
  //   component: () => import("@/views/dashboard.vue"),
  // },
  {
    path: "/callback",
    name: "callback",
    component: Callback,
  },
  {
    path: "/:catchAll(.*)",
    name: "Not Found",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
