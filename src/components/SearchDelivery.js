import axios from "axios";
import React, { useState } from "react";
import { GETALLDELIVERYORDERS, SEARCHANYDELIVERYORDER } from "../routes/APIRoutes";

export default function SearchDelivery(){
    const [search, setSearch] = useState("");
    const [searchedDelivery, setSearchedDelivery] = useState([]);
    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }
    const handleChangeSend = async () => {
        if(search === ""){
            const res = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLDELIVERYORDERS);
            setSearchedDelivery(res.data);
        }else{
            const config = {
                body: search
            }
            const res = await axios.post(process.env.REACT_APP_API_BASE_PATH + SEARCHANYDELIVERYORDER, config);
            setSearchedDelivery(res.data);
        }
    }
    return(
        <>
        <h4 className="fw-bold py-3 mb-4 text-white">
            <span className="text-muted fw-light">Despachos / </span> Buscar orden de despacho 
        </h4>
        <div className="card">
            <div className="row">
                <div className="col-md">
                    <h5 className="card-header">Detalles de documento de despacho</h5>
                    <div className="card-body">
                        <div className="row">
                            <div className="mb-3 col-md-5">
                                <label className="form-label">Busqueda</label>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control border-dark" aria-describedby="button-addon2" placeholder="Orden,Remitente,Destinatario,Tienda de destino,fecha de envio" onChange={handleChangeSearch}></input>
                                    <button type="button" className="btn btn-outline-dark" id="button-addon2" onClick={handleChangeSend}>
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                            </div>
                            <table className="mb-3 col-md-12">
                                <div className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Numero de orden</th>
                                            <th scope="col">Remitente</th>
                                            {/* <th scope="col">Tienda Remitente</th> */}
                                            <th scope="col">Destinatario</th>
                                            <th scope="col">Fecha de envio</th>
                                            {/* <th scope="col">Tienda Destinatario</th> */}
                                            <th scope="col">Elemento Enviados</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchedDelivery.map(searchedDelivery =>
                                        <tr>
                                            <td>{searchedDelivery.orderNumber}</td>
                                            <td>{searchedDelivery.senderName}</td>
                                            <td>{searchedDelivery.reciverName}</td>
                                            <td>{searchedDelivery.sendDate}</td>
                                            <td>Info de envio</td>
                                        </tr>
                                        )}
                                    </tbody>
                                </div>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}