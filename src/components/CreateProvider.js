import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";

import customToast from "./Toast";
import LabelInput from "./LabelInput";
import { GETALLPROVIDERS, GETCOMMUNESOF, CREATEPROVIDER } from "../routes/APIRoutes";

export default function CreateProvider(){
    const [RUT, setRUT] = useState("");
    const [providerRegisteredName, setProviderRegisteredName] = useState("");
    const [providerFantasyName, setProviderFantasyName] = useState("");
    const [market, setMarket] = useState("");
    const [address, setAddress] = useState("");
    const [countryCoomune, setCountryCommune] = useState("");
    const [providerList, setProviderList] = useState([]);
    const [communeList, setCommuneList] = useState([]);
    useEffect(() => {
        const getData = async () =>{
            try {
                const getProviders = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLPROVIDERS);
                setProviderList(getProviders.data);
                const communeConfig = {
                    countryName : "Chile"
                }
                const getCommunesOfChile = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETCOMMUNESOF, communeConfig)
                setCommuneList(getCommunesOfChile.data);
            } catch (error) {
                console.log("Error al conseguir los datos");
            }
        }
        getData();
    },[]);
    const handleChangeRUT = (e) => {
        setRUT(e.target.value);
    }
    const handleChangeproviderRegisteredName = (e) => {
        setProviderRegisteredName(e.target.value);
    }
    const handleChangeProviderFantasyName = (e) => {
        setProviderFantasyName(e.target.value);
    }
    const handleChangeMarket = (e) => {
        setMarket(e.target.value);
    }
    const handleChangeAddress = (e) => {
        setAddress(e.target.value);
    }
    const handleChangeCountryCommune = (e) => {
        setCountryCommune(e.target.value)
    }
    const cancelCreateProvider = () => {
        customToast('success','Cancelado');
        clearForm();
    }
    const clearForm = () => {
        setRUT("");
        setProviderRegisteredName("");
        setProviderFantasyName("");
        setMarket("");
        setAddress("");
        setCountryCommune("");
    }
    const createProvider = async () => {
        if(RUT === ""){
            customToast('error', 'Debe Ingresar el rut del Proveedor');
        }else if(providerRegisteredName === ""){
            customToast('error', 'Debe ingresar el nombre registrado del Proveedor');
        }else if(providerFantasyName === ""){
            customToast('error', 'Debe Ingresar el nombre de negocio del Proveedor');
        }else if(market === ""){
            customToast('error', 'Debe Ingresar el rubro del proveedor');
        }else if(address === ""){
            customToast('error', 'Debe ingresar la direccion de la oficina central del proveedor');
        }else if(countryCoomune === ""){
            customToast('error', 'Debe seleccionar la comuna de la oficina central del proveedor');
        }else{
            const config = {
                providerRUT : RUT,
                providerRegisteredName : providerRegisteredName,
                providerFantasyName : providerFantasyName,
                market : market,
                address : address,
                countryCommune : countryCoomune
            }
            await axios.post(process.env.REACT_APP_API_BASE_PATH + CREATEPROVIDER, config);
            customToast('success','Proveedor agregado correctamente');
            clearForm();
        }
    }
    return(
        <>
        <h4 className="fw-bold py-3 mb-4 text-white">
            <span className="text-muted fw-light">Proveedores / </span> Crear Proveedor
        </h4>
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="row">
                        <div className="col-md-7">
                            <h5 className="card-header">Ingresar Proveedor</h5>
                            <div className="card-body">
                                <div className="row">
                                    <LabelInput class="mb-3 col-md-4" children="RUT Proveedor" placeholder="11.111.111-1" function={handleChangeRUT} value={RUT}/>
                                    <LabelInput class="mb-3 col-md-4" children="Nombre de Negocio" placeholder="Ejemplo" function={handleChangeproviderRegisteredName} value={providerRegisteredName}/>
                                    <LabelInput class="mb-3 col-md-4" children="Nombre" placeholder="Nombre Ejemplo" function={handleChangeProviderFantasyName} value={providerFantasyName}/>
                                </div>
                                <div className="row">
                                    <LabelInput class="mb-3 col-md-4" children="Rubro" placeholder="Informatica" function={handleChangeMarket} value={market}/>
                                    <LabelInput class="mb-3 col-md-4" children="Direccion" placeholder="Calle falsa #123" function={handleChangeAddress} value={address}/>
                                    <div className="mb-3 col-md-4">
                                        <label className="form-label">Comuna de proveedor</label>
                                        <select className="form-select border-dark" onChange={handleChangeCountryCommune} value={countryCoomune}>
                                            <option selected>Seleccione Comuna</option>
                                            {communeList.map(commune =>
                                                <option value={commune._id}>{commune.communeName}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md">
                                        <button type="button" className="btn btn-primary me-2" onClick={createProvider}>Agregar Proveedor</button>
                                        <Toaster/>
                                        <button type="button" className="btn btn-outline-secondary" onClick={cancelCreateProvider}>Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <h5 className="card-header">Listado de Proveedores</h5>
                            <div className="card-body">
                                <div className="mb-6 col-md-12">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>RUT</th>
                                                <th>Nombre Registrado</th>
                                                <th>Nombre de Fantasia</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            {providerList.map(providerList => 
                                            <tr key={providerList._id}>
                                                <td>{providerList.providerRUT}</td>
                                                <td>{providerList.providerRegisteredName}</td>
                                                <td>{providerList.providerFantasyName}</td>
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
        </>
    );
}