<script setup lang="ts">
import ScoreBoard from './components/ScoreBoard.vue'
import PinButtons from './components/PinButtons.vue'
import { useGame } from './composables/useGame.ts'

const { marks, scores, maxPins, addRoll, resetGame } = useGame()
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
