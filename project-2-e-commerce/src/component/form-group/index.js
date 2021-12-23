import { setPaymentForm } from '../../store/slices/UserSlice'
import './form-group.scss'
import SelectComponent from './SelectCity'
import SelectDistricts from './SelectDistricts'
import { useDispatch, useSelector } from 'react-redux'

function FromGroup({ type = 'text', placeholder = '', name = '', addressFormError}) {
    const dispatch = useDispatch()
    const { paymentForm } = useSelector(({user}) => user)
    const clearErrorEffect = addressFormError ? addressFormError.clearErrorEffect : null
    const fieldErrName = addressFormError ? addressFormError.fieldErrName : null

    const handleInputChange = (e) => {
        const { value, name } = e.target
        dispatch(setPaymentForm({...paymentForm, [name]: value}))
        clearErrorEffect && clearErrorEffect()
    }

    const renderFormGroup = () => {
        switch (type) {
            case 'text-area':
                return <textarea name={name} className='form-input w-100 pl-1 pt-1 fs-default'
                        placeholder={placeholder} 
                        onChange={(e)=>handleInputChange(e)}
                    />
            case 'select-city':
                return <SelectComponent/>
            case 'select-districts':
                return <SelectDistricts/>
            default:
                return <input type={type} name={name} 
                    className={`form-input w-100 pl-1 fs-default ${fieldErrName && fieldErrName === name && `error`}`}
                    placeholder={placeholder}
                    onChange={(e)=> handleInputChange(e)}
                />
        }
    }

    return ( 
        <div className='form-group mb-1 fs-default'>
            {renderFormGroup(type, placeholder)}
        </div>
    )
}

export default FromGroup;
