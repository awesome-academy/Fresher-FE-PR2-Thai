import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenEditModal, setIsOpenDeleteModal, adminSelector, setEditForm, setIsAddProduct } from "../store/slices/AdminSlice";
import { getOptionUsers, getSortFilter, renderTypeOfProduct } from './helpers'
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import LoadingComponent from '../component/loading'
import Pagination from "../component/products/Pagination";
import { getProducts, getPagination } from '../store/slices/ProductsSlice'
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { notificationSelect } from "../store/slices/NotificationSlice";
import Toast from '../component/toast'

function Products() {
    const { all: products } = useSelector(({products}) => products)
    const { isOpenEditModal, isOpenDeleteModal } = useSelector(adminSelector)
    const { message, type } = useSelector(notificationSelect)
    const { list: renderList, filter, isLoading } = products
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [inputSearch, setInputSearch] = useState('')
    const [prodDelete, setProdDelete] = useState('')

    useEffect(()=>{
        dispatch(getProducts(filter))
        dispatch(getPagination({...filter, limit: '', page: ''}))
        return () => {
            dispatch(getProducts(filter))
        }
    }, [])

    const handleSearch = (e) => {
        setInputSearch(e.target.value)
        const prodfilter = {...filter, search: e.target.value}
        dispatch(getProducts(prodfilter))
    }

    const handleChange = (e) => {
        const { sort, order } = getSortFilter(e.value)
        const prodfilter = {...filter, sort, order}
        dispatch(getProducts(prodfilter))
    }

    const handleEdit = (prod) => {
        dispatch(setIsOpenEditModal(true))
        dispatch(setEditForm(prod))
    }

    const handleDelete = (prod) => {
        dispatch(setIsOpenDeleteModal(true))
        setProdDelete(prod)
    }

    const handleAddProduct = () => {
        dispatch(setIsAddProduct(true))
        dispatch(setIsOpenEditModal(true))
        dispatch(setEditForm({}))
    }

    return ( 
        <div className="admin-products">
            <div className="admin-filter-nav d-flex ai-center pl-2">
                <div className="admin-users-input">
                    <input className="input" value={inputSearch} placeholder={t('search placeholder')} 
                        onChange={(e) => handleSearch(e)}
                    />
                </div>
                <div className="admin-users-sort ml-2 fs-default">
                    <Select options={getOptionUsers()} onChange={(e)=>handleChange(e)} placeholder='Sắp xếp'/>
                </div>
            </div>
            <div className="admin-products-content">
                <div className="admin-products-add">
                    <div className="admin-add-btn d-flex ai-center fs-default cursor-poiter mt-2"
                        onClick={()=>handleAddProduct()}
                    >
                        <i className="fs-3 fas fa-plus-circle text-admin mr-1"></i>
                        {t('add product')}
                    </div>
                </div>
                <div className="admin-products-table pb-2">
                    {isLoading ? <LoadingComponent/>:
                        <table className="w-100 mt-2 fs-default mb-2">
                            <thead className="text-white bg-account">
                                <tr>
                                    <td>STT</td>
                                    <td>{t('product name')}</td>
                                    <td>{t('product img')}</td>
                                    <td>{t('product brand')}</td>
                                    <td>{t('product price')}</td>
                                    <td>{t('product type')}</td>
                                    <td>{t('product desc')}</td>
                                    <td>{t('product option')}</td>
                                </tr>
                            </thead>
                            <tbody>
                                {renderList && renderList.length ?
                                    renderList.map((prod, index) => {
                                        const { name, id, brand, price, type, img, desc } = prod
                                        return (
                                            <tr className="ta-left" key={id}>
                                                <td>{index + 1}</td>
                                                <td>{name}</td>
                                                <td>
                                                    <div className="table-img h-100">
                                                        <img className="w-100" src={img} alt={name}/>
                                                    </div>
                                                </td>
                                                <td>{brand}</td>
                                                <td>{price}</td>
                                                <td>{renderTypeOfProduct(type)}</td>
                                                <td>
                                                    <div className="table-desc">{desc}</div>
                                                </td>
                                                <td className="table-option">
                                                    <div className="d-flex flex-column ai-center">
                                                        <button className="table-btn fs-default bg-account pl-1 pr-1 b-none"
                                                            onClick={()=>handleEdit(prod)}
                                                        >{t('edit')}</button>
                                                        <button className="table-btn mt-1 fs-default pl-1 pr-1 text-red b-default bg-white"
                                                            onClick={()=>handleDelete(prod)}
                                                        >{t('delete')}</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                :
                                    <tr>
                                        <td colSpan='8'>{t('have not products')}</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    }
                    <Pagination filter={filter}/>
                </div>
                <div className="admin-products-edit-modal">
                    {isOpenEditModal && <EditModal/>}
                </div>
                <div className="admin-products-delete-modal">
                    {isOpenDeleteModal && <DeleteModal product={prodDelete}/>}
                </div>
            </div>
            {message && <Toast type={type} message={message}/>}
        </div>
    );
}

export default Products
