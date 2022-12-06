import React, { useState, useEffect } from "react";
import {Navigate} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { query, limit, orderBy, collection, getFirestore, getDocs} from "firebase/firestore";
import MyChart from "../components/MyChart"

export default function Home({username})
{
    const [data, setData] = useState(null);

    useEffect
    (
        () =>
        {
            if(data == null && username != "")
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
                const q = query(collection(db, "BMI Data/"+ username + "/BMI Data"), orderBy("timestamp", "desc"), limit(30));
                getDocs(q)
                .then
                (
                    docSnap =>
                    {
                        let newData = docSnap.docs;
                        setData(newData);
                    }
                );
            }
        }
    )

    if(username == "")
    {
        return <Navigate to="/login"/>;
    }

    var loadChart =
    () =>
    {
        if(data == null) return(<p className="card-text fw-bold ">No Data</p>);
        else return(<MyChart rawData={data}/>);
    }


    var loadTable =
    () =>
    {
        if(data == null) return(<p className="card-text fw-bold ">No Data</p>);
        else
        {
            const mappedData = data.map
            (
                individualData =>
                {
                    console.log("Test");
                    let displayedData = individualData.data()
                    return(
                        <div className="card mx-auto my-1" >
                            <div className="card-body">
                                <div className="row mx-1" key={individualData.id}>
                                    <div className="col-lg-8">{"" + displayedData.timestamp.toDate()}</div>
                                    <div className="col-lg-4">{displayedData.weightStatus + " (BMI Index: "+Number(Math.round(displayedData.bmiIndex+'e2')+'e-2') +")"}</div>
                                </div>
                            </div>
                        </div>
                    );
                }
            );
            return mappedData;
        }
    }

    return(
        <div className="row mx-5">
            <div className="col-md-4">
                <div className="card mx-auto my-5" >
                    <h5 className="card-title text-center mt-4">{username}'s BMI Graph</h5>
                    <div className="card-body">
                        {loadChart()}
                    </div>
                </div>
            </div>
            <div className="col-md-8">
            <div className="card mx-auto my-5" >
                <h5 className="card-title text-center mt-4">{username}'s BMI Status</h5>
                    <div className="card-body text-center">
                        {loadTable()}
                    </div>
                </div>
            </div>
        </div>
    );
}