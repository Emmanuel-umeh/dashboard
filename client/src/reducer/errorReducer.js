import { 
    GET_ERRORS, 
    CLEAR_ERRORS,
    AUTH_ERROR } from '../action/types';

const initialState = {
msg: {},
status: '',
id: ''
}

export default function(state = initialState, action) {
switch(action.type) {
case GET_ERRORS:
return {
msg: action.payload.msg,
status: action.payload.status,
id: action.payload.id
};

// case AUTH_ERROR:
//     return {
//         msg: action.payload.msg,
//         status: action.payload.status,
//         id: action.payload.id
//     };

case CLEAR_ERRORS:
return {
msg: {},
status: null,
id: null
};
default:
return state;
}
}