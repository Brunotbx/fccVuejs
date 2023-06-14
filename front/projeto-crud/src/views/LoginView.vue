<script setup>
import { reactive } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import axiosInstance from "../services/api";

const isAuth = useAuthStore();
const router = useRouter();

const user = reactive({
  identifier: "",
  password: "",
  error: false,
});

async function login() {
  try {
    const { data } = await axiosInstance.post("/auth/local", user);
    isAuth.setToken(data.jwt);
    isAuth.setUser(data.user);
    router.push("/dashboard");
    user.error = false;
  } catch (error) {
    user.error = true;
    throw new Error(error.response.data.error.message);
  }
}
</script>

<template>
  <div class="login">
    <form @submit.prevent="login" class="login__form">
      <img src="../assets/logo.png" alt="Fundação Carlos Chagas" />
      <input
        type="text"
        placeholder="Login"
        v-model="user.identifier"
        required
      />
      <input
        type="password"
        placeholder="Senha"
        v-model="user.password"
        required
      />
      <button type="submit" class="login__form-button">Logar-se</button>
      <span v-if="user.error" class="login__form-error">
        Credenciais inválidas, tente novamente...
      </span>
    </form>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

img {
  width: 150px;
}

.login__form {
  width: 400px;
  height: 300px;
  background-color: var(--color-background-light);
  border: 2px solid var(--color-brand);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  position: relative;
}

input {
  border: 1px solid var(--color-brand);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  outline-color: var(--color-brand);
}

.login__form-button {
  padding: 0.5rem 1rem;
  border: 2px solid var(--color-brand);
  border-radius: 4px;
  background-color: var(--color-brand);
  color: var(--color-text-light);
}

.login__form-button:hover {
  background-color: var(--color-background-light);
  color: var(--color-brand);
}

.login__form-error {
  font-size: 0.85rem;
  color: var(--color-brand);
  position: absolute;
  bottom: 10px;
}
</style>
