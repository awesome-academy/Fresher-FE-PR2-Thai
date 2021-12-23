import './form-group.scss'

function FromGroup({ type = 'text', placeholder = '' }) {
    const renderFormGroup = () => {
        switch (type) {
            case 'text-area':
                return <textarea className='form-input w-100 pl-1 pt-1 fs-default' placeholder={placeholder}/>
            default:
                return <input type={type} className='form-input w-100 pl-1 fs-default' placeholder={placeholder}/>
        }
    }
    return ( 
        <div className='form-group mb-1'>
            {renderFormGroup()}
        </div>
    )
}

export default FromGroup;
