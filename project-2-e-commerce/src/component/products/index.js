import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import './products.scss'
import { useEffect, useState } from 'react'
import Pagination from './Pagination'
import ProductsItem from '../product-item'
import LoadingComponent from '../loading'
import { 
    getProducts, getPagination, 
    setTypeRendering, setCurrentPage, setProductsFilter 
} from '../../store/slices/ProductsSlice'
import Toast from '../toast'

function Products() {
    const dispatch = useDispatch()
    const [sortValue, setSortValue] = useState('default')
    const { t } = useTranslation()
    const { all: products, typeRendering, pagination } = useSelector(({products}) => products)
    const { list: renderList, filter, isLoading } = products
    const { addedItem, notification } = useSelector(({user}) => user)
    const { type, message } = notification
    useEffect(()=> {
        dispatch(getProducts(filter))
        dispatch(getPagination({...filter, _limit: '', _page: ''}))
    }, [filter, dispatch])

    const setActiveLink = (flag) => {
        return flag === typeRendering ? {color: 'green'} : {} 
    }

    const setContentHeading = (typeRendering) => {
        switch (typeRendering) {
            case 'sale':
                return t('home sale heading')
            case 'special':
                return t('home featured heading')
            case 'new':
                return t('home new heading')
            default:
                return t('home all heading')
        }
    }

    const handleFilter = (type) => {
        const newFilter = {...filter, type_like: type, q: '', _page: 1}
        if (type) {
            dispatch(setTypeRendering(type))
            dispatch(setProductsFilter(newFilter))
        } else {
            dispatch(setTypeRendering('all'))
            dispatch(setProductsFilter({...newFilter, type_like: ''}))
        }
        dispatch(setCurrentPage(1))
    }

    const handleSort = (e) => {
        const value = e.target.value
        const valueArr = value.split('-')
        setSortValue(value)
        if (value === 'default') {
            dispatch(setProductsFilter({...filter, _sort: '', _order: ''}))
        } else {
            dispatch(setProductsFilter({...filter, _sort: valueArr[1], _order: valueArr[0]}))
        }
    }
    
    const handleFilterByBrand = (val) => {
        const newFilter = {...filter, brand: val}
        dispatch(setProductsFilter(newFilter))
    }

    const handleCloseBrand = (e) => {
        e.stopPropagation()
        const {brand, ...res} = filter
        const newFilter = res
        dispatch(setProductsFilter(newFilter))
    }

    const renderBrandList = (filterProducts) => {
        let brandList = filterProducts.map(item => item.brand)
        const brandListRender = [...(new Set(brandList))]
        return brandListRender.map(item => {
            return (
                <li className="category-item mb-2" key={item}
                    onClick={()=> handleFilterByBrand(item)}
                >
                    {item}
                    {filter.brand ?
                        <div className='close-brand' onClick={(e)=>handleCloseBrand(e)}>&#10006;</div> 
                    : 
                        null}
                </li>
            )
        })
    }

    return ( 
        <div className="products">
            <section className="wrap d-flex">
                <div className="category">
                    <h3 className='category-heading fs-default'>
                        {t('category')}
                    </h3>
                    <ul className="category-list mt-2 fs-default">
                        <li className="category-item mb-2"
                            style={setActiveLink('all')}
                            onClick={()=>handleFilter('')}
                        >
                            {t('home all heading')}
                        </li>
                        <li className="category-item mb-2"
                            style={setActiveLink('new')}
                            onClick={()=>handleFilter('new')}
                        >
                            {t('home new heading')}
                        </li>
                        <li className="category-item mb-2"
                            style={setActiveLink('special')}
                            onClick={()=>handleFilter('special')}
                        >
                            {t('home featured heading')}
                        </li>
                        <li className="category-item"
                            style={setActiveLink('sale')}
                            onClick={()=>handleFilter('sale')}
                        >
                            {t('home sale heading')}
                        </li>
                    </ul>
                    <h3 className='category-heading fs-default mt-3'>
                        {t('brand')}
                    </h3>
                    <ul className="category-list mt-2 fs-default">
                        {renderBrandList(pagination.list)}
                    </ul>
                </div>
                <div className='content'>
                    <div className='content-heading d-flex ai-center jc-space-btw'>
                        <h2>{setContentHeading(typeRendering)}</h2>
                        <div className='heading-sort d-flex ai-center'>
                            <span className='sort-label mr-1 fs-default'>{t('sort label')}:</span>
                            <div className='sort-select d-flex'>
                                <select className='select' onChange={(e) => handleSort(e)} value={sortValue}>
                                    <option value='default'>{t('sort default')}</option>
                                    <option value='asc-name'>{t('sort name asc')}</option>
                                    <option value='desc-name'>{t('sort name desc')}</option>
                                    <option value='asc-price'>{t('sort price asc')}</option>
                                    <option value='desc-price'>{t('sort price desc')}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='content-products'>
                        <div className='products-list d-flex row flex-wrap'>
                            {isLoading ?
                                <LoadingComponent/>
                            :
                                renderList && renderList.map(prod => 
                                    <ProductsItem key={prod.id} item={prod}/>
                                )
                            }
                        </div>
                        <Pagination filter={filter}/>
                    </div>
                </div>
            </section>
            {addedItem && message && <Toast type={type} message={message}/>}
        </div>
    );
}

export default Products;
