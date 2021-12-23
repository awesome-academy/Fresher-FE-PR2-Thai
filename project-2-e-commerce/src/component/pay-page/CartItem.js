import { useTranslation } from "react-i18next";
import { formatPrice } from "../../helpers";

function CartItem({ name, img, quantity, price }) {
    const { t } = useTranslation()
    return ( 
        <div className="pay-cart-item d-flex ai-center jc-space-btw mb-1 fs-default">
            <div className="item-info d-flex ai-center">
                <div className="b-default item-img">
                    <img className="w-100" src={img} alt={name}/>
                    <div className="item-qnt flex-center text-white">{quantity}</div>
                </div>
                <span className="ml-1">{name}</span>
            </div>
            <span className="item-price-total">{formatPrice(quantity*price, t)}</span>
        </div>
    )
}

export default CartItem;
