import React, { Component } from 'react';
import {useDropzone} from 'react-dropzone';
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
  import {loadUser, witnessUpload} from "action/authActions"

import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import AWN from "awesome-notifications"


var notifier = new AWN
 class UploadVideo extends Component{

    componentDidMount(){
        let id = this.props.match.params.id;

        // id is the id of the user that this user wil be a witness to
        console.log({id})

        this.props.loadUser()
    }


    componentDidUpdate(prevProps) {
        let id = this.props.match.params.id;
      
        const {type} = this.props.auth
        console.log({type})
        if(type == "AUTH_ERROR"){

            if(id){
                this.props.history.push(`/auth/register?ref=${id}`)
            }else{
                this.props.history.push(`/auth/login`)
            }
         
        }
      }
    _handleUpload =(files)=>{
        let id = this.props.match.params.id;
        const {user} =this.props.auth   
        const fd= new FormData()
        let s = this.props.match.params.id;
        
        const file =  files[0]
        console.log({file})

        if(!file){
            return alert("Please upload a video")
        }
        fd.append("file", file)
        fd.append("id", id)
        fd.append("email", user.email)

        fd.append("name", user.name)

        console.log(user.email)

        this.props.witnessUpload(fd)

    }
      render(){
          return(

<Video _handleUpload = {this._handleUpload} />
          )
      }
  }
  
 function Video(props) {

    console.log({props})
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  console.log({acceptedFiles})
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {Math.ceil(file.size /1024)} Kb
    </li>
  ));




  return (


    <>
    <Col lg="12" md="8">
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-5">
          <div className="text-muted text-center mt-2 mb-4">
            <h1>Upload A Video</h1>
          </div>
          <div className="text-center">
           
            
          </div>
        </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <h3>Upload A 30 seconds video below claiming you know this user in order to verify </h3>
          </div>
          <Form role="form">
            <FormGroup>
              {/* <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText> 
                    <i className="ni ni-hat-3" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Name" required type="text" />
              </InputGroup> */}
  <Card body>
{/* <div style ={{borderColor : "black"}}> */}
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <center>
        <p style ={{color : "blue"}}>Drag 'n' drop video or click to select video</p>
        </center>
      
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    {/* </div> */}

    </Card>
            </FormGroup>
       
         
            {/* <Row className="my-4"> */}
                
                <center>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  {/* <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/google.svg")}
                    />
                  </span> */}
                  
                  <span className="btn-inner--text" onClick = {()=>{
                  props._handleUpload(acceptedFiles)
                  }}>Upload</span>
                </Button>
                </center>
              {/* <Col xs="12"> */}
        
              {/* </Col> */}
            {/* </Row> */}
            <div className="text-center">
              {/* <Button className="mt-4" color="primary" type="button" onClick ={this._handleSubmit}>
                Create account
              </Button> */}
            </div>
          </Form>
        </CardBody>
     
     
     
      </Card>
    </Col>
  </>

  );
}

{/* <UploadVideo /> */}


const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.error,
  });
  
  export default withRouter( connect(mapStateToProps, {loadUser,witnessUpload})(UploadVideo));
  