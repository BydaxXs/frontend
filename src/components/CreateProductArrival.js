import React, { useState } from "react";
import LabelInput from "./LabelInput";
import axios from "axios";
import { GETALLBRANDS, GETALLCATEGORIES, GETALLPROVIDERS, GETPRODUCTSDATABYBRAND, GETPRODUCTSDATABYCATEGORY, CREATEPRODUCTARRIVAL } from '../routes/APIRoutes';
import customToast from "./Toast";
import { Toaster } from "react-hot-toast";

export default function CreateProductArrival(){
    const [productBrandList, setProductBrandList] = useState([]);
    const [productCategoryList, setProductCategoryList] = useState([]);
    const [brandComboboxStatus, setBrandComboboxStatus] = useState(false);
    const [categoryComboboxStatus, setCategoryComboboxStatus] = useState(false);
    const [selectedBrandFilter, setSelectedBrandFilter] = useState('');
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');
    const [productTable, setProductTable] = useState([]);
    const [providerList, setProviderList] = useState([]);
    const [selectedProvider, setSelectedProvider] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [buyOrder, setBuyOrder] = useState('');
    const [receipt, setReceipt] = useState('');
    const [arrivedProductsID, setArrivedProductsID] = useState([]);
    useState(() => {
        const getData = async () => {
            try {
                const brandData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLBRANDS);
                setProductBrandList(brandData.data);
                const categoryData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLCATEGORIES);
                setProductCategoryList(categoryData.data);           
                const provierData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLPROVIDERS);
                setProviderList(provierData.data);     
            } catch (error) {
                console.log("Error al conseguir los datos del servidor");
            }
        }
        getData();
    },[]);

    //PRODUCTS SETTER
    const [arrivedProductsList, setArrivedProductsList] = useState([]);
    const addArrivedProducts = (product) => {
        let arrivedProductID = product._id;
        let arrivedProducts = {
            productName : product.model, 
            productBrand : product.productBrandLink,
            productCategory : product.productCategoryLink
        };
        setArrivedProductsID([...arrivedProductsID, arrivedProductID]);
        setArrivedProductsList([...arrivedProductsList, arrivedProducts]);
    }

    const handleChangeBrandFilter = async (e) => {
        setSelectedBrandFilter(e.target.value);
        const filterProduct = e.target.value;
        const config = {
            brandFilter : filterProduct
        }
        if(filterProduct !== "false"){
            const productTableData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETPRODUCTSDATABYBRAND, config);
            setProductTable(productTableData.data);
            setCategoryComboboxStatus(true);
            console.log(productTable);
        }else{
            setProductTable([]);
            setCategoryComboboxStatus(false);
        }
    }

    const handleChangeCategoryFilter = async (e) => {
        setSelectedCategoryFilter(e.target.value);
        const filterCategory = e.target.value;
        console.log(filterCategory);
        const config = {
            categoryFilter : filterCategory
        }
        if(filterCategory !== "false"){
            const productTableData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETPRODUCTSDATABYCATEGORY, config);
            setProductTable(productTableData.data);
            setBrandComboboxStatus(true);
            console.log(productTable);
        }else{
            setProductTable([]);
            setBrandComboboxStatus(false);
        }
    }

    const handleChangeProvider = (e) => {
        setSelectedProvider(e.target.value);
    }

    const handleChangeArrivalDate = (e) => {
        setArrivalDate(e.target.value);
    }

    const handleChangeBuyOrder = (e) => {
        setBuyOrder(e.target.value);
    }

    const handleChangeReceipt = (e) => {
        setReceipt(e.target.value);
    }

    const createProductsArrival = async () => {
        try {
            let config = [{
                product : arrivedProductsID,
                provider : selectedProvider,
                arrivalDate : arrivalDate,
                buyOrder : buyOrder,
                receipt : receipt
            }]
            await axios.post(process.env.REACT_APP_API_BASE_PATH + CREATEPRODUCTARRIVAL, config);
            customToast('success','Ingreso de producto creado correctamente');
            setArrivedProductsID('');
            setSelectedProvider('');
            setArrivalDate('');
            setBuyOrder('');
            setReceipt('');
            setArrivedProductsList([]);
            setSelectedBrandFilter('');
            setSelectedCategoryFilter('');
            setBrandComboboxStatus(false);
            setCategoryComboboxStatus(false);
            setProductTable([]);
        } catch (error) {
            customToast('error','Error al crear el ingreso de producto');
        }
    }
    const cancelCreateProductArrival = () => {
        setArrivedProductsID('');
        setSelectedProvider('');
        setArrivalDate('');
        setBuyOrder('');
        setReceipt('');
        setArrivedProductsList([]);
        setSelectedBrandFilter('');
        setSelectedCategoryFilter('');
        setBrandComboboxStatus(false);
        setCategoryComboboxStatus(false);
        setProductTable([]);
        customToast('error','Creacion Cancelada');
    }

    return(
        <>
        <h4 className="fw-bold py-3 mb-4 text-white">
            <span className="text-muted fw-light">Productos / </span> Crear Ingreso de Producto
        </h4>
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="row">
                    <div className="col-md-6">
                        <h5 className="card-header">Datos de Ingreso de Productos</h5>
                        <div className="card-body">
                            <h5 className="fw-bold">Producto</h5>
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Marca del Producto</label>
                                    <select className="form-select border-dark" onChange={handleChangeBrandFilter} disabled={brandComboboxStatus} value={selectedBrandFilter}>
                                        <option value={false} selected>Seleccione la marca del producto</option>
                                        {productBrandList.map(productBrand =>
                                            <option value={productBrand._id}>{productBrand.productBrandName}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Categoria del Producto</label>
                                    <select className="form-select border-dark" onChange={handleChangeCategoryFilter} disabled={categoryComboboxStatus} value={selectedCategoryFilter}>
                                        <option value={false} selected>Seleccione la categoria del producto</option>
                                        {productCategoryList.map(productCategory =>
                                            <option value={productCategory._id}>{productCategory.productCategoryName}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-12">
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Modelo</th>
                                                <th>Marca</th>
                                                <th>Categoria</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider" role="button" title="Pulse doble click en el producto para seleccionarlo">
                                            {productTable.map((product =>
                                                <tr key={product._id} onDoubleClick={() => addArrivedProducts(product)}>
                                                    <td>{product.model}</td>
                                                    <td>{product.productBrandLink}</td>
                                                    <td>{product.productCategoryLink}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <h6 className="fw-light">Pulse doble click en el producto para seleccionarlo</h6>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Proveedor</label>
                                    <select className="form-select border-dark" onChange={handleChangeProvider} value={selectedProvider}>
                                        <option selected>Seleccione el proveedor</option>
                                        {providerList.map(provider =>
                                            <option value={provider._id}>{provider.providerFantasyName}</option>
                                        )}
                                    </select>
                                </div>
                                <LabelInput class="mb-3 col-md-6" children="Fecha de Ingreso de producto" placeholder="dd/mm/AAAA" function={handleChangeArrivalDate} value={arrivalDate}/>
                            </div>
                            <div className="row">
                                <LabelInput class="mb-3 col-md-6" children="Numero de orden de compra" placeholder="1234567" function={handleChangeBuyOrder} value={buyOrder}/>
                                <LabelInput class="mb-3 col-md-6" children="Numero de factura" placeholder="1234567" function={handleChangeReceipt} value={receipt}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h5 className="card-header">Productos Ingresados</h5>
                        <div className="card-body">
                            <h5 className="fw-bold">Listado de productos a ingresar</h5>
                            <div className="row">
                                <div className="mb-3 col-md-12">
                                    <table className="table table-bordered ">
                                        <thead>
                                            <tr>
                                                <th>Modelo</th>
                                                <th>Marca</th>
                                                <th>Categoria</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider" role="button">
                                            {arrivedProductsList.map((arrivedProduct =>
                                                <tr>
                                                    <td>{arrivedProduct.productName}</td>
                                                    <td>{arrivedProduct.productBrand}</td>
                                                    <td>{arrivedProduct.productCategory}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md">
                                    <button type="button" className="btn btn-primary me-2" onClick={createProductsArrival}>Crear Ingreso de Productos</button>
                                    <Toaster/>
                                    <button type="button" className="btn btn-outline-secondary" onClick={cancelCreateProductArrival}>Cancelar</button>
                                    <Toaster/>
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