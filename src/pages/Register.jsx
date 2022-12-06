import React from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

export default function Register()
{
    let navigate = useNavigate();
    const firebaseConfig =
    {
        apiKey: "AIzaSyALeBCG2ZK5PBP_zGMQ_u0VbRTVY51FKqE",
        authDomain: "bmi-advisor.firebaseapp.com",
        projectId: "bmi-advisor",
        storageBucket: "bmi-advisor.appspot.com",
        messagingSenderId: "33819263846",
        appId: "1:33819263846:web:343a2cd62f26f3e0363ea7"
    };
    
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    let register =
    ()=>
    {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirm-password").value;

        if(username == "" || password == "" || confirmPassword == "") alert("Input cannot be empty");
        else if(password != confirmPassword) alert("Password doesn't match with confirmation password");
        else
        {
            const docRef = doc(db, "User", username);
            getDoc(docRef)
            .then
            (
                docSnap =>
                {
                    if (docSnap.exists()) alert("Username already taken");
                    else
                    {
                        setDoc
                        (
                            doc(db, "User", username),
                            {
                                password: password
                            }
                        );
                        alert("Registration Successful");
                        navigate("/login");
                    }
                }
            )
        }
    }

    return(
        <div className="card mx-auto my-5" style={{width: 18 + "rem"}}>
            <h5 className="card-title text-center mt-4">Register</h5>
            <div className="card-body">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Username" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirm-password" placeholder="Password" required/>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary mx-3" onClick={register}>Register</button>
                </div>
                <div className="mb-3 text-center">
                    <button className="btn btn-link mx-3" onClick={() =>{navigate("/login");}}>Login</button>
                </div>
            </div>
        </div>
    );
}