import React, { useEffect, useState } from "react";
import axios from "axios";
import ModalBallot from "./modals/ModalBallot";
import { CREATEDELIVERYORDER, GETALLSTORES } from "../routes/APIRoutes";

//react-hot-toast import
import {Toaster, toast} from 'react-hot-toast'
import customToast from "./Toast";

export default function CreateDeliveryOrder(){
    const [orderNumber, setOrderNumber] = useState("");
    const [senderName, setSenderName] = useState("");
    const [senderStore, setSenderStore] = useState("");
    const [reciverName, setReciverName] = useState("");
    const [reciverStore, setReciverStore] = useState("");
    const [product, setProduct] = useState("");
    const [value, setValue] = useState("");
    const [docNumber, setDocNumber] = useState("");
    const [sendDate, setSendDate] = useState("");
    const [stores, setStores] = useState([]);
    useEffect(() => {
        axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLSTORES)
        .then(res => {
            setStores(res.data);
        })
        .catch(error => {
            console.log(error)
        })
    },[]);
    const successAdd = () => toast.success('Elemento agregado correctamente',{
        duration: 5000,
        position: "bottom-right"
    });
    const successInsert = () => toast.success('Orden de despacho creada correctamente',{
        duration: 5000,
        position: "bottom-right"
    }); 
    const handleChangeOrderNumber = (e) =>{
        setOrderNumber(e.target.value);
    }
    const handleChageSenderName = (e) => {
        setSenderName(e.target.value);
    }
    const handleChangeSenderStore = (e) => {
        setSenderStore(e.target.value);
    }
    const handleChangeReciverName = (e) => {
        setReciverName(e.target.value);
    }
    const handleChangeReciverStore = (e) => {
        setReciverStore(e.target.value);
    }
    const handleChangeProduct = (e) => {
        setProduct(e.target.value);
    }
    const handleChangeProductValue = (e) => {
        setValue(e.target.value);
    }
    const handleChangeDocumentNumber = (e) => {
        setDocNumber(e.target.value);
    }
    const handleChangeSendDate = (e) => {
        setSendDate(e.target.value);
    }
    let sendedItems = {};
    const [sendItems, setSendItems] = useState([]);
    const addSendedItems = () =>{
        sendedItems = {implemet:product, price:value, documentNumber:docNumber};
        setSendItems([...sendItems, sendedItems]);
    }
    const handleChangeAddElements = () => {
        addSendedItems();
        setProduct("");
        setValue("");
        setDocNumber("");
        successAdd();
    }
    const handleSend = async () => {
        const config = {
            orderNumber:orderNumber,
            senderName:senderName,
            senderStore:senderStore,
            reciverName:reciverName,
            reciverStore:reciverStore,
            sendItems:sendItems,
            sendDate:sendDate
        }
        await fetch(process.env.REACT_APP_API_BASE_PATH + CREATEDELIVERYORDER,{
            method: "POST",
            body: JSON.stringify(config),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        });
        setOrderNumber("");
        setSenderName("");
        setSenderStore("");
        setReciverName("");
        setReciverStore("");
        setSendDate("");
        successInsert();
    }
    const handleCancel = () => {
        setOrderNumber("");
        setSenderName("");
        setSenderStore("");
        setReciverName("");
        setReciverStore("");
        setProduct("");
        setValue("");
        setDocNumber("");
        setSendDate("");
        customToast('error','Cancelado');
    }
    const handleCancelInsert = () => {
        setOrderNumber("");
        setSenderName("");
        setSenderStore("");
        setReciverName("");
        setReciverStore("");
        setProduct("");
        setValue("");
        setDocNumber("");
        setSendDate("");
        setSendItems([""]);
        customToast('error','Cancelado');
    }
    return(
        <>
        <h4 className="fw-bold py-3 mb-4 text-white">
            <span className="text-muted fw-light">Despachos / </span> Crear orden de Despacho
        </h4>
        <div className="col-md-12">
            <div className="card">
                <div className="row">
                    <div className="col-md-6">
                        <h5 className="card-header">Detalles de Despacho</h5>
                        <div className="card-body">
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Codigo de Despacho</label>
                                    <input type="text" className="form-control border-dark" onChange={handleChangeOrderNumber} placeholder="6000000000000" value={orderNumber}></input>
                                    <a href="" data-bs-toggle="modal" data-bs-target="#modalPapeleta">¿Donde lo encuentro?</a>
                                    <ModalBallot id="modalPapeleta" label="ModalPapeleta"/>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Remitente</label>
                                    <input type="text" className="form-control border-dark" onChange={handleChageSenderName} placeholder="Nombre de usuario" value={senderName}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Tienda Remitente</label>
                                    <select className="form-select border-dark" onChange={handleChangeSenderStore}>
                                        <option className="form-option" selected>Seleccione Tienda</option>
                                        {stores.map(stores => 
                                            <option value={stores.store}>{stores.store}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Destinatario</label>
                                    <input type="text" className="form-control border-dark" onChange={handleChangeReciverName} placeholder="Nombre de usuario" value={reciverName}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Tienda Destinatario</label>
                                    <select className="form-select border-dark" onChange={handleChangeReciverStore}>
                                        <option selected>Seleccione Tienda</option>
                                        {stores.map(stores => 
                                            <option value={stores.store}>{stores.store}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Fecha de envio</label>
                                    <input type="text" className="form-control border-dark" onChange={handleChangeSendDate} placeholder="DD/MM/AA" value={sendDate}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-4">
                                    <label className="form-label">Producto</label>
                                    <input type="text" className="form-control border-dark" onChange={handleChangeProduct} value={product} placeholder="Producto"></input>
                                </div>
                                <div className="mb-3 col-md-4">
                                    <label className="form-label">Valor</label>
                                    <input type="text" className="form-control border-dark" onChange={handleChangeProductValue} value={value} placeholder="11111"></input>
                                </div>
                                <div className="mb-3 col-md-4">
                                    <label className="form-label">Numero de documento</label>
                                    <input type="text" className="form-control border-dark" onChange={handleChangeDocumentNumber} value={docNumber} placeholder="111111"></input>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='mb-3 col-md'>
                                    <button type='button' className='btn btn-primary me-2' onClick={handleChangeAddElements}>Agregar Elemento</button>
                                    <Toaster/>
                                    <button type='button' className='btn btn-outline-secondary' onClick={handleCancel}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h5 className="card-header">Elementos a enviar</h5>
                        <div className="card-body">
                            <div className="mb-6 col-md-12">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Producto</th>
                                            <th scope="col">Valor</th>
                                            <th scope="col">Numero de documento</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {sendItems.map(sendItems =>
                                            <tr>
                                                <td>{sendItems.implemet}</td>
                                                <td>{sendItems.price}</td>
                                                <td>{sendItems.documentNumber}</td>
                                            </tr>)
                                            }
                                    </tbody>
                                </table>
                                <div className='row'>
                                    <div className='mb-3 col-md'>
                                        <button type='button' className='btn btn-primary me-2' onClick={handleSend}>Crear Orden de Despacho</button>
                                        <Toaster/>
                                        <button type='button' className='btn btn-outline-secondary' onClick={handleCancelInsert}>Cancelar</button>
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