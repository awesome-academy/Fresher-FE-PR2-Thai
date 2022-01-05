import './admin.scss'
import { useState, useEffect } from 'react';
import { getTopStyle } from './helpers'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { getLocalData, setActiveColor } from '../helpers'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { adminSelector } from '../store/slices/AdminSlice'

function Admin() {
    const { t } = useTranslation()
    const [activeNav, setActiveNav] = useState('users')
    const  { idAdmin } = useSelector(adminSelector)
    const { localAdminId } = getLocalData()
    const navigate = useNavigate()

    useEffect(() => {
        if (localAdminId && localAdminId === idAdmin) {
            navigate('/admin/users')
        } else {
            navigate('/admin/login')
        }
    }, [localAdminId])

    const handleSignoutAdmin = () => {
        sessionStorage.removeItem('admin-id')
    }

    return ( 
        <div className="admin d-flex">
            <nav className="admin-nav">
                <ul className='admin-nav-list w-100'>
                    <li className='admin-nav-item'>
                        <NavLink to='users' className='h-100 text-white flex-center flex-column' style={setActiveColor}
                            onClick={()=>setActiveNav('users')}
                        >
                            <i className="admin-nav-icon fas fa-users"/>
                            <span className='fs-default mt-1'>{t('account low')}</span>
                        </NavLink>
                    </li>
                    <li className='admin-nav-item'>
                        <NavLink to='products' className='h-100 text-white flex-center flex-column' style={setActiveColor}
                            onClick={()=>setActiveNav('products')}
                        >
                            <i className="admin-nav-icon fas fa-box-open"/>
                            <span className='fs-default mt-1'>{t('products low')}</span>
                        </NavLink>
                    </li>
                    <li className='admin-nav-item'>
                        <NavLink to='orders' className='h-100 text-white flex-center flex-column' style={setActiveColor}
                            onClick={()=>setActiveNav('orders')}
                        >
                            <i className="admin-nav-icon fas fa-shopping-cart"/>
                            <span className='fs-default mt-1'>{t('orders')}</span>
                        </NavLink>
                    </li>
                    <li className='admin-nav-item'>
                        <NavLink to='sales' className='h-100 text-white flex-center flex-column' style={setActiveColor}
                            onClick={()=>setActiveNav('sales')}
                        >
                            <i className="admin-nav-icon fas fa-dollar-sign"/>
                            <span className='fs-default mt-1'>{t('sales')}</span>
                        </NavLink>
                    </li>
                    <li className='admin-nav-item'>
                        <NavLink to='login' className='h-100 text-white flex-center flex-column'
                            onClick={()=>handleSignoutAdmin()}
                        >
                            <i className="admin-nav-icon fas fa-sign-out-alt"></i>
                            <span className='fs-default mt-1'>{t('signout')}</span>
                        </NavLink>
                    </li>
                    <div className={`admin-nav-border w-100 ${getTopStyle(activeNav)}`}></div>
                </ul>
            </nav>
            <div className="admin-content flex-1 pl-2 pr-2 pt-2 h-100">
                <Outlet/>
            </div>
        </div>
    )
}

export default Admin;
