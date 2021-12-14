import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="notfound">
            <h1>404 - Not Found!</h1>
            <Link to="/">Go Home</Link>
        </div>
    )
}
  
export default NotFound;
