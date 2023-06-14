import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import api from "@/services/api";
import externalApi from "../services/data";

export const useAuthStore = defineStore("auth", () => {
  const jwtToken = ref(sessionStorage.getItem("token"));
  const user = ref(JSON.parse(sessionStorage.getItem("user")));

  function setToken(jwtValue) {
    sessionStorage.setItem("token", jwtValue);
    jwtToken.value = jwtValue;
  }

  function setUser(userValue) {
    sessionStorage.setItem("user", JSON.stringify(userValue));
    user.value = userValue;
  }

  async function isValidToken() {
    try {
      const { data } = await api.get("/posts", {
        headers: {
          Authorization: "Bearer " + jwtToken.value,
        },
      });
      return data;
    } catch (error) {
      throw new Error("Token inválido!");
    }
  }

  function logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    jwtToken.value = "";
    user.value = "";
  }

  return {
    setToken,
    setUser,
    user,
    jwtToken,
    isValidToken,
    logout,
  };
});

export const useCrudClient = defineStore("crud", () => {
  const modalOpen = reactive({ open: false });
  const showToast = reactive({ open: false });

  let isEditActive = { id: "", status: true };

  const editValues = { data: null, isEdit: false };

  async function getUpdateClient(code) {
    try {
      const request = await externalApi.get("/Cliente/ListarPorId/" + code);
      const { data } = request;
      editValues.data = data;
      editValues.isEdit = true;
      modalOpen.open = true;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }

  async function deleteClient(code) {
    await externalApi.delete("/Cliente/Excluir/" + code);
  }

  function openModal() {
    modalOpen.open = true;
  }

  function closeModal() {
    modalOpen.open = false;
    editValues.data = null;
  }

  function showToastTimer() {
    showToast.open = true;
    setTimeout(function () {
      showToast.open = false;
    }, 3000);
  }

  return {
    getUpdateClient,
    deleteClient,
    isEditActive,
    editValues,
    modalOpen,
    openModal,
    closeModal,
    showToast,
    showToastTimer,
  };
});
