import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import bcrypt from 'bcrypt'


import './inputLoaded.css';

import {Toaster, toast} from 'react-hot-toast'

export default function ProfileCard(){
    
    const navigate = useNavigate
    const {id} = useContext(UserContext);
    const {active} = useContext(AuthContext);
    const {passwordLogged} = useContext(AuthContext);
    const {firstname} = useContext(AuthContext);
    const {lastname} = useContext(AuthContext);
    const {email, setEmail} = useContext(AuthContext);
    const {username, setUsername} = useContext(AuthContext);
    // const [newPassword, setNewPassword] = useState("");

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    // const handlePass = (e) => {
    //     setNewPassword(e.target.value);
    // }
    const errorNotify = () => toast.error('Error al guardar datos' , {
        duration: 5000,
        position: 'top-center'
    });
    const confirmNotify = () => toast.success('Debe volver a iniciar sesion \npara aplicar los cambios' , {
        duration: 5000,
        position: 'top-center'
    });
    const save = async () => {
        // const compare = bcrypt.compare(passwordLogged, newPassword)
        if(1==2){
            errorNotify();
        }else{
            const config = {
                _id:id,
                active:active,
                password:passwordLogged,
                firstname:firstname,
                lastname:lastname,
                email:email,
                username:username
            }
            await axios.post(`http://localhost:4545/api/ver1/auth/editUserData/${id}`,config);
            confirmNotify()
            localStorage.removeItem("accessToken");
            navigate('/');
        }
    }

    return(
        <div className = "container d-flex justify-content-center align-items-center h-100">
            <div className = "cardProfile text-white">
                <div className = "inputloaded-box">
                    <div className = "card-body">
                        <h1 className = "card-title text-center">Datos del Perfil</h1>
                        <br/>
                        <div className = "conatiner">
                            <div className = "row justify-content-md-left">
                                <div className = "col col-xl-6 input-field">
                                    <label>Nombres</label>
                                    <input type='text' id="firstname" className = 'inputloaded' required readOnly defaultValue={firstname}/>
                                    
                                </div>
                                <div className = "col col-xl-6 input-field">
                                    <label>Apellidos</label>
                                    <input type='text' className = 'inputloaded' required readOnly defaultValue={lastname}/>
                                    
                                </div>
                            </div>
                            <br/>
                            <div className = "row justify-content-md-center">
                                <div className = "col col-xl-6 input-field">
                                    <label>Username</label>
                                    <input type='text' className = 'inputloaded' required defaultValue={username} onChange={handleUsername}/>
                                    
                                </div>
                                <div className = "col col-xl-6 input-field">
                                    <label>Correo Electronico</label>
                                    <input type='text' className = 'inputloaded' required defaultValue={email} onChange={handleEmail}/>
                                    
                                </div>
                            </div>
                            <br/>
                            <div className = "row justify-content-md-center">
                                {/* <div className = "col col-xl-6 input-field">
                                    <label>Contraseña</label>
                                    <input type='password' className = 'inputloaded' required onChange={handlePass}/>
                                </div> */}
                            </div>
                            <br/>
                            <div className='row justify-content-md-center'>
                                <div className='col col-xl-5 input-field'>
                                    <button type='button' className='btn btn-outline-light' onClick={save}>Guardar cambios</button>
                                    <Toaster/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}