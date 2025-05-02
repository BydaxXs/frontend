import React from "react";
import GenericNavbar from "../components/GenericNavbar";
import CreateDepto from '../components/CreateDepto';

export default function CreateDeptoPage(){
    return(
        <>
        <GenericNavbar/>
        <br/>
        <div className="container">
            <CreateDepto/>
        </div>
        </>
    )
}