<script setup>
defineProps({
  input: {
    default: '',
  },
  state: String,
})
</script>

<template>
  <div class="square" :class="state">{{ input }}</div>
</template>

<style scoped>
.square {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;

  background: #fbfcff;
  color: #393e4c;
}
</style>
