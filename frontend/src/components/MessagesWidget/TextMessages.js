import { useState } from 'react';

import TextBubble from './TextBubble';


const TextMessages = ({activeTexts, userId}) => {

    const [messageText, setMessageText] = useState("")

    //to-do: get individual messages out of the messages object


    const sendText = (e) => {
        e.preventDefault();

        //to-do: dispatch thunk to post to database; rerender current position with new text
    }


    //to-do: get media for little icon boxes next to messages

    return (
        <div className="text-messages-container">
            <div className="text-bubbles-display-container">
                {activeTexts.map((text, index) => <TextBubble key={index} bubbleType={text.sender_id === userId ? "outgoing" : "incoming"} contents={text.contents}/>)}
            </div>
            <form className="text-input-form" onSubmit={e => sendText(e)}>
                <input className="text-input-field" type="text" placeholder="Add message" value={messageText} onChange={e => setMessageText(e.target.value)} autoFocus></input>
                <button className="text-submit-button" onClick={e => sendText(e)}>Send</button>
            </form>
        </div>
    )
}

export default TextMessages
