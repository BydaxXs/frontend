import React from "react";

export default function LabelInputDisabled(props){
    return(
        <>
        <div className={props.class}>
            <label className="form-label">{props.children}</label>
            <input type="text" readOnly className="form-control-plaintext" value={props.value}/>
        </div>
        </>
    )
}