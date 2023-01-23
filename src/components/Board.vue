<script setup>
import { reactive } from 'vue'
import Square from './Square.vue'

const correctWord = 'apple'
const shouldValidate = true

const columns = correctWord.length
const rows = 6

const inputs = reactive(Array.from({ length: rows }, () => ''))

// test
inputs[0] = 'lemon'
inputs[1] = 'axles'
</script>

<template>
  <div class="board">
    <template :key="i" v-for="(_, i) in rows">
      <Square
        :input="inputs[i][j]"
        :index="j"
        :correct-word="correctWord"
        :should-validate="shouldValidate"
        :key="`${j} ${i}`"
        v-for="(_, j) in columns"
      />
    </template>
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(v-bind(columns), 1fr);
  gap: 0.5rem;
}
</style>
