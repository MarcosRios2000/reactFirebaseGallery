import * as types from '../Types/index'


const initialState = {
    loading: false,
    arrayUsers: [],
    arrayExcurtions: [],
    images: [],
    userById: null,
    error: null,
}



export const dbReducer = (state=initialState, action) => {
    switch(action.type){
        case types.GET_USER_BY_ID_START:
        case types.GET_USERS_START:
        case types.GET_EXCURTIONS_START:
        case types.GET_ALL_IMAGES_START:
            return {
                ...state,
                loading: true
            }
        case types.GET_ALL_IMAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                images: action.payload
            }
        case types.GET_EXCURTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                arrayExcurtions: action.payload
            }
        case types.GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                arrayUsers: action.payload
            }
        case types.GET_USER_BY_ID_SUCCESS:
            return{
                ...state,
                loading: false,
                userById: action.payload
            }
        case types.GET_USERS_FAIL:
        case types.GET_USER_BY_ID_FAIL:
        case types.GET_EXCURTIONS_FAIL:
        case types.GET_ALL_IMAGES_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}