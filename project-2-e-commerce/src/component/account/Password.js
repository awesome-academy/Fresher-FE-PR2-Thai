import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import LoadingComponent from '../loading'
import FromGroup from "../form-group";
import { useState } from "react";

function Password() {
    const { isLoading } = useSelector(({user}) => user)
    const { t } = useTranslation()
    const [passwordFormError, setPasswordFormError] = useState('')

    return ( 
        <div className="acc-info lg-6 sm-12">
            <h3 className="text-big fs-2">
                {t('acc password')}
            </h3>
            <div className="fs-default ta-left">
                {isLoading ?
                    <LoadingComponent/>
                    :
                    <form className="mt-2">
                        <p className="fs-default">{t('login message')}</p>
                        <span className="mb-1 mt-2 d-block">{t('current password')}<span className="text-red"> *</span></span>
                        <FromGroup type='password' name='password'
                            formError={passwordFormError}
                        />
                        <span className="mb-1 mt-2 d-block">{t('new password')}<span className="text-red"> *</span></span>
                        <FromGroup type='password' name='new-password'
                            formError={passwordFormError}
                        />
                        <span className="mb-1 mt-2 d-block">{t('confirm password')}<span className="text-red"> *</span></span>
                        <FromGroup type='password' name='confirm-password'
                            formError={passwordFormError}
                        />
                        <div className=" mt-2">
                            <button className="pay-order-btn fs-2 text-white pl-2 pr-2 pt-1 pb-1">{t('change password')}</button>
                        </div>
                    </form>
                }
            </div>
        </div>
    )
}

export default Password;
