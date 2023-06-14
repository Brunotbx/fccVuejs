<script setup>
import ButtonVue from "../components/common/ButtonVue.vue";
import Table from "../components/Table.vue";
import ToastVue from "../components/common/ToastVue.vue";
import Header from "../components/Header.vue";
import SavedModal from "../components/Modal.vue";
import { postClient, putClient } from "../services/CRUD/methods";
import { useCrudClient } from "../stores/auth";
import { ref } from "vue";

defineEmits("closeModal", "save", "edit");

const {
  isEditActive,
  getUpdateClient,
  modalOpen,
  closeModal,
  openModal,
  deleteClient,
  showToast,
  showToastTimer,
} = useCrudClient();

const filterText = ref("");

function refetch() {
  showToastTimer();
  setTimeout(function () {
    location.reload();
  }, 3000);
}

function handleSave(e) {
  postClient(e).then(refetch);
}

async function getUpdate() {
  await getUpdateClient(isEditActive.id);
}

function updateClient(e) {
  putClient(e).then(refetch);
}

function deleteRegister() {
  deleteClient(isEditActive.id).then(refetch);
}
</script>

<template>
  <Header />
  <div class="dashboard__header">
    <div class="dashboard__header-search">
      <label for="search">Filtrar resultados:</label>
      <input
        type="text"
        v-model="filterText"
        id="search"
        title="Aplique um filtro no resultado"
      />
    </div>
    <div class="dashboard__header-buttons">
      <ButtonVue
        title="Adicionar um novo cliente"
        children="Novo cliente"
        @click="openModal"
      />
      <ButtonVue
        title="Editar cliente existente"
        children="Editar cliente"
        @click="getUpdate"
        :disabled="isEditActive.status"
      />
      <ButtonVue
        title="Excluir cliente existente"
        children="Excluir cliente"
        @click="deleteRegister"
        :isDisabled="isEditActive.status"
      />
    </div>
  </div>

  <div class="dashboard__table">
    <Table :filtro="filterText" />
  </div>

  <div v-if="modalOpen.open">
    <SavedModal
      @closeModal="closeModal"
      @save="handleSave"
      @edit="updateClient"
      :clientId="isEditActive.id"
    />
  </div>

  <div v-if="showToast.open">
    <ToastVue message="Ação realizada com sucesso!" />
  </div>
</template>

<style scoped>
.dashboard__header {
  display: flex;
  justify-content: space-between;
  padding: 1rem 5rem;
}

.dashboard__header-search {
  color: var(--color-text-dark);
}

.dashboard__header-search input {
  height: 100%;
  padding: 0 1rem;
  margin-left: 1rem;
  border: 1px solid var(--color-text-dark);
  border-radius: 4px;
}

.dashboard__header-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.dashboard__table {
  max-width: 90vw;
  max-height: 70vh;
  overflow: auto;
  margin: 0 auto;
  border-collapse: collapse;
  border-radius: 4px;
}
</style>
