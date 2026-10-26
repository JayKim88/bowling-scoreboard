import { toFrames, type Pins } from './frames'

export function maxPinsForNextRoll(rolls: Pins[]) {
  // 0 ~ 9 프레임
  const frames = toFrames(rolls)

  for (let i = 0; i < 9; i++) {
    const [first, second] = frames[i] ?? []

    if (first === 10) continue
    if (first === undefined) return 10 // 첫번째 던질 차례
    if (second === undefined) return 10 - first // 두번째 던질 차례
  }

  // 10프레임은 모든 투구에서 10까지 나올수 있음
  return 10
}
