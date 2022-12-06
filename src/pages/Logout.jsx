import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({x, parentCallback})
{
    let navigate = useNavigate();

    if(x == false)
    {
        x = true;
        parentCallback("");
        navigate("../", { replace: true });
    }

    return <div></div>
}