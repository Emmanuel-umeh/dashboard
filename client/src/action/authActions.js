import axios from "axios";
import { returnErrors } from "./errorActions";
import browserHistory from "react-router";

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_USERS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  GET_ERRORS,
  CLEAR_TYPE,
} from "./types";

import AWN from "awesome-notifications";

// https://elesarrdevelopment.herokuapp.com/api/signupuser/all

let notifier = new AWN();
var location = window.location.href;
if (location.slice(0, 17) == "http://localhost:") {
  axios.defaults.baseURL = "http://localhost:5200";
  // axios.defaults.baseURL = 'http://localhost:5200';
} else if (location.slice(0, 17) == "http://127.0.0.1:") {
  axios.defaults.baseURL = "http://localhost:5200";
} else {
  axios.defaults.baseURL = "https://deplomat-api.herokuapp.com/";
}
//

export const loadUser = () => (dispatch, getState) => {
  // console.log("url ",   axios.defaults.baseURL)
  console.log("getting user");
  // dispatch({type:USER_LOADING}) // dispatch user loading

  // user loading
  dispatch({ type: USER_LOADING }); // dispatch user loading

  // console.log("token config ", tokenConfig(getState))
  // try {

    notifier.asyncBlock(
    axios
      .get(`/api/auth/oneUser`, tokenConfig(getState)),


      resp =>{

        console.log("resp !!" , resp)
        dispatch({
                  type: USER_LOADED,
                  payload: resp.data,
                });
      },
      /* omitted onResolve */
       err =>{
        console.log("err ", err.response.data);
        localStorage.removeItem("token");

        // window.location.href = "/login"
          return dispatch({
            type: AUTH_ERROR,
          });


  
        
        // notifier.alert(`${err.response.data.msg}`)
      
      }
  
      )

}
    
  //     .then((res) => {
  //       if (res.data.message === "error") {
  //         localStorage.removeItem("token");
  //         return dispatch({
  //           type: AUTH_ERROR,
  //         });
  //       }
  //       // console.log("user data ", res)
  //       dispatch({
  //         type: USER_LOADED,
  //         payload: res.data,
  //       });
  //       //  console
  //     })
  //     .catch((err) => {
  //       dispatch({
  //         type: AUTH_ERROR,
  //       });
  //       // console.log("Eroor" , err.response.data)
  //       // console.clear()
  //     });
  // } catch (e) {
  //   if (e) {
  //     console.clear();
  //   }
  // }
// };

// export const register =

export const login = ({ email, password, ref }) => (dispatch) => {
  // console.log("data received ", email, password)
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };


  // REQUEST BODY
  const body = JSON.stringify({ email, password });


  notifier.asyncBlock(
    axios
    .post("/api/auth/login", body, config),
    resp =>{

      dispatch({
        type: LOGIN_SUCCESS,
        payload: resp.data
      })

  

      if (ref) {
        return window.location.href = `/upload/${ref}`;
      }

      window.location.href = "/dashboard/index";

    },
    /* omitted onResolve */
     err =>{
      console.log("err ", err.response.data);
      // notifier.warning("Registration failed")
      // alert(err.response.data.msg);
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      console.log(err.response.data);
      dispatch({
        type: REGISTER_FAIL,
      });

      
      notifier.alert(`${err.response.data.msg}`)}

    )
  
};

export const clearType = () => (dispatch) => {
  dispatch({
    type: CLEAR_TYPE,
  });
};

// logout
export const logout = () => {
  // localStorage.removeItem('referral')
  window.location.href = "/auth/login";
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Register User
export const register = (
  fd,ref,
  history
) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  // console.log("registering individual")
  // console.log("consoling the body from register action ",body)
  
  // new AWN()
  // .asyncBlock(
    notifier.asyncBlock(
    axios
    .post("/api/auth/signup", fd, config),
    resp =>{

      dispatch({
        type: REGISTER_SUCCESS,
        payload: resp.data
      })

      window.location.href = "/dashboard/index"
    },
    /* omitted onResolve */
     err =>{
      console.log("err ", err.response.data);
      // notifier.warning("Registration failed")
      // alert(err.response.data.msg);
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      console.log(err.response.data);
      dispatch({
        type: REGISTER_FAIL,
      });

      
      notifier.alert(`${err.response.data.msg}`)}

    )
  // axios
  //   .post("/api/auth/signup", body, config)
  //   .then((res) => {
  //     dispatch({
  //       type: REGISTER_SUCCESS,
  //       payload: res.data,
  //     });

     
  //     // history.push('/dashboard')
  //     window.location.href = "/dashboard/index";
  //   }).catch((err) => {

  //     console.log("err ", err.response.data);
  //     // notifier.warning("Registration failed")
  //     // alert(err.response.data.msg);
  //     dispatch(
  //       returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
  //     );
  //     console.log(err.response.data);
  //     dispatch({
  //       type: REGISTER_FAIL,
  //     });

  //     return notifier.warning(err.response.data.msg)
  //   })
    
    
};

// Register User
export const registerWitness = (
   fd,
   ref,
  history
) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };


  notifier.asyncBlock(
    axios
    .post("/api/auth/signup", fd, config),
    resp =>{
      dispatch({
        type: REGISTER_SUCCESS,
        payload: resp.data
      })


      window.location.href = `/upload/${ref}`;
    },
    /* omitted onResolve */
     err =>{
      console.log("err ", err.response.data);
      // notifier.warning("Registration failed")
      // alert(err.response.data.msg);
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      console.log(err.response.data);
      dispatch({
        type: REGISTER_FAIL,
      });

      
      notifier.alert(`${err.response.data.msg}`)}

    )

};

export const witnessUpload = (fd) => (dispatch) => {
  const config = {
    headers: {
      // 'Accept': 'application/json',
      "x-auth-token": localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    },
  };



  
  notifier.asyncBlock(
    axios
    .post("/api/witness/upload", fd, config),
    resp =>{

      notifier.info(
        "Your Video Has Been Sent Successfully. Thanks For Being a Witness. "
      );
setTimeout(() => {
  window.location.href = `/dashboard`;
}, 2000);
    
    },
    /* omitted onResolve */
     err =>{
      console.log("err ", err.response.data);
      // notifier.alert(err.response.data.msg)
      notifier.alert(`${err.response.data.msg}`)
      // alert(err.response.data.msg);
      dispatch(
        returnErrors(err.response.data, err.response.status,  "VIDEO_UPLOAD_FAILED")
      );

      
    }

    )

};

// Setup config/headers and token

export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
    // console.log("token ", token)
  }

  return config;
};
