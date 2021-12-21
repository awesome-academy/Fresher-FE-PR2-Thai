import './detail.scss'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { getSiminarProducts, getProductById } from '../../store/slices/ProductsSlice'
import { useSelector, useDispatch } from 'react-redux';
import LoadingComponent from '../loading';
import ProductsItem from '../product-item';
import { useTranslation } from 'react-i18next'
import Tabs from './Tabs';
import DetailOption from './DetailOption'
import NavComponent from '../nav'
import { createListNav } from '../../helpers'

function ProductsDetail() {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const pathName = useLocation().pathname
    const { id } = useParams()
    const { productDetail } = useSelector(({products}) => products)
    const { content, isLoading, siminar } = productDetail
    const productRender = content[0]
    const { list: siminarList, isLoading: isLoadingSiminar } = siminar

    useEffect(() => {
        dispatch(getProductById(id))
    }, [id, dispatch])

    useEffect(() => {
        if (productRender) {
            dispatch(getSiminarProducts(productRender.brand))
        }
    }, [productRender, dispatch])

    return ( 
        <section className="products-detail">
            {productRender && <NavComponent navList={createListNav(t, pathName, productRender.name)}/>}
            <div className='wrap'>
                {isLoading ? 
                    <LoadingComponent/>
                :
                    productRender && <DetailOption item={productRender}/>
                }
                {productRender && <Tabs desc={productRender.desc}/>}
                <section className="similar mt-3">
                    <h3 className="detail-heading fs-2 mb-2">
                        {t('siminar products')}
                    </h3>
                    <div className='siminar-list d-flex row'>
                        {isLoadingSiminar ?
                            <LoadingComponent/>
                        :
                            siminarList && siminarList.map(item => <ProductsItem key={item.id} item={item}/>)
                        }
                    </div>
                </section>
            </div>
        </section>
    );
}

export default ProductsDetail;
