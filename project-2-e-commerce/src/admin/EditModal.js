import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenEditModal, setEditForm, adminSelector, setIsAddProduct } from '../store/slices/AdminSlice'
import { getProducts, updateProduct, addProduct } from '../store/slices/ProductsSlice'
import { setNotification } from '../store/slices/NotificationSlice'
import EditProductInput from './EditProductInput'
import Select from "react-select";
import { getTypesOption } from './helpers'

function EditModal() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { editForm, isAddProduct } = useSelector(adminSelector)
    const { name, img, id, brand, type, price, desc, oldPrice } = editForm
    const { all: products } = useSelector(({products}) => products)
    const { filter } = products

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (isAddProduct) {
                await dispatch(addProduct(editForm)).unwrap()
                dispatch(setNotification({type: 'success', message: 'Thêm sản phẩm thành công!'}))
            } else {
                await dispatch(updateProduct({id, newProductUpdate: editForm})).unwrap()
                dispatch(setNotification({type: 'success', message: 'Cập nhật sản phẩm thành công!'}))
            }
            dispatch(setIsOpenEditModal(false))
            dispatch(getProducts(filter))
        }
        catch (error) {
            const errorMessage = error.code || error.message
            setNotification({type: 'error', message: errorMessage})
        }
    }

    const handleChange = (e) => {
        const newType = e.value || type
        dispatch(setEditForm({...editForm, type: [newType]}))
    }

    return ( 
        <div className="edit-modal b-green p-2 fs-default">
            <form className="text-white d-flex jc-space-btw">
                <div className="flex-1">
                    <span className="mb-1 d-block">{t('product name')} <span className="text-red">*</span></span>
                    <EditProductInput name='name' placeholder="Name" value={name}/>
                    <span className="mb-1 mt-2 d-block">{t('product img')} <span className="text-red">*</span></span>
                    <EditProductInput name='img' placeholder="Image URL" value={img}/>
                    <span className="mb-1 mt-2 d-block">{t('product brand')} <span className="text-red">*</span></span>
                    <EditProductInput name='brand' placeholder="Brand" value={brand}/>
                    <span className="mb-1 mt-2 d-block">{t('product type')} <span className="text-red">*</span></span>
                    <Select className="text-black" options={getTypesOption()} onChange={(e)=>handleChange(e)} placeholder={'Loại sản phẩm'}/>
                    <span className="mb-1 d-block mt-2">{t('product price')} <span className="text-red">*</span></span>
                    <EditProductInput name='price' placeholder="Price" value={price}/>
                    {type && type.includes('sale') ?
                        <div>
                            <span className="mb-1 d-block mt-2">{t('product old price')} <span className="text-red">*</span></span>
                            <EditProductInput name='old_price' placeholder="Old price" value={oldPrice}/>
                        </div>
                    : null}
                </div>
                <div className="flex-1 ml-2">
                    <span className="mb-1 d-block">{t('product desc')} <span className="text-red">*</span></span>
                    <EditProductInput name='desc' placeholder="Description" value={desc}/>
                    <div className="d-flex ai-center mt-2 jc-end">
                        <button className='del-confirm bg-white admin-btn mr-3 fs-default'
                            onClick={(e)=>handleSubmit(e)}>Ok</button>
                        <button className='del-exit bg-white admin-btn fs-default'
                            onClick={()=>{
                                dispatch(setIsOpenEditModal(false))
                                dispatch(setIsAddProduct(false))
                                }
                            }
                        >Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditModal;
