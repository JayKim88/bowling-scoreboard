<script setup lang="ts">
import type { Mark } from '../domain/frames'

defineProps<{ marks: Mark[] }>()
</script>

<template>
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
</template>

<style scoped>
.scoreboard {
  border-collapse: collapse;
}

.scoreboard th,
.scoreboard td {
  border: 1px solid black;
  text-align: center;
}

.scoreboard th {
  padding: 4px 8px;
  background: #fefaf3;
  font-weight: normal;
}

.mark {
  width: 32px;
  height: 32px;
}

.score {
  height: 32px;
  font-weight: bold;
}
</style>
