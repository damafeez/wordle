<script setup>
import { onBeforeUnmount, reactive, ref, watch } from 'vue'
import Row from './Row.vue'

const correctWord = 'apple'

const columns = correctWord.length
const rows = 6

const inputs = reactive(Array.from({ length: rows }, () => ''))
const currentRow = ref(0)
const shouldValidate = ref(false)

const onKeyPress = ({ key, which }) => {
  if (which >= 65 && which <= 90 && inputs[currentRow.value].length < columns) {
    inputs[currentRow.value] += key
  } else if (inputs[currentRow.value].length === columns && key === 'Enter') {
    shouldValidate.value = true
    if (currentRow.value < rows - 1) currentRow.value++
  }
}

watch(currentRow, () => (shouldValidate.value = false))

document.addEventListener('keydown', onKeyPress)
onBeforeUnmount(() => document.removeEventListener('keydown', onKeyPress))
</script>

<template>
  <div class="board">
    <Row
      :input="inputs[row]"
      :correct-word="correctWord"
      :should-validate="
        currentRow > row || (currentRow === row && shouldValidate)
      "
      :key="row"
      v-for="(_, row) in rows"
    />
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(v-bind(columns), 1fr);
  gap: 0.5rem;
}
</style>
