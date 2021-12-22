import './pay-page.scss'
import FormGroup from '../form-group'
import { useTranslation } from 'react-i18next'
import NavComponent from '../nav'
import { createListNav } from '../../helpers'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'
import { formatPrice, getTotal, getSum } from '../../helpers'
import { Link } from 'react-router-dom'

function PayPage() {
    const { t } = useTranslation()
    const { pathname } = useLocation()
    const { isLogged, userData, localCarts } = useSelector(({user}) => user)
    const cartList = isLogged ? userData.cart : localCarts
    const transFee = cartList.length ? 40000 : 0
    return ( 
        <section className="pay-page bb-default pb-2">
            <NavComponent navList={createListNav(t, pathname)}/>
            <div className='wrap mt-2 pb-2'>
                <div className='row pb-2'>
                    <div className='pay-address lg-4 sm-12'>
                        <h3 className='mb-2 fs-2'>{t('pay address')}</h3>
                        <form className='address-form'>
                            <FormGroup type='text' placeholder={t('form email')}/>
                            <FormGroup type='text' placeholder={t('form name')}/>
                            <FormGroup type='text' placeholder={t('form phone')}/>
                            <FormGroup type='text' placeholder={t('form address')}/>
                            <FormGroup type='text-area' placeholder={t('form note')}/>
                        </form>
                    </div>
                    <div className='pay-info lg-4 sm-12'>
                        <h3 className='mb-2 fs-2'>{t('transport')}</h3>
                        <div className='pay-info-content fs-default pl-2 d-flex ai-center'>{t('deliver to home')}</div>
                        <h3 className='mb-1 mt-2 fs-2'>{t('pay-page low')}</h3>
                        <div className='pay-info-content fs-default pl-2 d-flex ai-center'>{t('payment on delivery')}</div>
                    </div>
                    <div className='pay-order lg-4 sm-12'>
                        <div className='pay-order-content b-default'>
                            <div className='pay-order-heading bb-default p-2'>
                                <h3 className='fs-2'>{`${t('orders')} (${cartList.length})`}</h3>
                            </div>
                            <div className='pay-order-body p-2'>
                                <div className='pay-cart-list bb-default pt-1 pb-1'>
                                    {cartList && cartList.map(item => <CartItem {...item} key={item.id}/>)}
                                </div>
                                <div className='pay-calculate pt-1 pb-1 bb-default'>
                                    <div className='pay-calculate-item mb-1 d-flex jc-space-btw fs-default'>
                                        <span>{t('temporary')}</span>
                                        <span>{formatPrice(getTotal(cartList), t)}</span>
                                    </div>
                                    <div className='pay-calculate-item d-flex jc-space-btw fs-default'>
                                        <span>{t('transportation fee')}</span>
                                        <span>{formatPrice(transFee, t)}</span>
                                    </div>
                                </div>
                                <div className='pay-total pt-1 pb-1 d-flex jc-space-btw fs-default'>
                                    <span className='fs-2'><strong>{t('total')}</strong></span>
                                    <span className='text-blue fs-2'>{formatPrice(getSum(getTotal(cartList), transFee), t)}</span>
                                </div>
                            </div>
                            <div className='pay-order-footer d-flex jc-space-btw ai-center p-2'>
                                <Link to='/cart' className='text-blue fs-default'>&#60; {t('back to carts page')}</Link>
                                <button className='pay-order-btn fs-2 text-white pl-2 pr-2 pt-1 pb-1'>{t('order')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PayPage;
