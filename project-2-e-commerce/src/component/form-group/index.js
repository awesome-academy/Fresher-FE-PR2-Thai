import { setPaymentForm, setSignupForm, setLoginForm } from '../../store/slices/UserSlice'
import './form-group.scss'
import SelectComponent from './SelectCity'
import SelectDistricts from './SelectDistricts'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

function FormGroup({ type = 'text', placeholder = '', name = '', formError}) {
    const dispatch = useDispatch()
    const { paymentForm, isLogging, isSignup, loginForm, signupForm } = useSelector(({user}) => user)
    const clearErrorEffect = formError ? formError.clearErrorEffect : null
    const fieldErrName = formError ? formError.fieldErrName : null
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (e) => {
        const { value, name } = e.target
        setInputValue(value)
        if (isLogging) {
            dispatch(setLoginForm({...loginForm, [name]: value}))
        } else if (isSignup) {
            dispatch(setSignupForm({...signupForm, [name]: value}))
        } else {
            dispatch(setPaymentForm({...paymentForm, [name]: value}))
        }
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
                    value={inputValue}
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

export default FormGroup;
