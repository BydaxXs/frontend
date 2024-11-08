import React from "react";
import GenericNavbar from "../components/GenericNavbar";
import AssingProductProvider from "../components/AssingProductProvider";

export default function AssingProductProviderPage(){
    return(
        <>
        <GenericNavbar/>
        <br/>
        <div className="container">
            <AssingProductProvider/>
        </div>
        </>
    )
}