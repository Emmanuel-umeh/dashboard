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
import ImageUploader from 'react-images-upload';
 
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
import AWN from "awesome-notifications"
import { withRouter } from "react-router-dom";


let notifier = new AWN
class Register extends React.Component {
  constructor(props){
    super(props)


    this.state ={
      witness:false,
      ref : null,
      pictures: [] 
    }
  }

  onDrop = (picture) => {
    console.log({picture})
    this.setState({
        pictures: this.state.pictures.concat(picture),
    });
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
    const fd = new FormData()
    const email = this.email.value
    const witnessEmail = this.witnessEmail.value
    const phoneNumber = this.phoneNumber.value
    const name = this.name.value
    const password = this.password.value
    const address = this.address.value
 const confirm_password = this.confirm_password.value

console.log(this.state.pictures.length)
    if(!email ||!witnessEmail ||!phoneNumber||!name ||!address||!password ||!confirm_password ||this.state.pictures.length == 0){
     return notifier.alert("Please Enter All Fields")
    }

    if(password != confirm_password){
      return notifier.alert("Passwords do not match")
    }

        // console.log()
   
    var ref = this.state.ref
    fd.append("file", this.state.pictures[0])
    fd.append("email", this.email.value)
    fd.append("witnessEmail",this.witnessEmail.value)
    fd.append("phoneNumber", this.phoneNumber.value)
    fd.append("name",  this.name.value)
    fd.append("password",this.password.value)
    fd.append("address", this.address.value)


// if he is not a witness register normally
    if(!this.state.witness){
      this.props.register(fd,ref)
    }else{

      // take to video upload page after registering
      this.props.registerWitness(fd,ref)
    }


  }
  render() {
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
         <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <h2>Sign up with credentials</h2>
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
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Confirm Password"  innerRef ={(ref)=>this.confirm_password = ref} required type="password" autoComplete="password"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                <ImageUploader
                withIcon={true}
                buttonText='Upload a Clear Profile Picture'
                onChange={this.onDrop}
                withPreview = {true}
                imgExtension={['.jpg', '.jpeg', '.png', '.gif']}
                maxFileSize={5242880}
            />
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
