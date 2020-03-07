import React from "react";
import axios from "axios";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            educationDetails: [
                {
                    key: 0,
                    course: "",
                    marks: "",
                    courseStatus: ""
                }
            ],
            goals: ""
        }
    }

    componentDidMount() {
        this.getProfile();
    }

    handleChange = (event) => {
        let targetName = event.target.name.split("-")[0];
        let index = event.target.name.split("-")[1];
        let educationDetails = this.state.educationDetails;
        educationDetails[index][targetName] = event.target.value;
        this.setState({
            educationDetails: educationDetails
        })

    }

    addFields = (event) => {
        event.preventDefault();
        let educationDetails = this.state.educationDetails;
        let length = educationDetails.length;
        educationDetails.push({
            key: length,
            course: "",
            marks: "",
            courseStatus: ""
        });
        this.setState({
            educationDetails: educationDetails
        })
    }

    getProfile = () => {
        try {
            axios.get("http://localhost:3001/user/profile/" + this.props.logInState.user._id)
                .then(response => {
                    console.log(response);
                    this.setFetchData(response);
                })
                .catch(error => {
                    console.log(error);
                })
        } catch (error) {

        }
    }

    setFetchData = (response) => {
        let educationDetails = response.data.educationDetails.map((details, index) => {
            details = {
                course: details.course,
                marks: details.marks,
                courseStatus: details.courseStatus,
                key: index
            }
            return details;
        })
        this.setState({
            educationDetails: educationDetails,
            goals: response.data.goals.toString()
        })
        return;
    }

    postProfile = (params) => {
        console.log(params);
        axios.post("http://localhost:3001/user/profile", params)
            .then(response => {
                console.log(response);
                this.setFetchData(response);
            })
            .catch(error => {
                console.error(error);
            })
    }

    changeField = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        let goals = this.state.goals;
        let params = {
            userId: this.props.logInState.user._id,
            educationDetails: this.state.educationDetails,
            goals: goals.split(",")
        }
        await this.postProfile(params);
        this.getProfile();
    }



    render() {
        return (
            <div >
                {
                    this.props.logInState.isAuthenticated ?
                        <>
                            <div className="mt-5">
                                <h2 align="center">Welcome {this.props.logInState.user.name}</h2>
                                <p align="center">
                                    Add Education details
                                </p>
                            </div>
                            <div className="container">
                                <div>
                                    <form onSubmit={this.handleSubmit} method="post" className="div-wrap m-5">
                                        <label htmlFor="education">Education Details</label>&nbsp;&nbsp;
                                    <button onClick={this.addFields} className="btn btn-custom float-right"><i className="fas fa-plus"></i> Add</button>
                                        {
                                            this.state.educationDetails.map(details => {
                                                return (
                                                    <div key={details.key}>
                                                        <div className="form-group">
                                                            <label htmlFor={'course' + details.key}>Course</label><br />
                                                            <input className="form-control" type="text" name={'course-' + details.key} id={'course' + details.key}
                                                                value={details.course}
                                                                onChange={this.handleChange}
                                                            /> <br />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor={"marks" + details.key}>Marks</label> <br />
                                                            <input className="form-control" type="number" name={'marks-' + details.key} id={"marks" + details.key}
                                                                value={details.marks}
                                                                onChange={this.handleChange}
                                                            /> <br />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor={"courseStatus" + details.key}>Course Status</label> <br />
                                                            <input type="radio" name={"courseStatus-" + details.key} checked={details.courseStatus === "1"}
                                                                value={1}
                                                                onChange={this.handleChange}
                                                            />&nbsp;&nbsp;
                                                        <label className="form-check-label">Completed</label> <br />
                                                            <input type="radio" name={"courseStatus-" + details.key} checked={details.courseStatus === "0"}
                                                                value={0}
                                                                onChange={this.handleChange}
                                                            />&nbsp;&nbsp;
                                                        <label className="form-check-label">Pursuing</label>

                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="form-group">
                                            <label htmlFor={"goals"}>Goals</label> <br />
                                            <input className="form-control" type="text" name={'goals'} id={"goals"}
                                                value={this.state.goals}
                                                onChange={this.changeField}
                                            />
                                        </div> <br />
                                        <div className="form-group">
                                            <input className="form-control btn btn-custom" type="submit" name="submit" value="Submit" onClick={this.handleSubmit} />
                                        </div>
                                    </form>
                                </div>



                            </div>
                        </>
                        :
                        this.props.history.push('/login')
                }
            </div>
        )
    }
}

export default Profile;