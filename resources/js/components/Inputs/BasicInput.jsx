const BasicInput = ({invalid, name, type, value, onChange, onBlur, placeholder, className, ...props}) => {

    return (
        <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`${ invalid !== undefined ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-gray-500'} pl-3 border w-full  h-10 rounded-md focus:outline-none focus:ring-1 ${className}`}
            {...props}
        />
    )
}

export default BasicInput;
