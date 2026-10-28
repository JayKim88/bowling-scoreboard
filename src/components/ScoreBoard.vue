<script setup lang="ts">
import type { Mark } from '../domain/frames'

defineProps<{ marks: Mark[]; scores: number[] }>()
</script>

<template>
  <table class="scoreboard">
    <!-- 프레임 -->
    <thead>
      <tr>
        <th v-for="n in 10" :key="n" :colspan="n === 10 ? 3 : 2">{{ n }}</th>
        <th>Total Score</th>
      </tr>
    </thead>

    <tbody>
      <!-- 투구 -->
      <tr>
        <td v-for="(mark, mi) in marks" :key="mi" class="mark">
          {{ mark }}
        </td>
        <td rowspan="3" class="totalscore">{{ scores[9] }}</td>
      </tr>
      <!-- 누적합 -->
      <tr>
        <td v-for="(score, si) in scores" :key="si" :colspan="si === 9 ? 3 : 2" class="score">
          {{ score }}
        </td>
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
  width: 32px;
  font-weight: bold;
}

.totalscore {
  font-size: 24px;
  font-weight: bold;
}
</style>
