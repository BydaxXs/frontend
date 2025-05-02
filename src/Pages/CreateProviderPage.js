import React from "react";
import GenericNavbar from "../components/GenericNavbar";
import CreateProvider from "../components/CreateProvider";

export default function CreateProviderPage(){
    return(
        <>
        <GenericNavbar/>
        <br/>
        <div className="container">
            <CreateProvider/>
        </div>
        </>
    )
}