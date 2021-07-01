import { useState } from 'react';

import TextBubble from './TextBubble';


const TextMessages = ({activeTexts, userId}) => {

    const [messageText, setMessageText] = useState("")

    //to-do: get individual messages out of the messages object

    console.log("activeTexts", activeTexts)
    console.log("userId", userId)

    const sendText = (e) => {
        e.preventDefault();

        //to-do: dispatch thunk to post to database; rerender current position with new text
    }

    return (
        <div className="text-messages-container">
            {activeTexts.map(text => <TextBubble bubbleType={text.sender_id === userId ? "outgoing" : "incoming"} contents={text.contents}/>)}
            <form className="text-input-form" onSubmit={e => sendText(e)}>
                <input className="text-input-field" type="text" defaultValue={"Add message"} value={messageText} onChange={e => setMessageText(e.target.value)} autoFocus></input>
                <button className="text-submit-button" onClick={e => sendText(e)}>Send</button>
            </form>
        </div>
    )
}

export default TextMessages
