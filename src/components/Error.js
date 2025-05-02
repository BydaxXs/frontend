import React from "react";
import {useParams} from "react-router-dom"

export default function Error(){
    const { code, message } = useParams();
    return(
        <>
        <div class="d-flex align-items-center justify-content-center vh-100">
            <div class="text-center">
                <h1 class="display-1 fw-bold">{code}</h1>
                <p class="fs-3"> <span class="text-danger">Opps!</span></p>
                <p class="lead">
                    {message}
                  </p>
                <a href="index.html" class="btn btn-primary">Go Home</a>
            </div>
        </div>
        </>
    )
}