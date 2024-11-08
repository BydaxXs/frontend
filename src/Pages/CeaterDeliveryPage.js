import React from "react";
import GenericNavbar from "../components/GenericNavbar";
import CreateDeliveryOrder from "../components/CreateDeliveryOrder";

export default function CreateDeliveryPage(){
    return(
        <>
        <GenericNavbar/>
        <br/>
        <div className="container">
            <CreateDeliveryOrder/>
        </div>
        </>
    )
}