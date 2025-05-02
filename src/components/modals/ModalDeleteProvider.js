import React from "react";

export default function ModalDeleteProvider(props){
    //PASAR DATOS POR PROPS A LA MODAL PARA OPERAR
    return(
        <>
        <div className="modal" id={props.id} aria-labelledby={props.label} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {/* <h4 className="modal-title fs-5"></h4> */}
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                    </div>
                    <div className="modal-body">
                        ¿Estas seguro de eliminar este registro?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-danger" onClick={props.Click}>Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}