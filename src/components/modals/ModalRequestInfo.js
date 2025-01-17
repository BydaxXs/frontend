import React, { useEffect, useState } from "react";
import LabelInputDisabled from "../LabelInputDisabled";
import LabelTextArea from "../LabelTextArea";
import { GETSPECIFICREQUESTDATA, GETREQUESTDOCUMENTATION } from '../../routes/APIRoutes';
import axios from "axios";

export default function ModalRequestInfo(props){
    const selectedRequestID = props.requestIdData;
    const [selectedRequestRequestor, setSelectedRequestRequestor] = useState(null);
    const [selectedRequestDate, setSelectedRequestDate] = useState(null);
    const [selectedRequestVia, setSelectedRequestVia] = useState(null);
    const [selectedRequestStatus, setSelectedRequestStatus] = useState(null);
    const [selectedRequestFinalUser, setSelectedRequestFinalUser] = useState(null);
    const [selectedRequestFinalUserDepto, setSelectedRequestFinalUserDepto] = useState(null);
    const [selectedRequestItems, setSelectedRequestItems] = useState("");
    const [selectedRequestQuotations, setSelectedRequestQuotations] = useState([]);
    useEffect(() => {
        const getData = async () => {
            if(selectedRequestID === ''){
                console.log('Solicitud no encotrada')
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
    },[selectedRequestID, selectedRequestQuotations]);

    return(
        <>
        <div className="modal" id={props.id} aria-labelledby={props.labelInfo} aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fs-5" id={props.labelInfo}>{selectedRequestID}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <LabelInputDisabled class="mb-3 fw-bold col-md-3" children="Solicitante" value={selectedRequestRequestor}/> {/* Solicitante */}
                            <LabelInputDisabled class="mb-3 fw-bold col-md-3" children="Fecha de la solicitud" value={selectedRequestDate}/> {/* Fecha de solicitud */}
                            <LabelInputDisabled class="mb-3 fw-bold col-md-3" children="Via de solicitud" value={selectedRequestVia}/> {/* Via de solicitud */}
                            <LabelInputDisabled class="mb-3 fw-bold col-md-3" children="Estado de solicitud" value={selectedRequestStatus}/> {/* Estado */}
                        </div>
                        <div className="row">
                            <LabelInputDisabled class="mb-3 fw-bold col-md-4" children="Usuario final" value={selectedRequestFinalUser}/> {/* Usuario Final */}
                            <LabelInputDisabled class="mb-3 fw-bold col-md-4" children="Departamento usuario final" value={selectedRequestFinalUserDepto}/> {/* Departamento usuario Final */}
                            <LabelTextArea class="mb-3 fw-bold col-md-4" label="Items" value={selectedRequestItems}/> {/* Items */}
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
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}