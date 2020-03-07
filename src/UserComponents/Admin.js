import React from "react";
import axios from "axios";

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            salary: "",
            job: "",
            prerequisite: "",
            path: [{
                key: 0,
                pros: "",
                cons: "",
                courses: ""
            }]
        }
    }

    addField = (event) => {
        event.preventDefault();
        let path = this.state.path;
        let length = path.length;
        path.push({
            key: length,
            pros: "",
            cons: "",
            courses: ""
        });
        this.setState({
            path: path
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handlePathChange = (event) => {
        let targetName = event.target.name.split("-")[0];
        let index = event.target.name.split("-")[1];
        let path = this.state.path;
        path[index][targetName] = event.target.value;
        this.setState({
            path: path
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let params = {
            name: this.state.name,
            salary: this.state.salary,
            job: this.state.job,
            prerequisite: this.state.prerequisite,
            path: this.state.path
        }
        axios.post("http://localhost:3001/user/admin", params)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="container">
                <form action="POST" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Career name</label><br />
                        <input className="form-control" type="text" name="name" id="name" value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </div> <br />
                    <div className="form-group">
                        <label htmlFor="salary">Approx. Salary</label> <br />
                        <input className="form-control" type="text" name="salary" id="salary" value={this.state.salary}
                            onChange={this.handleChange}
                        /> 
                    </div> <br />
                    <div className="form-group">
                        <label htmlFor="job">Job Availability</label> <br />
                        <input className="form-control" type="text" name="job" id="job" value={this.state.job}
                            onChange={this.handleChange}
                        /> 
                    </div> <br />
                    <div className="form-group">
                        <label htmlFor="prerequisite">Reuired Prerequisite</label> <br />
                        <input className="form-control" type="text" name="prerequisite" id="prerequisite" value={this.state.prerequisite}
                            onChange={this.handleChange}
                            placeholder="eg: 10th,12th courses"
                        />
                    </div> <br />
                    <div className="form-group">
                        <label htmlFor="path">Path that can be followed.</label> <br />
                        <button  className="btn btn-custom float-right" onClick={this.addField} tooltip="add new path"><i class="fas fa-plus"></i> Add New Path</button><br/>
                        {
                            this.state.path.map(p => {
                                return (
                                    <div key={p.key}>
                                        <label htmlFor={"courses-" + p.key}>Courses</label><br />
                                        <input className="form-control" type="text" name={"courses-" + p.key} id={"courses-" + p.key} value={p.courses}
                                            onChange={this.handlePathChange}
                                            placeholder="',' Seperated step by step path. eg: HTML, CSS, JS, PHP, MYSQL"
                                        /> <br />
                                        <label htmlFor={"pros-" + p.key}>Pros of this path.</label><br />
                                        <input className="form-control" type="text" name={"pros-" + p.key} id={"pros-" + p.key} value={p.pros}
                                            onChange={this.handlePathChange}
                                        /> <br />
                                        <label htmlFor={"cons-" + p.key}>Cons of this path.</label><br />
                                        <input className="form-control" type="text" name={"cons-" + p.key} id={"cons-" + p.key} value={p.cons}
                                            onChange={this.handlePathChange}
                                        /> <br />
                                    </div>
                                )
                            })
                        }
                        <input className="form-control btn btn-success" type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        )
    }
}

export default Admin;