import './header.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { searchByWords } from '../../store/slices/ProductsSlice'
import { useTranslation } from 'react-i18next'

function Header() {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const { isLogged, carts } = useSelector(({user}) => user)
    const cartLength = carts.length
    const [inputSearch, setInputSearch] = useState('')
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
                <div className='wrap d-flex ai-center'>
                    <div className='header-contact'>
                        <a className="contact-mail mr-3 text-white" href="tel:19009999">Hotline: 19009999</a>
                        <a href="mailto:support@gamil.com" className=' text-white'>Email: support@gmail.com</a>
                    </div>
                    <div className='header-option d-flex ai-center'>
                        {isLogged ?
                            <div className='user-option'>
                                <span className='logout text-white mr-3'>{t('logout')}</span>
                                <Link to="account" className='text-white'>{t('account')}</Link>
                            </div>
                        :
                            <div className='user-option text-white'>
                                <Link className="login text-white mr-3" to="login">{t('login')}</Link>
                                <Link className="register text-white" to="register">{t('register')}</Link>
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
                                <Link to="/">{t('home')}</Link>
                            </li>
                            <li className='ml-3'>
                                <Link to="/">{t('introduction')}</Link>
                            </li>
                            <li  className='ml-3'>
                                <Link to="products">{t('products')}</Link>
                            </li>
                            <li className='ml-3'>
                                <Link to="/">{t('contact')}</Link>
                            </li>
                            <li className='ml-3'>
                                <Link to="/">{t('news')}</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="header-nav-right d-flex ai-center">
                        <div className='header-search d-flex'>
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
                                <div className='cart-qnt flex-center bg-blue text-white'>
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
