import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function FooterPolicy() {
    const { t } = useTranslation()
    return ( 
        <div className='footer-item lg-3 md-6 sm-12'>
            <h3 className='footer-heading'>{t('footer heading policy')}</h3>
            <ul>
                <li>
                    <Link to="/">{t('policy return')}</Link>
                </li>
                <li>
                    <Link to="/">{t('policy freeship')}</Link>
                </li>
                <li>
                    <Link to="/">{t('policy customers')}</Link>
                </li>
            </ul>
        </div>
    );
}

export default FooterPolicy;
