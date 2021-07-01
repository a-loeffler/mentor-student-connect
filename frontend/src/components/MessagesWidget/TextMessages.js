import TextBubble from './TextBubble';


const TextMessages = ({activeTexts, userId}) => {


    //to-do: get individual messages out of the messages object

    console.log("activeTexts", activeTexts)
    console.log("userId", userId)

    return (
        <div className="text-messages-container">
            {activeTexts && activeTexts.map(text => <TextBubble bubbleType={text.sender_id === userId ? "outgoing" : "incoming"} contents={text.contents}/>)}
        </div>
    )
}

export default TextMessages
