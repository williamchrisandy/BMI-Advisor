import React, { useState, useEffect, useRef } from "react";
import {NavLink} from "react-router-dom";

export default function NavBar({username})
{
    const [height, setHeight] = useState(0);
    const ref = useRef(null);

    const showLogin =
    () =>
    {
        if(username != "")
        {
            return(
                <li className="nav-item">
                    <NavLink className ="nav-link" to="/logout">Logout</NavLink>
                </li>
            );
        }
        else
        {
            return(
                <li className="nav-item">
                    <NavLink className ="nav-link" to="/login">Login</NavLink>
                </li>
            );
        }
    }

    const spacing =
    () =>
    {
        return(
            <div style={{height: height + "px"}}></div>
        );
    }

    useEffect
    (
        () =>
        {
            setHeight(ref.current.clientHeight);
        }
    )

    return(
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light" ref={ref}>
                <div className="container-fluid">
                    <NavLink className ="navbar-brand" to="/">BMI Advisor</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className ="nav-link" to="/">Stats</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className ="nav-link" to="/calculator">Calculator</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className ="nav-link" to="/advisor">Advisor</NavLink>
                            </li>
                            {showLogin()}
                        </ul>
                    </div>
                </div>
            </nav>
            {spacing()}
        </div>
    );
}