import './header.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { searchByWords } from '../../store/slices/ProductsSlice'
import { useTranslation } from 'react-i18next'

function Header() {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const userState = useSelector(state => state.user)
    const { isLogged, carts } = userState
    const [inputSearch, setInputSearch] = useState('')
    const cartLength = carts.length
    const [currentLang, setCurrentLang] = useState('vi')
    const handleChange = (e) => {
        setInputSearch(e.target.value)
        dispatch(searchByWords(e.target.value))
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
    return ( 
        <header className="header">
            <div className="header-user">
                <div className='wrap'>
                    <div className='header-contact'>
                        <a className="contact-mail" href="tel:19009999">Hotline: 19009999</a>
                        <a href="mailto:support@gamil.com">Email: support@gmail.com</a>
                    </div>
                    <div className='header-option'>
                        {isLogged ?
                            <div className='user-option'>
                                <span className='logout'>{t('logout')}</span>
                                <Link to="account">{t('account')}</Link>
                            </div>
                        :
                            <div className='user-option'>
                                <Link className="login" to="login">{t('login')}</Link>
                                <Link className="register" to="register">{t('register')}</Link>
                            </div>
                        }
                        <div className='header-change-lang'>
                            <span className="lang">{currentLang}</span>
                            <button onClick={()=>handleSwitchLanguage()} className="switchLangBtn">
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
                <div className='wrap'>
                    <nav className='header-nav-left'>
                        <ul>
                            <li>
                                <Link to="/">{t('home')}</Link>
                            </li>
                            <li>
                                <Link to="/">{t('introduction')}</Link>
                            </li>
                            <li>
                                <Link to="products">{t('products')}</Link>
                            </li>
                            <li>
                                <Link to="/">{t('contact')}</Link>
                            </li>
                            <li>
                                <Link to="/">{t('news')}</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="header-nav-right">
                        <div className='header-search'>
                            <input className='input-search input' placeholder={t('search placeholder')}
                                value={inputSearch} onChange={(e)=>handleChange(e)}
                            />
                            {inputSearch ? 
                                <Link to="/products" className='btn-search flex-center'>
                                    <i className="fas fa-search"/>
                                </Link>
                            :
                                <button className='btn-search'>
                                    <i className="fas fa-search"/>
                                </button>
                            }
                        </div>
                        <div className='header-cart'>
                            <Link className="cart" to="cart">
                                <i className="fas fa-shopping-cart"/>
                                <div className='cart-qnt flex-center'>
                                    {cartLength && isLogged ? cartLength : '0'}
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
