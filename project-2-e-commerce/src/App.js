import Header from './component/Header'
import Footer from './component/Footer'
import Home from './component/Home'
import Products from './component/Products'
import ProductsDetail from './component/ProductsDetail'
import Login from './component/Login'
import Register from './component/Register'
import NotFound from './component/NotFound'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
        <Header></Header>
        <div className='main'>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="products" element={<Products />}/>
                <Route path="products/:id" element={<ProductsDetail />}/>
                <Route path="login" element={<Login />}/>
                <Route path="register" element={<Register />}/>
                <Route path="*" element={<NotFound />}/>
            </Routes>
        </div>
        <Footer></Footer>
    </>
  )
}

export default App;
