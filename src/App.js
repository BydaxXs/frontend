import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';

//Pages
import LoginPage from './Pages/LoginPage';
import CreateUser from './Pages/CreateUserPage';
import ProfilePage from './Pages/ProfilePage';
import TaxInsertPage from './Pages/TaxInsertPage';
import SearchTaxPage from './Pages/SearchTaxPage';
import CreateDeliveryPage from './Pages/CeaterDeliveryPage';
import SearchDeliveryPage from './Pages/SearchDeliveryPage';
import Landing from './Pages/Landing';
import AssingmentPage from './Pages/AssingmentPage';
import CreateRequestPage from './Pages/CreateRequestPage';
import CreateProviderPage from './Pages/CreateProviderPage';
import RegisterProduct from './Pages/ProductPage';
import SearchProviderPage from './Pages/SearchProviderPage';
import RegisterContactPage from './Pages/RegisterContactPage';
import CreateCountryCommunePage from './Pages/CreateCountryCommunePage';
import ErrorPage from './components/Error';
import SearchRequestPage from './Pages/SearchRequestPage';
import AssingProductProviderPage from './Pages/AssingProductProviderPage';
import CreateViewPage from './Pages/CreateViewPage';
import AssingViewsPage from './Pages/AssingViewsPage';

//Context
import ProtectedRoute from './components/ProtectedRoute';
import AuthContextProvider from './context/AuthContext';
import UserContextProvider from './context/UserContext';

import './App.css'


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <UserContextProvider>
          <div className='App'>
            <Routes>
              <Route path = '/' element = {<LoginPage/>} />
                <Route element = { <ProtectedRoute/> } >
                  <Route path = '/Landing' element = {<Landing />} />
                  <Route path = '/profileData' element = {<ProfilePage/>} />
                  <Route path = '/TaxInsert' element = {<TaxInsertPage/>} />
                  <Route path = '/SearchTaxPage' element = {<SearchTaxPage/>} />
                  <Route path = '/CreateDeliveryPage' element = {<CreateDeliveryPage/>} />
                  <Route path = '/SearchDeliveryPage' element = {<SearchDeliveryPage/>} />
                  <Route path = '/Assingment' element = {<AssingmentPage/>} />
                  <Route path = '/CreateRequest' element = {<CreateRequestPage/>}/>
                  <Route path = '/CreateProvider' element = {<CreateProviderPage/>}/>
                  <Route path = '/SearchProviderPage' element = {<SearchProviderPage/>} />
                  <Route path = '/RegisterProduct' element = {<RegisterProduct/>}/>
                  <Route path = '/RegisterProviderContact' element = {<RegisterContactPage/>}/>
                  <Route path = '/CreateCountryCommune' element = {<CreateCountryCommunePage/>}/>
                  <Route path = '/CreateUser' element = {<CreateUser/>}/>
                  <Route path = '/Error/:code:message' element = {<ErrorPage/>}/>
                  <Route path = '/SearchRequest' element = {<SearchRequestPage/>}/>
                  <Route path = '/AssingProductProvider' element = {<AssingProductProviderPage/>}/>
                  <Route path = '/CreateView' element = {<CreateViewPage/>}/>
                  <Route path = '/AssingUserMenu' element = {<AssingViewsPage/>}/>
                </Route>
              <Route path = '*' element = {<Navigate to = '/' />} />
            </Routes>
          </div>
        </UserContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
