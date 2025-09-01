const BasicInput = ({ type, placeholder, className, ...props}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`pl-3 border w-full border-gray-300 h-10 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 ${className}`}
            {...props}
        />
    )
}

export default BasicInput;
