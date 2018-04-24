// for step 1
export const updateReOrder = (state, payload) => {
  state.re_order = payload
}

export const updateEditOrder = (state, payload) => {
  state.edit_order = payload
}

export const updateOrderPicked = (state, payload) => {
  state.order_picked = payload
}

// for step 2
export const updateRep = (state, payload) => {
  state.rep = payload
}

export const updateGarment = (state, payload) => {
  state.garment = payload
}

export const updateAddress = (state, payload) => {
  state.shipping = payload
}

// for step 3
export const updateOptionChecked = (state, payload) => {
  state.option_checked = payload
}

export const updateComments = (state, payload) => {
  state.comments = payload
}
