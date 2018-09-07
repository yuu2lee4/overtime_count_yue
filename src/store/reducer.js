const INITIAL_STATE = {
    setting: null
}
const funcs = {
    setSetting(state, data) {
        return Object.assign({}, state, { setting: data });
    }
}

export default function reducer(state = INITIAL_STATE, action) {
    if (funcs[action.type]) {
      const nextState = funcs[action.type](state, action.data)
      return nextState
    }
  
    return state
  }