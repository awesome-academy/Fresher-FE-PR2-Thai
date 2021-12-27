import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import LoadingComponent from '../loading'

function AccountInfo() {
    const { isLoading, userLogin } = useSelector(({user}) => user)
    const { t } = useTranslation()

    return ( 
        <div className="acc-info">
            <h3 className="text-big fs-2">
                {t('acc info')}
            </h3>
            <div className="fs-default ta-center">
                {isLoading ?
                    <LoadingComponent/>
                :
                    <table className="w-100 b-none mt-2">
                        <tbody>
                            <tr className="b-none ta-left">
                                <th>{t('form name')}</th>
                                <td className="b-none ta-left">{userLogin && userLogin.name}</td>
                                <td className="b-none text-blue cursor-poiter"><span>{t('edit')}</span></td>
                            </tr>
                            <tr className="b-none ta-left">
                                <th>{t('form email')}</th>
                                <td className="b-none ta-left">{userLogin && userLogin.email}</td>
                                <td className="b-none text-blue cursor-poiter"><span>{t('edit')}</span></td>
                            </tr>
                            <tr className="b-none ta-left">
                                <th>{t('form phone')}</th>
                                <td className="b-none ta-left">{userLogin && userLogin.phone}</td>
                                <td className="b-none text-blue cursor-poiter"><span>{t('edit')}</span></td>
                            </tr>
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
}

export default AccountInfo;
