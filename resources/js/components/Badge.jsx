const Badge = ({ theme = 'default', string }) => {
    const themes = {
        success: "bg-permanent-green text-white",
        primary: "bg-permanent-blue text-white",
        danger: "bg-permanent-red text-white",
        transparent: "bg-transparent",
        default: "bg-gray-500 hover:bg-gray-400 text-white"
    };

    return (
        <div className={` ${themes[theme] || themes.default}
        inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium inset-ring`}>
            {string}
        </div>
    )
}

export default Badge;
