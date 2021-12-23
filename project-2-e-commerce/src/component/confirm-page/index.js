import { useSelector } from 'react-redux';
import './confirm.scss'
import successIcon from '../../assets/img/success-icon.png'
import { useTranslation } from 'react-i18next';
import CartItem from '../pay-page/CartItem'
import { formatPrice } from '../../helpers'
import { Link } from 'react-router-dom'

function ConfirmPage() {
    const { t } = useTranslation()
    const { isLogged } = useSelector(({user}) => user)
    const localOrders = JSON.parse(localStorage.getItem('local-orders'))
    const { list, code, info, total, totalOrders, transFee } = localOrders
    const { name, email, phone, address, district, city } = info
    return ( 
        <section className="confirm-page">
            <div className="wrap">
                <div className="row">
                    <div className="confirm-address lg-6 sm-12">
                        <div className='confirm-thanks d-flex ai-center'>
                            <div className='confirm-icon mr-2'>
                                <img src={successIcon} alt='success icon' className='w-100'></img>
                            </div>
                            <div className='confirm-text'>
                                <h3 className='fs-2 mb-1'>{t('thank for order')}</h3>
                                <p className='fs-default mb-1'>
                                    {`${t('confirm email message')} ${email}`}
                                </p>
                                <p className='fs-default mb-1'>
                                    {`${t('confirm phone message')} ${phone}`}
                                </p>
                                <p className='fs-default'>
                                    {t('support phone message')}
                                    <a href='tel:0974521617' className='text-blue ml-1'>0974521617</a>
                                </p>
                            </div>
                        </div>
                        <div className='confirm-info b-green p-1 d-flex flex-wrap mt-3'>
                            <div className='confirm-info-item w-50 pr-1'>
                                <h3 className='fs-2'>{t('payment info')}</h3>
                                <div className='fs-default mt-1'>{name}</div>
                                <div className='fs-default mt-1'>{email}</div>
                            </div>
                            <div className='confirm-info-item w-50 pl-1'>
                                <h3 className='fs-2'>{t('delivery address')}</h3>
                                <div className='fs-default mt-1'>{address}</div>
                                <div className='fs-default mt-1'>
                                    {`${district ? `${district},` : ''} ${city}`}
                                </div>
                            </div>
                            <div className='confirm-info-item w-50 pr-1  mt-1'>
                                <h3 className='fs-2'>{t('payment methods')}</h3>
                                <div className='fs-default mt-1'>{t('payment on delivery')}</div>
                            </div>
                            <div className='confirm-info-item w-50 pl-1  mt-1'>
                                <h3 className='fs-2'>{t('trans methods')}</h3>
                                <div className='fs-default mt-1'>{t('deliver to home')}</div>
                            </div>
                        </div>
                    </div>
                    <div className="confirm-orders lg-6 sm-12">
                        <div className='bg-white b-green h-100'>
                            <div className='pay-order-heading bb-default p-2'>
                                <h3 className='fs-2'>{code}</h3>
                            </div>
                            <div className='pay-order-body p-2'>
                                <div className='pay-cart-list bb-default pt-1 pb-1'>
                                    {list && list.map(item => <CartItem {...item} key={item.id}/>)}
                                </div>
                                <div className='pay-calculate pt-1 pb-1 bb-default'>
                                    <div className='pay-calculate-item mb-1 d-flex jc-space-btw fs-default'>
                                        <span>{t('temporary')}</span>
                                        <span>{formatPrice(total, t)}</span>
                                    </div>
                                    <div className='pay-calculate-item d-flex jc-space-btw fs-default'>
                                        <span>{t('transportation fee')}</span>
                                        <span>{formatPrice(transFee, t)}</span>
                                    </div>
                                </div>
                                <div className='pay-total pt-1 pb-1 d-flex jc-space-btw fs-default'>
                                    <span className='fs-2'><strong>{t('total')}</strong></span>
                                    <span className='text-blue fs-2'>{formatPrice(totalOrders, t)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='confirm-option d-flex jc-end mt-3'>
                    <Link to='/products' className='back-to-products pay-order-btn fs-2 text-white pl-2 pr-2 pt-1 pb-1'>
                        {t('back to products page')}
                    </Link>
                    {isLogged ?
                        <Link to='/orders' className="text-green fs-default ml-2">{t('go to orders page')} &#62;</Link> 
                    :
                        <Link to='/login' className="text-green pay-order-btn fs-2 ml-2 pl-2 pr-2 pt-1 pb-1 bg-white">{t('login')}</Link>
                    }
                </div>
            </div>
        </section>
    );
}

export default ConfirmPage;
