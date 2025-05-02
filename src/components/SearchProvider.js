import React, { useEffect, useState } from "react";
import axios from "axios";

//react-hot-toast import
//import {Toaster, toast} from 'react-hot-toast'
import { GETALLPROVIDERS } from "../routes/APIRoutes";

export default function SearchProvider(){
    const [providers, setProviders] = useState([]);
    // EL ESTADO DE ARRIBA TRAE LOS PROVEEDORES
    // const [providerID, setProviderID] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const providersData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLPROVIDERS);
                setProviders(providersData.data);
            } catch (error) {
                console.log("Error al conseguir los datos del servidor");
            }
        }
        getData();
    },[]);
    return(
        <>
        <h4 className="fw-bold py-3 mb-4 text-white">
            <span className="text-muted fw-light">Proveedores / </span> Listado de Proveedores
        </h4>
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="card-header">Informacion de Proveedores</h5>
                            <div className="card-body">
                                <div className="row">
                                    <div className="mb-3 col-md-8">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Nombre Proveedor</th>
                                                    <th scope="col">Rut Proveedor</th>
                                                    <th scope="col">Contacto</th>
                                                    <th scope="col">Email Contacto</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {providers.map(providers =>
                                                    <tr key={providers._id}>
                                                        <td>{providers.providerName}</td>
                                                        <td>{providers.providerRUT}</td>
                                                        <td>{providers.providerContact.nameContact}</td>
                                                        <td>{providers.providerContact.emailContact}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
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