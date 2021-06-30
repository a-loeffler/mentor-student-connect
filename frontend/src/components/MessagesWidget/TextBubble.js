


const TextBubble = ({bubbleType, contents}) => {


    //bubbleType corresponds to "incoming" or "outgoing"

    return (
        <div className={`text-bubble-container ${bubbleType}`}>
            <h3 className="text-bubble-contents">{contents}</h3>
        </div>
    )
}

export default TextBubble
