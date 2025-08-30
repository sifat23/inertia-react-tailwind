const BasicButton = ({children, className, ...props}) => {
    return (
        <button className={`p-2 rounded-md hover:cursor-pointer ${className}`} {...props}>
            {children}
        </button>
    )
}

export default BasicButton;
