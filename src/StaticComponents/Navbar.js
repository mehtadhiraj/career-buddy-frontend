import React from 'react';
import { Link } from "react-router-dom";

function Navbar(props){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-custom">
            <a className="navbar-brand" href="/">Career Buddy</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                        {/* <a className="nav-link" href="/">Login</a> */}
                    </li>
                    {props.isAuthenticated ?  
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile</Link>
                                {/* <a className="nav-link" href="/">Login</a> */}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/career">Career Suggestions</Link>
                                {/* <a className="nav-link" href="/">Login</a> */}
                            </li>  
                            <li className="nav-item">
                                <Link className="nav-link" to="/login" onClick = {props.logOut}>Logout</Link>
                                {/* <a className="nav-link" href="/">Login</a> */}
                            </li>
                        </>    
                            : 
                        <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                                {/* <a className="nav-link" href="/">Login</a> */}
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Register</Link>
                                {/* <a className="nav-link" href="/">Register</a> */}
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;