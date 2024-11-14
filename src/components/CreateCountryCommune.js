import React, { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
import { CREATECOUNTRY, CREATECOMMUNECOUNTRY, GETALLCOUNTRIES } from '../routes/APIRoutes';

import LabelInput from "./LabelInput";
import customToast from "./Toast";
import axios from "axios";

export default function CreateCountryCommune(){
    const [countryName, setCountryName] = useState("");
    const [selectCountryName, setSelectCountryName] = useState("");
    const [communeName, setCommuneName] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [Allcountries, setAllCountries] = useState([]);
    useEffect(() => {
        const getCountriesData = async () => {
            try {
                const getCountries = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLCOUNTRIES);
                setAllCountries(getCountries.data);
            } catch (error) {
                console.log('Error al conseguir los datos del servidor');
            }
        }
        getCountriesData();
    },[]);
    const handleChangeCountryName = (e) =>{
        setCountryName(e.target.value);
    }
    const handleChangeSelectCountryName = (e) => {
        setSelectCountryName(e.target.value);
    }
    const handleChangeCommuneName = (e) => {
        setCommuneName(e.target.value);
    }
    const handleChangePostalCode = (e) => {
        setPostalCode(e.target.value);
    }
    
    const cancelCreateCountry = () => {
        setCountryName("");
        customToast('error','Cancelado');
    }
    const createCountry = () => {
        if(countryName === ''){
            customToast('error','Debes agregar el nombre del país');
        }else{
            try {
                const config = {
                    countryName : countryName
                }
                axios.post(process.env.REACT_APP_API_BASE_PATH + CREATECOUNTRY, config);
                customToast('success','Pais Creado Correctamente');
                setCountryName("");
            } catch (error) {
                customToast('error',error);
            }
        }
    }
    const cancelCreateCommune = () => {
        setSelectCountryName("");
        setCommuneName("");
        setPostalCode("");
        customToast('error','Cancelado');
    }
    const createCommuneCountry = () => {
        if(selectCountryName === ""){
            customToast('error','Debe ingresar un País');
        }else if(communeName === ""){
            customToast('error','Debe ingresar un nombre de comuna');
        }else if(postalCode === ""){
            customToast('error','Debe ingresar el codigo postal de la comuna');
        }else{
            try {
                const config = {
                    communeName : selectCountryName,
                    postalCode : communeName,
                    country : postalCode
                }
                axios.post(process.env.REACT_APP_API_BASE_PATH + CREATECOMMUNECOUNTRY, config);
                customToast('success','Comuna Creada Correctamente');
                setSelectCountryName("");
                setCommuneName("");
                setPostalCode("");
            } catch (error) {
                customToast('error',error);
            }
        }
    }
    return(
        <>
        <h4 className="fw-bold py-3 mb-4 text-white">
            <span className="text-muted fw-light">Registrar / </span> Pais - Comuna
        </h4>
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="row">
                        <div className="col-md-3">
                            <h5 className="card-header">Crear Pais</h5>
                            <div className="card-body">
                                <div className="row">
                                    <LabelInput class="mb-3 col-md-12" children="Nombre de Pais" placeholder="Nombre de Pais" function={handleChangeCountryName} value={countryName}/>
                                    <div className='row'>
                                        <div className='mb-3 col-md'>
                                            <button type='button' className='btn btn-primary me-2' onClick={createCountry}>Crear Pais</button>
                                            <Toaster/>
                                            <button type='button' className='btn btn-outline-secondary' onClick={cancelCreateCountry}>Cancelar</button>
                                            <Toaster/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <h5 className="card-header">Crear Comuna</h5>
                            <div className="card-body">
                                <div className="row">
                                    <div className="mb-3 col-md-4">
                                        <label className="form-label">Pais de la comuna</label>
                                        <select className="form-select border-dark" onChange={handleChangeSelectCountryName} value={selectCountryName}>
                                            <option>Seleccionar Pais</option>
                                            {Allcountries.map(countries => 
                                                <option value={countries._id}>{countries.countryName}</option>
                                            )}
                                        </select>
                                    </div>
                                    <LabelInput class="mb-3 col-md-4" children="Codigo Postal" placeholder="Codigo Postal" function={handleChangeCommuneName} value={communeName}/>
                                    <LabelInput class="mb-3 col-md-4" children="Nombre de Comuna" placeholder="Nombre de Comuna" function={handleChangePostalCode} value={postalCode}/>
                                </div>
                                <div className='row'>
                                    <div className='mb-3 col-md'>
                                        <button type='button' className='btn btn-primary me-2' onClick={createCommuneCountry}>Crear Comuna</button>
                                        <Toaster/>
                                        <button type='button' className='btn btn-outline-secondary' onClick={cancelCreateCommune}>Cancelar</button>
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