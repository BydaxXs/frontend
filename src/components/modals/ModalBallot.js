import React from "react";
import Ballot from "../Ballot";

export default function Modal(props){
    return(
        <>
        <div className="modal" id={props.id} aria-labelledby={props.label} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title fs-5" id={props.label}>Imagen de refencia</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Ballot/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}