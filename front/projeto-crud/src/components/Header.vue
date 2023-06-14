<script setup>
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import ButtonVue from "./common/ButtonVue.vue";

const isAuth = useAuthStore();
const router = useRouter();

function logout() {
  isAuth.logout();
  router.push("/");
}
</script>

<template>
  <header>
    <img
      src="../assets/logo.png"
      alt="Fundação Carlos Chagas"
      class="header__logo"
    />
    <ButtonVue
      @click="logout"
      class="header__button"
      children="Sair do sistema"
    />
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 5rem;
  border-bottom: 1px solid var(--shadow-smooth);
  box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.1);
}

.header__logo {
  width: 150px;
}
</style>
