import { toFrames, type Pins } from './frames'

export function maxPinsForNextRoll(rolls: Pins[]): number | null {
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

export function frameScores(frames: Pins[][]): number[] {
  const result = new Array(10).fill('')

  // 1 ~ 9 프레임
  for (let i = 0; i < 9; i++) {
    const [first, second] = frames[i] ?? []
    const accSum = i > 0 ? result[i - 1] : 0
    const firstOfNextFrame = frames[i + 1]?.[0]

    if (first === undefined) break
    if (first === 10) {
      if (firstOfNextFrame === undefined) break
      result[i] = accSum + 10 + firstOfNextFrame
      continue
    }
    if (second === undefined) break
    if (first + second === 10) {
      if (firstOfNextFrame === undefined) break
      result[i] = accSum + 10 + firstOfNextFrame
    } else {
      result[i] = accSum + first + second
    }
  }

  // 10 프레임
  const [first, second, third] = frames[9] ?? []
  const gameNotEnded =
    first === undefined || second === undefined || (first + second >= 10 && third === undefined)

  if (gameNotEnded) return result
  result[9] = result[8] + first + second + (third ?? 0)

  return result
}
