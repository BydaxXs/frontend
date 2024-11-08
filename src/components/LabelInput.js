import React from "react";

export default function LabelInput(props){
    return(
        <>
        <div className={props.class}>
            <label className="form-label">{props.children}</label>
            <input type="text" className="form-control border-dark" placeholder={props.placeholder} onChange={props.function} value={props.value}/>
        </div>
        </>
    )
}