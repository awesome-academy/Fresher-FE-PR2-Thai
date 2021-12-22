import NewProducts from './NewProducts'
import SpecialProducts from './SpecialProducts'
import './home.scss'
import banners from '../../assets/img/banners.jpg'
import Brands from './Brands'
import Toast from '../toast'
import { useSelector } from 'react-redux'

function Home() {
    const { addedItem, notification } = useSelector(({user}) => user)
    const { type, message } = notification
    return ( 
        <div className="home">
            <div className="home-banners">
                <img className="banners-img w-100" alt='banners' src={banners}/>
            </div>
            <section className="wrap">
                <NewProducts/>
                <SpecialProducts/>
            </section>
            <Brands/>
            {addedItem && message && <Toast type={type} message={message}/>}
        </div>
    );
}

export default Home;
