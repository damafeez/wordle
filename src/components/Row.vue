<script setup>
import { computed } from 'vue'
import Square from './Square.vue'

const props = defineProps({
  input: {
    default: '',
  },
  correctWord: String,
  shouldCheck: {
    default: false,
  },
})

const squareStates = computed(() => {
  const word = [...props.correctWord]
  const inputArr = Array.from({ length: word.length }, (_, i) => props.input[i])

  return inputArr.map((letter, index) => {
    if (!letter) return 'empty'
    if (!props.shouldCheck) return 'neutral'
    if (letter === word[index]) {
      word[props.index] = undefined
      return 'correct'
    }

    const indexInCorrectWord = word.findIndex(
      (actualLetter, i) =>
        actualLetter === letter && inputArr[i] !== actualLetter
    )
    if (indexInCorrectWord > -1) {
      word[indexInCorrectWord] = undefined
      return 'found'
    }

    return 'wrong'
  })
})
</script>

<template>
  <Square
    :input="input[i]"
    :state="state"
    :key="i"
    v-for="(state, i) in squareStates"
  />
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(v-bind(columns), 1fr);
  gap: 0.5rem;
}
</style>
