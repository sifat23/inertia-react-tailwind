const BasicSelect = ({placeholder, options, className, children, ...props}) => {
    return (
        <select
            className={`pl-3 h-10 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 ${className}`}
            {...props}
        >
            <option value="">{placeholder}</option>
            {options && options.map((item, i) => {
                return (
                    <option>{item.label}</option>
                )
            })}
        </select>
    )
}

export default BasicSelect;
