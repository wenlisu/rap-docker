export const addType = (type, onResolved) => ({
  type: 'TYPE_ADD',
  types: type,
  onResolved
})
export const addTypeSucceeded = (type) => ({
  type: 'TYPE_ADD_SUCCEEDED',
  types: type
})
export const addTypeFailed = (message) => ({
  type: 'TYPE_ADD_FAILED',
  message
})

export const updateType = (type, onResolved) => ({
  type: 'TYPE_UPDATE',
  types: type,
  onResolved
})
export const updateTypeSucceeded = (payload) => ({
  type: 'TYPE_UPDATE_SUCCEEDED',
  payload
})
export const updateTypeFailed = (message) => ({
  type: 'TYPE_UPDATE_FAILED',
  message
})

export const deleteType = (id, onResolved, repoId) => ({
  type: 'TYPE_DELETE',
  id,
  onResolved,
  repoId
})
export const deleteTypeSucceeded = (id) => ({
  type: 'TYPE_DELETE_SUCCEEDED',
  id
})
export const deleteTypeFailed = (message) => ({
  type: 'TYPE_DELETE_FAILED',
  message
})

export const sortTypeList = (ids, onResolved) => ({
  type: 'TYPE_LIST_SORT',
  ids,
  onResolved
})
export const sortTypeListSucceeded = (count) => ({
  type: 'TYPE_LIST_SORT_SUCCEEDED',
  count
})
export const sortTypeListFailed = (message) => ({
  type: 'TYPE_LIST_SORT_FAILED',
  message
})
