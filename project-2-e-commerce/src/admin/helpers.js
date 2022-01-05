export const getTopStyle = (activeNav) => {
    switch (activeNav) {
        case 'sales':
            return 'top-60'
        case 'products':
            return 'top-20'
        case 'orders':
            return 'top-40'
        default:
            return 'top-0'
    }
}

export const getAdressDefault = (address) => {
    const flag = address.find(item => item.isDefault)
    return address.length && flag ? flag.address : 'Chưa cập nhật địa chỉ'
}

export const getTotalValue = (orders) => {
    return orders.reduce((total, order) => total += order.total, 0)
}

export const getOptionUsers = () => {
    return [
        {value: 'name-asc', label: 'Tên từ A-Z'},
        {value: 'name-desc', label: 'Tên từ Z-A'}
    ]
}

export const getSortFilter = (value) => {
    const flag = value.split('-')
    return {sort: flag[0], order: flag[1]}
}

export const renderTypeOfProduct = (type) => {
    return type.map((item, index) => <span key={index} className="fs-default admin-products-type d-block">{item}</span>)
}

export const getTypesOption = () => {
    return [
        {value: 'new', label: 'New'},
        {value: 'special', label: 'Special'},
        {value: 'sale', label: 'Sale'}
    ]
}

export const getOrdersOption = () => {
    return [
        {value: 'total-asc', label: 'Giá trị tăng dần'},
        {value: 'total-desc', label: 'Giá trị giảm dần'},
    ]
}
