import React from "react";

export default function PasswordInput(props){
    return(
        <>
            <input
            type = 'password' 
            className = "form-control"
            required
            autoComplete = "off"
            onChange = {props.onChange}
            onBlur = {props.onBlur}
            />
        </>
    )
}