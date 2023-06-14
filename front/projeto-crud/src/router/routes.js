import { useAuthStore } from "@/stores/auth.js";

export default async function routes(to, from, next) {
  if (to.meta?.auth) {
    const auth = useAuthStore();
    if (auth.jwtToken && auth.user) {
      const isAuthenticated = await auth.isValidToken();
      if (isAuthenticated) {
        next();
      } else next({ name: "loginPage" });
    } else {
      next({ name: "loginPage" });
    }
  } else {
    next();
  }
}
