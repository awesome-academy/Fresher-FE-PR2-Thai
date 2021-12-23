import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import { setPaymentForm } from '../../store/slices/UserSlice'

function SelectDistricts() {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { districts, paymentForm } = useSelector(({user}) => user)
    const listDistrictsName = districts ? districts.map(item => ({value: item.name, label: item.name})) : null

    const handleChange = (e) => {
        if (e) {
            const newDistrict = e.value
            dispatch(setPaymentForm({...paymentForm, district: newDistrict}))
        } else {
            dispatch(setPaymentForm({...paymentForm, district: ''}))
        }
    }

    return (
        <>
            {listDistrictsName ?
                <Select options={listDistrictsName} onChange={(e)=>handleChange(e)} placeholder={t('district')} isClearable/>
            :
                <Select isDisabled placeholder={t('district')}/>
            }
        </>
    )
}

export default SelectDistricts;
