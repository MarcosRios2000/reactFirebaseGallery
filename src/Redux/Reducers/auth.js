import * as types from '../Types/index'


  const initialState = {
    loading: false,
    currentUser: null,
    error: null,
}

export const authReducer = (state=initialState, action) =>{
    switch(action.type){
        case types.REGISTER_START:
        case types.LOGIN_START:
        case types.LOGOUT_START:
        case types.GOOGLE_SIGN_IN_START:
            return {
                ...state,
                loading: true
            };
        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                currentUser: null
            }
        case types.REGISTER_SUCCESS:
        case types.LOGIN_SUCCESS:
        case types.GOOGLE_SIGN_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
            };
        case types.REGISTER_FAIL:
        case types.LOGIN_FAIL:
        case types.LOGOUT_FAIL:
        case types.GOOGLE_SIGN_IN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}