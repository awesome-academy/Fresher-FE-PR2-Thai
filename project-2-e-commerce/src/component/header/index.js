import './header.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { memo, useEffect, useState } from 'react'
import { searchByWords, getProducts, getPagination, resetFilter } from '../../store/slices/ProductsSlice'
import { setCartsLength, updateUserCart } from '../../store/slices/UserSlice'
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

    useEffect(()=> {
        dispatch(setCartsLength(cartLength))
    }, [cartLength, dispatch])

    const handleChange = (e) => {
        setInputSearch(e.target.value)
        dispatch(searchByWords(e.target.value))
    }

    const handleSeachProducts = () => {
        if (inputSearch) {
            setInputSearch('')
            dispatch(getProducts(filter))
            dispatch(getPagination({...filter, _limit: '', _page: ''}))
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
        const { carts, id: userId } = JSON.parse(localStorage.getItem('user-login'))
        dispatch(updateUserCart({userId, carts}))
        localStorage.removeItem('is-logged')
        localStorage.removeItem('user-login')
        navigate('/login')
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
                                <Link to="account" className='text-white'>{t('account')}</Link>
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
                        <ul className='d-flex'>
                            <li>
                                <NavLink style={setActiveColor} to="/"
                                    onClick={()=>dispatch(resetFilter())}
                                >{t('home')}</NavLink>
                            </li>
                            <li className='ml-3'>
                                <NavLink style={setActiveColor} to="/intro"
                                    onClick={()=>dispatch(resetFilter())}
                                >{t('introduction')}</NavLink>
                            </li>
                            <li className='ml-3'>
                                <NavLink style={setActiveColor} to="/products">{t('products')}</NavLink>
                            </li>
                            <li className='ml-3'>
                                <NavLink style={setActiveColor} to="/contact"
                                    onClick={()=>dispatch(resetFilter())}
                                > {t('contact')}</NavLink>
                            </li>
                            <li className='ml-3'>
                                <NavLink style={setActiveColor} to="/news"
                                    onClick={()=>dispatch(resetFilter())}
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
