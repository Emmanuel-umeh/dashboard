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
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import {connect} from "react-redux"
import routes, { authRoutes} from "routes.js";

import {loadUser} from "../action/authActions"

class Admin extends React.Component {

//   constructor(props){
//     super(props);

// // this.props.loadUser()
   
//   }

  // componentDidMount(){
  //   const {type} = this.props.auth
  //   console.log({user})
  //   if (!user){
  //     console.log("location no user ", window.location)
  //     // window.location.href = "/auth/login"
  //   }

  // }
  componentDidUpdate(prevProps) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;

    const {type} = this.props.auth
    console.log({type})
    if(type == "AUTH_ERROR"){
      this.props.history.push("/auth/login")
    }
  }
  getRoutes = authRoutes => {
    // console.log({authRoutes})
    return authRoutes.map((prop, key) => {
      if (prop.layout === "/dashboard") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={authRoutes}
          // logo={{
          //   innerLink: "/dashboard/index",
          //   imgSrc: require("assets/img/brand/argon-react.png"),
          //   imgAlt: "..."
          // }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            {this.getRoutes(authRoutes)}
            <Redirect from="*" to="/dashboard/index" />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default  withRouter (connect(mapStateToProps, {loadUser})(Admin));
