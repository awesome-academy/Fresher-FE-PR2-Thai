import { createListNav } from '../../helpers'
import { useTranslation } from 'react-i18next'
import NavComponent from '../nav'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './cart.scss'
import CartItem from './CartItem'
import { formatPrice, getTotal } from '../../helpers'
import { useState } from 'react'
import { deleteUserCart } from '../../store/slices/UserSlice'

function Cart() {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { pathname } = useLocation()
    const { isLogged, userData } = useSelector(({user}) => user)
    const localCarts = JSON.parse(localStorage.getItem('local-carts'))
    const cartList = isLogged ? userData.cart : localCarts ? localCarts : []
    const totalPay = getTotal(cartList)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [idCartDelete, setIdCartDelete] = useState('')
    const [isChange, setIschange] = useState(false)

    const getCartDelName = () => {
        const cartDelete = cartList.find(cart => cart.id === idCartDelete)
        return cartDelete.name
    }

    const getCartDelete = (id) => {
        setIsOpenConfirmModal(true)
        setIdCartDelete(id)
    }

    const handleDelCart = () => {
        const newCarts = cartList.filter(cart => cart.id !== idCartDelete)
        if (isLogged) {
            dispatch(deleteUserCart(userData.id, idCartDelete))
        } else if (newCarts.length > 0) {
            localStorage.setItem('local-carts', JSON.stringify(newCarts))
        } else {
            localStorage.removeItem('local-carts')
        }
        setIsOpenConfirmModal(false)
    }

    const changeIsChange = () => {
        setIschange(!isChange)
    }

    return ( 
        <div className="cart">
            <NavComponent navList={createListNav(t, pathname)}/>
            <div className='cart-content wrap'>
                <h3 className='cart-heading fs-3 mt-3 mb-3'>
                    {t('your cart')}
                </h3>
                <div className='cart-table'>
                    <table className='fs-default w-100 p-0'>
                        <thead>
                            <tr>
                                <td className='p-1'>{t('product img')}</td>
                                <td className='p-1'>{t('product name')}</td>
                                <td className='p-1'>{t('price')}</td>
                                <td className='p-1'>{t('quantity')}</td>
                                <td className='p-1'>{t('total')}</td>
                                <td className='p-1'>{t('delete')}</td>
                            </tr>
                        </thead>
                        <tbody>
                            {cartList.length ? 
                                cartList.map(item => <CartItem key={item.id} item={item}
                                    getCartDelete={getCartDelete} changeIsChange={changeIsChange}
                                />)
                            :
                                <tr>
                                    <td className="ta-center" colSpan="6">Chưa có sản phẩm</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
                {totalPay ?
                <>
                    <div className='cart-total fs-default mt-2 ta-right'>
                        {t('total pay')}
                        <span><strong>: {formatPrice(totalPay, t)}</strong></span>
                    </div>
                    <div className='cart-pay ta-right mt-2'>
                        <Link to="/pay-page" className='btn pay-btn flex-center'>{t('let pay')}</Link>
                    </div>
                </>
                    : null
                }
            </div>
            {isOpenConfirmModal ?
                <div className='confirm-del-modal fs-default p-2'>
                    <div className='del-message ta-center mb-2'>
                        {`Xóa ${getCartDelName()} khỏi giỏ hàng?`}
                    </div>
                    <div className='del-option flex-center'>
                        <button className='del-confirm btn mr-3'
                            onClick={()=>handleDelCart()}>Ok</button>
                        <button className='del-exit bg-white'
                            onClick={()=>setIsOpenConfirmModal(false)}>Cancel</button>
                    </div>
                </div>
            : null}
        </div>
    );
}

export default Cart;
