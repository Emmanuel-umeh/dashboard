import {
    GET_ERRORS,
    CLEAR_ERRORS 
} from "./types"





// RETURN ERRORS
    // returns the type
    // returns the msg, status, id
export const returnErrors = (msg, status, id = null) => {
    return{
        type:GET_ERRORS,
        payload:{msg,status, id}
    }
}


// CLEAR ERRORS
    // returns the type
export const clearErrors = () => {
    return{
        type:CLEAR_ERRORS
    }
}
