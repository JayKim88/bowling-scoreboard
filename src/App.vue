<script setup lang="ts">
import { computed, ref } from 'vue'
import ScoreBoard from './components/ScoreBoard.vue'
import PinButtons from './components/PinButtons.vue'
import { toFrames, toMarks } from './domain/frames'
import { maxPinsForNextRoll } from './domain/rules'

const rolls = ref<number[]>([])

const frames = computed(() => toFrames(rolls.value))
const marks = computed(() => frames.value.flatMap((frame, i) => toMarks(frame, i === 9)))
const maxPins = computed(() => maxPinsForNextRoll(rolls.value))

function addRoll(pins: number) {
  rolls.value.push(pins)
}
</script>

<template>
  <main>
    <h1>볼링 스코어보드</h1>
    <ScoreBoard :marks="marks" />
    <PinButtons :max-pins="maxPins" @roll="addRoll" />
  </main>
</template>
