import { createAction, createReducer } from 'redux-act'
import { push } from 'react-router-redux'
import { pendingTask, begin, end } from 'react-redux-spinner'
import { notification } from 'antd'
import * as AuthAPI from 'lib/api/auth'

const REDUCER = 'app'
const NS = `@@${REDUCER}/`

const _setFrom = createAction(`${NS}SET_FROM`)
const _setLoading = createAction(`${NS}SET_LOADING`)
const _setHideLogin = createAction(`${NS}SET_HIDE_LOGIN`)

export const setUserState = createAction(`${NS}SET_USER_STATE`)
export const setUpdatingContent = createAction(`${NS}SET_UPDATING_CONTENT`)
export const setActiveDialog = createAction(`${NS}SET_ACTIVE_DIALOG`)
export const deleteDialogForm = createAction(`${NS}DELETE_DIALOG_FORM`)
export const addSubmitForm = createAction(`${NS}ADD_SUBMIT_FORM`)
export const deleteSubmitForm = createAction(`${NS}DELETE_SUBMIT_FORM`)
export const setLayoutState = createAction(`${NS}SET_LAYOUT_STATE`)

export const setLoading = isLoading => {
  const action = _setLoading(isLoading)
  action[pendingTask] = isLoading ? begin : end
  return action
}

export const resetHideLogin = () => (dispatch, getState) => {
  const state = getState()
  if (state.pendingTasks === 0 && state.app.isHideLogin) {
    dispatch(_setHideLogin(false))
  }
  return Promise.resolve()
}

export const initAuth = roles => (dispatch, getState) => {
  // Use Axios there to get User Data by Auth Token with Bearer Method Authentication

  const state = getState()

  var hash = window.location.search
  console.log(hash)

  if (hash.split('&').length > 1) {
    var hashurl = hash.split('&')
    if (hashurl[0].split('=').length > 1) {
      window.localStorage.setItem('app.Username', hashurl[0].split('=')[1])
    }

    if (hashurl[1].split('=').length > 1) {
      window.localStorage.setItem('app.Role', hashurl[1].split('=')[1])
    }

    console.log(window.location.protocol + '//' + window.location.host)
    if (!roles.find(role => role === window.localStorage.getItem('app.Role'))) {
      window.location.href =
        window.location.protocol + '//' + window.location.host + '/#/organizationwebsite'
      return
    }
  }

  const userRole = window.localStorage.getItem('app.Role')
  const username = window.localStorage.getItem('app.Username')

  const setUser = userState => {
    console.log(userState)
    dispatch(
      setUserState({
        userState: {
          ...userState,
        },
      }),
    )
    return Promise.resolve(true)
  }

  if (username && userRole) {
    return setUser({ username: username, role: userRole }, userRole)
  } else {
    const location = state.routing.location
    const from = location.pathname + location.search
    dispatch(_setFrom(from))
    dispatch(push('/login'))
    return Promise.reject()
  }
}
export async function deletebook(value) {
  var result = await AuthAPI.deletebook(value._id)
  return result
}
export async function addbook(value, callback) {
  var result = await AuthAPI.addbook(value)
  callback(result.data)
}

export async function getbooks(callback) {
  var result = await AuthAPI.getbooks()
  callback(result.data)
}

export async function getbook(id, callback) {
  var result = await AuthAPI.getbook(id)
  callback(result.data)
}

const initialState = {
  // APP STATE
  from: '',
  isUpdatingContent: false,
  isLoading: false,
  activeDialog: '',
  dialogForms: {},
  submitForms: {},
  isHideLogin: false,

  // LAYOUT STATE
  layoutState: {
    isMenuTop: false,
    menuMobileOpened: false,
    menuCollapsed: false,
    menuShadow: true,
    themeLight: true,
    squaredBorders: false,
    borderLess: true,
    fixedWidth: false,
    settingsOpened: false,
  },

  // USER STATE
  userState: {
    email: '',
    role: '',
  },
}

export default createReducer(
  {
    [_setFrom]: (state, from) => ({ ...state, from }),
    [_setLoading]: (state, isLoading) => ({ ...state, isLoading }),
    [_setHideLogin]: (state, isHideLogin) => ({ ...state, isHideLogin }),
    [setUpdatingContent]: (state, isUpdatingContent) => ({ ...state, isUpdatingContent }),
    [setUserState]: (state, { userState }) => ({ ...state, userState }),
    [setLayoutState]: (state, param) => {
      const layoutState = { ...state.layoutState, ...param }
      const newState = { ...state, layoutState }
      window.localStorage.setItem('app.layoutState', JSON.stringify(newState.layoutState))
      return newState
    },
    [setActiveDialog]: (state, activeDialog) => {
      const result = { ...state, activeDialog }
      if (activeDialog !== '') {
        const id = activeDialog
        result.dialogForms = { ...state.dialogForms, [id]: true }
      }
      return result
    },
    [deleteDialogForm]: (state, id) => {
      const dialogForms = { ...state.dialogForms }
      delete dialogForms[id]
      return { ...state, dialogForms }
    },
    [addSubmitForm]: (state, id) => {
      const submitForms = { ...state.submitForms, [id]: true }
      return { ...state, submitForms }
    },
    [deleteSubmitForm]: (state, id) => {
      const submitForms = { ...state.submitForms }
      delete submitForms[id]
      return { ...state, submitForms }
    },
  },
  initialState,
)
