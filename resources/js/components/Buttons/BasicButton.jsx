const BasicButton = ({theme = "default", children, className, ...props}) => {

    const themes = {
        success: "bg-permanent-green hover:bg-permanent-green-hover text-white",
        primary: "bg-permanent-blue hover:bg-permanent-blue-hover text-white",
        transparent: "bg-transparent",
        default: "bg-gray-500 hover:bg-gray-400 text-white",
        danger: "bg-permanent-red hover:bg-permanent-red-hover text-white",
        outlinePrimary: "text-permanent-blue hover:bg-permanent-blue hover:text-white border border-permanent-blue"
    };

    return (
        <button className={`py-2 hover:cursor-pointer duration-200 px-4 rounded-sm
        ${themes[theme] || themes.default}
        ${className}`} {...props}>
            {children}
        </button>
    )
}

export default BasicButton;
