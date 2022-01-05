import { useDispatch, useSelector } from "react-redux";
import { setIsOpenDeleteModal } from "../store/slices/AdminSlice";
import { deleteProduct, getProducts } from '../store/slices/ProductsSlice'

function DeleteModal({ product }) {
    const dispatch = useDispatch()
    const { all: products } = useSelector(({products}) => products)
    const { filter } = products
    const { name, id } = product

    const handleDelProduct = () => {
        dispatch(deleteProduct(id))
        dispatch(getProducts(filter))
        dispatch(setIsOpenDeleteModal(false))
    }

    return ( 
        <div className="delete-modal p-2">
            <div className='confirm-del-modal fs-default p-2'>
                <div className='del-message ta-center mb-2'>
                    {`Xóa ${name} khỏi dánh sách?`}
                </div>
                <div className='del-option flex-center'>
                    <button className='del-confirm btn mr-3'
                        onClick={()=>handleDelProduct()}>Ok</button>
                    <button className='del-exit bg-white'
                        onClick={()=>setIsOpenDeleteModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;
