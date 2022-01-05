import './header.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { memo, useEffect, useRef, useState } from 'react'
import { searchByWords, getProducts, getPagination, resetFilter } from '../../store/slices/ProductsSlice'
import { setCartsLength, updateUser } from '../../store/slices/UserSlice'
import { useTranslation } from 'react-i18next'
import { setActiveColor, getLocalData } from '../../helpers'

function Header() {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const { localCarts, isLogged, userData } = getLocalData()
    const { filter } = useSelector(({ products }) => products.all)
    const { cartsLength } = useSelector(({ user }) => user)
    const cartLength = userData ? userData.carts.length : localCarts ? localCarts.length : 0
    const [inputSearch, setInputSearch] = useState('')
    const [currentLang, setCurrentLang] = useState('vi')
    const navigate = useNavigate()
    const navElement = useRef()

    useEffect(()=> {
        dispatch(setCartsLength(cartLength))
    }, [cartLength])

    const handleChange = (e) => {
        setInputSearch(e.target.value)
        dispatch(searchByWords(e.target.value))
    }

    const handleSeachProducts = () => {
        if (inputSearch) {
            setInputSearch('')
            dispatch(getProducts(filter))
            dispatch(getPagination({...filter, limit: '', page: ''}))
        }
    }

    const handleSwitchLanguage = () => {
        if (currentLang === 'en') {
            i18n.changeLanguage("vi")
            setCurrentLang('vi')
        } else if (currentLang === 'vi') {
            i18n.changeLanguage("en")
            setCurrentLang('en')
        }
    }

    const handleLogout = () => {
        const { carts, id: userId } = userData
        dispatch(updateUser({userId, carts}))
        localStorage.removeItem('is-logged')
        localStorage.removeItem('user-login')
        navigate('/login')
    }

    const toggleNav = () => {
        navElement.current.classList.toggle('open-nav')
    }

    const handleRouter = () => {
        dispatch(resetFilter())
        toggleNav()
    }

    return ( 
        <header className="header">
            <div className="header-user">
                <div className='wrap d-flex ai-center'>
                    <div className='header-contact'>
                        <a className="contact-mail mr-3 text-white" href="tel:19009999">Hotline: 19009999</a>
                        <a href="mailto:support@gamil.com" className=' text-white'>Email: support@gmail.com</a>
                    </div>
                    <div className='header-option d-flex ai-center'>
                        {isLogged ?
                            <div className='user-option'>
                                <span className='logout text-white mr-3 cursor-poiter'
                                    onClick={()=>handleLogout()}
                                >{t('logout')}</span>
                                <Link to="account/info" className='text-white'>{t('account')}</Link>
                            </div>
                        :
                            <div className='user-option text-white'>
                                <Link className="login text-white mr-3" to="login">{t('login')}</Link>
                                <Link className="register text-white" to="signup">{t('register')}</Link>
                            </div>
                        }
                        <div className='header-change-lang ml-3'>
                            <span className="lang bg-white text-red">{currentLang}</span>
                            <button onClick={()=>handleSwitchLanguage()} className="switch-lang-btn">
                                VI/EN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-shop flex-center">
                <Link to="/">
                    <img className='logo' alt="logo" src='https://bizweb.dktcdn.net/100/312/616/themes/812281/assets/logo.png?1638764509124'/>
                </Link>
            </div>
            <div className="header-nav">
                <div className='wrap d-flex ai-center'>
                    <nav className='header-nav-left'>
                        <div className='fs-3 header-nav-btn'
                            onClick={()=>toggleNav()}
                        >
                            <i className="fas fa-bars"/>
                        </div>
                        <ul className='d-flex header-nav-list' ref={navElement}>
                            <li>
                                <NavLink style={setActiveColor} to="/"
                                    onClick={()=>handleRouter()}
                                >{t('home')}</NavLink>
                            </li>
                            <li className='ml-3'>
                                <NavLink style={setActiveColor} to="/intro"
                                    onClick={()=>handleRouter()}
                                >{t('introduction')}</NavLink>
                            </li>
                            <li className='ml-3'>
                                <NavLink style={setActiveColor} to="/products"
                                    onClick={()=>toggleNav()}
                                >{t('products')}</NavLink>
                            </li>
                            <li className='ml-3'>
                                <NavLink style={setActiveColor} to="/contact"
                                    onClick={()=>handleRouter()}
                                >{t('contact')}</NavLink>
                            </li>
                            <li className='ml-3'>
                                <NavLink style={setActiveColor} to="/news"
                                    onClick={()=>handleRouter()}
                                >{t('news')}</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="header-nav-right d-flex ai-center">
                        <div className='header-search d-flex'>
                            <input className='input-search input' placeholder={t('search placeholder')}
                                value={inputSearch} onChange={(e)=>handleChange(e)}
                            />
                            {inputSearch ? 
                                <Link to="/products" className='btn-search flex-center'
                                    onClick={()=> handleSeachProducts()}
                                >
                                    <i className="fas fa-search"/>
                                </Link>
                            :
                                <button className='btn-search'
                                >
                                    <i className="fas fa-search"/>
                                </button>
                            }
                        </div>
                        <div className='header-cart'>
                            <Link className="cart-link" to="cart">
                                <i className="fas fa-shopping-cart"/>
                                <div className='cart-qnt flex-center bg-blue text-white'>
                                    {cartsLength}
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default memo(Header)
