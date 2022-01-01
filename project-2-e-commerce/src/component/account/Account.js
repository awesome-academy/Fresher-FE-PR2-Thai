import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from '../loading'
import { validateNewValue } from '../../helpers'
import { updateUser } from '../../store/slices/UserSlice'
import { setNotification } from '../../store/slices/NotificationSlice'
import { updateEmail, auth } from '../../firebase'

function AccountInfo() {
    const { isLoading, userLogin } = useSelector(({user}) => user)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [isEditEmail, setIsEditEmail] = useState(false)
    const [isEditPhone, setIsEditPhone] = useState(false)
    const [emailEditValue, setEmailEditValue] = useState('')
    const [phoneEditValue, setPhoneEditValue] = useState('')
    const [phoneErrorMessage, setPhoneErrorMessage] = useState('')
    const [emailErrorMessage, setEmailErrorMessage] = useState('')

    const handleEditEmail = () => {
        setIsEditEmail(true)
        setEmailEditValue(userLogin.email)
        setIsEditPhone(false)
    }

    const handleEditPhone = () => {
        setIsEditEmail(false)
        setIsEditPhone(true)
        setPhoneEditValue(userLogin.phone)
    }

    const updateNewEmail = async (option) => {
        const { fieldName, value } = option
        try {
            await updateEmail(auth.currentUser, option.value)
            await dispatch(updateUser({userId: userLogin.id, newUserData: {...userLogin, [fieldName]: value}})).unwrap()
            dispatch(setNotification({type: 'success', message: 'Update thành công!'}))
            setIsEditEmail(false)
        }
        catch (error) {
            const errorCode = error.code || error.message
            dispatch(setNotification({type: 'error', message: errorCode}))
        }
    }

    const handleSubmitEditEmail = () => {
        const errorMassage = validateNewValue(emailEditValue, userLogin.email, 'form email', t)
        if (errorMassage) {
            setEmailErrorMessage(errorMassage)
        } else {
            const option = {fieldName: 'email', value: emailEditValue}
            updateNewEmail(option)
        }
    }

    const updateNewPhone = async (option) => {
        const { fieldName, value } = option
        try {
            await dispatch(updateUser({userId: userLogin.id, newUserData: {...userLogin, [fieldName]: value}})).unwrap()
            dispatch(setNotification({type: 'success', message: 'Update thành công!'}))
            setIsEditPhone(false)
        }
        catch (error) {
            const errorCode = error.code || error.message
            dispatch(setNotification({type: 'error', message: errorCode}))
        }
    }

    const handleSubmitEditPhone = () => {
        const errorMassage = validateNewValue(phoneEditValue, userLogin.phone, 'form phone', t)
        if (errorMassage) {
            setPhoneErrorMessage(errorMassage)
        } else {
            const option = {fieldName: 'phone', value: phoneEditValue}
            updateNewPhone(option)
        }
    }

    return ( 
        <div className="acc-info">
            <h3 className="text-big fs-2">
                {t('acc info')}
            </h3>
            <div className="fs-default ta-center">
                {isLoading ?
                    <LoadingComponent/>
                :
                    <table className="w-100 b-none mt-2">
                        <tbody>
                            <tr className="b-none ta-left">
                                <th>{t('form name')}</th>
                                <td className="b-none ta-left">{userLogin && userLogin.name}</td>
                            </tr>
                            <tr className="b-none ta-left">
                                <th>{t('form email')}</th>
                                <td className="b-none ta-left">
                                    {isEditEmail ? 
                                        <div>
                                            <input type='email' className="input w-100" name='email-edit'
                                            value={emailEditValue} onChange={(e)=>setEmailEditValue(e.target.value)}
                                        />
                                        {emailErrorMessage && <span className="text-red d-block mt-1">{emailErrorMessage}</span>}
                                        </div>
                                    : userLogin && userLogin.email}
                                </td>
                                <td className="b-none text-blue cursor-poiter">
                                    {isEditEmail ?
                                        <div>
                                            <span className="mr-1 text-red"
                                                onClick={()=>{
                                                    setIsEditEmail(false)
                                                    setEmailEditValue(userLogin.email)
                                                    setEmailErrorMessage('')
                                                }}
                                            >{t('cancel')}</span>
                                            <span className="mr-1 text-black">|</span>
                                            <span className="text-blue"onClick={()=>handleSubmitEditEmail()}>{t('submit')}</span>
                                        </div>
                                    : 
                                        <span onClick={()=>handleEditEmail()}>{t('edit')}</span>
                                    }
                                </td>
                            </tr>
                            <tr className="b-none ta-left">
                                <th>{t('form phone')}</th>
                                
                                <td className="b-none ta-left">
                                    {isEditPhone ?
                                        <div>
                                            <input type='email' className="input w-100" name='email-edit'
                                                value={phoneEditValue} onChange={(e)=>setPhoneEditValue(e.target.value)}
                                            />
                                            {phoneErrorMessage && <span className="text-red d-block mt-1">{phoneErrorMessage}</span>}
                                        </div>
                                    : userLogin && userLogin.phone}
                                </td>
                                <td className="b-none text-blue cursor-poiter">
                                    {isEditPhone ?
                                        <div>
                                            <span className="mr-1 text-red"
                                                onClick={()=>{
                                                    setIsEditPhone(false)
                                                    setPhoneEditValue(userLogin.phone)
                                                    setPhoneErrorMessage('')
                                                }}
                                            >{t('cancel')}</span>
                                            <span className="mr-1 text-black">|</span>
                                            <span className="text-blue"onClick={()=>handleSubmitEditPhone()}>{t('submit')}</span>
                                        </div>
                                    :
                                        <span onClick={()=>handleEditPhone()}>{t('edit')}</span>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
}

export default AccountInfo;
