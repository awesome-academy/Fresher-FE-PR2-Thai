import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Users from './admin/Users';
import Products from './admin/Products';
import Orders from './admin/Orders';
import Sales from './admin/Sales';
import LoginAdmin from './admin/LoginAdmin';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux"
import { store } from './store'
import './i18n'
import Admin from './admin';

ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback="loading">
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path='*' element={<App />}/>
                        <Route path='/admin' element={<Admin />}>
                            <Route path='users' element={<Users/>}></Route>
                            <Route path='products' element={<Products/>}></Route>
                            <Route path='orders' element={<Orders/>}></Route>
                            <Route path='sales' element={<Sales/>}></Route>
                        </Route>
                        <Route path='/admin/login' element={<LoginAdmin/>}></Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </Suspense>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
