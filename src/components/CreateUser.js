import React, { useEffect, useState } from "react";

import LabelInput from "./LabelInput";
import LabelPasswordInput from "./LabelPasswordInput";
import customToast from "./Toast";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { CREATEUSER, GETALLPERMISSONS, GETCOSTCENTER, GETALLSUBDEPTOOFDEPTO } from '../routes/APIRoutes';

export default function CreateUser(){
    const [firstname, setFirstname] = useState("");
    const [secondname, setSecondname] = useState("");
    const [lastname, setLastname] = useState("");
    const [secondSurname, setSecondsurname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [activeResponse, setActiveResponse] = useState("");
    const [nameResponse, setNameResponse] = useState("");
    const [usernameResponse, setUsernameResponse] = useState("");
    const [permissonsList, setPermissonsList] = useState([]);
    const [deptosList, setDeptosList] = useState([]);
    const [subdeptosList, setSubdeptosList] = useState([]);
    const [selectedRole, setSelectdeRole] = useState("");
    const [selectedPermisson, setSelectedPermisson] = useState("");
    const [selectedDepto, setSelectedDepto] = useState("");
    const [selectedSubdepto, setSelectedSubDepto] = useState("");
    useEffect(() => {
        const getData = async () => {
            try {
                const permissonData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLPERMISSONS);
                setPermissonsList(permissonData.data);
                const deptoData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETCOSTCENTER);
                setDeptosList(deptoData.data);
                if(selectedDepto !== ''){
                    let config = {
                        costCenterLink : selectedDepto
                    }
                    const subdeptosData = await axios.post(process.env.REACT_APP_API_BASE_PATH + GETALLSUBDEPTOOFDEPTO, config);
                    setSubdeptosList(subdeptosData.data);
                }else{
                    console.log("El departamento debe existir");
                }     
            } catch (error) {
                console.log('Error al conseguir los datos');
            }
        }
        getData();
    },[selectedDepto]);

    const handleChangeFirstname = (e) => {
        setFirstname(e.target.value);
    }
    const handleChangeSecondname = (e) => {
        setSecondname(e.target.value);
    }
    const handleChangeLastname = (e) => {
        setLastname(e.target.value);
    }
    const handleChangeSecondsurname = (e) => {
        setSecondsurname(e.target.value);
        console.log(secondSurname);
    }
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
        console.log(username);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleChangeConfirmPass = (e) => {
        setConfirmPass(e.target.value);
    }
    const handleChangeUserRole = (e) => {
        setSelectdeRole(e.target.value);
    }
    const handleChangePermisson = (e) => {
        setSelectedPermisson(e.target.value);
    }
    const handleChangeUserDepto = (e) => {
        setSelectedDepto(e.target.value);
    }
    const handleChangeUserSubdepto = (e) => {
        setSelectedSubDepto(e.target.value);
    }
    function RenderPassMessage(){
        if(!password){
            return (<h6>El campo de contraseña no puede estar vacio</h6>)
        }else if(password !== confirmPass){
            return (<h6>Los campos Contraseña y confirmar contraseña deben ser iguales</h6>)
        }
    }
    const renderButton = () => {
        let pass = password;
        let confPass = confirmPass;
        if(!pass){
            return true;
        }
        else if(pass !== confPass){
            return true;
        }
        else{
            return false;
        }
    }
    const createUser = async () => {
        try {
            const config = {
                firstname : firstname,
                secondname : secondname,
                lastname : lastname,
                secondSurname : secondSurname,
                email : email,
                username : username,
                role : selectedRole,
                permisson : selectedPermisson,
                costCenter : selectedDepto,
                subDepto : selectedSubdepto,
                password : password
            }
            const userResponse = await axios.post(process.env.REACT_APP_API_BASE_PATH + CREATEUSER, config);
            console.log(userResponse.data);
            if(userResponse.data.active !== null){
                if(userResponse.data.active === true){
                    setActiveResponse("Activo");
                }
                else{
                    setActiveResponse("Inactivo");
                }
            }
            customToast('success',"Usuario Creado Correctamente");
            setNameResponse(userResponse.data.firstname + " " + userResponse.data.lastname + " " + userResponse.data.secondSurname);
            setUsernameResponse(userResponse.data.username);
            setFirstname("");
            setSecondname("");
            setLastname("");
            setSecondsurname("");
            setEmail("");
            setUsername("");
            setPassword("");
            setConfirmPass("");
        } catch (error) {
            console.log(error);
        }
    }
    const cancelCreate = () => {
        setFirstname("");
        setSecondname("");
        setLastname("");
        setSecondsurname("");
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPass("");
        customToast('error',"Ingreso Cancelado");
    }
    return(
        <>
        <h4 className="fw-bold py-3 mb-4 text-white">
            <span className="text-muted fw-light">Datos /</span> Crear Usuario
        </h4>
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="card-header">Datos del Usuario</h5>
                            <div className="card-body">
                                <div className="row">
                                    <LabelInput class="mb-3 col-md-6" children="Primer Nombre" placeholder="Primer Nombre" value={firstname} function={handleChangeFirstname} />
                                    <LabelInput class="mb-3 col-md-6" children="Segundo Nombre" placeholder="Segeundo Nombre" value={secondname} function={handleChangeSecondname} />
                                </div>
                                <div className="row">
                                    <LabelInput class="mb-3 col-md-6" children="Apellido Paterno" placeholder="Apellido Paterno" value={lastname} function={handleChangeLastname} />
                                    <LabelInput class="mb-3 col-md-6" children="Apellido Materno" placeholder="Apellido Materno" value={secondSurname} function={handleChangeSecondsurname} />
                                </div>
                                <div className="row">
                                    <LabelInput class="mb-3 col-md-6" children="Email" placeholder="Email" value={email} function={handleChangeEmail} />
                                    <LabelInput class="mb-3 col-md-6" children="Username" placeholder="Username" value={username} function={handleChangeUsername} />          
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Rol del usuario</label>
                                        <select className="form-select border-dark" onChange={handleChangeUserRole}>
                                            <option selected>Seleccione el rol del usuario</option>
                                            <option defaultValue='User'>Usuario</option>
                                            <option defaultValue='Client'>Cliente</option>
                                        </select>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Permiso del usuario</label>
                                        <select className="form-select border-dark" onChange={handleChangePermisson}>
                                            <option selected>Seleccione el permiso del usuario</option>
                                            {permissonsList.map(permissons => 
                                                <option value={permissons.namePermisson}>{permissons.postName}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                    
                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Departamento de usuario</label>
                                        <select className="form-select border-dark" onChange={handleChangeUserDepto}>
                                            <option selected>Seleccione el departamento del usuario</option>
                                            {deptosList.map(deptos => 
                                                <option value={deptos._id}>{deptos.costCenterName}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Subdepartamento del usuario</label>
                                        <select className="form-select border-dark" onChange={handleChangeUserSubdepto}>
                                            <option selected>Seleccione el subdepartamento del usuario</option>
                                            {subdeptosList.map(subDepto => 
                                                <option value={subDepto._id}>{subDepto.subDeptoName}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <LabelPasswordInput class="mb-3 col-md-6 password" children="Contraseña" placeholder="Contraseña" value={password} function={handleChangePassword}/>
                                    <LabelPasswordInput class="mb-3 col-md-6" children="Confirmar Contraseña" placeholder="Confirmar Contraseña" value={confirmPass} function={handleChangeConfirmPass}/>
                                    <RenderPassMessage/>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md">
                                        <button type="button" className="btn btn-primary me-2" disabled={renderButton()} onClick={createUser}>Crear Usuario</button>
                                        <Toaster/>
                                        <button type="button" className="btn btn-outline-secondary" onClick={cancelCreate}>Cancelar</button>
                                        <Toaster/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h5 className="card-header">Datos de Usuario Creado</h5>
                            <div className="card-body">
                                <div className="mb-6 col-md-12">
                                    <table className="table table-bordered">
                                        <thead className="justify-content-left">
                                            <tr>
                                                <th scope="col" className="text-left">Nombre de usuario</th>
                                                <th scope="col" className="text-left">Username</th>
                                                <th scope="col" className="text-left">Estado de usuario</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{nameResponse}</td>
                                                <td>{usernameResponse}</td>
                                                <td>{activeResponse}</td>
                                            </tr> 
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