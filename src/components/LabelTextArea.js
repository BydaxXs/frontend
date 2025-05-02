import React from "react";

export default function LabelTextArea(props){
    return(
        <>
        <div className={props.class}>
            <label className="form-label">{props.label}</label>
            <textarea readOnly className="form-control-plaintext" value={props.value}/>
        </div>
        </>
    )
}