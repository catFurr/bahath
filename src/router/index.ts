import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "@/views/index.vue";
import ErrorPage from "../views/error.vue";

// import { authenticationGuard } from "@/services/authentication-guard";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/docs",
    component: () => import("@/views/docs/index.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("@/views/dashboard.vue"),
  },
  {
    path: "/:code/:branch",
    component: () => import("@/views/code.vue"),
  },
  {
    // same as above, but for entry branches
    path: "/:code",
    component: () => import("@/views/code.vue"),
  },
  {
    path: "/coffee",
    component: () => import("@/views/coffee.vue"),
  },
  {
    path: "/error",
    component: ErrorPage,
  },
  {
    path: "/:catchAll(.*)",
    name: "Not Found",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
