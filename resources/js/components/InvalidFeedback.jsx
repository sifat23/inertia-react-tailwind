const InvalidFeedback = ({msg}) => {
    if (msg === undefined) return null

    return (
        <div className="text-red-500 text-sm mt-1">
            { msg }
        </div>
    )
}

export default InvalidFeedback;
