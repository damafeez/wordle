<script setup>
import { computed } from 'vue'
import Row from './Row.vue'

const props = defineProps({
  rows: Array,
})
const numColumns = computed(() => props.rows[0]?.length)
</script>

<template>
  <div class="board">
    <Row :row="row" :key="i" v-for="(row, i) in rows" />
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(v-bind(numColumns), 1fr);
  gap: 0.5rem;
}
</style>
