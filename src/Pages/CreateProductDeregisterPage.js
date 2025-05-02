import React from "react";
import GenericNavbar from "../components/GenericNavbar";
import CreateProductDeregister from "../components/CreateProductDeregister";

export default function CreateProductDeregisterPage(){
    return(
        <>
        <GenericNavbar/>
        <br/>
        <div className="container">
            <CreateProductDeregister/>
        </div>
        </>
    )
}