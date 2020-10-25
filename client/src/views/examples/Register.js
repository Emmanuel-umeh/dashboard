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
import {connect} from "react-redux"
import {register,registerWitness} from "../../action/authActions"
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
import { withRouter } from "react-router-dom";

class Register extends React.Component {
  constructor(props){
    super(props)


    this.state ={
      witness:false,
      ref : null
    }
  }

  componentDidMount(){

    let ref = new URLSearchParams(window.location.search).get("ref");
    // ref is the id of the user that will be a witness to
    
    if(ref){
      console.log({ref})
      this.setState({
        witness:true,
        ref:ref
      })
    }

  }

  _handleSubmit =(e)=>{
    e.preventDefault()
    // console.log()
    const email = this.email.value
    const witnessEmail = this.witnessEmail.value
    const phoneNumber = this.phoneNumber.value
    const name = this.name.value
    const password = this.password.value
    const address = this.address.value


    if(!email ||!witnessEmail ||!phoneNumber||!name ||!address||!password){
     return alert("Please Enter All Fields")
    }

    var ref = this.state.ref

    const newUser = {
      email, witnessEmail, phoneNumber, name, address,password,ref
    }
    // redux action here
    console.log({newUser})
// if he is not a witness register normally
    if(!this.state.witness){
      this.props.register(newUser)
    }else{

      // take to video upload page after registering
      this.props.registerWitness(newUser)
    }


  }
  render() {
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Sign up with</small>
              </div>
              <div className="text-center">
                <Button
                  className="btn-neutral btn-icon mr-4"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/github.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Github</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/google.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Or sign up with credentials</small>
              </div>
              <Form role="form" onSubmit ={this._handleSubmit}>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Name"  innerRef ={(ref)=>this.name = ref} required type="text" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email"  innerRef ={(ref)=>this.email = ref} required type="email" autoComplete="email"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Witness Email" innerRef ={(ref)=>this.witnessEmail = ref} required type="email" autoComplete="email"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-mobile-button" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Phone Number"  innerRef ={(ref)=>this.phoneNumber = ref} required type="tel" autoComplete="tel"/>
                  </InputGroup>
                </FormGroup>


                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-archive-2" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Address"  innerRef ={(ref)=>this.address = ref} required type="address" autoComplete="address"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password"  innerRef ={(ref)=>this.password = ref} required type="password" autoComplete="password"/>
                  </InputGroup>
                </FormGroup>
                <div className="text-muted font-italic">
                  {/* <small>
                    password strength:{" "}
                    <span className="text-success font-weight-700">strong</span>
                  </small> */}
                </div>
                <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="button" onClick ={this._handleSubmit}>
                    Create account
                  </Button>
                </div>
              </Form>
            </CardBody>
         
         
         
          </Card>
        </Col>
      </>
    );
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default  withRouter( connect(mapStateToProps, {register,registerWitness})(Register));
