import React from 'react';
import axios from 'axios';
import PathModal from "./PathModal";
class Career extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            path: [],
            search: "",
            goalBased: []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:3001/user/allcareer")
            .then(response=>{
                console.log(response);
                this.setState({
                    path: response.data
                })
            })
            .catch(error=>{
                console.log(error);
                
            })
    }

    handleChange = (event)=>{
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    postSearch = (route,search)=>{
        axios.post("http://localhost:3001/user/"+route, search)
            .then(response=>{
                console.log(response);
                this.setState({
                    search: "",
                    path: response.data
                })
            })
            .catch(error=>{
                console.log(error);
            })
    }

    click = (event)=>{
        event.preventDefault();
        this.postSearch('goalscareer', {userId: this.props.logInState.user._id})
    }

    handleSubmit = (event)=>{
        event.preventDefault();
        this.postSearch('searchcareer', {search: this.state.search});
    }

    render(){
        return(
            <div className="container">
                <h1 className="mt-3">Define Your Career Path</h1>
                <form className="form-inline" align="center" onSubmit = {this.handleSubmit} method="post">
                    <input type="text" name="search" className="form-control mr-2" value={this.state.search}
                        onChange = {this.handleChange}
                        placeholder="Enter your career option."
                    />
                    <input type="submit" className="btn btn-custom pl-5 pr-5" value="Search"/>
                </form>
                <h3 className="mt-5">Our career sugesstions.</h3> 
                {
                    this.props.logInState.isAuthenticated && 
                        <a href="/" className="mb-3 btn btn-custom" onClick = {this.click}>Search Career Based on my goals.</a>
                }
                <div className="row">
                    {
                        this.state.path.map((p, index)=>{
                            return(
                                <div className="card mr-3 mb-3" key={index}>
                                    <div className="card-header">
                                        {p.careerPath.name}
                                    </div>
                                    <div className="card-body">
                                        <b>Job Oppourtinity : </b> {p.careerPath.job} <br/>
                                        <b>Approximate Salary : </b> {p.careerPath.salary} 
                                        {
                                            p.careerPath.path.map((pa,key) => {
                                                return(
                                                    <div key={"0"+key}>
                                                        <b>Steps : </b> {pa.courses.split(",").length} <br/>
                                                        <b>Path : </b> {pa.courses}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    {/* <PathModal index={index} path={p.careerPath.path}/> */}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Career;