import { useTranslation } from "react-i18next";
import NavComponent from "../nav";
import { useLocation, useNavigate } from 'react-router-dom'
import { createListNav, validateForm, renderSignError } from '../../helpers'
import FormGroup from "../form-group";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setIsSignup, setSignupForm, addUser } from '../../store/slices/UserSlice'
import { setNotification, notificationSelect } from '../../store/slices/NotificationSlice'
import { useEffect, useState } from "react";
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import Toast from "../toast";

function Signup() {
    const { t } = useTranslation()
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const { signupForm } = useSelector(({user}) => user)
    const { message, type } = useSelector(notificationSelect)
    const [signupFormError, setSignupFormError] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(setIsSignup(true))
        return () => {
            dispatch(setIsSignup(false))
        }
    }, [dispatch])

    const signup = async (signupForm) => {
        try {
            const { email, password, name, phone } = signupForm
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            const newUser = {email, password, id: user.uid, carts: [], phone, name, address: []}
            await dispatch(addUser(newUser)).unwrap()
            navigate('/login')
            dispatch(setNotification({type: 'success', message: 'Đăng ký thành công'}))
            dispatch(setSignupForm({email: '', password: '', name: '', phone: ''}))
        }
        catch (error) {
            const errorCode = error.code || error.message
            renderSignError(errorCode, setNotification, dispatch)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formError = validateForm(signupForm)
        if (formError) {
            setSignupFormError({...formError, clearErrorEffect: ()=>setSignupFormError('')})
        } else {
            signup(signupForm)
        }
    }
    return ( 
        <div className="login bb-default pb-2">
            <NavComponent navList={createListNav(t, pathname)}/>
            <div className="wrap mt-2">
                <div className="login-heading bb-black pb-1">
                    <h3 className="fs-2 text-big">{t('signup low')}</h3>
                </div>
                <div className="sign-form mt-2">
                    <h3 className="fs-2 text-big mb-2">{t('user info')}</h3>
                    {signupFormError ? 
                        <span className="text-red fs-default mt-2">{signupFormError.errMessage}</span>
                    : null }
                    <form className="mt-3 fs-default">
                        <span className="mb-1 d-block">Name <span className="text-red">*</span></span>
                        <FormGroup type='name' name='name' placeholder="Name"
                            formError={signupFormError}
                        />
                        <span className="mb-1 d-block">Phone <span className="text-red">*</span></span>
                        <FormGroup type='phone' name='phone' placeholder="Phone"
                            formError={signupFormError}
                        />
                        <span className="mb-1 d-block">Email <span className="text-red">*</span></span>
                        <FormGroup type='email' name='email' placeholder="Email"
                            formError={signupFormError}
                        />
                        <span className="mb-1 mt-2 d-block">Password <span className="text-red">*</span></span>
                        <FormGroup type='password' name='password' placeholder="Password"
                            formError={signupFormError}
                        />
                        <button className="w-100 btn login-btn mt-3 fs-default text-big flex-center pt-1 pb-1"
                            onClick={(e)=>handleSubmit(e)}
                        >
                            {t('signup')}
                        </button>
                    </form>
                    <div className="fs-default mt-2 ">
                        <p className="d-flex jc-center">
                            {t('have an account')}
                            <Link to='/login' className='ml-1 text-green td-under'>{t('login here')}</Link>    
                        </p>
                    </div>
                </div>
            </div>
            {message && <Toast message={message} type={type}/>}
        </div>
    )
}

export default Signup;
