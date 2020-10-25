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
  try {
    axios
      .get(`/api/auth/oneUser`, tokenConfig(getState))
      .then((res) => {
        if (res.data.message === "error") {
          localStorage.removeItem("token");
          return dispatch({
            type: AUTH_ERROR,
          });
        }
        // console.log("user data ", res)
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
        //  console
      })
      .catch((err) => {
        dispatch({
          type: AUTH_ERROR,
        });
        // console.log("Eroor" , err.response.data)
        // console.clear()
      });
  } catch (e) {
    if (e) {
      console.clear();
    }
  }
};

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
  
  new AWN()
  .asyncBlock(
  axios
    .post(`/api/auth/login`, body, config)
    .then(
      (res) => {
        
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });

        if (ref) {
          window.location.href = `/upload/${ref}`;
        }

        window.location.href = "/dashboard/index";

        // console.log("login res ", res)
      }
      // console.log("this is the res ", res)
    ),"Logged in Successfully",  'User Does Not Exists. Please Login With A Valid Account.')
    .catch((err) => {
      // alert(err.response.data.msg)

      console.log("Erro !!!!!!!!!!1",err.response)

      // notifier.warning(err.response.data.msg)
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: CLEAR_TYPE,
      });

      notifier.warning(err.response.data.msg);
    });
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
  { name, email, password, address, phoneNumber, witnessEmail },
  history
) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      // 'Accept': 'application/json',
      "Content-Type": "application/json",
    },
  };

  // console.log(config)

  // Request body
  const body = JSON.stringify({
    name,
    email,
    password,
    address,
    phoneNumber,
    witnessEmail,
  });
  // console.log("registering individual")
  // console.log("consoling the body from register action ",body)
  
  new AWN()
  .asyncBlock(
  axios
    .post("/api/auth/signup", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      console.log("data ", res.data);
      // history.push('/dashboard')
      window.location.href = "/dashboard/index";
    }), "Signed Up Successfully, Redirecting to Upload Video Page..", "User with this email already exists. Please Login")
    .catch((err) => {
      // notifier.warning("Registration failed")
      alert(err.response.data.msg);
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      console.log(err.response.data);
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// Register User
export const registerWitness = (
  { name, email, password, address, phoneNumber, witnessEmail, ref },
  history
) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      // 'Accept': 'application/json',
      "Content-Type": "application/json",
    },
  };

  // console.log(config)

  // Request body
  const body = JSON.stringify({
    name,
    email,
    password,
    address,
    phoneNumber,
    witnessEmail,
  });
  // console.log("registering individual")
  // console.log("consoling the body from register action ",body)

  new AWN()
  .asyncBlock(
  axios
    .post("/api/auth/signup", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      console.log("data ", res.data);
      // history.push('/dashboard')

      // ref is the id of the person you are a witness to
      window.location.href = `/upload/${ref}`;
    }), "Signed Up Successfully, Redirecting to Upload Video Page..", "A User with this email already exists. Please login")
    .catch((err) => {
      notifier.warning(err.response.data.msg);
      // alert(err.response.data.msg)
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      console.log(err.response.data);
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

export const witnessUpload = (fd) => (dispatch) => {
  const config = {
    headers: {
      // 'Accept': 'application/json',
      "x-auth-token": localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    },
  };
  new AWN()
    .asyncBlock(
      axios.post("/api/witness/upload", fd, config).then((res) => {
        // dispatch({
        //   type: VIDEO_UPLOADED,
        //   payload: res.data
        // })
        if (!res) {
         alert(
            "SOmething went wrong. Please Contact customer care via email at verify@baevo.org"
          );
        }

        console.log("data", res.data);

        setTimeout(() => {
          window.location.href = `/dashboard`;
        }, 4000);

        setTimeout(() => {
          notifier.info(
            "Your Video Has Been Sent Successfully. Thanks For Being a Witness. "
          );
        }, 1000);
      }),
      "Redirecting to your dashboard.. ", "Uploading video failed. Please contact support"
    )
    .catch((err) => {
      // console.log("error ", err.response.data)
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "VIDEO_UPLOAD_FAILED"
        )
      );

      alert("Something went wrong")
     alert(
      err.response.data.msg
      );
    });
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
