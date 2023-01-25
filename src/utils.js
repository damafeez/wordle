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
