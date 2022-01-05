import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="notfound">
            <div className='wrap'>
                <h1>404 - Not Found!</h1>
                <Link className='fs-default mt-1 td-under text-blue' to="/">Go Home</Link>
            </div>
        </div>
    )
}
  
export default NotFound;
