import React from "react";
import GenericNavbar from "../components/GenericNavbar";
import AssingViews from "../components/AssingViews";

export default function AssingViewsPage(){

    return(
        <>
        <GenericNavbar/>
        <br/>
        <div className="container">
            <AssingViews/>
        </div>
        </>
    )
}