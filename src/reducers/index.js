const initState = {
  url: ''
}

function Reducer (state = initState, action) {
  switch (action.type) {
    case 'STORE_URL':
      return {
        ...state,
        url: action.payload
      }
    default:
      return state
  }
}

export default Reducer


