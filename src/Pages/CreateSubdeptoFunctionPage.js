import React from "react";
import GenericNavbar from "../components/GenericNavbar";
import CreateSubdeptoFunction from '../components/CreateSubdeptoFunction';

export default function CreateSubdeptoFunctionPage(){
    return(
        <>
        <GenericNavbar/>
        <br/>
        <div className="container">
            <CreateSubdeptoFunction/>
        </div>
        </>
    )
}