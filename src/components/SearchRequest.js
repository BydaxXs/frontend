import axios from "axios";
import React, { useEffect, useState } from "react";
import ModalRequestInfo from "./modals/ModalRequestInfo";
import ModalRequestEdit from "./modals/ModalRequestEdit";
import { GETALLREQUESTDATA, GETOWNREQUESTDATA, GETDEPTOREQUEST, GETSUBDEPTOREQUEST } from '../routes/APIRoutes';

export default function SearchRequest(){
    const userAccess = localStorage.getItem('userAccess');
    const user = localStorage.getItem('userID');
    let userAccessStatus = false;
    if(userAccess === '111100' || userAccess === '111110' || userAccess === '111001' || userAccess === '111111'){
        userAccessStatus = true;
    }
    const userDeptoKey = localStorage.getItem('userDepto');
    const userSubdeptoKey = localStorage.getItem('userSubdepto');
    const [requests, setRequests] = useState([]);
    const [requestIdData, setRequestIdData] = useState("");
    useEffect(() => {
        const getData = async () => {
            try {
                if(userAccess === '111111' || userAccess === '111110' || userAccess === '111100'){
                    const requestData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLREQUESTDATA);
                    setRequests(requestData.data);
                }else if(userAccess === '111001'){
                    const config = {
                        deptoID : userDeptoKey
                    }
                    const requestData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETDEPTOREQUEST, config);
                    setRequests(requestData.data);
                }else if(userAccess === '111000'){
                    const config = {
                        subdeptoID : userSubdeptoKey
                    }
                    const requestData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETSUBDEPTOREQUEST, config);
                    setRequests(requestData.data);
                }else{
                    const config = {
                        requestorID : user
                    }
                    const requestData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETOWNREQUESTDATA, config);
                    setRequests(requestData.data);
                }
            } catch (error) {
                console.log('Error al conseguir los datos');
            }
        }
        getData();
    },[userAccess, userDeptoKey, userSubdeptoKey, user]);
    const handleChangeIsModalOpen = async (data) => {
        setRequestIdData(data.requestID);
    }
    return(
        <>
        <h4 className="fw-bold py-3 mb-4 text-white">
            <span className="text-muted fw-light">Solicitudes / </span> Buscar Solicitudes
        </h4>
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="card-header">Documentos</h5>
                            <div className="card-body">
                                <div className="container">
                                    <table className="table align-middle">
                                        <div className="table table-bordered table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Codigo de solicitud</th>
                                                    <th scope="col">Nombre de solicitante</th>
                                                    <th scope="col">Nombre de usuario final</th>
                                                    <th scope="col">Fecha de ingreso</th>
                                                    <th scope="col">Estado de solicitud</th>
                                                    <th scope="col">Info</th>
                                                    {userAccessStatus? <th scope="col">Editar</th> : null }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {requests.map(requestdata =>
                                                    <tr>
                                                        <td>{requestdata.requestID}</td>
                                                        <td>{requestdata.requestor}</td>
                                                        <td>{requestdata.finalUserName}</td>
                                                        <td>{requestdata.requestDate}</td>
                                                        <td>{requestdata.requestStatus.statusName}</td>
                                                        <td>
                                                            <button 
                                                             type="button"
                                                             className="btn btn-success"
                                                             onClick={() => handleChangeIsModalOpen(requestdata)}
                                                             data-bs-toggle="modal" 
                                                             data-bs-target="#modalInfo">
                                                                Info
                                                            </button>
                                                        </td> 
                                                        { userAccessStatus?  
                                                            <td>
                                                                <button 
                                                                type="button" 
                                                                className="btn btn-warning"
                                                                onClick={() => handleChangeIsModalOpen(requestdata)}
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#modalEdit">
                                                                    Editar
                                                                </button>
                                                            </td> : null 
                                                        }                                                   
                                                    </tr>
                                                )}
                                            </tbody>
                                        </div>
                                    </table>
                                    <ModalRequestInfo 
                                     id="modalInfo" 
                                     labelInfo="ModalInfo"
                                     requestIdData={requestIdData}
                                    />
                                    <ModalRequestEdit
                                     id="modalEdit"
                                     labelEdit="modalEdit"
                                     requestIdData={requestIdData}
                                    />
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