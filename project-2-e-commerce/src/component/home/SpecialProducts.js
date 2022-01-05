import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import ProductsItem from '../product-item'
import { getSpecialProds, setTypeRendering, setProductsFilter } from '../../store/slices/ProductsSlice'
import LoadingComponent from '../loading'
import { useTranslation } from 'react-i18next'

function SpecialProducts() {
    const dispatch = useDispatch()
    const { special } = useSelector(({products}) => products)
    const { filter, list, isLoading } = special
    const { t } = useTranslation()

    useEffect(()=>{
        dispatch(getSpecialProds(filter))
    }, [filter, dispatch])
    
    const handleChangeProducts = () => {
        const newFilter = { ...filter, type: 'special', limit: 12}
        dispatch(setTypeRendering('special'))
        dispatch(setProductsFilter(newFilter))
    }

    return ( 
        <section className="home-item special-products">
            <div className="home-header">
                <h1>{t('home featured heading')}</h1>
            </div>
            <div className="special-list row">
                {isLoading ?
                    <LoadingComponent/>
                :
                    list && list.map(item => {
                        return (
                            <ProductsItem key={item.id} item={item}/>
                        )
                    })
                }
            </div>
            <div className='special-more'>
                <Link className='btn btn-seemore flex-center h-100' to="/products"
                    onClick={()=>handleChangeProducts()}
                >
                    {t('see more')}
                </Link>
            </div>
        </section>
    )
}

export default SpecialProducts;
