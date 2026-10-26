// rolls = [3, 3, 10, 5, 5, 9, 0, 4, 6, 7, 0, 3, 7, 9, 1, 7, 3, 10, 10, 6]
// return => [[3,3],[10],[5,5],[9,0],[4,6],[7,0],[3,7],[9,1],[7,3],[10,10,6]]

export function toFrames(rolls: number[]): number[][] {
  const result: number[][] = []
  let index = 0

  // 1~9프레임
  for (let f = 0; f < 9; f++) {
    if (rolls[index] === 10) {
      result.push([10])
      index += 1
    } else {
      result.push(rolls.slice(index, index + 2))
      index += 2
    }
  }

  // 10프레임 - 나머지 롤들 모두 넣어줌
  result.push(rolls.slice(index))

  return result
}
