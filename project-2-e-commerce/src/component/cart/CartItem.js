import { formatPrice, getLocalData  } from "../../helpers";
import { useTranslation } from "react-i18next"

function CartItem({ item, getCartDelete, toggleIsChangeQuantity }) {
    const { t } = useTranslation()
    const { name, img, price, quantity, id } = item
    const priceFormat = formatPrice(price, t)
    const totalFormat = formatPrice(price*quantity, t)
    const { localCarts, isLogged, userData } = getLocalData()

    const handleChangeQnt = (e) => {
        let value
        switch (e) {
            case 'increment':
                value = quantity + 1
                break;
            case 'decrement':
                value = quantity > 1 ? quantity - 1 : quantity
                break;
            default:
                value = isNaN(e.target.value) ? 1 : e.target.value
                break;
        }
        if (isLogged) {
            const newLocalCarts = updateCartList(id, value, userData.carts)
            const newUserData = {...userData, carts: newLocalCarts}
            localStorage.setItem('user-login', JSON.stringify(newUserData))
        } else {
            const newLocalCarts = updateCartList(id, value, localCarts)
            localStorage.setItem('local-carts', JSON.stringify(newLocalCarts))
        }
        toggleIsChangeQuantity()
    }

    const updateCartList = (id, value, arr) => {
        return arr.map(cart => {
            if (cart.id === id) {
                return {...cart, quantity: value}
            }
            return cart 
        })
    }

    return ( 
        <tr>
            <td className="cart-img">
                <img alt={name} src={img}/>
            </td>
            <td className="cart-name">
                {name}
            </td>
            <td className="cart-price">
                {priceFormat}
            </td>
            <td className="cart-quantity">
                <div className="quantity-box d-flex jc-center">
                    <button className="decrement-qnt qnt-btn flex-center fs-2 cursor-poiter"
                        onClick={()=>handleChangeQnt('decrement')}
                    >
                        &#8722;
                    </button>
                    <input className="input-qnt w-50" value={quantity} 
                        onChange={(e) => handleChangeQnt(e)}
                    />
                    <button className="increment-qnt qnt-btn flex-center fs-2 cursor-poiter"
                        onClick={()=>handleChangeQnt('increment')}
                    >
                        &#43;
                    </button>
                </div>
            </td>
            <td className="cart-total">
                {totalFormat}
            </td>
            <td className="cart-del">
                <div className="cart-del-btn cursor-poiter" onClick={()=>getCartDelete(id)}>
                    <i className="fas fa-trash-alt"/>
                </div>
            </td>
        </tr>
    );
}

export default CartItem;
