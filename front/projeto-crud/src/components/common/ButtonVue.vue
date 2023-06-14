<script setup>
const props = defineProps(["children", "isDisabled", "title"]);
</script>

<template>
  <button :disabled="props.isDisabled" :title="props.title">
    {{ props.children }}
  </button>
</template>

<style scoped>
button {
  padding: 0.5rem 1rem;
  border: 2px solid var(--color-brand);
  border-radius: 4px;
  background-color: var(--color-brand);
  color: var(--color-text-light);
  cursor: pointer;
}

button:hover:not([disabled]) {
  background-color: var(--color-background-light);
  color: var(--color-brand);
}

button:disabled {
  background-color: var(--disabled-default);
  border: 2px solid transparent;
  cursor: not-allowed;
}
</style>
