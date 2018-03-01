const FETCH_GAME_DATA_REQUEST = 'Fiji/game/FETCH_GAME_DATA_REQUEST'
const FETCH_GAME_DATA_SUCCESS = 'Fiji/game/FETCH_GAME_DATA_SUCCESS'
const FETCH_GAME_DATA_FAILURE = 'Fiji/game/FETCH_GAME_DATA_FAILURE'

export const initialState = {
  isFetching: false,
  gameData: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GAME_DATA_REQUEST:
      return {
        ...state,
        gameData: [],
        isFetching: true
      }
    case FETCH_GAME_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        gameData: action.gameData
      }
    case FETCH_GAME_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        gameData: []
      }
    default:
      return state
  }
}

export const fetchGameDataRequest = () => ({
  type: FETCH_GAME_DATA_REQUEST
})

export const fetchGameDataSuccess = (gameData) => ({
  type: FETCH_GAME_DATA_SUCCESS,
  gameData
})

export const fetchGameDataFailure = () => ({
  type: FETCH_GAME_DATA_FAILURE
})

export const fetchMultipleChoiceData = (setId, numChoices, numRows) => (dispatch, getState) => {
  let choices = []
  for (let index = 0; index < 26; index++) {
    choices.push(String.fromCharCode(65 + index))
  }
  dispatch(fetchGameDataRequest())
  let data = []
  for (let i = 0; i < numRows; i++) {
    let entries = []
    while (entries.length < numChoices) {
      let rIndex = getRandomInt(0, choices.length)
      if (!entries.includes(choices[rIndex])) {
        entries.push(choices[rIndex])
      }
    }
    let questionIndex = getRandomInt(0, numChoices)
    data.push({
      question: entries[questionIndex],
      answerIndex: questionIndex,
      choices: entries
    })
  }
  dispatch(fetchGameDataSuccess(data))
}

export const fetchMatchData = (setId, numSets, numRows) => (dispatch, getState) => {
  let choices = []
  for (let index = 0; index < 26; index++) {
    choices.push(String.fromCharCode(65 + index))
    choices.push(String.fromCharCode(97 + index))
  }
  dispatch(fetchGameDataRequest())
  let data = []
  for (let i = 0; i < numRows; i++) {
    let entries = []
    while (entries.length < numSets) {
      let rIndex = getRandomInt(0, choices.length)
      if (!entries.includes(choices[rIndex])) {
        entries.push(choices[rIndex])
      }
    }
    data.push(entries.map((val) => {
      return [val, val]
    }))
  }
  dispatch(fetchGameDataSuccess(data))
}

export const fetchSerialData = (setId, numRows) => (dispatch, getState) => {
  let data = []
  dispatch(fetchGameDataRequest())
  for (let index = 0; index < numRows; index++) {
    let answer = getRandomInt(0, 999)
    let start = getRandomInt(2, 10)
    let end = getRandomInt(2, 10)
    let serial = []
    for (let seq = answer - start; seq < answer + end; seq++) {
      serial.push(seq.toString())
    }
    data.push({
      answer,
      serial
    })
  }
  dispatch(fetchGameDataSuccess(data))
}

export const fetchConsecutiveData = (setId, dataLength, otherLength, numRows) => (dispatch, getState) => {
  let data = []
  const MAX_INT = 999
  dispatch(fetchGameDataRequest())
  for (let index = 0; index < numRows; index++) {
    let start = getRandomInt(1, MAX_INT)
    let serial = []
    for (let seq = start; seq < start + dataLength; seq++) {
      serial.push(seq.toString())
    }
    let others = []
    for (let other = 0; other < otherLength; other++) {
      others.push(((start + dataLength - 1 + getRandomInt(1, MAX_INT - dataLength)) % MAX_INT).toString())
    }
    data.push({
      serial,
      others
    })
  }
  dispatch(fetchGameDataSuccess(data))
}

export const fetchWordData = (setId, dataLength, otherLength, numRows) => (dispatch, getState) => {
  const choices = [
    ['A'],
    ['I', 'N'],
    ['D', 'O', 'G'],
    ['G', 'I', 'R', 'L'],
    ['A', 'P', 'P', 'L', 'E'],
    ['B', 'A', 'T', 'M', 'A', 'N'],
    ['G', 'I', 'R', 'A', 'F', 'F', 'E'],
    ['B', 'L', 'I', 'Z', 'Z', 'A', 'R', 'D']
  ]
  let letters = []
  for (let index = 0; index < 26; index++) {
    letters.push(String.fromCharCode(65 + index))
  }
  dispatch(fetchGameDataRequest())
  let data = []
  if (dataLength >= 1 && dataLength <= 8) {
    for (let index = 0; index < numRows; index++) {
      let others = []
      while (others.length < otherLength) {
        let rIndex = getRandomInt(0, letters.length)
        if (!choices[dataLength - 1].includes(letters[rIndex])) {
          others.push(letters[rIndex])
        }
      }
      data.push({
        word: choices[dataLength - 1],
        others
      })
    }
    dispatch(fetchGameDataSuccess(data))
  }
}

export const fetchEquationData = (setId, maxDigits, numRows) => (dispatch, getState) => {
  let data = []
  const MAX_INT = maxDigits * 10 - 1
  dispatch(fetchGameDataRequest())
  for (let index = 0; index < numRows; index++) {
    const answer = getRandomInt(1, MAX_INT)
    const firstNum = getRandomInt(1, answer)
    const secondNum = answer - firstNum
    const op = '+'
    data.push({
      firstNum,
      op,
      secondNum,
      answer
    })
  }
  dispatch(fetchGameDataSuccess(data))
}

export const fetchCrosswordData = (setId, matrixSize, numRows) => (dispatch, getState) => {
  let data = []
  dispatch(fetchGameDataRequest())
  for (let index = 0; index < numRows; index++) {
    data.push({
      crossword: [
        ['E',null,null,null,null],
        ['A',null,null,null,null],
        ['T','I','G','E','R'],
        [null,null,null,null,'A'],
        [null,null,null,null,'T']
      ],
      start: [
        ['image',[0,0],'down'],
        ['image',[2,0],'lToR'],
        ['image',[2,4],'down']        
      ]
    })
  }
  dispatch(fetchGameDataSuccess(data))
}

export const fetchTrueOrFalseData = (setId, numRows) => (dispatch, getState) => {
  let data = []
  dispatch(fetchGameDataRequest())
  for (let index = 0; index < numRows; index++) {
    data.push({
      question: 'Apple is a:',
      answer: 'Fruit',
      wrongChoice: 'Animal'
    })
  }
  dispatch(fetchGameDataSuccess(data))
}

export const fetchRollingData = (setId, maxWordSize, numChoices, numRows) => (dispatch, getState) => {
  let data = []
  dispatch(fetchGameDataRequest())
  for (let index = 0; index < numRows; index++) {
    data.push({
      question: 'Fruit',
      answer: ['A','P','P','L','E'],
      choices: [
        ['X','Y','Z','A','B','C','D'],
        ['M','N','O','P','Q','R','S'],
        ['M','N','O','P','Q','R','S'],
        ['I','J','K','L','M','N','O'],
        ['B','C','D','E','F','G','H']
      ]
    })
  }
  dispatch(fetchGameDataSuccess(data))
}


getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export default reducer