import React,{ useState } from "react";
import axios from "axios";
import { GETALLTAXDOCUMENTS,SEARCHANYDOCUMENT } from "../routes/APIRoutes";

export default function SearchTax(){
    const [searchTax, setSearchTax] = useState("");
    const [findedTax, setFindedTax] = useState([]);
    const handleSearch = (e) => {
        setSearchTax(e.target.value);
    }
    const handleSend = async (e) =>{
        e.preventDefault();
        if(searchTax.length === ""){
            const res = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLTAXDOCUMENTS);
            setFindedTax(res.data);
        }else{
            const config = {
                body:searchTax
            }
            const res = await axios.post(process.env.REACT_APP_API_BASE_PATH + SEARCHANYDOCUMENT, config);
            setFindedTax(res.data);
        }
    }
    return(
        <>
        <h4 className="fw-bold py-3 mb-4 text-white">
            <span className="text-muted fw-light">Recepcion / </span> Buscar Documento de Recepcion
        </h4>
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="row">
                        <div className="col-md">
                            <h5 className="card-header">Detalles de Documento</h5>
                            <div className="card-body">
                                <div className="row">
                                    <div className="mb-3 col-md-3">
                                        <label className="form-label">Numero de Documento</label>
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control border-dark" aria-describedby="button-addon1" placeholder="111111" onChange={handleSearch}></input>
                                            <button type="button" className="btn btn-outline-dark" id="button-addon1" onClick={handleSend}>
                                                <i className="bi bi-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <table className="mb-6 col-md-12">
                                        <div className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Numero de documento</th>
                                                    <th scope="col">Solicitante</th>
                                                    <th scope="col">Proveedor</th>
                                                    <th scope="col">Tipo de documento</th>
                                                    <th scope="col">Fecha de Emision</th>
                                                    <th scope="col">Items Recividos</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {findedTax.map(findedTax => 
                                                    <tr>
                                                        <td>{findedTax.docNumber}</td>
                                                        <td>{findedTax.applicant}</td>                                                       
                                                        <td>{findedTax.supplier.providerName}</td>
                                                        <td>{findedTax.docType}</td>
                                                        <td>{findedTax.emissionDate}</td>
                                                    </tr>)
                                                }
                                            </tbody>
                                        </div>
                                    </table>
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