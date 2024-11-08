import React from "react";
import GenericNavbar from "../components/GenericNavbar";
import SearchDelivery from "../components/SearchDelivery";

export default function SearchDeliveryPage(){
    return(
        <>
        <GenericNavbar />
        <br/>
        <div className="container">
            <SearchDelivery />
        </div>
        </>
    )
}