import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function FooterAbout() {
    const { t } = useTranslation()
    return ( 
        <div className='footer-item lg-3 md-6 sm-12'>
            <h3 className='footer-heading'>{t('footer heading about')}</h3>
            <ul>
                <li>
                    <Link to="/">{t('home')}</Link>
                </li>
                <li>
                    <Link to="/">{t('introduction')}</Link>
                </li>
                <li>
                    <Link to="/products">{t('products')}</Link>
                </li>
                <li>
                    <Link to="/">{t('contact')}</Link>
                </li>
                <li>
                    <Link to="/">{t('news')}</Link>
                </li>
            </ul>
        </div>
    );
}

export default FooterAbout;
