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
        color : isActive ? "red" : ""
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

export const getTotal = (arr) => {
    return arr.reduce((total, cart) => total + (cart.price*cart.quantity), 0)
}

export const getAddCartMessage = (item) => {
    return `Đã thêm ${item.quantity} ${item.name} vào giỏ hàng!`
}

export const getSum = (a, b) => {
    return Number(a) + Number(b)
}
