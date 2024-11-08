import React, { useEffect, useRef, useState } from "react";
import LabelInputDisabled from "../LabelInputDisabled";
import LabelTextArea from "../LabelTextArea";
import customToast from "../Toast";
import axios from "axios";
import { GETSPECIFICREQUESTDATA, UPDATEREQUESTSTATUS, UPLOADFILE } from '../../routes/APIRoutes';
import { Toaster } from "react-hot-toast";

export default function ModalRequestEdit(props){
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputValue = useRef(null);
    const selectedRequestID = props.requestIdData;
    const [selectedRequestRequestor, setSelectedRequestRequestor] = useState(null);
    const [selectedRequestDate, setSelectedRequestDate] = useState(null);
    const [selectedRequestVia, setSelectedRequestVia] = useState(null);
    const [selectedRequestStatus, setSelectedRequestStatus] = useState(null);
    const [selectedRequestFinalUser, setSelectedRequestFinalUser] = useState(null);
    const [selectedRequestFinalUserDepto, setSelectedRequestFinalUserDepto] = useState(null);
    const [selectedRequestItems, setSelectedRequestItems] = useState("");
    const [selectedRequestQuotations, setSelectedRequestQuotations] = useState([]);
    const [requestID, setRequestID] = useState(null);
    const [updatedRequestStatus, setUpdatedRequestStatus] = useState(null);
    useEffect(() => {
        const getData = async () => {
            if(selectedRequestID === ''){
                console.log('Solicitud no encontrada');
            }else{
                try {
                    const config = {
                        requestID : selectedRequestID
                    }
                    const getSelectedRequestData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETSPECIFICREQUESTDATA, config);
                    setSelectedRequestRequestor(getSelectedRequestData.data.requestor);
                    setSelectedRequestDate(getSelectedRequestData.data.requestDate);
                    setSelectedRequestVia(getSelectedRequestData.data.requestVia);
                    setSelectedRequestStatus(getSelectedRequestData.data.requestStatus.statusName);
                    setSelectedRequestFinalUser(getSelectedRequestData.data.finalUser.finalUserName);
                    setSelectedRequestFinalUserDepto(getSelectedRequestData.data.finalUser.finalUserDepto);
                    let itemsList = [];
                    for(let i = 0; i < getSelectedRequestData.data.requestItems.length; i++){
                        itemsList.push(`- ${getSelectedRequestData.data.requestItems[i].quantity} x ${getSelectedRequestData.data.requestItems[i].item}`);
                    }
                    setSelectedRequestItems(itemsList.join('\n'));
                    setSelectedRequestQuotations(getSelectedRequestData.data.quotations);
                    setRequestID(getSelectedRequestData.data.id);
                } catch (error) {
                    console.log('Error al conseguir los datos');
                }
            }
        }
        getData();
    }, [selectedRequestID]);
    const handleChangeRequestStatus = (e) => {
        setUpdatedRequestStatus(e.target.value);
    }
    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if(file){
            const fileType = file.type;
            if(fileType !== 'application/pdf'){
                customToast('error','El archivo debe estar en formato PDF');
                setSelectedFile('');
                fileInputValue.current.value = ""; 
            }
            setSelectedFile(file);
        }
    }
    const uploadQuotation = () => {
        if(selectedFile === null){
            customToast('error','Debe seleccionar un archivo');
            console.log(selectedRequestID);
        }else{
            try {
                const config = {
                    myFile: selectedFile
                }
                console.log(selectedRequestID);
                axios.post(process.env.REACT_APP_API_BASE_PATH + UPLOADFILE + selectedRequestID ,config, {
                    headers: {
                        'Content-Type' : 'multipart/form-data'
                    }
                });
                customToast('success','Cotizacion subida correctamente');
            } catch (error) {
                customToast('error','Error al subir la cotizacion');
            }
        }
    }
    const updateRequestStatus = async () => {
        const config = {
            id : requestID,
            statusName : updatedRequestStatus,
            requestStatusDate : new Date().toLocaleDateString('en-GB')
        }
        await axios.post(process.env.REACT_APP_API_BASE_PATH + UPDATEREQUESTSTATUS, config);
        alert('Solicitud actualizada correctamente');
        // customToast('success','Solicitud actualizada correctamente');
    }
    return(
        <>
        <div className="modal" id={props.id} aria-labelledby={props.labelEdit} aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fs-5" id={props.labelEdit}>{selectedRequestID}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <LabelInputDisabled class="mb-3 fw-bold col-md-3" children="Solicitante" value={selectedRequestRequestor}/> {/* Solicitante   selectedRequestRequestor */}
                            <LabelInputDisabled class="mb-3 fw-bold col-md-3" children="Fecha de la solicitud" value={selectedRequestDate}/> {/* Fecha de solicitud   selectedRequestDate */}
                            <LabelInputDisabled class="mb-3 fw-bold col-md-3" children="Usuario final" value={selectedRequestFinalUser}/> {/* Usuario Final   selectedRequestFinalUser */}
                            <LabelInputDisabled class="mb-3 fw-bold col-md-3" children="Departamento usuario final" value={selectedRequestFinalUserDepto}/> {/* Departamento usuario Final   selectedRequestFinalUserDepto */}
                        </div>
                        <div className="row">
                            <LabelInputDisabled class="mb-3 fw-bold col-md-3" children="Via de solicitud" value={selectedRequestVia}/> {/* Via de solicitud   selectedRequestVia */}
                            <div className="mb-3 col-md-3">
                                <label className="form-label fw-bold">Estado de solicitud</label>
                                <select className="form-select border-dark" onChange={handleChangeRequestStatus}>
                                    <option selected>{selectedRequestStatus}</option> {/* Estado de solicitud   selectedRequestStatus */}
                                    <option value="En Cotizacion">En Cotizacion</option>
                                    <option value="En Aprobacion">En Aprobacion</option>
                                    <option value="Compra Aprobada">Compra Aprobada</option>
                                    <option value="En espera de recepcion">En espera de recepcion</option>
                                    <option value="Compra recepcionada">Compra recepcionada</option>
                                    <option value="Compra enviada">Compra enviada</option>
                                </select>
                            </div>
                            <LabelTextArea class="mb-3 fw-bold col-md-6" label="Items" value={selectedRequestItems}/> {/* Items   selectedRequestItems */}
                        </div>
                        <div className="container">
                            <label className="form-label fw-bold">Cotizaciones</label>
                            <div className="row">
                                {selectedRequestQuotations.map(quotations =>
                                    <div className="col-md-3 mt-3">
                                        <div className="card quotationStyle text-bg-light mx-auto">
                                            <div className="row">                                                                
                                                <i className="bi bi-filetype-pdf fs-1 filetype" role="button"/>
                                            </div>                                                       
                                            <div className="card-footer">
                                                <p className="card-text">{quotations.substring(25)}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-md-5 mb-3">
                                <label for="formFile" className="form-label fw-bold">Subir Cotizacion</label>
                                <input className="form-control" type="file" id="formFile" ref={fileInputValue} accept=".pdf" onChange={handleChangeFile}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5">
                                <button type="button" className="btn btn-primary me-2" onClick={uploadQuotation}>Subir Cotizacion</button>
                                <Toaster/>
                                <button type="button" className="btn btn-outline-secondary">Cancelar</button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateRequestStatus}>Actualizar Solicitud</button> {/* onClick={updateRequestStatus}  data-bs-dismiss="modal" */}
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button> {/* data-bs-dismiss="modal" */}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}