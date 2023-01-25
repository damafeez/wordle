<script setup>
import { reactive, ref, computed, nextTick, onBeforeUnmount } from 'vue'
import Board from './components/Board.vue'
import Keyboard from './components/Keyboard.vue'
import words from './words'
import { computeRowState, isAlphabet } from './utils'

const correctWord = words[Math.floor(Math.random() * words.length)]

const numColumns = correctWord.length
const numRows = 6

const inputs = reactive(Array.from({ length: numRows }, () => ''))
// currentRow can be 1 more than available rows
// currentRow, apart from denoting the 'current row', also denotes that previous rows have been checked
const currentRow = ref(0)
const gameState = ref('playing')

const rows = computed(() =>
  inputs.map((input, i) =>
    computeRowState(correctWord, input, currentRow.value > i)
  )
)

const onKeyDown = (e) => {
  // when game ends or special input was entered, disallow input
  if (gameState.value !== 'playing' || e.ctrlKey || e.metaKey || e.shiftKey) {
    return
  }
  const inputLength = inputs[currentRow.value].length

  // alphabet and row has available square space
  if (isAlphabet(e.key) && inputLength < numColumns) {
    inputs[currentRow.value] += e.key.toLowerCase()
  } else if (inputLength === numColumns && e.key === 'Enter') {
    if (words.includes(inputs[currentRow.value])) {
      if (inputs[currentRow.value] === correctWord) {
        gameState.value = 'won'
        nextTick().then(() => alert("Hurray! You're a winner."))
      }

      currentRow.value++
      if (currentRow.value >= numRows && gameState.value === 'playing') {
        gameState.value = 'lost'
        alert('You lost :(')
      }
    } else alert('Word not found.')
  } else if (inputLength && e.key === 'Backspace') {
    inputs[currentRow.value] = inputs[currentRow.value].slice(0, -1)
  }
}

document.addEventListener('keydown', onKeyDown)
onBeforeUnmount(() => document.removeEventListener('keydown', onKeyDown))
</script>

<template>
  <main>
    <h1>WORDLE</h1>
    <Board :rows="rows" />
    <Keyboard @keydown="onKeyDown" :rows="rows" />
  </main>
</template>

<style scoped>
main {
  padding-left: min(10rem, 10%);
  padding-right: min(10rem, 10%);
  max-width: 900px;
  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
}

main .board {
  margin: 2rem 0 5rem;
}
</style>
