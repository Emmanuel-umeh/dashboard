/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import {Router} from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

// import AdminLayout from "layouts/Admin.js";
// import AuthLayout from "layouts/Auth.js";
// import * as serviceWorker from './serviceWorker';
import store from './store'
import {Provider} from 'react-redux'

import {createBrowserHistory} from "history"
import App from "./app"

const history = createBrowserHistory();
ReactDOM.render(
  <Provider store={store}>
    <Router history = {history}>
      <App />
      </Router>
  </Provider>,
  document.getElementById("root")
);
