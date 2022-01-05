import { useDispatch, useSelector } from 'react-redux'
import { adminSelector, setEditForm } from '../store/slices/AdminSlice';

function EditProductInput({ name, placeholder, value }) {
    const dispatch = useDispatch()
    const { editError, editForm } = useSelector(adminSelector)

    const handleInputChange = (e) => {
        const newValue = name === 'price' ? Number(e.target.value) : e.target.value
        if (name === 'old_price') {
            dispatch(setEditForm({...editForm, oldPrice: newValue}))
        } else {
            dispatch(setEditForm({...editForm, [name]: newValue}))
        }
    }

    return ( 
        <div className='form-group mb-1 fs-default'>
            {name === 'desc' ?
                <textarea name={name}
                    className={`form-input w-100 pl-1 fs-default admin-area ${editError && editError === name && `error`}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e)=> handleInputChange(e)}
                />
            :
                <input type='text' name={name} 
                    className={`form-input w-100 pl-1 fs-default ${editError && editError === name && `error`}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e)=> handleInputChange(e)}
                />
            }
        </div>
    )
}

export default EditProductInput;
