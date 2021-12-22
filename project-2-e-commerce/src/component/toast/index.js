import './toast.scss'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { clearNotification } from '../../store/slices/UserSlice'

function Toast({ type, message }) {
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(()=> {
            dispatch(clearNotification())
        }, 3000)
    }, [dispatch])

    const setHeaderByType = (type) => {
        switch (type) {
            case 'error':
                return <h3 className='text-red'>Có lỗi!</h3>
            case 'warning':
                return <h3 className='text-yellow'>Cảnh báo!</h3>
            case 'notifi':
                return <h3 className='text-blue'>Thông báo!</h3>
            default:
                return <h3 className='text-green'>Thành công!</h3>
        }
    }

    return ( 
        <div className='toast fs-default'>
            <div className='toast-header p-1'>
                {setHeaderByType(type)}
                <span className='close-toast-btn'
                    onClick={() => dispatch(clearNotification())}
                >&#10006;</span>
            </div>
            <div className='toast-body bg-white p-1 pb-2 pt-2'>
                {message} 
            </div>
        </div>
    );
}

export default Toast;
