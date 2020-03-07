import React from 'react';
import axios from 'axios';
import { setHeader, setToken } from '../services/auth';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            contact: "",
            password: ""
        }
    }

    handleChange = (event)=>{
        this.setState({
            [event.target.name] : event.target.value
        });
    }
    
    handleSubmit = (event)=>{
        // console.log(this.state);
        event.preventDefault();
        axios.post('http://localhost:3001/register', this.state)
            .then((response)=>{
                // console.log(response);
                if(response.data.status === 204){
                    console.log(response);
                }else{
                    // console.log(response);
                    setHeader(response.data.token);
                    setToken(response.data.token); 
                    this.props.logIn(response.data.user);
                    this.props.history.push('/profile');
                }
            })
            .catch((error)=>{
                console.log(error.toString());
            })
        this.setState({
            name: "",
            email: "",
            contact: "",
            password: ""
        });
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div className="mt-5 col-md-12 col-sm-12 div-wrap">
                        <h1 align="center">
                            Career Buddy Registration
                        </h1><br/>
                        <form method="POST">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Name</label>
                                <input type="text" className="form-control" name="name" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    onChange = {this.handleChange}
                                    value= {this.state.name}
                                    required={true}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact">Contact</label>
                                <input type="number" maxLength= {10} minLength ={10} className="form-control" name="contact" id="contact" 
                                    onChange = {this.handleChange}
                                    value= {this.state.contact}
                                    required={true}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail2">email</label>
                                <input type="email" className="form-control" name="email" id="exampleInputEmail2" aria-describedby="emailHelp"
                                    onChange = {this.handleChange}
                                    value= {this.state.email}
                                    required={true}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword4">Password</label>
                                <input type="password" className="form-control" name="password" id="exampleInputPassword4" 
                                    onChange = {this.handleChange}
                                    value= {this.state.password}
                                    required={true}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="role">Password</label>
                                <input type="text" className="form-control" name="role" id="role" 
                                    onChange = {this.handleChange}
                                    value= {'user'}
                                    required={true}
                                />
                            </div>
                            <button type="submit" className="btn btn-custom container" onClick = {this.handleSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;