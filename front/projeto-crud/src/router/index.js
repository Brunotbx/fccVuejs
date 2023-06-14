import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "loginPage",
      component: LoginView,
    },
    {
      path: "/dashboard",
      name: "homePage",
      component: () => import("../views/DashboardView.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/Error.vue"),
    },
  ],
});

router.beforeEach(routes);

export default router;
