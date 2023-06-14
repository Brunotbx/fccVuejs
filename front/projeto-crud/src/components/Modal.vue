<script setup>
import moment from "moment";
import { reactive, onMounted } from "vue";
import { useCrudClient } from "../stores/auth";
import ButtonVue from "./common/ButtonVue.vue";

const props = defineProps(["clientId"]);

const { editValues } = useCrudClient();

const inputsRender = {
  personalInfos: [
    {
      label: "Cpf",
      id: "cpf",
      type: "text",
      validator: validateCpf,
    },
    { label: "Nome", id: "nome", type: "text" },
    { label: "Rg", id: "rg", type: "text" },
    { label: "Data Expedição", id: "dataExpedicao", type: "date" },
    { label: "Orgão Expedição", id: "orgaoExpedicao", type: "text" },
    { label: "UF", id: "uf", type: "text" },
    { label: "Data nascimento", id: "dataNascimento", type: "date" },
    { label: "Sexo", id: "sexo", type: "text" },
    { label: "Estado Civil", id: "estadoCivil", type: "text" },
  ],
  address: [
    { label: "CEP", id: "cep", type: "text" },
    { label: "Logradouro", id: "logradouro", type: "text" },
    { label: "Número", id: "numero", type: "text" },
    { label: "Complemento", id: "complemento", type: "text" },
    { label: "Bairro", id: "bairro", type: "text" },
    { label: "Cidade", id: "cidade", type: "text" },
    { label: "Estado", id: "uf", type: "text" },
  ],
};

const formData = reactive({
  clienteId: 0,
  cpf: "",
  nome: "",
  rg: "",
  dataExpedicao: "",
  orgaoExpedicao: "",
  uf: "",
  dataNascimento: "",
  sexo: "",
  estadoCivil: "",
  endereco: {
    enderecoId: 0,
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
  },
});

function validateCpf(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }
  const digits = cpf.split("").map(Number);
  const calculateDigit = (multiplier) =>
    (11 -
      (digits
        .slice(0, multiplier)
        .reverse()
        .reduce((sum, digit, index) => sum + digit * (index + 2), 0) %
        11)) %
    10;
  return digits[9] === calculateDigit(9) && digits[10] === calculateDigit(10);
}

onMounted(() => {
  if (editValues.data !== null) {
    formData.clienteId = editValues.data.clienteId;
    formData.cpf = editValues.data.cpf;
    formData.nome = editValues.data.nome;
    formData.rg = editValues.data.rg;
    formData.dataExpedicao = moment(editValues.data.dataExpedicao).format(
      "YYYY-MM-DD"
    );
    formData.orgaoExpedicao = editValues.data.orgaoExpedicao;
    formData.uf = editValues.data.uf;
    formData.dataNascimento = moment(editValues.data.dataNascimento).format(
      "YYYY-MM-DD"
    );
    formData.sexo = editValues.data.sexo;
    formData.estadoCivil = editValues.data.estadoCivil;
    formData.endereco.enderecoId = editValues.data.endereco.enderecoId;
    formData.endereco.cep = editValues.data.endereco.cep;
    formData.endereco.logradouro = editValues.data.endereco.logradouro;
    formData.endereco.numero = editValues.data.endereco.numero;
    formData.endereco.complemento = editValues.data.endereco.complemento;
    formData.endereco.bairro = editValues.data.endereco.bairro;
    formData.endereco.cidade = editValues.data.endereco.cidade;
    formData.endereco.uf = editValues.data.endereco.uf;
  }
});
</script>

<template>
  <div class="modal__overlay">
    <form
      @submit.prevent="$emit(editValues.isEdit ? 'edit' : 'save', formData)"
      class="modal"
    >
      <h3>Cadastro</h3>
      <div class="modal__form">
        <div v-for="input in inputsRender.personalInfos">
          <label :for="input.id">{{ input.label }}</label>
          <input
            required
            :type="input.type"
            :id="input.id"
            v-model="formData[input.id]"
            :class="{
              invalid: input.validator && !input.validator(formData[input.id]),
            }"
          />
          <span v-if="formData.cpf.length >= 11">
            <p
              v-if="input.validator && !input.validator(formData[input.id])"
              class="error"
            >
              CPF inválido
            </p>
          </span>
        </div>
        <div v-for="input in inputsRender.address">
          <label :for="input.id">{{ input.label }}</label>
          <input
            required
            :type="input.type"
            :id="input.id"
            v-model="formData.endereco[input.id]"
          />
        </div>
      </div>

      <div class="modal__form-actions">
        <ButtonVue children="Salvar" v-show="!editValues.isEdit" />
        <ButtonVue children="Atualizar" v-show="editValues.isEdit" />
        <ButtonVue children="Cancelar" @click="$emit('closeModal')" />
      </div>
    </form>
  </div>
</template>

<style scoped>
.modal__overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: var(--shadow);
}

.modal {
  background-color: white;
  color: #222;
  height: 70vh;
  width: 700px;
  margin-top: 10%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.85rem;
  text-align: center;
  border-radius: 4px;
}

.modal__form {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  padding: 2rem 3rem;
}

.modal__form div {
  display: flex;
  flex-direction: column;
}

.modal__form input {
  padding: 0.2rem 0.5rem;
}

.modal__form-actions {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding-bottom: 1rem;
}

.error {
  font-size: 0.5rem;
  color: red;
  position: absolute;
}
</style>
