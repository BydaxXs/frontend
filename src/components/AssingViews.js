import React, { useEffect, useState } from "react";
import axios from "axios";
import customToast from "./Toast";
import { Toaster } from "react-hot-toast";
import { GETCOSTCENTER, GETUSERBYDEPTO, GETALLSUBDEPTOOFDEPTO, GETALLSUBDEPTOFUNCTIONBYSUBDEPTO, GETALLACTIONBYPROCESS, SETUSERMENU } from '../routes/APIRoutes';

export default function AssingViews(){
    //COMBOBOX LISTS
    const [deptoList, setDeptoList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [subdeptoList, setSubdeptoList] = useState([]);
    const [processList, setProcessList] = useState([]);
    const [actionList, setActionList] = useState([]);
    //COMBOBOX SELECTED ITEMS
    const [selectedDepto, setSelectedDepto] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedUserName, setSelectedUserName] = useState('')
    const [selectedSubdepto, setSelectedSubdepto] = useState('');
    const [selectedProcess, setSelectedProcess] = useState('');
    const [selectedAction, setSelectedAction] = useState('');
    const [selectedActionName, setSelectedActionName] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const deptoData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETCOSTCENTER);
                setDeptoList(deptoData.data);
                if(selectedDepto !== ''){
                    let userlistConfig = {
                        deptoId : selectedDepto
                    }
                    const usersData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETUSERBYDEPTO, userlistConfig);
                    setUserList(usersData.data);
                    if(selectedUser !== ''){
                        let subdeptoListConfig = {
                        costCenterLink : selectedDepto
                    }
                    const subdeptoData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLSUBDEPTOOFDEPTO, subdeptoListConfig);
                    setSubdeptoList(subdeptoData.data);
                    if(selectedSubdepto !== ''){
                        let subdeptoProcessListConfig = {
                            subDeptoLink : selectedSubdepto
                        }
                        const subdeptoFunctionsData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLSUBDEPTOFUNCTIONBYSUBDEPTO, subdeptoProcessListConfig);
                        setProcessList(subdeptoFunctionsData.data);
                        if(selectedProcess !== ''){
                            let actionListConfig = {
                                processLink : selectedProcess
                            }
                            const actionData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLACTIONBYPROCESS, actionListConfig);
                            setActionList(actionData.data);
                        }else{
                            console.log('Error al conseguir los datos de las acciones')
                        }
                    }else{
                        console.log('Error al conseguir los datos de los procesos')
                    }
                    }else{
                        console.log('Error al conseguir los datos de los subdepaertamentos')
                    }
                }else{
                    console.log('Error al conseguir los datos de los usuarios');
                }
            } catch (error) {
                console.log('Error al conseguir los datos del servidor');
            }
        }
        getData();
    },[selectedDepto, selectedUser, selectedSubdepto, selectedProcess]);

    const handleChangeSelectedDepto = (e) => {
        setSelectedDepto(e.target.value);
    }
    const handleChangeSelectedUser = (e) =>{
        setSelectedUser(e.target.value);
        const selectedIndex = e.target.options.selectedIndex;
        setSelectedUserName(e.target.options[selectedIndex].getAttribute('user-name'));
    }
    const handleChangeSelectedSubdepto = (e) => {
        setSelectedSubdepto(e.target.value);
    }
    const handleChangeSelectedProcess = (e) => {
        setSelectedProcess(e.target.value);
    }
    const handleChangeSelectedAction = (e) => {
        setSelectedAction(e.target.value);
        const selectedIndex = e.target.options.selectedIndex;
        setSelectedActionName(e.target.options[selectedIndex].getAttribute('action-name'));
    }

    const AssingViewToUser = async () => {
        const config = {
            id : selectedUser, 
            viewID : [`${selectedAction}`]
        }
        await axios.post(process.env.REACT_APP_API_BASE_PATH + SETUSERMENU, config);
        customToast('success',`Vista ${selectedActionName} asignada a ${selectedUserName} correctamente`);
        setSelectedDepto('');
        setSelectedUser('');
        setSelectedUserName('');
        setSelectedSubdepto('');
        setSelectedProcess('');
        setSelectedAction('');
        setSelectedActionName('');
    }

    const cancelAssingViewToUser = async () => {
        setSelectedDepto('');
        setSelectedUser('');
        setSelectedUserName('');
        setSelectedSubdepto('');
        setSelectedProcess('');
        setSelectedAction('');
        setSelectedActionName('');
        customToast('error','Cancelado');
    }

    return(
        <>
        <h4 className="fw-bold py-3 mb-4 text-white">
            <span className="text-muted fw-light">Datos /</span> Asignar vistas a usuario
        </h4>
        <div className="row">
            <div className="col-md-12">
                <div className="card d-flex">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="card-header">Resumen de la asignacion</h5>
                            <div className="card-body">
                                <div className="row">
                                    <h5>Usuario</h5>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Departamento de usuario</label>
                                        <select className="form-select border-dark" onChange={handleChangeSelectedDepto} value={selectedDepto}>
                                            <option value='' selected>Seleccione departamento del usuario</option>
                                            {deptoList.map(deptos => 
                                                <option value={deptos._id}>{deptos.costCenterName}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Usuario</label>
                                        <select className="form-select border-dark" onChange={handleChangeSelectedUser} value={selectedUser}>
                                            <option value='' selected>Seleccione al usuario</option>
                                            {userList.map(users => 
                                                <option value={users._id} user-name={users.firstname + " " + users.lastname + " " + users.secondSurname}>{users.firstname + " " + users.lastname + " " + users.secondSurname}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <br/>
                                <div className="col-md-12">
                                    <div className="card col-md-10">
                                        <div className="card-body">
                                            <h5 className="card-title">Resumen</h5>
                                            <p className="card-text fw-bold">
                                                <span className="text-muted"> Asignar la vista : </span>{selectedActionName}<br/>
                                                <span className="text-muted">A el usuario : </span>{selectedUserName}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h5 className="card-header">Asignar vistas</h5>
                            <div className="card-body">
                                <div className="row">
                                    <h5>Vistas</h5>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Departamento</label>
                                        <select className="form-select border-dark"onChange={handleChangeSelectedDepto} value={selectedDepto}>
                                            <option value='' selected>Seleccione Departamento</option>
                                            {deptoList.map(deptos => 
                                                <option value={deptos._id}>{deptos.costCenterName}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Subdepartamento</label>
                                        <select className="form-select border-dark" onChange={handleChangeSelectedSubdepto} value={selectedSubdepto}>
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
                                        <select className="form-select border-dark" onChange={handleChangeSelectedProcess} value={selectedProcess}>
                                            <option value='' selected>Seleccione Proceso</option>
                                            {processList.map(process => 
                                                <option value={process._id}>{process.subDeptoFunctionName}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Accion</label>
                                        <select className="form-select border-dark" onChange={handleChangeSelectedAction} value={selectedAction}>
                                            <option value='' selected>Seleccione Accion</option>
                                            {actionList.map(actions => 
                                                <option value={actions._id} action-name={actions.actionName}>{actions.actionName}</option>
                                            )}
                                        </select>                                        
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md">
                                        <button type="button" className="btn btn-primary me-2" onClick={AssingViewToUser}>Asignar vista a usuario</button>
                                        <Toaster/>
                                        <button type="button" className="btn btn-outline-secondary" onClick={cancelAssingViewToUser}>Cancelar</button>
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