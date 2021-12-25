import { useTranslation } from "react-i18next";
import NavComponent from "../nav";
import { useLocation } from 'react-router-dom'
import { createListNav, validateForm, renderSignError} from '../../helpers'
import FormGroup from "../form-group";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setIsLogging, setLoginForm, getUserData } from '../../store/slices/UserSlice'
import { setNotification, notificationSelect } from '../../store/slices/NotificationSlice'
import { useEffect, useState } from "react";
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import Toast from "../toast";

function Login() {
    const { t } = useTranslation()
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const { loginForm } = useSelector(({user}) => user)
    const { message, type } = useSelector(notificationSelect)
    const [loginFormError, setLoginFormError] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(setIsLogging(true))
        return () => {
            dispatch(setIsLogging(false))
        }
    }, [dispatch])

    const login = async (loginForm) => {
        try {
            const { email, password } = loginForm
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            await dispatch(getUserData(user.uid)).unwrap()
            navigate('/')
            dispatch(setNotification({type: 'success', message: 'Đăng nhập thành công'}))
            dispatch(setLoginForm({email: '',password: ''}))
        }
        catch (error) {
            const errorCode = error.code || error.message
            renderSignError(errorCode, setNotification, dispatch)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const loginFormError = validateForm(loginForm)
        if (loginFormError) {
            setLoginFormError({...loginFormError, clearErrorEffect: ()=>setLoginFormError('')})
        } else {
            login(loginForm)
        }
    }

    return ( 
        <div className="login bb-default pb-2">
            <NavComponent navList={createListNav(t, pathname)}/>
            <div className="wrap mt-2">
                <div className="login-heading bb-black pb-1">
                    <h3 className="fs-2 text-big">{t('login low')}</h3>
                </div>
                <div className="sign-form mt-2">
                    <h3 className="fs-2 text-big mb-2">{t('user login')}</h3>
                    <p className="fs-default">{t('login message')}</p>
                    {loginFormError ? 
                        <span className="text-red fs-default d-block mt-2">{loginFormError.errMessage}</span>
                    : null }
                    <form className="mt-3 fs-default">
                        <span className="mb-1 d-block">Email <span className="text-red">*</span></span>
                        <FormGroup type='email' name='email' placeholder="Email"
                            formError={loginFormError}
                        />
                        <span className="mb-1 mt-2 d-block">Passwork <span className="text-red">*</span></span>
                        <FormGroup type='password' name='password' placeholder="Password"
                            formError={loginFormError}
                        />
                        <button className="w-100 btn login-btn mt-3 fs-default text-big flex-center pt-1 pb-1"
                            onClick={(e)=>handleSubmit(e)}
                        >
                            {t('login')}
                        </button>
                    </form>
                    <div className="fs-default mt-2 ">
                        <p className="d-flex jc-center">
                            {t('have not account')}
                            <Link to='/signup' className='ml-1 text-green td-under'>{t('signup here')}</Link>    
                        </p>
                    </div>
                </div>
            </div>
            {message && <Toast message={message} type={type}/>}
        </div>
    );
}

export default Login;
