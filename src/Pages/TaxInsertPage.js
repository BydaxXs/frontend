import React from "react";
import TaxInsert from "../components/TaxInsert";
import GenericNavbar from "../components/GenericNavbar";

export default function TaxInsertPage(){
    return(
        <>
        <GenericNavbar/>
        <br/>
        <div className="container">
            <TaxInsert/>
        </div>
        </>
    )
}