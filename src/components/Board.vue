<script setup>
import { onBeforeUnmount, reactive, ref } from 'vue'
import Row from './Row.vue'

const correctWord = 'apple'

const numColumns = correctWord.length
const numRows = 6

const inputs = reactive(Array.from({ length: numRows }, () => ''))
// currentRow can be 1 more than available rows
// currentRow, apart from denoting the 'current row', also denotes that previous rows have been checked
const currentRow = ref(0)

const onKeyPress = ({ key, which }) => {
  // no more row space, disallow input
  if (currentRow.value >= numRows) return
  const inputLength = inputs[currentRow.value].length

  // alphabet and row has available square space
  if (which >= 65 && which <= 90 && inputLength < numColumns) {
    inputs[currentRow.value] += key
  } else if (inputLength === numColumns && key === 'Enter') {
    currentRow.value++
  }
}

document.addEventListener('keydown', onKeyPress)
onBeforeUnmount(() => document.removeEventListener('keydown', onKeyPress))
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
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(v-bind(numColumns), 1fr);
  gap: 0.5rem;
}
</style>
