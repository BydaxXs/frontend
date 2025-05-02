import React, {useContext} from "react";
import GenericNavbar from "../components/GenericNavbar";
import { AuthContext } from '../context/AuthContext';

export default function Landing(){
    const { message, userData } = useContext(AuthContext);
    return(
        <div>
            <GenericNavbar/>
            <div className="container">
                <br/>
                <br/>
                <br/>
                <br/>
                <h4 className="fw-bold py-3 mb-4 text-white">{message}</h4>
                <br/>
                <h4 className="fw-bold py-3 mb-4 text-white">{userData}</h4>
            </div>
        </div>
    )
}