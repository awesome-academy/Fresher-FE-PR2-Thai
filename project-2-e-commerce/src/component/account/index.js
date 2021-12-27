import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { setActiveColor, createListNav, getLocalData } from '../../helpers'
import { useTranslation } from 'react-i18next'
import NavComponent from '../nav';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../store/slices/UserSlice'
import { notificationSelect } from '../../store/slices/NotificationSlice';
import Toast from '../toast'

function Account() {
    const { pathname } = useLocation()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { isLogged, userData } = getLocalData()
    const { id } = userData
    const { message, type } = useSelector(notificationSelect)
    const { address } = useSelector(({user}) => user.userLogin)

    useEffect(() => {
        if (isLogged) {
            dispatch(getUserData(id))
        }
    }, [isLogged, id, dispatch])

    return ( 
        <div className="account bb-default pb-2">
            <NavComponent navList={createListNav(t, pathname)}/>
            <div className='wrap mt-2 pb-2'>
                <div className='row pt-2 pb-2'>
                    <div className='acc-category lg-3 sm-12'>
                        <h3 className='fs-2'>{`${t('hello')}, ${userData.name}!`}</h3>
                        <ul className='category w-100 mt-2'>
                            <li className='category-item mb-2'>
                                <NavLink to='info' style={setActiveColor} className='fs-default'>{t('acc info')}</NavLink>
                            </li>
                            <li className='category-item mb-2'>
                                <NavLink to='orders' style={setActiveColor} className='fs-default'>{t('acc orders')}</NavLink>
                            </li>
                            <li className='category-item mb-2'>
                                <NavLink to='password' style={setActiveColor} className='fs-default'>{t('acc password')}</NavLink>
                            </li>
                            <li className='category-item mb-2'>
                                <NavLink to='address' style={setActiveColor} className='fs-default'>
                                    {t('acc address')}
                                    <span className='fs-default'>{`(${address ? address.length : 0})`}</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className='acc-content lg-9 sm-12'>
                        <Outlet/>
                    </div>
                </div>
            </div>
            {message && <Toast message={message} type={type}/>}
        </div>
    );
}

export default Account;
