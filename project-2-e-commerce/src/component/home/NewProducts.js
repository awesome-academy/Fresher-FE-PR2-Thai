import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ProductsItem from '../product-item';
import { carouselResponsive } from '../../helpers'
import { getNewProds } from '../../store/slices/ProductsSlice'
import LoadingComponent from '../loading/index'
import { useTranslation } from 'react-i18next'

function NewProducts() {
    const dispatch = useDispatch()
    const { new: newList } = useSelector(({products}) => products)
    const { filter, list, isLoading } = newList
    const { t } = useTranslation()

    useEffect(()=>{
        dispatch(getNewProds(filter))
    }, [filter, dispatch])
    
    return ( 
        <section className="home-item new-products">
            <div className="home-header">
                <h1>{t('home new heading')}</h1>
            </div>
            {isLoading ?
                <LoadingComponent/>
            :
                <Carousel
                    swipeable={false}
                    draggable={true}
                    showDots={true}
                    responsive={carouselResponsive}
                    ssr={true}
                    infinite={true}
                    autoPlay={false}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    {list && list.map(item => {
                        return (
                            <ProductsItem key={item.id} item={item}/>
                        )
                    })}
                </Carousel>
            }
        </section>
    );
}

export default NewProducts;
