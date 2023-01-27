<script setup>
import { computed } from 'vue'
import { computeKeyboardState } from '../utils'

const keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Backspace', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter'],
]

const props = defineProps({
  rows: Array,
})

const emit = defineEmits(['keydown'])
const handleButtonClick = (key) => {
  emit('keydown', new KeyboardEvent('keydown', { key }))
}

const keyboardState = computed(() => computeKeyboardState(props.rows))
</script>

<template>
  <div class="keyboard">
    <div class="row" v-for="(keyList, i) in keys" :key="i">
      <button
        @click="handleButtonClick(key)"
        :class="[key, keyboardState[key]]"
        v-for="key in keyList"
        :key="key"
      >
        {{ key === 'Backspace' ? '⌫' : key }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.keyboard {
  width: 100%;
}
.row {
  display: flex;
  gap: min(1.5%, 0.5rem);
  justify-content: space-between;
}
.row:not(:last-child) {
  margin-bottom: 0.5rem;
}

.row:nth-child(2) button {
  flex: 1 1 4rem;
}

button {
  flex: 1 1 3.5rem;
  height: 3rem;
  border-radius: 4px;
  text-transform: capitalize;
  font-weight: bold;
  background: #dce1ed;
  color: #414a5d;

  display: flex;
  justify-content: center;
  align-items: center;
}
button:is(.a, .l, .Backspace, .Enter) {
  flex-grow: 5;
}
.Backspace {
  font-size: 1.1rem;
}
</style>
