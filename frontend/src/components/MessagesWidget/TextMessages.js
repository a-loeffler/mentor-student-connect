import { useState } from 'react';

import TextBubble from './TextBubble';


const TextMessages = ({activeTexts, userId}) => {

    const [messageText, setMessageText] = useState("")

    //to-do: get individual messages out of the messages object

    console.log("activeTexts", activeTexts)
    console.log("userId", userId)

    return (
        <div className="text-messages-container">
            {activeTexts.map(text => <TextBubble bubbleType={text.sender_id === userId ? "outgoing" : "incoming"} contents={text.contents}/>)}
            <form className="text-input-form">
                <input className="text-input-field" type="text" defaultValue={"Add message"} value={messageText} onChange={e => setMessageText(e.target.value)} autoFocus></input>
                <button className="text-submit-button">Send</button>
            </form>
        </div>
    )
}

export default TextMessages
