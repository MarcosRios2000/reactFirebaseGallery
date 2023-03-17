import * as types from '../Types/index'
import * as firestoreKeys from '../../Firebase/firestoreKeys'
import { auth, db, googleAuthProvider } from '../../Firebase/firebaseConfig'


const userInitialState = {
    excurtions: [],
    active: true,
    rol: 'user'
}

//REGISTER
const registerStart = () => ({
    type: types.REGISTER_START
})

const registerSuccess = (user) => ({
    type: types.REGISTER_SUCCESS,
    payload: user,
})

const registerFail = (error) => ({
    type: types.REGISTER_FAIL,
    payload: error,
})

//LOGIN
const loginStart = () => ({
    type: types.LOGIN_START
})

const loginSuccess = (user) => ({
    type: types.LOGIN_SUCCESS,
    payload: user,
})

const loginFail = (error) => ({
    type: types.LOGIN_FAIL,
    payload: error,
})

//LOGOUT
const logoutStart = () => ({
    type: types.LOGOUT_START
})

const logoutSuccess = () => ({
    type: types.LOGOUT_SUCCESS,
})

const logoutFail = (error) => ({
    type: types.LOGOUT_FAIL,
    payload: error,
})

//GOOGLE
const googleSignInStart = () => ({
    type: types.GOOGLE_SIGN_IN_START
})

const googleSignInSuccess = (user) => ({
    type: types.GOOGLE_SIGN_IN_SUCCESS,
    payload: user
})

const googleSignInFail = (error) => ({
    type: types.GOOGLE_SIGN_IN_FAIL,
    payload: error,
})

export const registerInitiate = (email, password, displayName) => {
    return function (dispatch) {
        dispatch(registerStart())
        auth.createUserWithEmailAndPassword(email, password).then(({user}) => {
            user.updateProfile({
                displayName
            })

            //db create
            db.collection(firestoreKeys.users).doc(user.email).get().then((doc) => {
                if(doc.data() === undefined){
                    db.collection(firestoreKeys.users).doc(user.email).set({
                        ...userInitialState,
                        name: displayName,
                        email: user.email
                    })
                }
            }).catch((error) => dispatch(registerFail(error.message)))
            //

            dispatch(registerSuccess(user))
        }).catch((error) => dispatch(registerFail(error.message)))
    }
}

export const loginInitiate = (email, password) => {
    return function (dispatch) {
        dispatch(loginStart())
        auth.signInWithEmailAndPassword(email, password).then(({user}) => {
            dispatch(loginSuccess(user))
        }).catch((error) => dispatch(loginFail(error.message)))
    }
}

export const logoutInitiate = () => {
    return function (dispatch) {
        dispatch(logoutStart())
        auth.signOut().then((res) => {
            dispatch(logoutSuccess())
        }).catch((error) => dispatch(logoutFail(error.message)))
    }
}

export const googleSignInInitiate = () => {
    return function (dispatch) {
        dispatch(googleSignInStart())
        auth.signInWithPopup(googleAuthProvider).then(({user}) => {

            //db create
            db.collection(firestoreKeys.users).doc(user.email).get().then((doc) => {
                if(doc.data() === undefined){
                    db.collection(firestoreKeys.users).doc(user.email).set({
                        ...userInitialState,
                        name: '',
                        email: user.email
                    })
                }
            }).catch((error) => dispatch(googleSignInFail(error.message)))
            //

            dispatch(googleSignInSuccess(user))
        }).catch((error) => dispatch(googleSignInFail(error.message)))
    }
}