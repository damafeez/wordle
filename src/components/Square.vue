<script setup>
import { computed } from 'vue'

const props = defineProps({
  input: {
    default: '',
  },
  correctWord: String,
  index: Number,
  shouldValidate: {
    default: false,
  },
})

const state = computed(() => {
  if (!props.input) return 'empty'
  if (!props.shouldValidate) return 'neutral'
  if (props.input === props.correctWord[props.index]) return 'correct'
  if (props.correctWord.includes(props.input)) return 'found'

  return 'wrong'
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
.square.empty {
  border: 2px solid #dee1e9;
}
.square.neutral {
  border: 2px solid #a7adc0;
}
.square.wrong {
  background: #a4aec4;
  color: white;
}
.square.found {
  background: #f3c237;
  color: white;
}
.square.correct {
  background: #79b851;
  color: white;
}
</style>
