<script setup lang="ts">
const frames = [
  ['9', '/'],
  ['', 'X'],
  ['', 'X'],
  ['7', '2'],
  ['-', '/'],
  ['6', '2'],
  ['', 'X'],
  ['4', '-'],
  ['', 'X'],
  ['X', '7', '/'],
]

const scores = [10, 24, 34, 58, 83, 90, 110, 123, 142, 161]
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
        <!-- 마크 -->
        <tr>
          <template v-for="(frame, fi) in frames" :key="fi">
            <td v-for="(mark, mi) in frame" :key="mi" class="mark">{{ mark }}</td>
          </template>
        </tr>
        <!-- 누적합 -->
        <tr>
          <td v-for="(score, si) in scores" :key="si" :colspan="si === 9 ? 3 : 2" class="score">
            {{ score }}
          </td>
        </tr>
      </tbody>
    </table>

    <p>Total {{ scores[scores.length - 1] }}</p>

    <div class="pins">
      <button v-for="n in 11" :key="n" type="button">{{ n - 1 }}</button>
    </div>
  </main>
</template>
