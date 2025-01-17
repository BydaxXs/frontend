import React, { useEffect, useState } from "react";
import LabelInput from "./LabelInput";
import customToast from "./Toast";

//react-hot-toast import
import {Toaster} from 'react-hot-toast'
import axios from "axios";
import { CREATEREQUEST, GETCOSTCENTER, GETALLSUBDEPTOOFDEPTO } from '../routes/APIRoutes';

export default function CreateRequest(){
    const [deptos, setDeptos] = useState([]);
    const [requestVia, setRequestVia] = useState("");
    const [finalUser, setFinalUser] = useState("");
    const [finalUserDepto, setFinalUserDepto] = useState(''); 
    const [finalUserSubdepto, setFinalUserSubdepto] = useState('');
    const [quantity, setQuantity] = useState("");
    const requestorID = localStorage.getItem('userID');
    const [selectedProduct, setSelectedProduct] = useState("");
    const [subdeptoList, setSubdeptoList] = useState([]);

    //ITEMS SETTER
    let requestedItems = {};
    const [items, setItems] = useState([]);
    const setRequestedItems = () => {
        requestedItems = {
            item : selectedProduct,
            quantity : quantity
        }
        setItems([...items,requestedItems]);
        customToast('success','Elemento añadido correctamente');
        setQuantity("");
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const costeCenterData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETCOSTCENTER);
                setDeptos(costeCenterData.data);
                if(finalUserDepto !== ''){
                    let config = {
                        costCenterLink : finalUserDepto
                    }
                    const data = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLSUBDEPTOOFDEPTO, config);
                    setSubdeptoList(data.data);
                }else {
                    console.log('El valor debe ser distinto de vacio');
                }
            } catch (error) {
                console.log("Error al conseguir los datos");
            }
        }
        getData();
    },[finalUserDepto]);

    const handleChangeRequestVia = (e) => {
        setRequestVia(e.target.value);
    }
    const handelChangeFinalUser = (e) => {
        setFinalUser(e.target.value);
    }
    const handleChangeFinalUserDepto = (e) => {
        setFinalUserDepto(e.target.value);
    }
    const handleChangeFinalUserSubdepto = (e) => {
        setFinalUserSubdepto(e.target.value);
    }
    const handleChangeItem = (e) => {
        setSelectedProduct(e.target.value);
    }
    const handleChangeQuantity = (e) => {
        setQuantity(e.target.value);
    }
    const createRequest = async () => {
        if(items.length === 0){
            customToast('error','Debe ingresar productos a su solicitud');
        }else if(requestVia === ''){
            customToast('error','Debe ingresar por que metodo se realizó la solicitud');
        }else if(finalUser === ''){
            customToast('error','Debe ingresar a que usuario va dirigido el producto solicitado');
        }else if(finalUserDepto === ''){
            customToast('error','Debe ingresar el departamento del usuario a quien va dirigido el producto');
        }else{
            try {
                const config = {
                    requestor : JSON.parse(localStorage.getItem('userNameData')),
                    requestItems : items,
                    requestDate : new Date().toLocaleDateString('en-GB'),
                    requestVia :  requestVia,
                    statusName : "Ingresado",
                    requestStatusDate : new Date().toLocaleDateString('en-GB'),
                    prevStatusName : "Ingresado",
                    prevRequestStatusDate : new Date().toLocaleDateString('en-GB'),
                    finalUserName : finalUser,
                    finalUserDepto : finalUserDepto,
                    finalUserSubDepto : finalUserSubdepto,
                    requestorID : requestorID
                }
                await axios.post(process.env.REACT_APP_API_BASE_PATH + CREATEREQUEST, config);
                customToast('success',`Solicitud Creada`);
                setItems([]);
                setRequestVia("");
                setFinalUser("");
                setQuantity("");

            }
            catch (error) {
                customToast('error','Error al crear la solicitud');
            }
        }
    }
    const deleteRequestedItems = () => {
        setItems([]);
        setQuantity("");
    }
    const cancelItems = () => {
        setQuantity("");
    }
    return(
        <>
        <h4 className="fw-bold py-3 mb-4 text-white">
            <span className="text-muted fw-light">Solicitudes / </span> Ingresar Solicitud
        </h4>
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="row">
                        <div className="col-md-7">
                            <h5 className="card-header">Detalles de la solicitud</h5>
                            <div className="card-body">
                                <div className="row">
                                    <div className="mb-3 col-md-4">
                                        <label className="form-label">Medio de Solicitud</label>
                                        <select className="form-select border-dark" onChange={handleChangeRequestVia} value={requestVia}>
                                            <option seleted>Seleccione via de solicitud</option>
                                            <option value={"Ticket"}>Ticket</option>
                                            <option value={"Correo Electronico"}>Correo Electronico</option>
                                            <option value={"Llamada"}>Llamada</option>
                                            <option value={"Mensaje"}>Mensaje</option>
                                        </select>
                                    </div>
                                    <LabelInput class="mb-3 col-md-4" children="Usuario Final" placeholder="Usuario Final" value={finalUser} function={handelChangeFinalUser}/>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Departamento de usuario final</label>
                                        <select className="form-select border-dark" onChange={handleChangeFinalUserDepto} value={finalUserDepto}>
                                            <option seleted>Seleccione el departamento del usuario</option>
                                            {deptos.map(deptosNames => 
                                                <option value={deptosNames._id} key={deptosNames._id}>{deptosNames.deptoName}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Subdepartamento de usuario final</label>
                                        <select className="form-select border-dark" onChange={handleChangeFinalUserSubdepto} value={finalUserSubdepto}>
                                            <option seleted>Seleccione el subdepartamento del usuario</option>
                                            {subdeptoList.map(subDeptos => 
                                                <option value={subDeptos._id}>{subDeptos.subdeptoName}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="row">
                                <LabelInput class="mb-3 col-md-6" children="Implemento a solicitar" placeholder="Implemento a solicitar" function={handleChangeItem}/>
                                <LabelInput class="mb-3 col-md-6" children="Unidades del implemento" placeholder="Unidades del implemento" value={quantity} function={handleChangeQuantity}/>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md">
                                        <button type="button" className="btn btn-primary me-2" onClick={setRequestedItems}>Añadir Elemento</button>
                                        <Toaster/>
                                        <button type="button" className="btn btn-outline-secondary" onClick={cancelItems}>Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <h5 className="card-header">Listado de elementos solicitados</h5>
                            <div className="card-body">
                                <div className="mb-6 col-md-12">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Elemento</th>
                                                <th>Cantidad</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            {items.map(item =>
                                                <tr>
                                                    <td>{item.item}</td>
                                                    <td>{item.quantity}</td>
                                                </tr>
                                            )}
                                            
                                        </tbody>
                                    </table>
                                    <div className="row">
                                        <div className="mb-3 col-md">
                                            <button type="button" className="btn btn-primary me-2" onClick={createRequest}>Crear Solicitud</button>
                                            <Toaster/>
                                            <button type="button" className="btn btn-outline-danger me-2" onClick={deleteRequestedItems}>Eliminar Elementos</button>
                                        </div>
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