import React from "react";
import GenericNavbar from "../components/GenericNavbar";
import CreateRequest from "../components/CreateRequest";

export default function CreateRequestPage(){
    return(
        <>
        <GenericNavbar/>
        <br/>
        <div className="container">
            <CreateRequest/>
        </div>
        </>
    )
}