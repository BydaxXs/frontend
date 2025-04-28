import React, { useEffect, useState } from "react";
import LabelInput from "./LabelInput";
import customToast from "./Toast";
import axios from "axios";
import { CREATEPRODUCTSTATUS, VIEWALLPRODUCTSTATUS } from "../routes/APIRoutes"
import { Toaster } from "react-hot-toast";

export default function CreateProductStatus(){
    const [productStatusName, setProductStatusName] = useState('');
    const [productStatusList, setProductStatusList] = useState([]);

    const getProductStatusAPIData = async () => {
        const productStatusData = await axios.post(process.env.REACT_APP_API_BASE_PATH + VIEWALLPRODUCTSTATUS);
        setProductStatusList(productStatusData.data);
    }
    
    useEffect(() => {
        const getData = async () => {
            try {
                getProductStatusAPIData();
            } catch (error) {
                console.log("Error al conseguir los datos del servidor");
            }
        }
        getData();
    },[]);
    const handleChangeProductStatusName = (e) => {
        setProductStatusName(e.target.value);
    }
    const cancelCreateProductStatus = () => {
        setProductStatusName('');
        customToast('error','Ingreso Cancelado');
    }
    const createProductStatus = async () => {
        try {
            const config = [{
                productStatusName : productStatusName
            }]
            await axios.post(process.env.REACT_APP_API_BASE_PATH + CREATEPRODUCTSTATUS, config);
            getProductStatusAPIData();
            setProductStatusName('');
            customToast('success','Estado de producto añadido correctamente');
        } catch (error) {
            customToast('error','Error al ingresar el estado del producto');
        }
    }
    return(
        <>
        <h4 className="fw-bold py-3 mb-4 text-white">
            <span className="text-muted fw-light">Productos /</span> Crear Estado de Producto
        </h4>
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="card-header">Estado de producto</h5>
                            <div className="card-body">
                                <div className="row">
                                    <LabelInput class="mb-3 col-md-6" children="Nombre de estado" placeholder="Estado de producto" function={handleChangeProductStatusName} value={productStatusName}/>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="mb-3 col-md">
                                        <button type="button" className="btn btn-primary me-2" onClick={createProductStatus}>Crear Estado de Producto</button>
                                        <Toaster/>
                                        <button type="button" className="btn btn-outline-secondary" onClick={cancelCreateProductStatus}>Cancelar</button>
                                        <Toaster/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h5 className="card-header">Listado de Estados de producto</h5>
                            <div className="card-body">
                                <div className="mb-6 col-md-12">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Estado de producto</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productStatusList.map(productSatatusData =>
                                                <tr>
                                                    <td>{productSatatusData.productStatusName}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
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