import React, { useState, useEffect } from "react";
import axios from "axios";
import TextInput from "./TextInput";

export default function Assingment(){
    const [storeData, setStoreData] = useState([])
    const [serie, setSerie] = useState ("");
    const [equipmentName, setEquipmentName] = useState("");
    const [userName, setUserName] = useState("");
    const [store, setStore] = useState("");

    useEffect(() => {
        axios.post('http://localhost:4545/api/ver1/address/findAllStores')
        .then(response => {
            setStoreData(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    },[]);

    const handleSerie = (e) => {
        setSerie(e.target.value);
    }
    const handleEquipment = (e) => {
        setEquipmentName(e.target.value);
    }
    const handleUserName = (e) => {
        setUserName(e.target.value);
    }
    const handleStore = (e) => {
        setStore(e.target.value);
    }

    const insert = () => {
        const config = {
            serie: serie,
            equipmentName : equipmentName,
            UserName : userName,
            address : [{
                id : store
            }]
        }
        axios.post('http://localhost:4545/api/ver1/trace/assingment',config);
    }

    return(
        <>
        <div className="conatiner justify-content-md-center d-flex input-box">
            <div className="text-white container">
                <h1>Asignamientos</h1>
                <br/>
                <div className="row justify-content-md-left">
                    <div className="col col-xl-3 input-field">
                        <TextInput onChange={handleSerie}/>
                        <label>Numero de serie</label>
                    </div>
                    <div className="col col-xl-3 input-field">
                        <TextInput onChange={handleEquipment}/>
                        <label>Nombre de equipo</label>
                    </div>
                </div>
                <div className="row justify-content-md-left">
                    <div className="col col-xl-3 input-field">
                        <TextInput onChange={handleUserName}/>
                        <label>Nombre de usuario</label>
                    </div>
                    <div className="col col-xl-3 input-field">
                        <select className="combobox" name="Tienda" onChange={handleStore}>
                            {storeData.map(storeData =>
                                <option value={storeData.id}>{storeData.store}</option>)}
                        </select>
                    </div>
                </div>
                <div className="d-flex justify-content-left">
                    <div className="m-3">
                        <button type="button" className="btn btn-outline-light" onClick={insert}>Asignar</button>
                    </div>
                    <div className="m-3">
                        <button type="button" className="btn btn-outline-danger">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}