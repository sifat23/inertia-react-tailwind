const BasicInput = ({ name, type, value, onChange, onBlur, placeholder, className, ...props}) => {
    return (
        <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`pl-3 border w-full border-gray-300 h-10 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 ${className}`}
            {...props}
        />
    )
}

export default BasicInput;
