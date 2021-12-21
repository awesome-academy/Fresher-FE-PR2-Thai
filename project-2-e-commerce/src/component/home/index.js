import NewProducts from './NewProducts'
import SpecialProducts from './SpecialProducts'
import './home.scss'
import banners from '../../assets/img/banners.jpg'
import Brands from './Brands'

function Home() {
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
        </div>
    );
}

export default Home;
