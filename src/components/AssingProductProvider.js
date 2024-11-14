import React, { useEffect, useState } from "react";

import customToast from "./Toast";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { GETALLPROVIDERS, GETALLBRANDS, GETALLCATEGORIES, GETPRODUCTSDATABYBRAND, GETPRODUCTSDATABYCATEGORY, SETPRODUCTTOPROVIDER } from '../routes/APIRoutes';

export default function AssingProductProvider(){
    const [providerList, setProviderList] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [brandComboboxStatus, setBrandComboboxStatus] = useState(false);
    const [categoryComboboxStatus, setCategoryComboboxStatus] = useState(false);
    const [selectProvider, setSelectProvider] = useState("");
    const [selectedProviderName, setSelectedProviderName] = useState("");
    const [selectedProduct, setSelectedProduct] = useState({ productId : "" , productName : "" });
    const [productTable, setProductTtable] = useState([]);
    const [selectedBrandFilter, setSelectedBrandFilter] = useState('');
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');
    useEffect(() => {
        const getData = async () => {
            try {
                const provierData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLPROVIDERS);
                setProviderList(provierData.data);
                const brandData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLBRANDS);
                setBrandList(brandData.data);
                const categoryData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLCATEGORIES);
                setCategoryList(categoryData.data);
            } catch (error) {
                console.log("Error al conseguir los datos del servidor");
            }
        }
        getData();
    },[]);
    const handleChangeProvider = (e) => {
        const selectedIndex = e.target.options.selectedIndex;
        setSelectedProviderName(e.target.options[selectedIndex].getAttribute('provider-name'));
        setSelectProvider(e.target.value);
    }
    const handleChangeBrandFilter = async (e) => {
        setSelectedBrandFilter(e.target.value);
        const filterProduct = e.target.value;
        const config = {
            brandFilter : filterProduct
        }
        if(filterProduct !== "false"){
            const productTableData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETPRODUCTSDATABYBRAND, config);
            setProductTtable(productTableData.data);
            setCategoryComboboxStatus(true);
        }else{
            setProductTtable([]);
            setCategoryComboboxStatus(false);
        }
    }
    const handleChangeCategoryFilter = async (e) => {
        setSelectedCategoryFilter(e.target.value);
        const filterCategory = e.target.value;
        const config = {
            categoryFilter : filterCategory
        }
        if(filterCategory !== "false"){
            const productTableData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETPRODUCTSDATABYCATEGORY, config);
            setProductTtable(productTableData.data)
            setBrandComboboxStatus(true);
        }else{
            setProductTtable([]);
            setBrandComboboxStatus(false);
        }
    }
    const handleChangeGetProduct = (e) => {
        const selectProduct = e.currentTarget.getAttribute('data-id');
        const selectProductName = e.currentTarget.getAttribute('product-name');
        setSelectedProduct({
            productId : selectProduct, productName : selectProductName
        });
    }
    const assingProductToProvider = () => {
        if(selectProvider === ''){
            customToast('error','Debe seleccionar Proveedor');
        }
        else if(selectedProduct.productId === ''){
            customToast('error','Debe seleccionar un Producto');
        }else{
            try {
                const config = {
                    providerID : selectProvider,
                    productID : selectedProduct.productId
                }
                axios.post(process.env.REACT_APP_API_BASE_PATH + SETPRODUCTTOPROVIDER, config);
                customToast('success',`Producto ${selectedProduct.productName} \n Agregado correctamente a Proveedor ${selectedProviderName}`);
                setSelectProvider("");
                setSelectedProduct({ productId : "" , productName : "" });
                setSelectedProviderName("");
            } catch (error) {
                customToast('error','Error al asignar producto a proveedor');
            }
        }
    }
    const cancelButton = () => {
        setSelectProvider('');
        setSelectedProduct({ productId : "" , productName : "" });
        setSelectedProviderName('');
        setSelectedBrandFilter('');
        setSelectedCategoryFilter('');
        setProductTtable([]);
        customToast('error','Cancelado');
        setBrandComboboxStatus(false);
        setCategoryComboboxStatus(false);
    }
    return(
        <>
        <h4 className="fw-bold py-3 mb-4 text-white">
            <span className="text-muted fw-light">Proveedores /</span> Asignar Producto a Proveedor
        </h4>
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="card-header">Proveedor</h5>
                            <div className="card-body">
                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Proveedor</label>
                                        <select className="form-select border-dark" onChange={handleChangeProvider} value={selectProvider}>
                                            <option selected>Seleccione el proveedor</option>
                                            {providerList.map(providerData => 
                                                <option value={providerData._id} provider-name={providerData.providerFantasyName}>{providerData.providerFantasyName}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="card col-md-10">
                                        <div className="card-body">
                                            <h5 className="card-title">Resumen</h5>
                                            <p className="card-text fw-bold">
                                                <span className="text-muted"> Asignar el producto : </span>{selectedProduct.productName}<br/>
                                                <span className="text-muted">Al proveedor : </span>{selectedProviderName}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="mb-3 col-md">
                                        <button type="button" className="btn btn-primary me-2" onClick={assingProductToProvider}>Agregar Producto a Proveedor</button>
                                        <Toaster/>
                                        <button type="button" className="btn btn-outline-secondary" onClick={cancelButton}>Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h5 className="card-header">Productos</h5>
                            <div className="card-body">
                                <h5>Filtro de productos</h5>
                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Marca de producto</label>
                                        <select className="form-select border-dark" onChange={handleChangeBrandFilter} disabled={brandComboboxStatus} value={selectedBrandFilter}>
                                            <option value={false} selected>Seleccione una marca</option>
                                            {brandList.map(brandData => 
                                                <option value={brandData._id}>{brandData.productBrandName}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Categoria de producto</label>
                                        <select className="form-select border-dark" onChange={handleChangeCategoryFilter} disabled={categoryComboboxStatus} value={selectedCategoryFilter}>
                                            <option value={false} selected>Seleccione una categoria</option>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}