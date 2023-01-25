'strict'

export const computeRowState = (correctWord, input, shouldValidate) => {
  const word = [...correctWord]
  const inputArr = Array.from({ length: word.length }, (_, i) => input[i])

  return inputArr.map((letter, index) => {
    if (!letter) return { state: 'empty', letter }
    if (!shouldValidate) return { state: 'neutral', letter }
    if (letter === word[index]) {
      word[index] = undefined
      return { state: 'correct', letter }
    }

    const indexInCorrectWord = word.findIndex(
      (actualLetter, i) =>
        actualLetter === letter && inputArr[i] !== actualLetter
    )
    if (indexInCorrectWord > -1) {
      word[indexInCorrectWord] = undefined
      return { state: 'found', letter }
    }

    return { state: 'wrong', letter }
  })
}

export const computeKeyboardState = (
  rows,
  hierarchy = ['correct', 'found', 'wrong']
) => {
  const indexMap = hierarchy.reduce(
    (prev, curr, i) => ({ ...prev, [curr]: i }),
    {}
  )
  const result = {}
  for (const row of rows) {
    if (row[0]?.state === 'empty') return result

    row.forEach(({ state, letter }) => {
      if (
        hierarchy.includes(state) &&
        indexMap[state] < (indexMap[result[letter]] ?? Infinity)
      ) {
        result[letter] = state
      }
    })
  }

  return result
}

export const isAlphabet = (s) =>
  s.length === 1 &&
  ((s.charCodeAt() >= 65 && s.charCodeAt() <= 90) || // uppercase character
    (s.charCodeAt() >= 97 && s.charCodeAt() <= 122)) // lowercase character
