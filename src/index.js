/* global localStorage */

function rejectWithMessage (error) {
  return Promise.reject(error.message)
}

export default (map, replacer, reviver) => ({
  load () {
    return new Promise((resolve) => {
      const state = {}
      Object.keys(map).forEach(key => {
        const jsonState = localStorage.getItem(key)
        const partialState = JSON.parse(jsonState, reviver) || {}
        Object.keys(partialState).forEach(k => { state[k] = partialState[k] })
      })
      resolve(state)
    }).catch(rejectWithMessage)
  },

  save (state) {
    return new Promise((resolve) => {
      Object.keys(map).forEach(key => {
        const partialState = map[key].reduce((prev, reducer) => {
          prev[reducer] = state[reducer]
          return prev
        }, {})
        const jsonPartialState = JSON.stringify(partialState, replacer)
        localStorage.setItem(key, jsonPartialState)
      })
      resolve()
    }).catch(rejectWithMessage)
  }
})
