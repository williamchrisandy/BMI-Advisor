import React from "react";
import { initializeApp } from "firebase/app";
import { doc, setDoc, getFirestore, serverTimestamp, } from "firebase/firestore";

export default function Calculator({username})
{
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

    var bmiIndex;
    var weightStatus;

    let calculate =
    ()=>
    {
        let height = document.getElementById("height").value;
        let weight = document.getElementById("weight").value;

        if(height == "" || weight == "") alert("Input cannot be empty");
        else
        {
            bmiIndex = weight/(height/100*height/100);
            
            if(bmiIndex < 18.5) weightStatus = "Underweight";
            else if(bmiIndex >= 18.5 && bmiIndex < 25) weightStatus = "Normal";
            else if(bmiIndex >= 25 && bmiIndex < 30) weightStatus = "Overweight";
            else if(bmiIndex >= 30) weightStatus = "Obesity";

            alert("BMI Index: " + Number(Math.round(bmiIndex+'e2')+'e-2') + "\nWeight Status: " + weightStatus);
        }
    }

    let calculateAndSave =
    ()=>
    {
        if(username == "")
        {
            alert("You must logged in to access this feature");
        }
        else
        {
            calculate();
            setDoc
            (
                doc(db, "BMI Data/"+ username + "/BMI Data/" + Date()),
                {
                    timestamp: serverTimestamp(),
                    bmiIndex: bmiIndex,
                    weightStatus: weightStatus
                }
            );
        }
    }

    return(
        <div className="card mx-auto my-5" style={{width: 18 + "rem"}}>
            <h5 className="card-title text-center mt-4">BMI Calculator</h5>
            <div className="card-body">
                <div className="mb-3">
                    <label htmlFor="weight" className="form-label">Weight</label>
                    <input type="number" className="form-control" id="weight" placeholder="Weight (in kg)" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="height" className="form-label">Height</label>
                    <input type="number" className="form-control" id="height" placeholder="Height (in cm)" required/>
                </div>
                <div className="mb-3 text-center">
                    <button type="submit" className="btn btn-primary mx-3" onClick={calculateAndSave}>Calculate</button>
                </div>
                <div className="mb-3 text-center">
                    <button className="btn btn-light mx-3" onClick={calculate}>Calculate Without Save</button>
                </div>
            </div>
        </div>
    );
}