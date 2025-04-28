import React, { useEffect, useState } from "react";
import LabelInput from "./LabelInput";
import customToast from "./Toast";

//react-hot-toast import
import {Toaster} from 'react-hot-toast'
import axios from "axios";
import { CREATEREQUEST, GETCOSTCENTER, GETALLSUBDEPTOOFDEPTO, GETALLCATEGORIES, GETALLBRANDS, GETPRODUCTSDATABYBRAND, GETPRODUCTSDATABYCATEGORY } from '../routes/APIRoutes';

export default function CreateRequest(){
    const [deptos, setDeptos] = useState([]);
    const [requestVia, setRequestVia] = useState("");
    const [finalUser, setFinalUser] = useState("");
    const [finalUserDepto, setFinalUserDepto] = useState(''); 
    const [finalUserSubdepto, setFinalUserSubdepto] = useState('');
    const [quantity, setQuantity] = useState("");
    const requestorID = localStorage.getItem('userID');
    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedProductName, setSelectedProductName] = useState("");
    const [subdeptoList, setSubdeptoList] = useState([]);

    const [selectedProductBrand, setSelectedProductBrand] = useState('');
    const [selectedProductCategory, setSelectedProductCategory] = useState('');
    const [productBrandComboboxBloqued, setProductBrandComboboxBloqued] = useState(false);
    const [productCategoryComboboxBloqued, setProductCategoryComboboxBloqued] = useState(false);

    const [productList, setProductList] = useState([]);
    const [productBrandList, setProductBrandList] = useState([]);
    const [productCategoryList, setProductCategoryList] = useState([]);

    //ITEMS SETTER
    let requestedItems = {};
    let requestedItemsFront = {};
    const [items, setItems] = useState([]);
    const [itemsFront, setItemsFront] = useState([]);
    const setRequestedItems = () => {
        requestedItems = {
            product : selectedProduct,
            quantity : quantity
        }
        requestedItemsFront = {
            product : selectedProductName,
            quantity : quantity
        }
        setItems([...items,requestedItems]);
        setItemsFront([...itemsFront, requestedItemsFront]);
        customToast('success','Elemento añadido correctamente');
        setQuantity("");
    }
    useEffect(() => {
        const getData = async () => {
            try {
                const productsBrandListData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLBRANDS);
                setProductBrandList(productsBrandListData.data);
                if(selectedProductBrand !== ''){
                    const productBrandConfig = {
                        brandFilter : selectedProductBrand
                    }
                    const productListData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETPRODUCTSDATABYBRAND, productBrandConfig);
                    setProductList(productListData.data);
                }else{
                    console.log('Este campo esta vacio');
                }
                const productsCategoryListData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLCATEGORIES);
                setProductCategoryList(productsCategoryListData.data);
                if(selectedProductCategory !== ''){
                    const productCategoryConfig = {
                        categoryFilter : selectedProductCategory
                    }
                    const productListData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETPRODUCTSDATABYCATEGORY, productCategoryConfig);
                    setProductList(productListData.data);
                }else{
                    console.log('Este campo esta vacio');
                }
                const costeCenterData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETCOSTCENTER);
                setDeptos(costeCenterData.data);
                if(finalUserDepto !== ''){
                    let config = {
                        deptoLink : finalUserDepto
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
    },[finalUserDepto, selectedProductBrand, selectedProductCategory]);

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
    const handleChangeProductBrand = (e) => {
        setSelectedProductBrand(e.target.value);
        const productBrand = e.target.value;
        if(productBrand !== ''){
            setProductCategoryComboboxBloqued(true);
        }else{
            setProductCategoryComboboxBloqued(false);
        }
    }
    const handleChangeProductCategory = (e) => {
        setSelectedProductCategory(e.target.value);
        const productCategory = e.target.value;
        if(productCategory !== ''){
            setProductBrandComboboxBloqued(true);
        }else {
            setProductBrandComboboxBloqued(false);
        }
    }
    const handleChangeItem = (e) => {
        setSelectedProduct(e.target.value);
        const index = e.target.options.selectedIndex;
        setSelectedProductName(e.target.options[index].getAttribute('productName'));
    }
    const handleChangeQuantity = (e) => {
        let quantityValue = parseInt(e.target.value);
        if(isNaN(quantityValue)){
            customToast('error','Cantidad debe ser un numero');
        }else{
            setQuantity(parseInt(e.target.value));
        }
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
            console.log(items);
            console.log(selectedProduct);
            console.log(typeof selectedProduct);
            // console.log(JSON.parse(localStorage.getItem('userNameData')));
            // console.log(items);
            // console.log(new Date().toLocaleDateString('en-GB'));
            // console.log(requestVia);
            // console.log(new Date().toLocaleDateString('en-GB'));
            // console.log(finalUser);
            // console.log(finalUserDepto);
            // console.log(finalUserSubdepto);
            // console.log(requestorID);



            try {
                const config = {
                    requestor : JSON.parse(localStorage.getItem('userNameData')),
                    requestItems : items,
                    requestDate : new Date().toLocaleDateString('en-GB'),
                    requestVia :  requestVia,
                    statusName : "Ingresado",
                    requestStatusDate : new Date().toLocaleDateString('en-GB'),
                    finalUserName : finalUser,
                    finalUserDepto : finalUserDepto,
                    finalUserSubDepto : finalUserSubdepto,
                    requestorID : requestorID
                }
                const response = await axios.post(process.env.REACT_APP_API_BASE_PATH + CREATEREQUEST, config);
                console.log(response);
                customToast('success',`Solicitud Creada`);
                setItems([]);
                setRequestVia("");
                setFinalUser("");
                setQuantity("");

            }
            catch (error) {
                customToast('error','Error al crear la solicitud');
                console.log(error);
            }
        }
    }
    const deleteRequestedItems = () => {
        setItemsFront([]);
        setItems([]);
        setQuantity("");
    }
    const cancelItems = () => {
        setProductList([]);
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
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Marca de producto</label>
                                        <select className="form-select border-dark" onChange={handleChangeProductBrand} disabled={productBrandComboboxBloqued}>
                                            <option selected value=''>Seleccione la marca del producto</option>
                                            {productBrandList.map(productBrand =>
                                                <option value={productBrand._id}>{productBrand.productBrandName}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" >Categoria de producto</label>
                                        <select className="form-select border-dark" onChange={handleChangeProductCategory} disabled={productCategoryComboboxBloqued}>
                                            <option selected value=''>Seleccione la categoria del producto</option>
                                            {productCategoryList.map(productCategory => 
                                                <option value={productCategory._id}>{productCategory.productCategoryName}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md-8">
                                        <label className="form-label">Producto</label>
                                        <select className="form-select border-dark" onChange={handleChangeItem} value={selectedProduct}>
                                            <option selected>Seleccione el Producto</option>
                                            {productList.map(products =>
                                                <option productName={products.model} value={products._id}>{products.model}</option>
                                            )}
                                        </select>
                                    </div>
                                    <LabelInput class='mb-3 col-md-4' children='Cantidad' placeholder='1' function={handleChangeQuantity}/>
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
                                            {itemsFront.map(item =>
                                                <tr>
                                                    <td>{item.product}</td>
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