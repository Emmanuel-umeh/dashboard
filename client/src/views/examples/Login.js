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
import { Link, withRouter } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";


import {connect} from "react-redux"
import {login, loadUser} from "../../action/authActions"

import AWN from "awesome-notifications"
let notifier = new AWN
class Login extends React.Component {

  componentDidMount(){
    // const {user} = this.props.auth
    this.props.loadUser()
// if(user){
//   this
// }
// console.log({user})
  }



  _handleSubmit =(e)=>{
    e.preventDefault()
    // console.log()
    let ref = new URLSearchParams(window.location.search).get("ref");

    console.log({ref})
    // if(ref){
    //   alert(ref)
    // }
    const email = this.email.value
   
    const password = this.password.value



    if(!email ||!password){
     return notifier.alert("Please Enter All Fields")
    }

    const newUser = {
      email, password, ref
    }
    // redux action here
    console.log({newUser})
    this.props.login(newUser)

  }
  render() {

    // const {user} = this.props.auth
    // if(user){
    //   this.props.history.push("/auth/index")
    // }
    // console.log({user})
    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <h2>Don't Have An Account?</h2>
              </div>
              <div className="btn-wrapper text-center">
              <Link to ="/auth/register"><h4 style ={{color : "blue"}}> Create new account</h4></Link>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <h2>Or sign in with credentials</h2>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" innerRef ={(ref)=>this.email = ref} type="email" autoComplete="new-email"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password"  innerRef ={(ref)=>this.password = ref} type="password" autoComplete="new-password"/>
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Accept our terms and conditions</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="primary" onClick ={this._handleSubmit} type="button">
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            {/* <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <Link to ="/auth/register"><small>Create new account</small></Link>
              </a>
            </Col> */}
          </Row>
        </Col>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default withRouter( connect(mapStateToProps, {login,loadUser})(Login));
