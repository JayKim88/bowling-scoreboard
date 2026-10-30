<script setup lang="ts">
import { computed, ref } from 'vue'
import ScoreBoard from './components/ScoreBoard.vue'
import PinButtons from './components/PinButtons.vue'
import { toFrames, toMarks } from './domain/frames'
import { scoresFromRolls, maxPinsForNextRoll } from './domain/rules'

const rolls = ref<number[]>([])
const frames = computed(() => toFrames(rolls.value))
const marks = computed(() => frames.value.flatMap((frame, i) => toMarks(frame, i === 9)))
const maxPins = computed(() => maxPinsForNextRoll(rolls.value))
const scores = computed(() => scoresFromRolls(rolls.value))

function addRoll(pins: number) {
  rolls.value.push(pins)
}

function resetGame() {
  rolls.value = []
}
</script>

<template>
  <main>
    <h1>볼링 스코어보드</h1>
    <div class="content">
      <ScoreBoard :marks="marks" :scores="scores" />
      <div class="toolbar">
        <PinButtons :max-pins="maxPins" @roll="addRoll" />
        <button class="resetbtn" @click="resetGame">reset</button>
      </div>
    </div>
  </main>
</template>

<style>
.content {
  display: flex;
  flex-direction: column;
  width: fit-content;
}
.toolbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;
  flex-wrap: wrap;
}
.resetbtn {
  height: 36px;
}
</style>
