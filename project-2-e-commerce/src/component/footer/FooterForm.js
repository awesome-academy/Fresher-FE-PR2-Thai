import { useTranslation } from 'react-i18next';

function FooterForm() {
    const { t } = useTranslation()
    return ( 
        <div className='footer-item lg-3 md-6 sm-12'>
            <h3 className='footer-heading'>{t('footer heading form')}</h3>
            <div className='footer-input d-flex ai-center mt-3 mb-2'>
                <input className='input-email input' placeholder='Nhập địa chỉ email'/>
                <button className='btn-email btn'>{t('register')}</button>
            </div>
            <h3 className='footer-heading'>{t('footer heading follows')}</h3>
            <div className='footer-link mt-2'>
                <a href='https://facebook.com' target="blank" className='footer-icon mr-2 fs-default'>
                    <i className="fab fa-facebook-f"/>
                </a>
                <a href='https://twitter.com' target="blank" className='footer-icon mr-2 fs-default'>
                    <i className="fab fa-twitter"/>
                </a>
                <a href='https:/instagram.com' target="blank" className='footer-icon fs-default'>
                    <i className="fab fa-instagram"></i>
                </a>
            </div>
        </div>
    );
}

export default FooterForm;
