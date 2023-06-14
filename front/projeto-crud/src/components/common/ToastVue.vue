<script setup>
const props = defineProps(["message"]);
</script>

<template>
  <div id="toast" class="show">{{ props.message }}</div>
</template>

<style scoped>
#toast {
  visibility: hidden;
  background-color: var(--color-background-dark);
  color: var(--color-text-light);
  min-width: 250px;
  margin-left: -125px;
  text-align: center;
  border-radius: 4px;
  padding: 1rem 3rem;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 50%;
}
#toast.show {
  visibility: visible;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 50%;
    opacity: 1;
  }
}

@keyframes fadeout {
  from {
    bottom: 50%;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>
