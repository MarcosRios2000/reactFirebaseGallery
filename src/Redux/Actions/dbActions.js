import * as types from '../Types/index'
import * as firestoreKeys from '../../Firebase/firestoreKeys'
import { db } from '../../Firebase/firebaseConfig'

const getUserByIdStart = () => ({
    type: types.GET_USER_BY_ID_START
})

const getUserByIdSuccess = (user) => ({
    type: types.GET_USER_BY_ID_SUCCESS,
    payload: user,
})

const getUserByIdFail = (error) => ({
    type: types.GET_USER_BY_ID_FAIL,
    payload: error,
})

///////////////////////////////////

const getUsersStart = () => ({
    type: types.GET_USERS_START
})

const getUsersSuccess = (users) => ({
    type: types.GET_USERS_SUCCESS,
    payload: users,
})

const getUsersFail = (error) => ({
    type: types.GET_USERS_FAIL,
    payload: error,
})

////////////////////////////////////

const getExcurtionsStart = () => ({
    type: types.GET_EXCURTIONS_START
})

const getExcurtionsSuccess = (excurtions) => ({
    type: types.GET_EXCURTIONS_SUCCESS,
    payload: excurtions,
})

const getExcurtionsFail = (error) => ({
    type: types.GET_EXCURTIONS_FAIL,
    payload: error
})

///////////////////////////////////////////

const getAllImagesStart = () => ({
    type: types.GET_ALL_IMAGES_START
})

const getAllImagesSuccess = (images) => ({
    type: types.GET_ALL_IMAGES_SUCCESS,
    payload: images
})

const getAllImagesFail = (error) => ({
    type: types.GET_ALL_IMAGES_FAIL,
    payload: error
})




export const getUserByIdInitiate = (id) => {
    return function(dispatch){
        dispatch(getUserByIdStart())
        db.collection(firestoreKeys.users).doc(id).get().then((doc)=>{
            dispatch(getUserByIdSuccess(doc.data()))
        }).catch((err)=>dispatch(getUserByIdFail(err)))
    }
}


export const getAllUsersInitiate = () => {
    return function(dispatch){
        dispatch(getUsersStart())
        db.collection(firestoreKeys.users).onSnapshot((querySnapshot)=> {
            let docs = []
            querySnapshot.forEach((doc)=>{
                let data = doc.data()
                if(data.rol === 'user'){
                docs.push({...data, id:doc.id})}               
            })
            dispatch(getUsersSuccess(docs))
        },
           (error)=>{
            dispatch(getUsersFail(error))
           } 
        )
            
    }
}

export const getExcurtionsInitiate = () => {
    return function(dispatch){
        dispatch(getExcurtionsStart())
        db.collection(firestoreKeys.excurtions).onSnapshot((querySnapshot) => {
            let docs = []
            querySnapshot.forEach((doc)=>{
                let data = doc.data()         
                docs.push(data)
            })
            dispatch(getExcurtionsSuccess(docs))
        }, (error) => {
            dispatch(getExcurtionsFail(error))
        }
        )
    }
}

export const getAllImagesInitiate = () => {
    return function(dispatch){
        dispatch(getAllImagesStart())
        db.collection(firestoreKeys.images).onSnapshot((querySnapshot) => {
            let docs = []
            querySnapshot.forEach((doc) => {
                let data = doc.data()
               
                if(data.excurtion !== undefined){
                    docs.push(data)
                }
            })
            dispatch(getAllImagesSuccess(docs))
        }, (error) => {
            dispatch(getAllImagesFail(error))
        }
        )
    }
}