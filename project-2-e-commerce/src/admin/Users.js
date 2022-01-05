import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminSelector, getData } from "../store/slices/AdminSlice";
import { getAdressDefault, getOptionUsers, getSortFilter } from './helpers'
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import LoadingComponent from '../component/loading'

function Users() {
    const { users, filterUsers, isLoading } = useSelector(adminSelector)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [inputSearch, setInputSearch] = useState('')

    useEffect(()=>{
        dispatch(getData({src: 'users'}))
    }, [])

    const handleSearch = (e) => {
        setInputSearch(e.target.value)
        const filter = {...filterUsers, name: e.target.value}
        dispatch(getData({src: 'users', filter}))
    }

    const handleChange = (e) => {
        const { sort, order } = getSortFilter(e.value)
        const filter = {...filterUsers, sort, order}
        dispatch(getData({src:'users', filter}))
    }

    return ( 
        <div className="admin-users">
            <div className="admin-filter-nav d-flex ai-center pl-2">
                <div className="admin-users-input">
                    <input className="input" value={inputSearch} placeholder={t('search placeholder')} 
                        onChange={(e) => handleSearch(e)}
                    />
                </div>
                <div className="admin-users-sort ml-2 fs-default">
                    <Select options={getOptionUsers()} onChange={(e)=>handleChange(e)} placeholder='Sắp xếp'/>
                </div>
            </div>
            <div className="admin-users-table">
                {isLoading ? <LoadingComponent/> : 
                    <table className="w-100 mt-2 fs-default">
                        <thead className="text-white bg-account">
                            <tr>
                                <td>{t('name')}</td>
                                <td>{t('phone')}</td>
                                <td>{t('email')}</td>
                                <td>{t('address')}</td>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.length ?
                                users.map(user => {
                                    const { name, phone, address, id, email } = user
                                    return (
                                        <tr className="ta-left" key={id}>
                                            <td>{name}</td>
                                            <td>{phone}</td>
                                            <td>{email}</td>
                                            <td>{getAdressDefault(address)}</td>
                                        </tr>
                                    )
                                })
                            : 
                            <tr>
                                <td colSpan='5'>{t('have not account')}</td>
                            </tr>
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}

export default Users;
