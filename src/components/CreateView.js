import React, { useEffect, useState } from "react";


import LabelInput from "./LabelInput";
import axios from "axios";
import { GETCOSTCENTER, GETALLSUBDEPTOOFDEPTO, GETALLSUBDEPTOFUNCTIONBYSUBDEPTO, GETALLACTIONBYPROCESS, GETALLPERMISSONS, CREATEVIEW } from '../routes/APIRoutes';
import customToast from "./Toast";
import { Toaster } from "react-hot-toast";

export default function CreateView(){
    const [viewName, setViweName] = useState('');
    const [APIRoute, setAPIRoute] = useState('');
    const [selectedDeptoView, setSelectedDeptoView] = useState('');
    const [selectedSubdeptoView, setSelectedSubdeptoView] = useState('');
    const [selectedProcessView, setSelectedProcessView] = useState('');
    const [selectedAcctionView, setSelectedActionView] = useState('');
    const [selectedPermissonView, setSelectedPermissonView] = useState('');
    const [frontRoute, setFrontRoute] = useState('');
    const [deptoList, setDeptoList] = useState([]);
    const [subdeptoList, setSubdeptoList] = useState([]);
    const [processList, setProcessList] = useState([]);
    const [acctionList, setActionList] = useState([]);
    const [permissonList, setPermissonList] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const deptoData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETCOSTCENTER);
                setDeptoList(deptoData.data);
                if(selectedDeptoView !== ''){
                    let subdeptoConfig = {
                        costCenterLink : selectedDeptoView
                    }
                    const subdeptoData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLSUBDEPTOOFDEPTO, subdeptoConfig);
                    setSubdeptoList(subdeptoData.data);
                    if(selectedSubdeptoView !== ''){
                        let processConfig = {
                            subDeptoLink : selectedSubdeptoView
                        }
                        const subdeptoFunctionsData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLSUBDEPTOFUNCTIONBYSUBDEPTO, processConfig);
                        setProcessList(subdeptoFunctionsData.data);
                        if(selectedProcessView !== ''){
                            let actionConfig = {
                                processLink : selectedProcessView
                            } 
                            const actionData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLACTIONBYPROCESS, actionConfig);
                            setActionList(actionData.data);
                        }else{
                            console.log('Error al conseguir los datos de las acciones');
                        }
                    }else{
                        console.log('Error al conseguir los datos de las funciones del subdepartamento');
                    }
                }else{
                    console.log('Error al cosneguir los datos de los subdepartamentos');
                }
                const permissonData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLPERMISSONS);
                setPermissonList(permissonData.data);
            } catch (error) {
                console.log('Error al conseguir los datos');
            }
        }
        getData();
    },[selectedDeptoView, selectedSubdeptoView, selectedProcessView]);

    const handleChangeViewName = (e) => {
        setViweName(e.target.value);
    }
    const handleChangeAPIRoute = (e) => {
        setAPIRoute(e.target.value);
    }
    const handleChangeDeptoView = (e) => {
        setSelectedDeptoView(e.target.value);
    }
    const handleChangeSubdeptoView = (e) => {
        setSelectedSubdeptoView(e.target.value);
    }
    const handleChangeProcessView = (e) => {
        setSelectedProcessView(e.target.value);
    }
    const handleChangeActionView = (e) => {
        setSelectedActionView(e.target.value);
    }
    const handleChangePermissonView = (e) => {
        setSelectedPermissonView(e.target.value);
    }
    const handleChangeFrontRoute = (e) => {
        setFrontRoute(e.target.value);
    }
    const createView = async () => {
        const config = {
            viewName : viewName,
            apiPath : APIRoute,
            frontPath : frontRoute, 
            viewPermisson : selectedPermissonView,
            actionLink : selectedAcctionView
        }
        await axios.post(process.env.REACT_APP_API_BASE_PATH + CREATEVIEW, config);
        customToast('success','Vista creada correctamente');
    }
    return(
        <>
        <h4 className="fw-bold py-3 mb-4 text-white">
            <span className="text-muted fw-light">Datos / </span> Crear Vistas
        </h4>
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="card-header">Datos de la vista</h5>
                            <div className="card-body">
                                <div className="row">
                                    <LabelInput class='mb-3 col-md-6' children='Nombre de la vista' placeholder='Nombre de vista' function={handleChangeViewName}/>
                                    <LabelInput class='mb-3 col-md-6' children='Ruta de API' placeholder='Ruta de API' function={handleChangeAPIRoute}/>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Departamento</label>
                                        <select className="form-select border-dark" onChange={handleChangeDeptoView}>
                                            <option value='' selected>Seleccione Departamento</option>
                                            {deptoList.map(deptos => 
                                                <option value={deptos._id}>{deptos.costCenterName}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Subdepartamento</label>
                                        <select className="form-select border-dark" onChange={handleChangeSubdeptoView}>
                                            <option value='' selected>Seleccione Subdepartamento</option>
                                            {subdeptoList.map(subdeptos => 
                                                <option value={subdeptos._id}>{subdeptos.subDeptoName}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Proceso</label>
                                        <select className="form-select border-dark" onChange={handleChangeProcessView}>
                                            <option value='' selected>Seleccione Proceso</option>
                                            {processList.map(process => 
                                                <option value={process._id}>{process.subDeptoFunctionName}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Accion</label>
                                        <select className="form-select border-dark" onChange={handleChangeActionView}>
                                            <option value='' selected>Seleccione Accion</option>
                                            {acctionList.map(actions => 
                                                <option value={actions._id}>{actions.actionName}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Permiso requerido de vista</label>
                                        <select className="form-select border-dark" onChange={handleChangePermissonView}>
                                            <option value='' selected>Seleccione Permiso</option>
                                            {permissonList.map(permissons => 
                                                <option value={permissons._id}>{permissons.postName}</option>
                                            )}
                                        </select>
                                    </div>
                                    <LabelInput class='mb-3 col-md-6' children='Ruta Visual' placeholder='/Ruta de vista' function={handleChangeFrontRoute}/>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md">
                                        <button type="button" className="btn btn-primary me-2" onClick={createView}>Crear vista</button>
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