import React from 'react';
import axios from 'axios';
import { setHeader, setToken } from '../services/auth';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
            // error: null,
            // alertType: "info"
        }
    }

    fieldChange = (event)=>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event)=>{
        event.preventDefault();
        let params = {
            email: this.state.email,
            password: this.state.password,
        }
        this.setState({
            email: "",
            password: ""
            // error: "Logging in. Please wait ... ",
            // alertType: "info"
        })
        // console.log(params);
        // console.log(process.env.DEV_HOST)
        axios.post('http://localhost:3001/login', params)
            .then((response)=>{
                // console.log(response);
                if(response.data.status === 204){
                    this.setState({
                        error: response.data.message,
                        alertType: 'danger'
                    })    
                }else{
                    setHeader(response.data.token);
                    setToken(response.data.token);
                    let user = response.data.user;
                    this.props.logIn(user);
                    this.props.history.push("/");
                }
                 
            })
            .catch((error)=> {
                console.log(error);
                this.setState({
                    error: error.message,
                    alertType: 'danger'
                })
            })
    }

    render(){
        return(
            <div>
                <div className="container login">
                    {
                        this.state.error &&
                            <div className={"alert alert-"+this.state.alertType+" col-md-6 offset-md-3"} role={this.state.alertType} >
                                { this.state.error }
                            </div> 
                    }
                    <div className="col-md-6 col-sm-12 offset-md-3 div-wrap">
                        <h1 align="center">
                            Career Buddy Login
                        </h1><br/>
                        <form method="POST" onSubmit = {this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <input type="text" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    onChange = {this.fieldChange}
                                    value= {this.state.email}
                                    required={true}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Enter wallet key</label>
                                <input type="password" className="form-control" name="password" id="exampleInputPassword1" 
                                    onChange = {this.fieldChange}
                                    value= {this.state.password}
                                    required={true}
                                />
                            </div>
                            <button type="submit" className="btn btn-custom container">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;