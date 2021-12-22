import { formatPrice, getAddCartMessage } from '../../helpers'
import { useTranslation } from 'react-i18next'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, setAddedItem, updateLocalCarts } from '../../store/slices/UserSlice'
import Toast from '../toast'

function DetailOption({ item }) {
    const { t } = useTranslation()
    const [quantity, setQuantity] = useState(1)
    const [hasQuantity, setHasQuantity] = useState(true)
    const { name, img, brand, price, oldPrice } = item
    const dispatch = useDispatch()
    const { isLogged, addedItem, localCarts, userData, notification } = useSelector(({user}) => user)
    const { message, type } = notification

    const handleChangeInput = (e) => {
        let newQuantity = Number(e.target.value)
        if (isNaN(newQuantity)) {
            setQuantity(1)
        } else {
            setQuantity(newQuantity)
        }
    }

    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
    }

    const handleIncrement = () => {
        setQuantity(quantity + 1)
        if (quantity === 0) {
            setHasQuantity(true)
        }
    }

    const handleAddToLocal = (item) => {
            const itemExist = localCarts.find(elm => elm.id === item.id)
            if (itemExist) {
                const newCartLocal = localCarts.map(cart => {
                    if (cart.id === item.id) {
                        return {...cart, quantity: itemExist.quantity + item.quantity}
                    } else return cart
                })
                dispatch(updateLocalCarts(newCartLocal))
            } else {
                dispatch(updateLocalCarts([...localCarts, item]))
            }
    }

    const handleAddToCart = () => {
        if (quantity > 0) {
            const newCartItem = {...item, quantity: quantity}
            const message = getAddCartMessage(newCartItem)
            if (isLogged) {
                dispatch(addToCart(newCartItem, userData.id))
            } else {
                handleAddToLocal(newCartItem)
            }
            dispatch(setAddedItem({item: newCartItem, message}))
        } else {
            setHasQuantity(false)
        }
    }

    return ( 
        <section className="detail-content d-flex mt-3">
            <div className='detail-img'>
                <img className="w-100" alt={name} src={img} />
            </div>
            <div className='detail-option'>
                <h2 className='fs-3'>{name}</h2>
                <div className='detail-state fs-default mt-2'>
                    <span className='brand'>
                        {`${t('detail brand')}: `}
                        <span className='text-green'>{brand}</span>
                    </span>
                    <span className="state">
                        {`${t('detail state')}: `}
                        <span className='text-green'>{t('available')}</span>
                    </span>
                </div>
                <div className='detail-price mt-2'>
                    <span className='current-price mr-2 fs-3'>{formatPrice(price, t)}</span>
                    <span className='old-price fs-default text-main'>
                        {oldPrice ? `${formatPrice(oldPrice, t)}` : null}</span>
                </div>
                <div className='detail-desc fs-default mt-2 mb-3'>{t('description')}</div>
                <div className='detail-qnt'>
                    <span className='qnt-label fs-default'>{t('quantity')}:</span>
                    <div className='qnt-form d-flex mt-1 h-100'>
                        <div className='input-box h-100 d-flex'>
                            <input className="input input-qnt h-100 fs-default"
                                value={quantity}
                                onChange={(e)=> handleChangeInput(e)}
                            />
                            <div className='qnt-option h-100 fs-default'>
                                <button className="increment-btn option-btn w-100 h-50 flex-center"
                                    onClick={()=> handleIncrement()}
                                >
                                    &#43;
                                </button>
                                <button className="decrement-btn option-btn w-100 h-50 flex-center"
                                    onClick={()=> handleDecrement()}
                                >
                                    &#8722;
                                </button>
                            </div>
                        </div>
                        <div className='add-cart-btn btn ml-2 flex-center'
                            onClick={()=>handleAddToCart(quantity)}
                        >
                            {t('add to cart')}
                        </div>
                    </div>
                    {hasQuantity ? null : 
                        <div className='qnt-message fs-default text-red mt-2'>
                            Vui lòng chọn số lượng.
                        </div>
                    }                   
                </div>
            </div>
            {addedItem && message && <Toast type={type} message={message}/>}
        </section>
    );
}

export default DetailOption;
