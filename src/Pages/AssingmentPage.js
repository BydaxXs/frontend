import React from "react";
import GenericNavbar from "../components/GenericNavbar";
import Assingment from "../components/Assingment"

export default function AssingmentPage(){
    return(
        <>
        <GenericNavbar/>
        <br/>
        <div className="container">
            <Assingment/>
        </div>
        </>
    )
}