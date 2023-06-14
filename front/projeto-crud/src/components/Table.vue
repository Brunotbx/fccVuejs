<script setup>
import { ref, onMounted, computed } from "vue";
import { useCrudClient } from "../stores/auth";
import externalApi from "../services/data";
import moment from "moment";

const users = ref([]);
const selectedId = ref([]);

const props = defineProps(["filtro"]);

const { isEditActive } = useCrudClient();

onMounted(async () => {
  try {
    const request = await externalApi.get("/Cliente/Listar");
    const { data } = request;
    users.value = data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const filtroLowerCase = props.filtro.toLowerCase();
    return (
      user.nome.toLowerCase().includes(filtroLowerCase) ||
      user.cpf.toLowerCase().includes(filtroLowerCase)
    );
  });
});

const handleCheckboxChange = (clientId) => {
  selectedId.value = clientId === selectedId.value ? null : clientId;
  isEditActive.id = selectedId.value ? selectedId.value : "";
  isEditActive.status = false;
};
</script>

<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>CPF</th>
        <th>Nome</th>
        <th>RG</th>
        <th>Data Expedição</th>
        <th>Órgão Expedição</th>
        <th>UF</th>
        <th>Data de nascimento</th>
        <th>Sexo</th>
        <th>Estado Civil</th>
        <th>CEP</th>
        <th>Endereço</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="user in filteredUsers" :key="user.clienteId">
        <td>
          <input
            type="radio"
            :value="user.clienteId"
            :checked="user.clienteId === selectedId"
            @change="handleCheckboxChange(user.clienteId)"
          />
        </td>
        <td>{{ user.cpf }}</td>
        <td>{{ user.nome }}</td>
        <td>{{ user.rg }}</td>
        <td>{{ moment(user.dataExpedicao).format("DD-MM-YYYY") }}</td>
        <td>{{ user.orgaoExpedicao }}</td>
        <td>{{ user.uf }}</td>
        <td>{{ moment(user.dataNascimento).format("DD-MM-YYYY") }}</td>
        <td>{{ user.sexo }}</td>
        <td>{{ user.estadoCivil }}</td>
        <td>{{ user.endereco.cep }}</td>
        <td>
          {{ user.endereco.logradouro }}, {{ user.endereco.numero }},
          {{ user.endereco.bairro }}, {{ user.endereco.complemento }},
          {{ user.endereco.cidade }}, {{ user.endereco.uf }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
}

th {
  padding: 1rem;
  text-align: left;
  font-size: 0.875rem;
  background-color: var(--color-brand-secondary);
  color: var(--color-text-light);
}

td {
  border-top: 1px solid var(--color-brand-secondary);
  border-collapse: collapse;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  line-height: 1.6;
}
</style>
