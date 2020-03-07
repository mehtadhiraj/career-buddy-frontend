import React from "react";
import careerImage from './career.jpg';
import axios from 'axios';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            path: []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:3001/user/allcareer")
            .then(response=>{
                this.setState({
                    path: response.data
                })
            })
            .catch(error=>{
                console.log(error);
            })
    }

    render(){
        return(
            <>
                <div className="div-wrap m-3">
                    <div className="row">
                        <div className="col-md-8">
                            <h1>Career Buddy</h1>
                            <p>
                                Career Buddy  is the platform where guidance is given to individuals to help them acquire the knowledge, information, skills, and experience necessary to identify career options, and narrow them down to make one career decision. This career decision then results in their social, financial and emotional well-being throughout.  
                            </p>
                        </div>
                            <img src={careerImage} className="col-md-3" alt="" />
                    </div>
                </div>
                <div className="jumbotron m-3">
                    <div className="row">
                        <div class="card border-dark col-md-3 ml-5">
                            <div class="card-header">Choose your Industry</div>
                            <div class="card-body text-dark">
                                {/* <h5 class="card-title">1</h5> */}
                                <p class="card-text">Start by choosing the broad area you want to explore. Does Marketing interest you? Or are you more of a Scientist? Choose your Industry and go from there! </p>
                            </div>
                        </div>
                        <div className="col-md-1">
                            <i className="fas fa-arrow-right mt-5"></i>
                        </div>
                        <div class="card border-dark col-md-3">
                            <div class="card-header">Narrow by Career Path</div>
                            <div class="card-body text-dark">
                                {/* <h5 class="card-title">2</h5> */}
                                <p class="card-text">Now, make your options simpler by selecting a Career Path. For example, Banking and Insurance are two Career Paths in the Finance Industry. </p>
                            </div>
                        </div>
                        <div className="col-md-1">
                            <i className="fas fa-arrow-right mt-5"></i>
                        </div>
                        <div class="card border-dark col-md-3">
                            <div class="card-header">Discover Occupations</div>
                            <div class="card-body text-dark">
                                {/* <h5 class="card-title">3</h5> */}
                                <p class="card-text">Finally, discover the different Occupations in your Career Path and see a list of the best training courses for the job that interests you. </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" m-5">
                    <h2>Career Options</h2> 
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
                                                            <b>Path : </b> {pa.courses.replace(/,/g, " -->")}
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
            </>
        )
    }
}

export default Home;