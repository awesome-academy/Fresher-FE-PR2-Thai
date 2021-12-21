import BrandList from '../../assets/img'

function Brands() {
    return ( 
        <div className="home-item brand-list">
            <div className="wrap h-100 d-flex">
                {BrandList.map(item => {
                    return (
                        <div key={item} className="brand-item h-100 d-flex ai-center">
                            <img className="w-100" alt='brand' src={item}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Brands;
