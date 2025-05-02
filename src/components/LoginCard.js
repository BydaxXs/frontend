import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo';
import axios from 'axios';
import TextInput from './TextInput';
import PasswordInput from './PasswordInput';
import { AuthContext } from '../context/AuthContext';
import customToast from './Toast';
import { LOGIN, HOME } from '../routes/APIRoutes';

//react-hot-toast import
import {Toaster} from 'react-hot-toast'

//Import CSS
import './../navLink.css'

export default function LoginCard(){
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { accessToken, setAccessToken } = useContext(AuthContext);

    const login = async () => {
        const loginConfig = {
            username : userName,
            password : password
        }
        const res = await axios.post(process.env.REACT_APP_API_BASE_PATH + LOGIN, loginConfig);
        setAccessToken(res.data.access);
        const data = res.data.dataUser;
        if(!accessToken){
            customToast('error',"Error al iniciar sesion\nPorfavor reintentar");
        }
        else{
            const homeData = {
                dataUser: data
            }
            const resp = await fetch(process.env.REACT_APP_API_BASE_PATH + HOME,{
                method: "POST",
                body: JSON.stringify(homeData),
                headers: {"Content-type": "application/json;charset=UTF-8"}
            });
            const dataResponse = await resp.json();
            localStorage.setItem('menu',JSON.stringify(dataResponse[0].menu));
            localStorage.setItem('userNameData', JSON.stringify(dataResponse[1].userNameData));
            localStorage.setItem('userID',dataResponse[2].user);
            localStorage.setItem('userAccess', dataResponse[3].userAccess);
            localStorage.setItem('userDepto', dataResponse[4].userDepto);
            localStorage.setItem('userSubdepto',dataResponse[5].userSubDepto);
            navigate(`/Landing`);
            console.log('Iniciaste Sesion');
        }
    }
    const handleChangeName = (e) => {
        setUserName(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    return(
        <div className="text-white">
            <div className='card border-0'> 
                <Logo/>
                <div>
                    <div className="card-body loginCard logo">
                        <h5 className="text-center">Bienvenido a Adquisiciones</h5>
                        <h5 className='text-center'>Por favor Inicia Sesion</h5>
                        <br/>
                        <div className='row justify-content-md-center'>
                            <div className='col col-xl-8 input-field'>
                                <label>Nombre de usuario</label>
                                <TextInput onChange={handleChangeName} value={userName}/>
                            </div>
                        </div>
                        <br/>
                        <div className='row justify-content-md-center'>
                            <div className='col col-xl-8 input-field'>
                                <label>Contraseña</label>
                                <PasswordInput onChange={handleChangePassword} value={password}/>    
                            </div>
                        </div>
                        <br/>
                        <div className='row justify-content-md-center'>
                            <div className='col-md-auto'>
                                <button type='button' className='btn btn-outline-light' onClick={login}>Iniciar Sesion</button>
                                <Toaster/>
                            </div>
                        </div>
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    )
}
