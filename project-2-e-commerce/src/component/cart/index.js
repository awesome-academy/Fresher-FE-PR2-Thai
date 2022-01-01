import './cart.scss'
import { createListNav, getLocalData, formatPrice, getTotal } from '../../helpers'
import { useTranslation } from 'react-i18next'
import NavComponent from '../nav'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import CartItem from './CartItem'
import { useEffect, useState } from 'react'
import { setCartsLength, updateUser } from '../../store/slices/UserSlice'

function Cart() {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { pathname } = useLocation()
    const { localCarts, isLogged, userData } = getLocalData()
    const cartList = isLogged ? userData.carts : localCarts ? localCarts : []
    const totalPay = getTotal(cartList)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [idCartDelete, setIdCartDelete] = useState('')
    const [isChange, setIsChangeQuantity] = useState(false)

    useEffect(()=>{
        return () => {
            if (isLogged && userData) {
                dispatch(updateUser({userId: userData.id, newUserData: userData}))
            }
        }
    })

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
        const newUserData = {...userData, carts : newCarts}
        if (isLogged) {
            localStorage.setItem('user-login', JSON.stringify(newUserData))
        } else if (newCarts.length > 0) {
            localStorage.setItem('local-carts', JSON.stringify(newCarts))
        } else {
            localStorage.removeItem('local-carts')
        }
        setCartsLength(newCarts.length)
        setIsOpenConfirmModal(false)
    }

    const toggleIsChangeQuantity = () => {
        setIsChangeQuantity(!isChange)
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
                                    getCartDelete={getCartDelete} toggleIsChangeQuantity={toggleIsChangeQuantity}
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
