import { Link } from 'react-router-dom'
import './product-item.scss'
import { formatPrice } from '../home/helpers'

function ProductsItem({item}) {
    const { name, id, price, oldPrice, img} = item
    const priceFormat = formatPrice(price)
    let oldPriceFormat = oldPrice ? formatPrice(oldPrice) : null
    return ( 
        <div className='product-item lg-3 md-6 sm-12'>
            <Link to="product-detail" className="product-link d-block" data-id={id}>
                <img className='product-img w-100' alt="hinh anh" src={img}></img>
            </Link>
            <div className='product-info'>
                <h3 className='product-name fs-default'>{name}</h3>
                <div className='product-price mt-1 fs-default'>
                    <span className="current-price text-black">{priceFormat}đ</span>
                    <span className="old-price">{oldPriceFormat ? `${oldPriceFormat}đ` : ''}</span>
                </div>
            </div>
        </div>
    );
}

export default ProductsItem;
