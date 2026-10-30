import { toFrames, type Pins } from './frames'

export function maxPinsForNextRoll(rolls: Pins[]): number | null {
  const frames = toFrames(rolls)

  // 1 ~ 9 프레임
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

  // 3투구 기회가 없거나 3투구까지 진행되어 종료된 케이스
  if (!hasThird || third !== undefined) return null

  const spareCase = first === 10 && second < 10

  return spareCase ? 10 - second : 10
}

export function scoresFromFrames(rolls: Pins[]): number[] {
  const frames = toFrames(rolls)
  const result = new Array(10).fill('')

  // 1 ~ 9 프레임
  for (let i = 0; i < 9; i++) {
    const [first, second] = frames[i] ?? []
    const accSum = i > 0 ? result[i - 1] : 0
    const firstOfNextFrame = frames[i + 1]?.[0]
    const secondOfNextFrame = frames[i + 1]?.[1]

    if (first === undefined) break
    if (first === 10) {
      if (firstOfNextFrame === undefined) break
      if (firstOfNextFrame === 10) {
        if (i === 8) {
          if (secondOfNextFrame === undefined) break
          // 9, 10프레임의 첫투구가 X인 경우, 9프레임 총합에 10프레임의 두번째 투구값을 더해야 함
          result[i] = accSum + 10 + 10 + secondOfNextFrame
        } else {
          const firstOfNextNextFrame = frames[i + 2]?.[0]
          if (firstOfNextNextFrame === undefined) break
          result[i] = accSum + 10 + 10 + firstOfNextNextFrame
        }
      } else {
        if (secondOfNextFrame === undefined) break
        result[i] = accSum + first + firstOfNextFrame + secondOfNextFrame
      }
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

export function scoresFromRolls(rolls: Pins[]) {
  const result = new Array(10).fill('')
  let rIdx = 0

  for (let f = 0; f < 10; f++) {
    const accSum = f > 0 ? result[f - 1] : 0
    const roll = rolls[rIdx]
    const nextRoll = rolls[rIdx + 1]
    const nextNextRoll = rolls[rIdx + 2]

    if (roll === undefined) break
    if (roll === 10) {
      if (nextRoll === undefined || nextNextRoll === undefined) break
      result[f] = accSum + 10 + nextRoll + nextNextRoll
      rIdx += 1
      continue
    }
    if (nextRoll === undefined) break
    if (roll + nextRoll === 10) {
      if (nextNextRoll === undefined) break
      result[f] = accSum + 10 + nextNextRoll
      rIdx += 2
    } else {
      result[f] = accSum + roll + nextRoll
      rIdx += 2
    }
  }

  return result
}
