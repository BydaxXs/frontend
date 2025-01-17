import React, { useEffect, useState } from "react";
import LabelInput from "./LabelInput";
import axios from "axios";

import { GETDEPTONOCRITIC, CREATEDEPTO, CREATESUBDEPTO } from '../routes/APIRoutes'
import customToast from "./Toast";
import { Toaster } from "react-hot-toast";

export default function CreateDepto(){
    const [deptoCode, setDeptoCode] = useState('');
    const [deptoName, setDeptoName] = useState('');
    const [deptoAbreb, setDeptoAbreb] = useState('');
    const [deptoList, setDeptoList] = useState([]);
    const [selectedDeptoId, setSelectedDeptoId] = useState('');
    const [subdeptoName, setSubdeptoName] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const deptoListData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETDEPTONOCRITIC);
                setDeptoList(deptoListData.data);
            } catch (error) {
                console.log('Error al conseguir los datos del servidor');
            }
        }
        getData();
    },[]);

    const createDepto = async () => {
        try {
            const config = {
                costCenterCode : deptoCode,
                costCenterName : deptoName,
                costCenterNom : deptoAbreb
            }
            await axios.post(process.env.REACT_APP_API_BASE_PATH + CREATEDEPTO, config);
            setDeptoCode('');
            setDeptoName('');
            setDeptoAbreb('');
            customToast('success','Departamento registrado correctamente');
        } catch (error) {
            customToast('error','Error al registrar departamento');
        }
    }
    const createSubdepto = async () => {
        try {
            const config = {
                subDeptoName : subdeptoName,
	            costCenterLink : selectedDeptoId
            }
            await axios.post(process.env.REACT_APP_API_BASE_PATH + CREATESUBDEPTO, config);
            setSelectedDeptoId('');
            setSubdeptoName('');
            customToast('success','Subdepartamento registrado correctamente');
        } catch (error) {
            customToast('error','Error al registrar subdepartamento');
        }
    }
    const cancelCreateDepto = () => {
        setDeptoCode('');
        setDeptoName('');
        setDeptoAbreb('');
        customToast('error','Registro cancelado');
    }
    const cancelCreateSubdepto = () => {
        setSelectedDeptoId('');
        setSubdeptoName('');
        customToast('error','Registro cancelado');
    }

    const handleChangeDeptoCode = (e) => {
        setDeptoCode(e.target.value);
    }
    const handleChangeDeptoName = (e) => {
        setDeptoName(e.target.value);
    }
    const handleChangeDeptoAbreb = (e) => {
        setDeptoAbreb(e.target.value);
    }
    const handleChangeSelectedDeptoId = (e) => {
        setSelectedDeptoId(e.target.value);
    }
    const handleChangeSubdeptoName = (e) => {
        setSubdeptoName(e.target.value);
    }

    return(
        <>
        <h4 className="fw-bold py-3 mb-4 text-white">
            <span className="text-muted fw-light">Datos / </span> Registrar departamento y Subdepartamento
        </h4>
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="card-header">Registrar Departamento</h5>
                            <div className="card-body">
                                <div className="row">
                                    <LabelInput class="mb-3 col-md-6" children='Codigo del departamento' placeholder='01111' function={handleChangeDeptoCode} value={deptoCode}/>
                                    <LabelInput class="mb-3 col-md-6" children='Nombre del departamento' placeholder='Nombre del departamento' function={handleChangeDeptoName} value={deptoName}/>
                                </div>
                                <div className="row">
                                    <LabelInput class='mb-3 col-md-6' children='Abreviacion del departamento' placeholder='DPT' function={handleChangeDeptoAbreb} value={deptoAbreb}/>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md">
                                        <button type="button" className="btn btn-primary me-2" onClick={createDepto}>Crear departamento</button>
                                        <Toaster/>
                                        <button type="button" className="btn btn-outline-secondary" onClick={cancelCreateDepto}>Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h5 className="card-header">Registrar Sub-departamento</h5>
                            <div className="card-body">
                                <div className="row">
                                    <div className="md-3 col-md-6">
                                        <label className="form-label">Departamento asiociado</label>
                                        <select className="form-select border-dark" onChange={handleChangeSelectedDeptoId} value={selectedDeptoId}>
                                            <option selected>Seleccione el departamento</option>
                                            {deptoList.map(depto => 
                                                <option value={depto._id}>{depto.costCenterName}</option>
                                            )}
                                        </select>
                                    </div>
                                    <LabelInput class="mb-3 col-md-6" children='Nombre del subdepartamento' placeholder='Subdepartamento' function={handleChangeSubdeptoName} value={subdeptoName}/>
                                </div>
                                <div className="row ">
                                    <div className="mb-3 col-md">
                                        <button type="button" className="btn btn-primary me-2" onClick={createSubdepto}>Crear subdepartamento</button>
                                        <Toaster/>
                                        <button type="button" className="btn btn-outline-secondary" onClick={cancelCreateSubdepto}>Cancelar</button>
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