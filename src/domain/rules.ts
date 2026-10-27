import { toFrames, type Pins } from './frames'

export function maxPinsForNextRoll(rolls: Pins[]) {
  // 1 ~ 9 프레임
  const frames = toFrames(rolls)

  for (let i = 0; i < 9; i++) {
    const [first, second] = frames[i] ?? []

    if (first === 10) continue
    if (first === undefined) return 10 // 첫번째 던질 차례
    if (second === undefined) return 10 - first // 두번째 던질 차례
  }

  // 10 프레임
  const [first, second, third] = frames[9] ?? []

  if (first === undefined) return 10
  if (second === undefined) return first === 10 ? 10 : 10 - first

  const hasThird = first === 10 || first + second === 10 // 3투구 기회 취득 조건

  if (!hasThird || third !== undefined) return null

  const spareCase = first === 10 && second < 10

  return spareCase ? 10 - second : 10
}
