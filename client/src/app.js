import React, { useRef, useEffect } from 'react';
// import {  } from 'react-router-dom';
//import { getToken, removeUserSession, setUserSession } from './helpers/Common';
//import axios from 'axios';
import { BrowserRouter, useLocation, Route, Switch, Redirect } from "react-router-dom";


// Views 
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

//Utilities
import PrivateRoute from './helpers/PrivateRoute';
import PublicRoute from './helpers/PublicRoute';
// import Index from './dashboard/index'





const App = () => {

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    // <BrowserRouter>
    <Switch>
      <Route path="/dashboard" render={props => <AdminLayout {...props} />} />
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Redirect from="/" to="/dashboard/index" />
    </Switch>
  // </BrowserRouter>
  );
}

export default App;