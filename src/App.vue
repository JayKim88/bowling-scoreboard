<script setup lang="ts">
import { computed, ref } from 'vue'
import { toFrames, toMarks } from './domain/frames'
import { maxPinsForNextRoll } from './domain/rules'

const pinOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
    <table class="scoreboard">
      <!-- 프레임 -->
      <thead>
        <tr>
          <th v-for="n in 10" :key="n" :colspan="n === 10 ? 3 : 2">{{ n }}</th>
        </tr>
      </thead>

      <tbody>
        <!-- 투구 -->
        <tr>
          <td v-for="(mark, mi) in marks" :key="mi" class="mark">
            {{ mark }}
          </td>
        </tr>
        <!-- 누적합 -->
        <tr>
          <td v-for="n in 10" :key="n" :colspan="n === 10 ? 3 : 2" class="score"></td>
        </tr>
      </tbody>
    </table>
    <div class="pins">
      <button
        v-for="pins in pinOptions"
        :key="pins"
        type="button"
        @click="addRoll(pins)"
        :disabled="maxPins < pins"
      >
        {{ pins }}
      </button>
    </div>
  </main>
</template>
