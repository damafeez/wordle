<script setup>
import Board from './components/Board.vue'
</script>

<template>
  <main>
    <h1>Wordle</h1>
    <Board />
  </main>
</template>

<style scoped>
main {
  padding-left: min(10rem, 10%);
  padding-right: min(10rem, 10%);
  max-width: 800px;
  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
