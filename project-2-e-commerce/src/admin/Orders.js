import { adminSelector, getOrders, updateOrdersAdmin } from '../store/slices/AdminSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getSortFilter, getOrdersOption } from './helpers'
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import LoadingComponent from '../component/loading'
import { creatAddressText, formatPrice, getOrderStatusStyle } from '../helpers'

function Orders() {
    const dispatch = useDispatch()
    const { ordersList, filterOrders, isLoading } = useSelector(adminSelector)
    const [inputSearch, setInputSearch] = useState('')
    const { t } = useTranslation()

    useEffect(()=>{
        dispatch(getOrders())
    }, [])

    const handleSearch = (e) => {
        setInputSearch(e.target.value)
        const filter = {...filterOrders, search: e.target.value}
        dispatch(getOrders(filter))
    }

    const handleChange = (e) => {
        const { sort, order } = getSortFilter(e.value)
        const filter = {...filterOrders, sort, order}
        dispatch(getOrders(filter))
    }

    const handleApprove = async (order) => {
        const newOderItem = {...order, status: 'approved'}
        await dispatch(updateOrdersAdmin({id: order.id, newOderItem})).unwrap()
        dispatch(getOrders(filterOrders))
    }

    const handleRefuse = async (order) => {
        const newOderItem = {...order, status: 'refuse'}
        await dispatch(updateOrdersAdmin({id: order.id, newOderItem})).unwrap()
        dispatch(getOrders(filterOrders))
    }

    return ( 
        <div className="admin-orders">
            <div className="admin-filter-nav d-flex ai-center pl-2">
                <div className="admin-users-input">
                    <input className="input" value={inputSearch} placeholder={t('search placeholder')} 
                        onChange={(e) => handleSearch(e)}
                    />
                </div>
                <div className="admin-users-sort ml-2 fs-default">
                    <Select options={getOrdersOption()} onChange={(e)=>handleChange(e)} placeholder='Sắp xếp'/>
                </div>
            </div>
            <div className="fs-default ta-center admin-orders-table">
                {isLoading ?
                    <LoadingComponent/>
                :
                    <table className="w-100 mt-2">
                        <thead className="text-white bg-account">
                            <tr>
                                <td>CODE</td>
                                <td>{t('user info')}</td>
                                <td>{t('address')}</td>
                                <td>{t('orders')}</td>
                                <td>{t('orders value')}</td>
                                <td>{t('pay info')}</td>
                                <td>{t('status')}</td>
                                <td>{t('product option')}</td>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersList && ordersList.length ?
                                ordersList.map(order => {
                                    const { info, list, total, code, status } = order
                                    return (
                                        <tr className="b-none ta-left" key={code}>
                                            <td className='table-code'>{code}</td>
                                            <td>
                                                <div>{info.name}</div>
                                                <div>{info.email}</div>
                                                <div>{info.phone}</div>
                                            </td>
                                            <td className='table-address'>{creatAddressText(info)}</td>
                                            <td className='table-orders'>
                                                {list.map(prod => {
                                                    const { name, quantity, id } = prod
                                                    return <div key={id} className="mt-1">{`(${name}) x ${quantity}`}</div>
                                                })}
                                            </td>
                                            <td>{formatPrice(total, t)}</td>
                                            <td>{t('payment on delivery')}</td>
                                            <td className={getOrderStatusStyle(status)}>{status}</td>
                                            <td>
                                                {status === 'pending' ?
                                                    <div className='d-flex flex-column'>
                                                        <button className="table-btn mr-1 fs-default bg-account pl-1 pr-1 b-none"
                                                            onClick={()=>handleApprove(order)}
                                                        >Approve</button>
                                                        <button className="table-btn mt-1 fs-default pl-1 pr-1 text-red b-default bg-white"
                                                            onClick={()=>handleRefuse(order)}
                                                        >Refuse</button>
                                                    </div>
                                                : status === 'approved' ?
                                                    <div className='d-flex flex-column'>
                                                        <button className="table-btn mt-1 fs-default pl-1 pr-1 text-red b-default bg-white"
                                                            onClick={()=>handleRefuse(order)}
                                                        >Refuse</button>
                                                    </div>
                                                :
                                                    <div className='d-flex flex-column'>
                                                        <button className="table-btn mr-1 fs-default bg-account pl-1 pr-1 b-none"
                                                            onClick={()=>handleApprove(order)}
                                                        >Approve</button>
                                                    </div>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            : 
                            <tr>
                                <td colSpan='8'>{t('have not orders')}</td>
                            </tr>
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}

export default Orders;