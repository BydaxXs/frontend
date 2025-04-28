import React from "react";
import LabelInput from "./LabelInput";

export default function CreateProductDeregister(){
    return(
        <>
        <h4 className="fw-bold py-3 mb-4 text-white">
            <span className="text-muted fw-light">Productos /</span> Baja de Productos
        </h4>
        <div className="row">
            <div className="col-md-12">
                <div className="card d-flex">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="card-header">Datos de baja de productos</h5>
                            <div className="card-body">
                                <div className="row">
                                    <h6>Datos de Baja de productos</h6>
                                    <LabelInput class="mb-3 col-md-6" children="Fecha de creacion" placeholder="02/01/2025" />
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Marca de producto</label>
                                        <select className="form-select border-dark">
                                            <option selected>Seleccione la marca del producto</option>
                                        </select>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Categoria de producto</label>
                                        <select className="form-select border-dark">
                                            <option selected>Seleccione la categoria del producto</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Producto</label>
                                        <select className="form-select border-dark">
                                            <option selected>Seleccione el producto</option>
                                        </select>
                                    </div>
                                    <LabelInput class="mb-3 col-md-6" children="Numero de serie de producto" placeholder="1MA345TRLE54" />
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md">
                                        <button type="button" className="btn btn-primary me-2">Agregar Producto</button>
                                        <button type="button" className="btn btn-outline-secondary">Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h5 className="card-header">Productos a dar de baja</h5>
                            <div className="card-body">
                                <div className="mb-6 col-md-12">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Producto</th>
                                                <th>Numero de serie</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            <tr>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md">
                                        <button type="button" className="btn btn-primary me-2">Crear registro de baja de producto</button>
                                        <button type="button" className="btn btn-outline-secondary">Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}