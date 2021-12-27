import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import LoadingComponent from '../loading'
import { creatAddressText, formatPrice, getCodeDate, getDate } from '../../helpers'

function Orders() {
    const { isLoading, userLogin } = useSelector(({user}) => user)
    const { t } = useTranslation()
    const ordersList = userLogin.orders
    return ( 
        <div className="acc-orders">
            <h3 className="text-big fs-2">
                {t('acc orders')}
            </h3>
            <div className="fs-default ta-center">
                {isLoading ?
                    <LoadingComponent/>
                :
                    <table className="w-100 mt-2">
                        <thead className="text-white bg-account">
                            <tr>
                                <td>{t('orders')}</td>
                                <td>{t('date')}</td>
                                <td>{t('address')}</td>
                                <td>{t('orders value')}</td>
                                <td>{t('pay info')}</td>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersList && ordersList.length ?
                                ordersList.map(order => {
                                    const { info, list, total, date, code } = order
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
                                        </tr>
                                    )
                                })
                            : 
                            <tr>
                                <td colSpan='5'>{t('have not orders')}</td>
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
