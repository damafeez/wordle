<script setup>
import Square from './Square.vue'

defineProps({
  row: Array,
})
</script>

<template>
  <Square
    :input="square.letter"
    :state="square.state"
    :key="i"
    v-for="(square, i) in row"
  />
</template>
