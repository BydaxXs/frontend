import React from "react";

export default function LabelPasswordInput(props){
    return(
        <>
        <div className={props.class}>
            <label className="form-label">{props.children}</label>
            <input className="form-control border-dark password" type="password" placeholder={props.placeholder} onChange={props.function} value={props.value}/>
        </div>
        </>
    )
}