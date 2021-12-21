import './nav.scss'
import { useTranslation } from 'react-i18next'

function NavComponent({ navList }) {
    const { t } = useTranslation()
    const baseNav = [t('home low')]
    const navListRender = baseNav.concat(navList)
    return ( 
        <div className="nav-component fs-default d-flex ai-center">
            <div className="wrap">
                {navListRender && navListRender.map((item, index) => {
                    if (index === navListRender.length - 1) {
                        return <span key={index} className="nav-item no-separation text-green">{item}</span>
                    } else {
                        return <span key={index} className="nav-item">{item}</span>
                    }
                })}
            </div>
        </div>
    );
}

export default NavComponent;
