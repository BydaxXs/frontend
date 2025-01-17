import React from "react";
import LabelInput from "./LabelInput";


export default function CreateSubdeptoFunction(){
    return(
        <>
        <h4 className="fw-bold py-3 mb-4 text-white">
            <span className="text-muted fw-light">Datos / </span> Registrar funcion de subdepartamento
        </h4>
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="card-header">Registrar funcion de subdepartamento</h5>
                            <div className="card-body">
                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Departamento</label>
                                        <select className="form-select border-dark">
                                            <option selected>Seleccione el departamento</option>
                                        </select>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Subdepartamento</label>
                                        <select className="form-select border-dark">
                                            <option selected>Seleccione el subdepartamento</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <LabelInput class='mb-3 col-md-6' children='Nombre de la funcion' placeholder='Recepcion'/>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md">
                                        <button type="button" className="btn btn-primary me-2">Crear funcion</button>
                                        <button type="button" className="btn btn-outline-secondary">Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}