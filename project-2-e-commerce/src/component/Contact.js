import NavComponent from "./nav";
import { createListNav } from '../helpers'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Contact() {
    const { pathname } = useLocation()
    const { t } = useTranslation()
    return ( 
        <div className="contact bb-default pb-2">
            <NavComponent navList={createListNav(t, pathname)}/>
            <div className="wrap pb-2 fs-default mt-2">
                <h4 className="mt-3">CÔNG TY TNHH THỜI TRANG ZENDO</h4>
                <div className="mt-1">
                    <i className="mr-2 fas fa-map-marker-alt"></i>
                    <span>Địa chỉ: Tầng 6 - Tòa nhà Ladeco - 266 Đội Cấn, Hà Nội, Vietnam</span>
                </div>
                <div className="mt-1">
                    <i className="mr-2 fas fa-mobile-alt"></i>
                    <span>Số điện thoại: 1900 6750</span>
                </div>
                <div className="mt-1">
                    <i className="mr-2 fas fa-envelope"></i>
                    <span>Email: <a className="text-blue" href="mailto:support@sapo.vn">support@sapo.vn</a></span>
                </div>
            </div>
        </div>
    );
}

export default Contact;
