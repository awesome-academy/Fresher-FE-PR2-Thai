import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import LoadingComponent from '../loading'

function Address() {
    const { t } = useTranslation()
    const { isLoading, userLogin } = useSelector(({user}) => user)
    const addressList = userLogin.address
    return ( 
        <div className="acc-address">
            <h3 className="text-big fs-2">
                {t('acc address')}
            </h3>
            {isLoading ?
                <LoadingComponent/>
            :
                <div className="mt-2">
                    <button className="pay-order-btn fs-2 text-white pl-2 pr-2 pt-1 pb-1 mb-2">{t('add address')}</button>
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
                                    <div className="">
                                        <span className="text-blue">{t('edit')}</span>
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
