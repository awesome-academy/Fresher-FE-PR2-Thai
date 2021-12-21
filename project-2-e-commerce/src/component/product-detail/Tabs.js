import { useState } from 'react';
import { useTranslation } from 'react-i18next'
import { renderShoppingGuide } from '../../helpers'

function Tabs({ desc }) {
    const { t } = useTranslation()
    const [isActiveDesc, setIsActiveDesc] = useState(true)
    const [isActiveGuide, setIsActiveGuide] = useState(false)

    const handleActiveGuide = () => {
        setIsActiveGuide(true)
        setIsActiveDesc(false)
    }

    const handleActiveDesc = () => {
        setIsActiveGuide(false)
        setIsActiveDesc(true)
    }

    return ( 
        <section className="detail-desc mt-3">
            <div className='desc-tabs d-flex'>
                <div 
                    className={`tab-item ${isActiveDesc ? 'active' : ''} fs-default pr-2 pl-2 flex-center`}
                    onClick={()=>handleActiveDesc()}
                >
                    {t('desc')}
                </div>
                <div
                    className={`tab-item ${isActiveGuide ? 'active' : ''} fs-default pr-2 pl-2 flex-center`}
                    onClick={()=>handleActiveGuide()}
                >
                    {t('shopping guide')}
                </div>
            </div>
            <div className='desc-tabs-pane pl-2 pr-2 pt-2 pb-2 fs-default'>
                {isActiveDesc ?
                    <div className='tab-pane'>{desc}</div>
                :
                    <div className='tab-pane'>{renderShoppingGuide()}</div>
                }
            </div>
        </section>
    )
}

export default Tabs;
