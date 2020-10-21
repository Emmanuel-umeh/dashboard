import {
    USER_LOADING, 
    USER_LOADED, 
    AUTH_ERROR,
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    LOGOUT_SUCCESS, 
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    USERS_LOADING, 
    USERS_LOADED,
    UPDATED_USER,
    UPDATING_USER,
    PROFILE_LOADED,
    CLEAR_TYPE
 } from "../action/types"
 import axios from "axios"

 const initialState ={
     token:localStorage.getItem("token"),
     isAuthenticated:null,
     isLoading:false,
     user:[],
     profile:[],
     type:''
 }



 export default function(state =initialState, action){
    
    switch (action.type) {

        case CLEAR_TYPE :{
            return{
                // ...state,
                type : ''
            }
        }
        
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true, 
                isLoading:false,
                user:action.payload,
                type:'USER_LOADED'
            }


                
        case USER_LOADING:
            return {
                ...state, 
                isLoading:true,
                type:'USER_LOADED'
            };

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.token)
            console.log("logged in successfully")
        
            return{
                ...state,
                isAuthenticated:true, 
                isLoading:false,
                user:action.payload,
                type:'LOGIN_SUCCESS'
            }


            case LOGOUT_SUCCESS:
                localStorage.removeItem("token")
                console.log("logged OUT successfully")
                return{
                    ...state,
                    token:null, 
                    user:null,
                    isAuthenticated:false,
                    isLoading:false,
                    type:'LOGOUT_SUCCESS'
                }
            
        case REGISTER_FAIL:
            case LOGOUT_SUCCESS :
                case LOGIN_FAIL : 
            localStorage.removeItem("token")
            return{
                ...state,
                token:null, 
                user:null,
                isAuthenticated:false,
                isLoading:false,
                type:'LOGIN_FAIL'
            }
        
        case USERS_LOADING:
            return{
                ...state,
                isLoading:true
            }
        case USERS_LOADED:
            return{
                ...state,
                isLoading:false,
                user:action.payload
            }


            case UPDATING_USER:
                return{
                    ...state,
                    isLoading:true
                }

                case UPDATED_USER:
                    return{
                        ...state,
                        isLoading:false,
                        user:action.payload
                    }

                    case AUTH_ERROR:
                        return{
                            token:null,
                            isAuthenticated:null,
                            isLoading:false,
                            user:[],
                            profile:[],
                            type:'',
                            type:'AUTH_ERROR'
                        }
        default:
            return state;
    }
 }
//  {

//     id: 
//     "5e8af6ffacf76a00175c3228", 
//     username: "goodness account", 
//     email: "python@gmail.com", date: "2020-04-06T09:31:43.999Z"}
//  }

// user.username 
// user.email 