import React from "react";
import GenericNavbar from "../components/GenericNavbar";
import CreateCountryCommune from "../components/CreateCountryCommune";

export default function CreateCountryCommunePage(){
    return(
        <>
        <GenericNavbar/>
        <br/>
        <div className="container">
            <CreateCountryCommune/>
        </div>
        </>
    )
}