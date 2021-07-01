


const TextBubble = ({bubbleType, contents, last}) => {


    //bubbleType corresponds to "incoming" or "outgoing"

    return (
        <div className={`text-bubble-container ${bubbleType} ${last === true ? "last" : ""}`}>
            <h3 className="text-bubble-contents">{contents}</h3>
        </div>
    )
}

export default TextBubble
