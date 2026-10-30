import { type Mark, type Pins } from './types'

const SYMBOL: Mark[] = ['-', '1', '2', '3', '4', '5', '6', '7', '8', '9']

// rolls = [3, 3, 10, 5, 5, 9, 0, 4, 6, 7, 0, 3, 7, 9, 1, 7, 3, 10, 10, 6]
// return => [[3,3],[10],[5,5],[9,0],[4,6],[7,0],[3,7],[9,1],[7,3],[10,10,6]]

export function toFrames(rolls: Pins[]): Pins[][] {
  const frames: Pins[][] = []
  let rIdx = 0

  // 1~9프레임
  for (let f = 0; f < 9; f++) {
    if (rolls[rIdx] === 10) {
      frames.push([10])
      rIdx += 1
    } else {
      frames.push(rolls.slice(rIdx, rIdx + 2))
      rIdx += 2
    }
  }

  // 10프레임 - 나머지 롤들 모두 넣어줌
  frames.push(rolls.slice(rIdx))

  return frames
}

function toSymbol(pins: Pins): Mark {
  return SYMBOL[pins] ?? ''
}

export function toMarks(frame: Pins[], isTenFrame: boolean): Mark[] {
  return isTenFrame ? tenFrameMark(frame) : normalMark(frame)
}

function normalMark(frame: Pins[]): Mark[] {
  const [first, second] = frame

  // 빈문자열로 채워주는 이유는 전광판에 빈칸을 만들기 위함
  // undefined 는 아직 안 던졌다는 뜻 - 배열 내에 없음
  if (first === undefined) return ['', '']
  if (first === 10) return ['', 'X']
  if (second === undefined) return [toSymbol(first), '']
  if (first + second === 10) return [toSymbol(first), '/']

  // 모두 던졌고, 합산이 10미만인 경우
  return [toSymbol(first), toSymbol(second)]
}

function toThirdSymbol(pins?: Pins): Mark {
  return pins === undefined ? '' : pins === 10 ? 'X' : toSymbol(pins)
}

function tenFrameMark(frame: Pins[]): Mark[] {
  const [first, second, third] = frame

  if (first === undefined) return ['', '', '']
  if (first === 10) {
    if (second === undefined) return ['X', '', '']
    if (second === 10) return ['X', 'X', toThirdSymbol(third)]

    const isSpareCleared = third !== undefined && second + third === 10
    return ['X', toSymbol(second), isSpareCleared ? '/' : toThirdSymbol(third)]
  }
  if (second === undefined) return [toSymbol(first), '', '']

  const isSpareCleared = first + second === 10
  return [toSymbol(first), isSpareCleared ? '/' : toSymbol(second), toThirdSymbol(third)]
}
