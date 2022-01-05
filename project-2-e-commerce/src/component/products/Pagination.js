import { setCurrentPage, getProducts } from '../../store/slices/ProductsSlice'
import { useDispatch, useSelector} from 'react-redux'
import { prevPage, nextPage } from '../../store/slices/ProductsSlice'

function Pagination({ filter }) {
    const dispatch = useDispatch()
    const { currentPage, pagination } = useSelector(({products}) => products)
    const pagesArr = []
    if (pagination.list) {
        const productsArrLength = pagination.list.length
        const pagesArrLength = productsArrLength%12 ? Math.ceil(productsArrLength/12) : productsArrLength/12
        for (let i = 1; i <= pagesArrLength; i++) {
            pagesArr.push(i)
        }
    }

    const handleChangePage = (num) => {
        const newFilter = {...filter, page: num}
        dispatch(getProducts(newFilter))
        dispatch(setCurrentPage(num))
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            const newFilter = {...filter, page: currentPage - 1}
            dispatch(getProducts(newFilter))
            dispatch(prevPage())
        }
    }

    const handleNextPage = () => {
        if (currentPage < pagesArr.length) {
            const newFilter = {...filter, page: currentPage + 1}
            dispatch(getProducts(newFilter))
            dispatch(nextPage())
        }
    }

    return (  
        <div className="pagination d-flex jc-end">
            <div className="prev-page pagination-item flex-center" 
                onClick={()=>handlePrevPage()}
            >
                &#60;
            </div>
            <div className="pagination-list d-flex">
                {pagesArr.map(item =>
                    <div key={item} 
                        className={item === currentPage ?
                            'pagination-item active text-white flex-center ml-1'
                        : 
                            'pagination-item flex-center ml-1'
                        }
                        onClick={()=>handleChangePage(item)}
                    >
                        {item}
                    </div>
                )}
            </div>
            <div className="next-page pagination-item flex-center ml-1"
                onClick={()=>handleNextPage()}
            >
                &#62;
            </div>
        </div>
    );
}

export default Pagination;
