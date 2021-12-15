import NewProducts from './NewProducts'
import SpecialProducts from './SpecialProducts'
import './home.scss'
import banners from '../../assets/img/banners.jpg'

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
        </div>
    );
}

export default Home;
