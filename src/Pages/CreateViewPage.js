import React from "react";
import GenericNavbar from "../components/GenericNavbar";
import CreateView from "../components/CreateView";
export default function CreateViewPage(){
    return(
        <>
        <GenericNavbar/>
        <br/>
        <div className="container">
            <CreateView/>
        </div>
        </>
    )
}