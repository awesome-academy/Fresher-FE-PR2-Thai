import { EMAIL_REGEX, VNF_REGEX, ACTiVE_COLOR } from './constants'

export const createListNav = (t, path, name) => {
    const flag = path.split('/')
    if (name) {
        return [t(`${flag[1]} low`), name]
    } else {
        return [t(`${flag[1]} low`)]
    }
}

export const setActiveColor = ({ isActive }) => {
    return {
        color : isActive ? ACTiVE_COLOR : ""
    }
}

export const carouselResponsive  = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
}

export const formatPrice = (value, t) => {
    return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ${t('currency')}`
}

export const renderShoppingGuide = () => {
    return (
        <div>
            Bước 1: Tìm sản phẩm cần mua Bạn có thể truy cập website để tìm và chọn sản phẩm muốn mua bằng nhiều cách: <br/>
            + Sử dụng ô tìm kiếm phía trên, gõ tên sản phẩm muốn mua (có thể tìm đích danh 1 sản phẩm, tìm theo hãng...). Website sẽ cung cấp cho bạn những gợi ý chính xác để lựa chọn: <br/>
            Bước 2: Đặt mua sản phẩm Sau khi chọn được sản phẩm ưng ý muốn mua, bạn tiến hành đặt hàng bằng cách: <br/>
            + Chọn vào nút MUA NGAY nếu bạn muốn thanh toán luôn toàn bộ giá tiền sản phẩm <br/>
            + Điền đầy đủ các thông tin mua hàng theo các bước trên website, sau đó chọn hình thức nhận hàng là giao hàng tận nơi hay đến siêu thị lấy hàng, chọn hình thức thanh toán là trả khi nhận hàng hay thanh toán online (bằng thẻ ATM, VISA hay MasterCard) và hoàn tất đặt hàng. <br/>
            +Lưu ý: <br/>
            1. Chúng tôi chỉ chấp nhận những đơn đặt hàng khi cung cấp đủ thông tin chính xác về địa chỉ, số điện thoại. Sau khi bạn đặt hàng, chúng tôi sẽ liên lạc lại để kiểm tra thông tin và thỏa thuận thêm những điều có liên quan. <br/>
            2. Một số trường hợp nhạy cảm: giá trị đơn hàng quá lớn &#38; thời gian giao hàng vào buổi tối địa chỉ giao hàng trong ngõ hoặc có thể dẫn đến nguy hiểm. Chúng tôi sẽ chủ động liên lạc với quý khách để thống nhất lại thời gian giao hàng cụ thể.
        </div>
    )
}

export const getTotal = (arr = []) => {
    return arr ? arr.reduce((total, cart) => total + (cart.price*cart.quantity), 0) : 0
}

export const getAddCartMessage = (item) => {
    return `Đã thêm ${item.quantity} ${item.name} vào giỏ hàng!`
}

export const getSum = (a, b) => {
    return Number(a) + Number(b)
}

export const validateForm = (obj) => {
    let errMessage = ''
    let fieldErrName = ''
    const objKeys = Object.keys(obj)
    const fieldsNotRequire = ['city', 'district', 'address', 'note'] 
    const fieldUndefined = objKeys.find(key => 
        !fieldsNotRequire.includes(key) && obj[key] === ''
    )
    const isInvalidEmail = EMAIL_REGEX.test(obj['email'])
    const isInvalidPhone = objKeys.includes('phone') ? VNF_REGEX.test(obj['phone']) : null
    const isInvalidPassword = objKeys.includes('password') ? obj['password'].length >= 6 : null
    if (fieldUndefined) {
        switch (fieldUndefined) {
            case 'email':
                errMessage = `Vui lòng nhập email!`
                fieldErrName = 'email'
                break;
            case 'name':
                errMessage = `Vui lòng nhập họ và tên!`
                fieldErrName = 'name'
                break;
            case 'phone':
                errMessage = `Vui lòng nhập số điện thoại!`
                fieldErrName = 'phone'
                break;
            case 'password':
                errMessage = `Vui lòng nhập password!`
                fieldErrName = 'password'
                break;
            default:
                break;
        }
    } else if (!isInvalidEmail) {
        errMessage = `Email nhập không chính xác!`
        fieldErrName = 'email'
    } else if (!isInvalidPhone && objKeys.includes('phone')) {
        errMessage = `Số điện thoại chưa chính xác!`
        fieldErrName = 'phone'
    } else if (!isInvalidPassword && objKeys.includes('password')) {
        errMessage = `Mật khẩu quá ngắn (tối thiểu 6 kí tự)!`
        fieldErrName = 'password'
    }
    return errMessage ? { errMessage, fieldErrName } : ''
}

export const handleAddToLocal = (item, localCarts) => {
    if (localCarts) {
        const itemExist = localCarts.find(elm => elm.id === item.id)
        if (itemExist) {
            const newCartLocal = localCarts.map(cart => {
                if (cart.id === item.id) {
                    return {...cart, quantity: Number(itemExist.quantity) + item.quantity}
                }
                return cart
            })
            localStorage.setItem('local-carts', JSON.stringify(newCartLocal))
        } else {
            localStorage.setItem('local-carts', JSON.stringify([...localCarts, {...item, quantity: 1}]))
        }
    } else {
        localStorage.setItem('local-carts', JSON.stringify([{...item, quantity: 1}]))
    }
}

export const getCodeDate = (date) => {
    const dateFormat = new Date(date)
    return `${dateFormat.getHours()}${dateFormat.getMinutes()}${dateFormat.getSeconds()}-${dateFormat.getDate()}${dateFormat.getMonth()}${dateFormat.getFullYear()}`
}

export const getDate = (date) => {
    const flag = new Date(date)
    return `${flag.getHours()}h${flag.getMinutes()}p ngày ${flag.getDate()}/${flag.getMonth()+1}/${flag.getFullYear()}`
}

export const renderSignError = (errorCode, setNotification, dispatch) => {
    switch (errorCode) {
        case 'auth/wrong-password':
            dispatch(setNotification({type: 'error', message: 'Mật khẩu không đúng!'}))
            break;
        case 'auth/user-not-found':
            dispatch(setNotification({type: 'error', message: 'Email không tồn tại!'}))
            break;
        case 'auth/email-already-in-use':
            dispatch(setNotification({type: 'error', message: 'Email đã tồn tại!'}))
            break;
        default:
            dispatch(setNotification({type: 'error', message: 'Có lỗi không xác định!'}))
            break;
    }
}

export const handleAddToUserCarts = (userData, newCartItem, quantity = 1) => {
    let newUserData
    if (userData.carts.length > 0) {
        const itemExisted = userData.carts.find(item => item.id === newCartItem.id)
        let newCarts
        if (itemExisted) {
            newCarts = userData.carts.map(cart => {
                if (cart.id === newCartItem.id) return {...cart, quantity: cart.quantity += quantity}
                return cart
            })
        } else {
            userData.carts.push(newCartItem)
            newCarts = userData.carts
        }
        newUserData = {...userData, carts: newCarts}
    } else {
        newUserData = {...userData, carts: [newCartItem]}
    }
    localStorage.setItem('user-login', JSON.stringify(newUserData))
}

export const getLocalData = () => {
    const localCarts = JSON.parse(localStorage.getItem('local-carts'))
    const userData = JSON.parse(localStorage.getItem('user-login'))
    const isLogged = JSON.parse(localStorage.getItem('is-logged'))
    const localOrders = JSON.parse(localStorage.getItem('local-orders'))
    const localAdminId = JSON.parse(sessionStorage.getItem('admin-id'))
    return { localCarts, userData, isLogged, localOrders, localAdminId }
}

export const creatAddressText = (info) => {
    const { address, district, city } = info
    return `${address}${district ? `, ${district}` : ''}${city ? `, ${city}` : ''}`
}

export const validateNewValue = (newValue, currentValue, fieldName, t) => {
    let message = ''
    if (newValue === currentValue) {
        message = `${t(fieldName)} mới phải khác ${t(fieldName)} cũ!`
    } else if (newValue === '') {
        message = `${t(fieldName)} mới không được bỏ trống!`
    } else {
        switch (fieldName) {
            case 'form email':
                message = EMAIL_REGEX.test(newValue) ? '' : 'Email không hợp lệ!'
                break;
            default:
                message = VNF_REGEX.test(newValue) ? '' : 'Số điện thoại không hợp lệ!'
                break;
        }
    }
    return message
}
