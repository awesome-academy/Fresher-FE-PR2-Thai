import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function FooterAbout() {
    const { t } = useTranslation()
    return ( 
        <div className='footer-item lg-3 md-6 sm-12'>
            <h3 className='footer-heading'>{t('footer heading about')}</h3>
            <ul className='mt-3'>
                <li className='mb-2'>
                    <Link to="/">{t('home')}</Link>
                </li>
                <li className='mb-2'>
                    <Link to="/">{t('introduction')}</Link>
                </li>
                <li className='mb-2'>
                    <Link to="/products">{t('products')}</Link>
                </li>
                <li className='mb-2'>
                    <Link to="/">{t('contact')}</Link>
                </li>
                <li className='mb-2'>
                    <Link to="/">{t('news')}</Link>
                </li>
            </ul>
        </div>
    );
}

export default FooterAbout;
