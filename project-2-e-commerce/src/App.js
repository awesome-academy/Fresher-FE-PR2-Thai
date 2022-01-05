import Header from './component/header'
import Footer from './component/footer'
import Home from './component/home'
import Products from './component/products'
import ProductsDetail from './component/product-detail'
import Login from './component/login'
import Signup from './component/signup'
import Account from './component/account'
import Cart from './component/cart'
import PayPage from './component/pay-page'
import ConfirmPage from './component/confirm-page'
import AccountInfo from './component/account/Account';
import Orders from './component/account/Orders';
import Password from './component/account/Password';
import Address from './component/account/Address';
import NotFound from './component/NotFound'
import Introduction from './component/Introduction'
import Contact from './component/Contact'
import Toast from './component/toast'
import { useSelector } from 'react-redux'
import { Routes, Route } from "react-router-dom";
import { notificationSelect } from './store/slices/NotificationSlice'
import './style/_global.scss'

function App() {
    const { message, type } = useSelector(notificationSelect)
    return (
        <>
            <Header></Header>
            <div className='main'>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="products" element={<Products />}/>
                    <Route path="products/:id" element={<ProductsDetail />}/>
                    <Route path="login" element={<Login />}/>
                    <Route path="signup" element={<Signup />}/>
                    <Route path="account" element={<Account />}>
                        <Route path='orders' element={<Orders/>}/>
                        <Route path='password' element={<Password/>}/>
                        <Route path='address' element={<Address/>}/>
                        <Route path='info' element={<AccountInfo/>}/>
                    </Route>
                    <Route path="cart" element={<Cart />}/>
                    <Route path="pay-page" element={<PayPage />}/>
                    <Route path="confirm-page" element={<ConfirmPage />}/>
                    <Route path="*" element={<NotFound />}/>
                    <Route path='intro' element={<Introduction/>}/>
                    <Route path='contact' element={<Contact/>}/>
                </Routes>
                {message && <Toast message={message} type={type}/>}
            </div>
            <Footer></Footer>
        </>
    )
}

export default App;
