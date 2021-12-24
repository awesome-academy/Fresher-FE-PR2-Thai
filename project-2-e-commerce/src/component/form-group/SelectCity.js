import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select'
import { getCityArray, setDistricsArray, setPaymentForm } from '../../store/slices/UserSlice'

function SelectComponent() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { cityArray, paymentForm } = useSelector(({user}) => user)
    const listCityName = cityArray ? cityArray.map(city => ({value: city.code, label: city.name})) : null

    useEffect(()=>{
        dispatch(getCityArray())
    }, [dispatch])

    const handleChange = (e) => {
        if (e) {
            const { value: cityCode, label: newCity } = e
            const city = cityArray.find(item => item.code === cityCode)
            dispatch(setDistricsArray(city.districts))
            dispatch(setPaymentForm({...paymentForm, city: newCity}))
        } else {
            dispatch(setDistricsArray(null))
            dispatch(setPaymentForm({...paymentForm, city: '', district: ''}))
        }
        
    }

    return ( 
        <Select options={listCityName} onChange={(e)=>handleChange(e)} placeholder={t('city')} isClearable/>
    );
}

export default SelectComponent;
