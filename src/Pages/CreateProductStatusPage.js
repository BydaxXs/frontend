import React from "react";
import GenericNavbar from "../components/GenericNavbar";
import CreateProductStatus from "../components/CreateProductStatus";

export default function CreateProductStatusPage(){
    return(
        <>
        <GenericNavbar/>
        <br/>
        <div className="container">
            <CreateProductStatus/>
        </div>
        </>
    )
}