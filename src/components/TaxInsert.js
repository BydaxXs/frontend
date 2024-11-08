import React,{ useEffect, useState } from "react";
import axios from "axios";


//react-hot-toast import
import { Toaster } from 'react-hot-toast';
import { GETALLPROVIDERS, CREATETAXDOC, GETALLBRANDS, GETALLCATEGORIES, GETPRODUCTSDATABYBRAND, GETPRODUCTSDATABYCATEGORY } from '../routes/APIRoutes';

import './../navLink.css'
import customToast from "./Toast";

export default function TaxInsert(){
    const [docNum, setDocnum] = useState("");
    const [emissionDate, setEmissionDate] = useState("");
    const [docType, setDocType] = useState("");
    const [supplier, setSupplier] = useState("");
    const [implement, setImplement] = useState("");
    const [applicant, setApplicant] = useState("");
    const [brandList, setBrandList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [costCenters, setCostCenters] = useState([]);
    const [brandComboboxStatus, setBrandComboboxStatus] = useState(false);
    const [categoryComboboxStatus, setCategoryComboboxStatus] = useState(false);
    const [productTable, setProductTable] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedCateory, setSelectedCategory] = useState("");
    const [selectedProduct, setSelectedProduct] = useState("");
    useEffect(() => {
        const getData = async () => {
            try {
                const providersData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLPROVIDERS);
                setCostCenters(providersData.data);
                const brandData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLBRANDS);
                setBrandList(brandData.data);
                const categoryData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLCATEGORIES);
                setCategoryList(categoryData.data);
            } catch (error) {
                console.log("Error al conseguir los datos");
            }
        }
        getData();
    },[]);
    const handleDocNum = (e) => {
        setDocnum(e.target.value);
    }
    const handleEmissionDate = (e) => {
        setEmissionDate(e.target.value)
    }
    const handleDocType = (e) => {
        setDocType(e.target.value)
    }
    const handleSupplier = (e) => {
        setSupplier(e.target.value)
    }
    const handleApplicant = (e) => {
        setApplicant(e.target.value)
    }

    const handleChangeBrandFilter = async (e) => {
        setSelectedBrand(e.target.value);
        console.log(costCenters)
        const filterProduct = e.target.value;
        const config = {
            brandFilter : filterProduct
        }
        if(filterProduct !== "false"){
            const productTableData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETPRODUCTSDATABYBRAND, config);
            setProductTable(productTableData.data);
            setCategoryComboboxStatus(true);
        }else{
            setProductTable([]);
            setCategoryComboboxStatus(false);
        }
    }
    const handleChangeCategoryFilter = async (e) => {
        setSelectedCategory(e.target.value);
        const filterCategory = e.target.value;
        const config = {
            categoryFilter : filterCategory
        }
        if(filterCategory !== "false"){
            const productTableData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETPRODUCTSDATABYCATEGORY, config);
            setProductTable(productTableData.data);
            setBrandComboboxStatus(true);
        }else{
            setProductTable([]);
            setBrandComboboxStatus(false);
        }
    }
    const handleChangeGetProduct = (e) => {
        setSelectedProduct(e.currentTarget.getAttribute('product-name'));
        const productSelected = e.currentTarget.getAttribute('product-name');
        customToast('success',`${productSelected} agregado correctamente`);
        console.log(selectedProduct);
    }
    let recivedItems = {};
    const [items, setItems] = useState([]);
    const agregarElemento = () => {
        if(implement === ""){
            customToast('error','Debe ingresar un producto');
        }else{
            recivedItems = {implement:implement};
            setItems([...items,recivedItems]);
        }
    }
    function handleClick(){
        agregarElemento();
        customToast('success','Elemento agregado correctamente');
        setImplement("");
    }
    const handleSend = () => {
        if(docNum === ""){
            customToast('error','Debe ingresar un numero de documento');
        }else if(emissionDate === ""){
            customToast('error','Debe ingresar la fecha de emision del documento');
        }else if(docType === ""){
            customToast('error','Debe ingresar el tipo de documeto');
        }else if(supplier === ""){
            customToast('error','Debe ingresar un proveedor');
        }else if(items === ""){
            customToast('error','Debe ingresar un producto');
        }else if(applicant === ""){
            customToast('error','Debe ingresar el solicitante');
        }else{
            const config = {
                docNumber : docNum,
                emissionDate: emissionDate,
                docType: docType,
                supplier: supplier,
                recivedItems : items,
                applicant: applicant
            }
            fetch(process.env.REACT_APP_API_BASE_PATH + CREATETAXDOC,{
            method: "POST",
                body: JSON.stringify(config),
                headers: {"Content-type": "application/json;charset=UTF-8"}
            })
            customToast('success','Documento de recepxion creado correctamente')
            setDocnum("");
            setEmissionDate("");
            setImplement("");
            setApplicant("");
        }
    }
    const handleCancel = () => {
        setDocnum("");
        setEmissionDate("");
        setImplement("");
        setApplicant("");
    }
    const handleDeleteItems = () => {
        setItems([]);
    }
    return(
        <>
        <h4 className="fw-bold py-3 mb-4 text-white">
            <span className="text-muted fw-light">Recepcion / </span> Crear Documento de recepcion
        </h4>
        <div className="row">
            <div className='col-md-12'>
                <div className='card'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <h5 className='card-header'>Detalles de recepcion</h5>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='mb-3 col-md-6'>
                                        <label className='form-label'>Numero de Documento</label>
                                        <input type='text' className='form-control border-dark' onChange={handleDocNum} value={docNum} placeholder="111111"></input>
                                    </div>
                                    <div className='mb-3 col-md-6'>
                                        {/* BUSCAR DATEPICKER Y REEMPLAZAR */}
                                        <label className='form-label'>Fecha de Emision</label>
                                        <input type='text' className='form-control border-dark' onChange={handleEmissionDate} value={emissionDate} placeholder="DD/MM/AAAA"></input>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='mb-3 col-md-6'>
                                        <label className='form-label'>Tipo de Documento</label>
                                        <select className='form-select border-dark' aria-label='Default select example' onChange={handleDocType}>
                                            <option selected>Seleccione el tipo de documento</option>
                                            <option value="Guia de Despacho">Guia de Despacho</option>
                                            <option value="Factura Electronica">Factura Electronica</option>
                                            <option value="Nota de Credito">Nota de Credito</option>
                                        </select>
                                    </div>
                                    <div className='mb-3 col-md-6'>
                                        <label className='form-label'>Proveedor</label>
                                        <select className='form-select border-dark' aria-label='Default select example' onChange={handleSupplier}>
                                            <option selected>Seleccione al Proveedor</option>
                                            {costCenters.map(costCenters =>
                                                <option value={costCenters.providerName}>{costCenters.providerName}</option>
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='mb-3 col-md-6'>
                                        <label className='form-label'>Solicitante</label>
                                        <input type='text' className='form-control border-dark' onChange={handleApplicant} value={applicant} placeholder="Nombre del Solicitante"></input>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <h5>Filtro de productos</h5>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Marca de producto</label>
                                        <select className="form-select border-dark" onChange={handleChangeBrandFilter} value={selectedBrand} disabled={brandComboboxStatus}>
                                            <option selected>Seleccione una marca</option>
                                            {brandList.map(brandData => 
                                                <option value={brandData._id}>{brandData.productBrandName}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Categoria de producto</label>
                                        <select className="form-select border-dark" onChange={handleChangeCategoryFilter} value={selectedCateory} disabled={categoryComboboxStatus}>
                                            <option selected>Seleccione una categoria</option>
                                            {categoryList.map(categoryData =>
                                                <option value={categoryData._id}>{categoryData.productCategoryName}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="container">
                                        <table className="table table-bordered table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Producto</th>
                                                    <th scope="col">Categoria</th>
                                                    <th scope="col">Marca</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-group-divider">
                                                {productTable.map((products) => 
                                                <tr data-id={products._id} product-name={products.model} onDoubleClick={handleChangeGetProduct}>
                                                    <td>{products.model}</td>
                                                    <td>{products.productCategoryLink}</td>
                                                    <td>{products.productBrandLink}</td>
                                                </tr>)}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='mb-3 col-md'>
                                    <button type='button' className='btn btn-primary me-2' onClick={handleClick}>Agregar Elemento</button>
                                    <Toaster/>
                                    <button type='button' className='btn btn-outline-secondary' onClick={handleCancel}>Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <h5 className='card-header'>Elementos Añadidos</h5>
                            <div className='card-body'>
                                <div className='mb-6 col-md-12'>
                                    <table className='table table-bordered'>
                                        <thead>
                                            <tr>
                                                <th>Elemento</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            {items.map(items =>
                                                <tr>
                                                    <td className="font-weight-normal">{items.implement}</td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                    <div className='row'>
                                        <div className='mb-3 col-md'>
                                            <button type='button' className='btn btn-primary me-2' onClick={handleSend}>Crear Documento</button>
                                            <Toaster/>
                                            <button type='button' className='btn btn-outline-secondary' onClick={handleDeleteItems}>Cancelar</button>
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