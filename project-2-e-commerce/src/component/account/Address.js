import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from '../loading'
import { updateUser } from '../../store/slices/UserSlice'
import { getCodeDate } from "../../helpers";

function Address() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { isLoading, userLogin } = useSelector(({user}) => user)
    const [isOpenAddBox, setIsOpenAddBox] = useState(false)
    const addressList = userLogin.address
    const [addressNewForm, setAddressNewFrom] = useState({
        name: '',
        address: '',
        phone: '',
    })
    const { name, address, phone } = addressNewForm
    const [errorMessage, setErrorMessage] = useState({field: '', message: ''})

    const handleAddAddress = (e) => {
        e.preventDefault()
        const fieldArray = Object.keys(addressNewForm)
        const invalidField = fieldArray.find(item => addressNewForm[item] === '')
        if (invalidField) {
            setErrorMessage({
                field: invalidField,
                message: `${t('please enter')} ${t(invalidField)}!`
            })
        } else {
            const newAddressList = userLogin.address.concat([
                {
                    ...addressNewForm,
                    id: getCodeDate(new Date())
                }
            ])
            const option = {fieldName: 'address', value: newAddressList}
            dispatch(updateUser({userId: userLogin.id, option}))
            setIsOpenAddBox(false)
            setAddressNewFrom({
                name: '',
                address: '',
                phone: '',
            })
        }
    }

    const handleChange = (value, field) => {
        setAddressNewFrom({...addressNewForm, [field]: value})
        setErrorMessage({field: '', message: ''})
    }

    return ( 
        <div className="acc-address lg-6 sm-12">
            <h3 className="text-big fs-2">
                {t('acc address')}
            </h3>
            {isLoading ?
                <LoadingComponent/>
            :
                <div className="mt-2">
                    <button className="pay-order-btn fs-2 text-white pl-2 pr-2 pt-1 pb-1 mb-2"
                        onClick={()=>setIsOpenAddBox(true)}
                    >{t('add address')}</button>
                    {isOpenAddBox &&
                        <div className="address-add">
                            <form className="fs-default">
                                <div>
                                    <span className="mb-1 mt-2 d-block">{t('form name')}<span className="text-red"> *</span></span>
                                    <input type='text' className="input w-100" name='name'
                                        value={name} onChange={(e)=>handleChange(e.target.value, 'name')}
                                    />
                                    {errorMessage.field === 'name' && 
                                        <span className="text-red d-block mt-1">{errorMessage.message}</span>
                                    }
                                </div>
                                <div>
                                    <span className="mb-1 mt-2 d-block">{t('address')}<span className="text-red"> *</span></span>
                                    <input type='text' className="input w-100" name='address'
                                        value={address} onChange={(e)=>handleChange(e.target.value, 'address')}
                                    />
                                    {errorMessage.field === 'address' &&
                                        <span className="text-red d-block mt-1">{errorMessage.message}</span>
                                    }
                                </div>
                                <div className="mb-2">
                                    <span className="mb-1 mt-2 d-block">{t('form phone')}<span className="text-red"> *</span></span>
                                    <input type='text' className="input w-100" name='phone'
                                        value={phone} onChange={(e)=>handleChange(e.target.value, 'phone')}
                                    />
                                    {errorMessage.field === 'phone' &&
                                        <span className="text-red d-block mt-1">{errorMessage.message}</span>
                                    }
                                </div>
                                <button className="pay-order-btn fs-2 text-white mr-2 pl-2 pr-2 pt-1 pb-1 mb-2"
                                    onClick={(e)=>handleAddAddress(e)}
                                >{t('submit')}</button>
                                <button className="pay-order-btn fs-2 text-big text-white pl-2 pr-2 pt-1 pb-1 mb-2"
                                    onClick={()=>setIsOpenAddBox(false)}
                                >{t('cancel')}</button>
                            </form>
                        </div>
                    }
                    {addressList ?
                        addressList.map(item => {
                            const {isDefault, id, name, address, phone} = item
                            return (
                                <div className="fs-default d-flex ai-center jc-space-btw p-1 bt-default" key={id}>
                                    <div className="">
                                        {isDefault ?
                                            <span className="">{t('default address')}</span>
                                        : null}
                                        <table className="b-none mt-2">
                                            <tbody>
                                                <tr className="b-none ta-left">
                                                    <th>{t('form name')}</th>
                                                    <td className="b-none ta-left">{name}</td>
                                                </tr>
                                                <tr className="b-none ta-left">
                                                    <th>{t('address')}</th>
                                                    <td className="b-none ta-left">{address}</td>
                                                </tr>
                                                <tr className="b-none ta-left">
                                                    <th>{t('form phone')}</th>
                                                    <td className="b-none ta-left">{phone}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        })
                    : null}
                </div>
            }
        </div>
    )
}

export default Address;
