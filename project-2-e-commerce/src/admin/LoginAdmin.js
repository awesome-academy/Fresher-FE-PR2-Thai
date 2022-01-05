import { useEffect, useState } from "react";
import FormGroup from "../component/form-group";
import { setIsLoggingAdmin, adminSelector } from '../store/slices/AdminSlice'
import { setNotification } from '../store/slices/NotificationSlice'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { validateForm, renderSignError } from '../helpers'
import { useTranslation } from 'react-i18next'

function LoginAdmin() {
    const [loginFormError, setLoginFormError] = useState('')
    const { emailAdmin, loginAdminForm } = useSelector(adminSelector)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation()
    
    useEffect(()=>{
        dispatch(setIsLoggingAdmin(true))
        return () => {
            dispatch(setIsLoggingAdmin(false))
        }
    }, [dispatch])

    const login = async (loginAdminForm) => {
        try {
            const { email, password } = loginAdminForm
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            sessionStorage.setItem('admin-id', JSON.stringify(user.uid))
            navigate('/admin/users')
            dispatch(setNotification({type: 'success', message: 'Đăng nhập thành công'}))
        }
        catch (error) {
            const errorCode = error.code || error.message
            renderSignError(errorCode, setNotification, dispatch)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const loginAdminFormError = validateForm(loginAdminForm)
        if (loginAdminFormError) {
            setLoginFormError(loginAdminFormError)
        } else {
            if (loginAdminForm.email !== emailAdmin) {
                setLoginFormError({errMessage: 'Tài khoản admin không tồn tại!', fieldErrName: 'email'})
            } else {
                login(loginAdminForm)
            }
        }
    }

    return ( 
        <div className="admin-login flex-center">
            <form className="admin-login-form b-default p-2">
                {loginFormError && <span className="text-red fs-default mb-2 d-block">{loginFormError.errMessage}</span>}
                <span className="mb-1 d-block fs-default">Email <span className="text-red">*</span></span>
                <FormGroup type='email' name='email' placeholder="Email"
                    formError={loginFormError}
                />
                <span className="mb-1 mt-2 d-block fs-default">Passwork <span className="text-red">*</span></span>
                <FormGroup type='password' name='password' placeholder="Password"
                    formError={loginFormError}
                />
                <button className="w-100 btn login-btn mt-3 fs-default text-big flex-center pt-1 pb-1 cursor-poiter"
                    onClick={(e)=>handleSubmit(e)}
                >
                    {t('login')}
                </button>
            </form>
        </div>
    )
}

export default LoginAdmin;
