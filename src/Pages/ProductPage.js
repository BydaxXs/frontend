import React from "react";
import GenericNavbar from "../components/GenericNavbar";
import CreateProduct from "../components/CreateProduct";

export default function ProductPage(){
    return(
        <>
        <GenericNavbar/>
        <br/>
        <div className="container">
            <CreateProduct/>
        </div>
        </>
    )
}