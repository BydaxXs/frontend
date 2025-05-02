import React from "react";
import GenericNavbar from "../components/GenericNavbar";
import SearchTax from "../components/SearchTax";

export default function SearchTaxPage(){
    return(
        <>
        <GenericNavbar />
        <br/>
        <div className="container">
            <SearchTax />
        </div>
        </>
    )
}