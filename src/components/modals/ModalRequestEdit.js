import React, { useEffect, useRef, useState } from "react";
import LabelInputDisabled from "../LabelInputDisabled";
import LabelTextArea from "../LabelTextArea";
import customToast from "../Toast";
import axios from "axios";
import { GETSPECIFICREQUESTDATA, UPDATEREQUESTSTATUS, UPLOADBUYAUTHORIZATION, UPLOADQUOTATION, UPLOADBUYRECEIPT, UPLOADDELIVERYGUIDE, UPLOADBUYORDER, GETREQUESTDOCUMENTATION } from '../../routes/APIRoutes';
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
    const [uploadFileType, setUploadFileType] = useState(null);
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
                    setRequestID(getSelectedRequestData.data.id);
                    const docConfig = {
                        requestId : selectedRequestID
                    }
                    const getSelectedRequestDocumentation = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETREQUESTDOCUMENTATION, docConfig);
                    setSelectedRequestQuotations(getSelectedRequestDocumentation.data);
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
        const fileType = file.type;
        switch (fileType) {
            case 'application/pdf':
                setSelectedFile(file);
                break;
            case 'image/png':
                setSelectedFile(file);
                break;
            case 'image/jpeg':
                setSelectedFile(file);
                break;
            case '':
                setSelectedFile(file);
                break;
            default:
                customToast('error','Los formatos aceptados son PDF, PNG, JPG, MSG outlook');
                setSelectedFile('');
                fileInputValue.current.value = ""; 
                break;
        }
    }
    const handleChangeFileType = (e) => {
        setUploadFileType(e.target.value);
    }
    const uploadQuotation = () => {
        switch(uploadFileType){
            case 'Autorizacion de compra':
                if(selectedFile === null){
                    customToast('error','Debe seleccionar un archivo');
                }else{
                    try {
                        const config = {
                            myFile: selectedFile
                        }
                        axios.post(process.env.REACT_APP_API_BASE_PATH + UPLOADBUYAUTHORIZATION + selectedRequestID ,config, {
                            headers: {
                                'Content-Type' : 'multipart/form-data'
                            }
                        });
                        customToast('success','Autorizacion de compra subida correctamente');
                    } catch (error) {
                        customToast('error','Error al subir la cotizacion');
                    }
                }
                break;
            case 'Cotizacion':
                if(selectedFile === null){
                    customToast('error','Debe seleccionar un archivo');
                }else{
                    try {
                        const config = {
                            myFile: selectedFile
                        }
                        axios.post(process.env.REACT_APP_API_BASE_PATH + UPLOADQUOTATION + selectedRequestID ,config, {
                            headers: {
                                'Content-Type' : 'multipart/form-data'
                            }
                        });
                        customToast('success','Cotizacion subida correctamente');
                    } catch (error) {
                        customToast('error','Error al subir la cotizacion');
                    }
                }
                break;
            case 'Factura':
                if(selectedFile === null){
                    customToast('error','Debe seleccionar un archivo');
                }else{
                    try {
                        const config = {
                            myFile: selectedFile
                        }
                        axios.post(process.env.REACT_APP_API_BASE_PATH + UPLOADBUYRECEIPT + selectedRequestID ,config, {
                            headers: {
                                'Content-Type' : 'multipart/form-data'
                            }
                        });
                        customToast('success','Factura de compra subida correctamente');
                    } catch (error) {
                        customToast('error','Error al subir la cotizacion');
                    }
                }
                break;
            case 'Guia de despacho':
                if(selectedFile === null){
                    customToast('error','Debe seleccionar un archivo');
                }else{
                    try {
                        const config = {
                            myFile: selectedFile
                        }
                        axios.post(process.env.REACT_APP_API_BASE_PATH + UPLOADDELIVERYGUIDE + selectedRequestID ,config, {
                            headers: {
                                'Content-Type' : 'multipart/form-data'
                            }
                        });
                        customToast('success','Factura de compra subida correctamente');
                    } catch (error) {
                        customToast('error','Error al subir la cotizacion');
                    }
                }
                break;
            case 'Orden de compra':
                if(selectedFile === null){
                    customToast('error','Debe seleccionar un archivo');
                }else{
                    try {
                        const config = {
                            myFile: selectedFile
                        }
                        axios.post(process.env.REACT_APP_API_BASE_PATH + UPLOADBUYORDER + selectedRequestID ,config, {
                            headers: {
                                'Content-Type' : 'multipart/form-data'
                            }
                        });
                        customToast('success','Factura de compra subida correctamente');
                    } catch (error) {
                        customToast('error','Error al subir la cotizacion');
                    }
                }
                break;   
           default:
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
                                    <option selected>{selectedRequestStatus}</option>
                                    <option value="Cotizaciones Aprobadas">Cotizaciones Aprobadas</option>
                                    <option value="En Cotizacion">En Cotizacion</option>
                                    <option value="Compra Aprobada">Compra Aprobada</option>
                                    <option value="En Espera de Recepcion">En Espera de Recepcion</option>
                                    <option value="Compra recepcionada">Compra recepcionada</option>
                                    <option value="Compra enviada">Compra enviada</option>
                                    <option value="Cerrado">Cerrado</option>
                                </select>
                            </div>
                            <LabelTextArea class="mb-3 fw-bold col-md-6" label="Items" value={selectedRequestItems}/>
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
                                                <p className="card-text">{quotations.substring(12)}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <label className="form-label fw-bold">Seleccionar tipo de archivo a subir</label>
                                <select className="form-select border-dark" onChange={handleChangeFileType}>
                                    <option selected>Seleccione el tipo de documento</option>
                                    <option value='Autorizacion de compra'>Autorizacion de compra</option>
                                    <option value='Cotizacion'>Cotizacion</option>
                                    <option value='Factura'>Factura</option>
                                    <option value='Guia de despacho'>Guia de despacho</option>
                                    <option value='Orden de compra'>Orden de compra</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5 mb-3">
                                <label for="formFile" className="form-label fw-bold">Subir archivo</label>
                                <input className="form-control" type="file" id="formFile" ref={fileInputValue} accept=".pdf, .jpg, ,.png" onChange={handleChangeFile}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5">
                                <button type="button" className="btn btn-primary me-2" onClick={uploadQuotation}>Subir archivo</button>
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