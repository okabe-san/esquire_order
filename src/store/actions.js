// for step 1
export const updateReOrder = ({commit}, payload) => {
  commit('updateReOrder', payload)
}

export const updateEditOrder = ({commit}, payload) => {
  commit('updateEditOrder', payload)
}

export const updateOrderPicked = ({commit}, payload) => {
  commit('updateOrderPicked', payload)
}

// for step 2
export const updateRep = ({commit}, payload) => {
  commit('updateRep', payload)
}

export const updateAddress = ({commit}, payload) => {
  commit('updateAddress', payload)
}

// for step 3
export const updateOptionChecked = ({commit}, payload) => {
  commit('updateOptionChecked', payload)
}

export const updateComments = ({commit}, payload) => {
  commit('updateComments', payload)
}
