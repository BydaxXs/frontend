import React from "react";
import GenericNavbar from "../components/GenericNavbar";
import SearchProvider from "../components/SearchProvider";

export default function SearchProviderPage(){
    return(
        <>
        <GenericNavbar/>
        <br/>
        <div className="container">
            <SearchProvider/>
        </div>
        </>
    )
}