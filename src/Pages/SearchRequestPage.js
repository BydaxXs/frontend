import React from "react";
import GenericNavbar from "../components/GenericNavbar";
import SearchRequest from "../components/SearchRequest";

export default function SearchRequestPage(){
    return(
        <>
        <GenericNavbar/>
        <br/>
        <div className="container">
            <SearchRequest/>
        </div>
        </>
    )
}