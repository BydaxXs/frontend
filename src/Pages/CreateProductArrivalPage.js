import React from "react";
import GenericNavbar from "../components/GenericNavbar";
import CreateProductArrival from "../components/CreateProductArrival";

export default function CreateProductArrivalPage(){
    return(
        <>
        <GenericNavbar/>
        <br/>
        <div className="container">
            <CreateProductArrival/>
        </div>
        </>
    )
}