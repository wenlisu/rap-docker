import {
  call,
  put
} from 'redux-saga/effects'
import * as TypeAction from '../../actions/type'
import * as RepositoryAction from '../../actions/repository'
import EditorService from '../services/Editor'

export function * addType (action) {
  try {
    const type = yield call(EditorService.addType, action.types)
    yield put(TypeAction.addTypeSucceeded(type))
    yield put(RepositoryAction.fetchRepository({
      id: action.type.repositoryId
    }))
    if (action.onResolved) action.onResolved()
  } catch (e) {
    console.error(e.message)
    yield put(TypeAction.addTypeFailed(e.message))
    if (action.onRejected) action.onRejected()
  }
}
export function * updateType (action) {
  try {
    const {
      id,
      name,
    } = action.types
    const payload = yield call(EditorService.updateType, {
      id,
      name,
    })
    yield put(TypeAction.updateTypeSucceeded({
      id,
      name: payload.name,
    }))
    if (action.onResolved) action.onResolved()
  } catch (e) {
    console.error(e.message)
    yield put(TypeAction.updateTypeFailed(e.message))
    if (action.onRejected) action.onRejected()
  }
}
export function * deleteType (action) {
  try {
    const count = yield call(EditorService.deleteType, action.id)
    yield put(TypeAction.deleteTypeSucceeded(count))
    yield put(RepositoryAction.fetchRepository({
      id: action.repoId
    }))
    if (action.onResolved) action.onResolved()
  } catch (e) {
    console.error(e.message)
    yield put(TypeAction.deleteTypeFailed(e.message))
  }
}

export function * sortTypeList (action) {
  try {
    const count = yield call(EditorService.sortTypeList, action.ids)
    yield put(TypeAction.sortTypeListSucceeded(count))
    if (action.onResolved) action.onResolved()
  } catch (e) {
    console.error(e.message)
    yield put(TypeAction.sortTypeListFailed(e.message))
  }
}
