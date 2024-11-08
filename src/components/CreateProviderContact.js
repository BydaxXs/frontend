import React, { useEffect, useState } from "react";
import axios from 'axios';
import {Toaster} from 'react-hot-toast';

import LabelInput from "./LabelInput";
import customToast from "./Toast";
import { GETALLPROVIDERS, CREATEPROVCONTACT } from "../routes/APIRoutes";

export default function CreateProviderContact(){
    const [providers, setProviders] = useState([]);
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [contactProvider, setContactProvider] = useState("");
    useEffect(() => {
        const getData = async () => {
            try {
                const providersData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLPROVIDERS);
                setProviders(providersData.data);
            } catch (error) {
                console.log("Error al conseguir los datos");
            }
        }
        getData();
    },[]);
    const handleChangeContactName = (e) => {
        setContactName(e.target.value);
    }
    const handleChangeContactEmail = (e) => {
        setContactEmail(e.target.value);
    }
    const handleChangeContactPhone = (e) => {
        setContactPhone(e.target.value);
    }
    const handleChangeContactProvider = (e) => {
        setContactProvider(e.target.value);
    }
    const createContact = async () => {
        if(contactName === ""){
            customToast('error', 'Debe Ingresar el nombre del contacto');
        }else if(contactEmail === ""){
            customToast('error', 'Debe Ingresar el email del contacto');
        }else if(contactPhone === ""){
            customToast('error', 'Debe Ingresar el numero de contacto');
        }else if(contactProvider === ""){
            customToast('error', 'Debe seleccionar al proveedor');
        }else{
            try {
                const config = {
                    providerContactName: contactName,
                    providerContactEmail: contactEmail,
                    providerContactNumber: contactPhone,
                    providerId : contactProvider
                }
                await axios.post(process.env.REACT_APP_API_BASE_PATH + CREATEPROVCONTACT, config);
                customToast('success','Contacto Creado Correctamente');
            } catch (error) {
                customToast('error','Error al crear el contacto');
            }
        }
    }
    return(
        <>
        <h4 className="fw-bold py-3 mb-4 text-white">
            <span className="text-muted fw-light">Proveedores / </span> Crear Contacto de Proveedor
        </h4>
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="card-header">Ingresar Datos</h5>
                            <div className="card-body">
                                <div className="row">
                                    <LabelInput class="mb-3 col-md-6" children="Nombre de contacto" placeholder="Nombre de contacto" function={handleChangeContactName}/>
                                    <LabelInput class="mb-3 col-md-6" children="Correo de contacto" placeholder="Correo de contacto" function={handleChangeContactEmail}/>
                                </div>
                                <div className="row">
                                    <LabelInput class="mb-3 col-md-6" children="Numero de contacto" placeholder="+56911111111" function={handleChangeContactPhone}/>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Proveedor de contacto</label>
                                        <select className="form-select border-dark" onChange={handleChangeContactProvider}>
                                            <option seleted>Seleccione el Proveedor</option>
                                            {providers.map(provider =>
                                                <option value={provider._id} key={provider._id}>{provider.providerRegisteredName}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md">
                                        <button type="button" className="btn btn-primary me-2" onClick={createContact}>Crear Contacto</button>
                                        <Toaster/>
                                        <button type="button" className="btn btn-outline-secondary">Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h5 className="card-header">Asignar Contacto a Proveedor</h5>
                            <div className="card-body">
                                <div className="row">
                                    <div className="mb-3 col-md-5">
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md">
                                        <button type="button" className="btn btn-primary me-2">Asignar Contacto</button>
                                        <Toaster/>
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