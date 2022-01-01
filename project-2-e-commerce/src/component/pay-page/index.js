import './pay-page.scss'
import FormGroup from '../form-group'
import { useTranslation } from 'react-i18next'
import NavComponent from '../nav'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from './CartItem'
import { formatPrice, getTotal, getSum, createListNav,
    validateForm, getCodeDate, getLocalData } from '../../helpers'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { updateUser } from '../../store/slices/UserSlice'
import { addOrdersAdmin } from '../../store/slices/AdminSlice'

function PayPage() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const { paymentForm } = useSelector(({user}) => user)
    const { localCarts, isLogged, userData } = getLocalData()
    const cartList = isLogged ? userData.carts : localCarts
    const transFee = cartList && cartList.length ? 40000 : 0
    const totalOrders = formatPrice(getSum(getTotal(cartList), transFee), t)
    const fee = formatPrice(transFee, t)
    const total = formatPrice(getTotal(cartList), t)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
    const [addressFormError, setAddressFormError] = useState('')

    const checkValidateForm = () => {
        const formError = validateForm(paymentForm)
        if (formError) {
            setAddressFormError({...formError, clearErrorEffect: ()=>setAddressFormError('')})
        } else {
            setIsOpenConfirmModal(true)
        }
    }

    const handleAddOrders = () => {
        const codeDate = getCodeDate(new Date())
        const code = isLogged ? `${userData.id}-${codeDate}` : `guest-${codeDate}`
        const newOrders = {
            list: cartList,
            total: getTotal(cartList),
            transFee: transFee,
            totalOrders: getSum(getTotal(cartList), transFee), 
            code: code,
            info: paymentForm,
            date: new Date(),
            status: 'pending'
        }
        if (isLogged) {
            const userId = userData.id
            const newUserData = {...userData, carts: []}
            localStorage.setItem('user-login', JSON.stringify(newUserData))
            dispatch(updateUser({userId, newUserData}))
        }
        localStorage.setItem('local-orders', JSON.stringify(newOrders))
        localStorage.removeItem('local-carts')
        setIsOpenConfirmModal(false)
        dispatch(addOrdersAdmin({...newOrders, userId: userData.id}))
    }

    return ( 
        <section className="pay-page bb-default pb-2">
            <NavComponent navList={createListNav(t, pathname)}/>
            <div className='wrap mt-2 pb-2'>
                <div className='row pb-2'>
                    <div className='pay-address lg-4 sm-12'>
                        <h3 className='mb-2 fs-2'>{t('pay address')}</h3>
                        <form className='address-form'>
                            <FormGroup type='text' name='email' placeholder={t('form email')}
                                formError={addressFormError}/>
                            <FormGroup type='text' name='name' placeholder={t('form name')}
                                formError={addressFormError}/>
                            <FormGroup type='text' name='phone' placeholder={t('form phone')}
                                formError={addressFormError}/>
                            <FormGroup type='text' name='address' placeholder={t('form address')}/>
                            <FormGroup type='select-city'/>
                            <FormGroup type='select-districts'/>
                            <FormGroup type='text-area' name='note' placeholder={t('form note')}/>
                        </form>
                    </div>
                    <div className='pay-info lg-4 sm-12'>
                        <h3 className='mb-2 fs-2'>{t('transport')}</h3>
                        <div className='pay-info-content fs-default pl-2 d-flex ai-center'>{t('deliver to home')}</div>
                        <h3 className='mb-1 mt-2 fs-2'>{t('pay-page low')}</h3>
                        <div className='pay-info-content fs-default pl-2 d-flex ai-center'>{t('payment on delivery')}</div>
                        {addressFormError ? 
                            <div className='pay-err-message text-red fs-default mt-2'>
                                {addressFormError.errMessage}
                            </div> 
                        : null}
                    </div>
                    <div className='pay-order lg-4 sm-12'>
                        <div className='pay-order-content b-default'>
                            <div className='pay-order-heading bb-default p-2'>
                                <h3 className='fs-2'>{`${t('orders')} (${cartList && cartList.length})`}</h3>
                            </div>
                            <div className='pay-order-body p-2'>
                                <div className='pay-cart-list bb-default pt-1 pb-1'>
                                    {cartList && cartList.map(item => <CartItem {...item} key={item.id}/>)}
                                </div>
                                <div className='pay-calculate pt-1 pb-1 bb-default'>
                                    <div className='pay-calculate-item mb-1 d-flex jc-space-btw fs-default'>
                                        <span>{t('temporary')}</span>
                                        <span>{total}</span>
                                    </div>
                                    <div className='pay-calculate-item d-flex jc-space-btw fs-default'>
                                        <span>{t('transportation fee')}</span>
                                        <span>{fee}</span>
                                    </div>
                                </div>
                                <div className='pay-total pt-1 pb-1 d-flex jc-space-btw fs-default'>
                                    <span className='fs-2'><strong>{t('total')}</strong></span>
                                    <span className='text-blue fs-2'>{totalOrders}</span>
                                </div>
                            </div>
                            <div className='pay-order-footer d-flex jc-space-btw ai-center p-2'>
                                <Link to='/cart' className='text-blue fs-default'>
                                    &#60; {t('back to carts page')}
                                </Link>
                                <button className='pay-order-btn fs-2 text-white pl-2 pr-2 pt-1 pb-1'
                                    onClick={()=>checkValidateForm()}
                                >{t('order')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isOpenConfirmModal ?
                <div className='confirm-del-modal fs-default p-2'>
                    <div className='del-message ta-center mb-2'>
                        {t(`payment confirm`)}
                    </div>
                    <div className='del-option flex-center'>
                        <Link to='/confirm-page' className='del-confirm btn mr-3 flex-center'
                            onClick={()=>handleAddOrders()}>Ok</Link>
                        <button className='del-exit bg-white'
                            onClick={()=>setIsOpenConfirmModal(false)}>Cancel</button>
                    </div>
                </div>
            : null}
        </section>
    );
}

export default PayPage;
