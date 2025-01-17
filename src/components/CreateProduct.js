import React, { useEffect, useState } from "react";

import LabelInput from "./LabelInput";
import customToast from "./Toast";
import axios from "axios";
import { GETALLBRANDS, CREATEPRODUCTS, GETALLCATEGORIES, CREATECATEGORY, CREATEBRAND } from "../routes/APIRoutes";
import { Toaster } from "react-hot-toast";

export default function CreateProduct(){
    const [productModel, setProductModel] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productBrandLink, setProductBrandLink] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [brandName, setBrandName] = useState("");
    const [brandCategory, setBrandCategory] = useState("");
    const [productBrand, setProductBrand] = useState([]);
    const [productCategory, setProductCategory] = useState([]);
    const handleChangeCategoryName = (e) => {
        setCategoryName(e.target.value);
    }
    const handleChangeBrandName = (e) => {
        setBrandName(e.target.value);
    }
    const handleChangeBrandCategory = (e) => {
        setBrandCategory(e.target.value);
    }
    const handleChangeProductModel = (e) => {
        setProductModel(e.target.value);
    }
    const handleChangeProductDescription = (e) => {
        setProductDescription(e.target.value);
    }
    const handleChangeProductBrandLink = (e) => {
        setProductBrandLink(e.target.value);
    }
    useEffect(() => {
        const getData = async () => {
            try {
                const productBrandData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLBRANDS);
                setProductBrand(productBrandData.data);
                const productCategoryData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLCATEGORIES);
                setProductCategory(productCategoryData.data);
            } catch (error) {
                console.log("Error al conseguir los datos del servidor");
            }
        }
        getData();
    },[]);
    const createProduct = async () => {
        if(productModel === ""){
            customToast('error','Debe ingresar el modelo del producto');
        }else if(productDescription === ""){
            customToast('error','Debe ingresar una descripcion del producto');
        }else if(productBrandLink === ""){
            customToast('error','Debe seleccionar la marca del producto');
        }else if(brandCategory === ""){
            customToast('error','Debe seleccionar la categoria del producto');
        }else{
            try {
                const config = {
                    model : productModel,
                    description : productDescription,
                    productBrandLink : productBrandLink,
                    productCategoryLink : brandCategory
                }
                await axios.post(process.env.REACT_APP_API_BASE_PATH + CREATEPRODUCTS, config);
                setProductModel("");
                setProductDescription("");
                setProductBrandLink("");
                setBrandCategory("");
                customToast('success', 'Prodcuto creado correctamente');
            } catch (error) {
                customToast('error','Error al crear el producto');
            }
        }
    }
    const createCategory = async () => {
        if(categoryName === ""){
            customToast('error','Debe ingresar el nombre de la categoria');
        }else{
            try {
                const createCategoryConfig = {
                    productCategoryName : categoryName
                }
                await axios.post(process.env.REACT_APP_API_BASE_PATH + CREATECATEGORY, createCategoryConfig);
                setCategoryName("");
                customToast('success', 'Categoria creada correctamente');
            } catch (error) {
                customToast('error', 'Error al crear la categoria');
            }
        }
    }
    const createBrand = async () => {
        if(brandName === ""){
            customToast('error', 'Debe Ingresar el nombre de la marca');
        }else{
            try {
                const createBrandConfig = {
                    productBrandName : brandName
                }
                axios.post(process.env.REACT_APP_API_BASE_PATH + CREATEBRAND, createBrandConfig);
                setBrandName("");
                customToast('success', 'Marca creada correctamente');
            } catch (error) {
                customToast('error', 'Error al crear la marca de productos');
            }
        }
    }
    const cancelBrand = () => {
        setBrandName('');
    }
    const cancelCategory = () => {
        setCategoryName('');
    }
    const cancelCreateProduct = () => {
        setProductModel('');
        setBrandCategory('');
        setProductBrandLink('');
        setProductDescription('');
        customToast('success','Ingreso cancelado');
    }
    return(
        <>
        <h4 className="fw-bold py-3 mb-4 text-white">
            <span className="text-muted fw-light">Productos / </span> Registrar Producto
        </h4>
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="card-header">Datos de categoria y marca</h5>
                            <div className="card-body">
                            <h5 className="fw-bold">Crear Categoria / Marca de producto</h5>
                                <div className="row">
                                    <LabelInput class="mb-3 col-md-6" children="Nombre de la Categoria" placeholder="Nombre de categoria" function={handleChangeCategoryName} value={categoryName}/>
                                    <LabelInput class="mb-3 col-md-6" children="Nombre de la Marca" placeholder="Nombre de Marca" function={handleChangeBrandName} value={brandName}/>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md">
                                        <button type="button" className="btn btn-primary me-2" onClick={createCategory}>Crear Categoria</button>
                                        <Toaster/>
                                        <button type="button" className="btn btn-outline-secondary" onClick={cancelCategory}>Cancelar</button>
                                    </div>
                                    <div className="mb-3 col-md">
                                        <button type="button" className="btn btn-primary me-2" onClick={createBrand}>Crear Marca</button>
                                        <Toaster/>
                                        <button type="button" className="btn btn-outline-secondary" onClick={cancelBrand}>Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h5 className="card-header">Datos de producto</h5>
                            <div className="card-body">
                                <div className="row">
                                    <LabelInput class="mb-3 col-md-12" children="Modelo de producto" placeholder="Modelo del producto" function={handleChangeProductModel} value={productModel}/>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Categoria del producto</label>
                                        <select className="form-select border-dark" onChange={handleChangeBrandCategory} value={brandCategory}>
                                            <option selected>Seleccione la categoria del producto</option>
                                            {productCategory.map(categoryData => 
                                                <option value={categoryData._id}>{categoryData.productCategoryName}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Marca del producto</label>
                                        <select className="form-select border-dark" onChange={handleChangeProductBrandLink} value={productBrandLink}>
                                            <option selected>Seleccione la marca del producto</option>
                                            {productBrand.map(brandData => 
                                                <option value={brandData._id}>{brandData.productBrandName}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <LabelInput class="mb-3 col-md-12" children="Descripcion" placeholder="Descripcion del Producto" function={handleChangeProductDescription} value={productDescription}/>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md">
                                        <button type="button" className="btn btn-primary me-2" onClick={createProduct}>Crear Producto</button>
                                        <Toaster/>
                                        <button type="button" className="btn btn-outline-secondary" onClick={cancelCreateProduct}>Cancelar</button>
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