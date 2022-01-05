import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from '../loading'
import { creatAddressText, formatPrice, getCodeDate, getDate, getOrderStatusStyle } from '../../helpers'
import { useEffect } from "react";
import { getUserOrders } from '../../store/slices/UserSlice'

function Orders() {
    const { isLoading, userLogin, ordersList } = useSelector(({user}) => user)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    
    useEffect(()=> {
        dispatch(getUserOrders(userLogin.id))
    }, [])

    return ( 
        <div className="acc-orders">
            <h3 className="text-big fs-2">
                {t('acc orders')}
            </h3>
            <div className="fs-default ta-center orders-table">
                {isLoading ?
                    <LoadingComponent/>
                :
                    <table className="w-100 mt-2">
                        <thead className="text-white bg-account">
                            <tr>
                                <td className="table-orders-name">{t('orders')}</td>
                                <td>{t('date')}</td>
                                <td className="table-address">{t('address')}</td>
                                <td>{t('orders value')}</td>
                                <td>{t('pay info')}</td>
                                <td>{t('status')}</td>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersList && ordersList.length ?
                                ordersList.map(order => {
                                    const { info, list, total, date, code, status } = order
                                    return (
                                        <tr className="b-none ta-left" key={code}>
                                            <td>
                                                <div>{getCodeDate(date)}</div>
                                                {list.map(prod => {
                                                    const { name, quantity, id } = prod
                                                    return <div key={id} className="mt-1">{`(${name}) x ${quantity}`}</div>
                                                })}
                                            </td>
                                            <td>{getDate(date)}</td>
                                            <td>{creatAddressText(info)}</td>
                                            <td>{formatPrice(total, t)}</td>
                                            <td>{t('payment on delivery')}</td>
                                            <td className={getOrderStatusStyle(status)}>{status}</td>
                                        </tr>
                                    )
                                })
                            : 
                            <tr>
                                <td colSpan='6'>{t('have not orders')}</td>
                            </tr>
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
}

export default Orders;
