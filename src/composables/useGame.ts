import { computed, ref } from 'vue'
import { toFrames, toMarks } from '../domain/frames'
import { maxPinsForNextRoll, scoresFromRolls } from '../domain/rules'
import type { Pins } from '../domain/types'

export function useGame() {
  // 단일 진실 공급원 - 던진 순서대로 쌓는 평탄 배열. 아래는 전부 파생 상태.
  const rolls = ref<Pins[]>([])

  const frames = computed(() => toFrames(rolls.value))
  const marks = computed(() => frames.value.flatMap((frame, i) => toMarks(frame, i === 9)))
  const maxPins = computed(() => maxPinsForNextRoll(rolls.value))
  const scores = computed(() => scoresFromRolls(rolls.value))

  function addRoll(pins: Pins) {
    rolls.value.push(pins)
  }

  function resetGame() {
    rolls.value = []
  }

  return { rolls, marks, maxPins, scores, addRoll, resetGame }
}
