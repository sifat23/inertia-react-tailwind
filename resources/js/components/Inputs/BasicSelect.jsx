const BasicSelect = ({invalid, placeholder, options, className, children, ...props}) => {

    return (
        <select
            className={`${invalid !== undefined ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-gray-500'} pl-3 h-10 rounded-md w-full border focus:outline-none focus:ring-1 ${className}`}
            {...props}
        >
            <option value="">{placeholder}</option>
            {options && options.map((item, i) => {
                return (
                    <option key={i} value={item.value}>{item.label}</option>
                )
            })}
        </select>
    )
}

export default BasicSelect;
