<!-- eslint-disable prettier/prettier -->
<script setup>
import { nextTick, onBeforeUnmount, reactive, ref } from 'vue'
import words from '../words'
import Row from './Row.vue'
import Keyboard from './Keyboard.vue'

const correctWord = words[Math.floor(Math.random() * words.length)]

const numColumns = correctWord.length
const numRows = 6

const inputs = reactive(Array.from({ length: numRows }, () => ''))
// currentRow can be 1 more than available rows
// currentRow, apart from denoting the 'current row', also denotes that previous rows have been checked
const currentRow = ref(0)
const won = ref(false)

const onKeyDown = (e) => {
  const { key, which } = e
  // won or no more row space or special input, disallow input
  if (
    won.value ||
    currentRow.value >= numRows ||
    e.ctrlKey ||
    e.metaKey ||
    e.shiftKey
  ) {
    return
  }
  const inputLength = inputs[currentRow.value].length

  // alphabet and row has available square space
  if (which >= 65 && which <= 90 && inputLength < numColumns) {
    inputs[currentRow.value] += key
  } else if (inputLength === numColumns && key === 'Enter') {
    if (words.includes(inputs[currentRow.value])) {
      if (inputs[currentRow.value] === correctWord) {
        won.value = true
        nextTick().then(() => alert("Hurray! You're a winner."))
      }

      currentRow.value++
    } else alert('Word not found.')
  } else if (inputLength && key === 'Backspace') {
    inputs[currentRow.value] = inputs[currentRow.value].slice(0, -1)
  }
}

document.addEventListener('keydown', onKeyDown)
onBeforeUnmount(() => document.removeEventListener('keydown', onKeyDown))
</script>

<template>
  <div class="board">
    <Row
      :input="inputs[row]"
      :correct-word="correctWord"
      :should-check="currentRow > row"
      :key="row"
      v-for="(_, row) in numRows"
    />
  </div>

  <Keyboard />
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(v-bind(numColumns), 1fr);
  gap: 0.5rem;
}
</style>
