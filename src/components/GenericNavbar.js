import React,{useContext} from 'react';
import logo from '../assets/logo-imperial-blanco.png';
import {NavLink, useNavigate} from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';

//cambiar los href por navlink y to="/direccion"

export default function GenericNavbar(){
    const navigate = useNavigate();
    const { setPermisson, setAmbientPort, setCodePermisson, setCostCenterCode } = useContext(UserContext);
    //COLOCAR IF PARA DIFERENCIAR QUE MOSTRAR CON EL CODEPERMISSON Y COSTCENTERCODE
    const { setAccessToken } = useContext(AuthContext);
    const menu = JSON.parse(localStorage.getItem('menu'));
    const userNameData = JSON.parse(localStorage.getItem('userNameData'));
    const logoRedirecction = () =>{
        navigate(`/Landing`);
    }
    const handleLogOut = () => {
        setAccessToken(null);
        setPermisson(null);
        setAmbientPort(null);
        setCodePermisson(null);
        setCostCenterCode(null);
        localStorage.clear('menu');
    }
    return(
        <>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
              <div className="container-fluid">
                <span className="spacing-nav navbar-brand">
                    <img src={logo} alt="" width='220' height="30" role='button' onClick={logoRedirecction}/>
                </span>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                        {menu.map((deptos) => 
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <span className="nav-link dropdown-toggle fw-bold" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {deptos.nombre}
                                        </span>
                                        <ul className="dropdown-menu ">
                                            {deptos.children.map((subdepto) => 
                                            <>
                                                <li>
                                                    <span className='dropdown-item' role='button'>{subdepto.nombre} &#9656;</span>
                                                    <ul className='dropdown-menu dropdown-submenu'>
                                                        {subdepto.children.map((proceso) => 
                                                            <li>
                                                                <span className='dropdown-item' role='button'>{proceso.nombre} &#9656;</span>
                                                                <ul className='dropdown-menu dropdown-submenu'>
                                                                    {proceso.children.map((accion) => 
                                                                        <li>
                                                                            <NavLink className = "dropdown-item" to = {accion.link}>{accion.nombre}</NavLink>
                                                                        </li>
                                                                    )}
                                                                </ul>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </li>
                                            </>
                                            )}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </ul>
                    <ul className="nav navbar-nav navbar-right auth-spacing mt-2 mt-lg-0">
                        <li className="nav-item">
                            <a role='button' className='nav-link'>{userNameData}</a>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link fw-bold" replace to ='/' onClick={handleLogOut}><i className="bi bi-box-arrow-left"/></NavLink>
                        </li>
                    </ul>
                </div>
          </div>
        </nav>
        </>
    )
}

