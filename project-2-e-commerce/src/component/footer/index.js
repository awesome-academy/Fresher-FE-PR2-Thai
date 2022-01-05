import './footer.scss'
import FooterAbout from './FooterAbout';
import FooterPolicy from './FooterPolicy';
import FooterSupport from './FooterSupport';
import FooterForm from './FooterForm';

function Footer() {
    return ( 
        <footer className='footer'>
            <div className='wrap'>
                <div className='row flex-wrap'>
                    <FooterAbout/>
                    <FooterPolicy/>
                    <FooterSupport/>
                    <FooterForm/>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
