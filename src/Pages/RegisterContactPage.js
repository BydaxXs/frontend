import React from "react";
import GenericNavbar from "../components/GenericNavbar";
import CreateProviderContact from "../components/CreateProviderContact";

export default function RegisterContactPage(){
    return(
        <>
        <GenericNavbar/>
        <br/>
        <div className="container">
            <CreateProviderContact/>
        </div>
        </>
    )
}