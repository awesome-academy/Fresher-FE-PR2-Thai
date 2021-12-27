import './home.scss'
import NewProducts from './NewProducts'
import SpecialProducts from './SpecialProducts'
import banners from '../../assets/img/banners.jpg'
import Brands from './Brands'
import Toast from '../toast'
import { useSelector } from 'react-redux'
import { notificationSelect } from '../../store/slices/NotificationSlice'

function Home() {
    const { type, message } = useSelector(notificationSelect)

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
            {message && <Toast type={type} message={message}/>}
        </div>
    );
}

export default Home;
