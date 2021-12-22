import { Link } from 'react-router-dom'
import './product-item.scss'
import { formatPrice, getAddCartMessage } from '../../helpers'
import { useTranslation } from 'react-i18next'
import { addToCart, setAddedItem, updateLocalCarts } from '../../store/slices/UserSlice'
import { useDispatch, useSelector } from 'react-redux'

function ProductsItem({item}) {
    const { name, id, price, oldPrice, img } = item
    const { t } = useTranslation()
    const { isLogged, userData, localCarts } = useSelector(({user}) => user)
    const dispatch = useDispatch()
    const priceFormat = formatPrice(price, t)
    let oldPriceFormat = oldPrice ? formatPrice(oldPrice, t) : null
    let href = `/products/${id}`

    const handleAddToLocal = (item) => {
        const itemExist = localCarts.find(elm => elm.id === item.id)
        if (itemExist) {
            const newCartLocal = localCarts.map(cart => {
                if (cart.id === item.id) {
                    return {...cart, quantity: Number(itemExist.quantity) + item.quantity}
                }
                return cart
            })
            dispatch(updateLocalCarts(newCartLocal))
        } else {
            dispatch(updateLocalCarts([...localCarts, item]))
        }
    }

    const handleAddToCart = (item) => {
        const newCartItem = {...item, quantity: 1}
        const message = getAddCartMessage(newCartItem)
        if (isLogged) {
            dispatch(addToCart(newCartItem, userData.id))
        } else {
            handleAddToLocal(newCartItem)
        }
        dispatch(setAddedItem({item: newCartItem, message}))
    }

    return ( 
        <div className='product-item lg-3 md-6 sm-12'>
            <Link to={href} className="product-link d-block" data-id={id}>
                <img className='product-img w-100' alt="hinh anh" src={img}></img>
            </Link>
            <div className='add-cart-btn btn w-100 flex-center'
                onClick={()=>handleAddToCart(item)}
            >
                {t('add to cart')}
            </div>
            <div className='product-info'>
                <h3 className='product-name fs-default'>{name}</h3>
                <div className='product-price mt-1 fs-default'>
                    <span className="current-price text-black">{priceFormat}</span>
                    <span className="old-price">{oldPriceFormat ? `${oldPriceFormat}` : ''}</span>
                </div>
            </div>
        </div>
    );
}

export default ProductsItem;
