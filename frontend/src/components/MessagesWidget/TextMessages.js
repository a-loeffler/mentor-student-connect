import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TextBubble from './TextBubble';
import { postNewMessage, setMessagesNeedsRefreshState } from '../../store/messages';


const TextMessages = ({activeTexts, userId, recipientId}) => {
    const dispatch = useDispatch()

    const needMessageRefresh = useSelector(state => state.userMessages.needsRefresh)

    const [messageText, setMessageText] = useState("")

    useEffect(() => {

    }, [dispatch])

    const sendText = (e) => {
        e.preventDefault();
        if (messageText) {
            const contents = messageText;

            dispatch(postNewMessage(userId, recipientId, contents))
            dispatch(setMessagesNeedsRefreshState(true))

            setMessageText("");
        }

        //to-do: dispatch thunk to post to database; rerender current position with new text
    }


    console.log("activeTexts", activeTexts)
    //to-do: get media for little icon boxes next to messages
    //to-do: display active character limit for text message at bottom

    return (
        <div className="text-messages-container">
            <div className="text-bubbles-display-container">
                {activeTexts.map((text, index) => <TextBubble
                                                    key={index}
                                                    bubbleType={text.sender_id === userId ? "outgoing" : "incoming"}
                                                    contents={text.contents}
                                                    last={index === activeTexts.length - 1}
                                                    />)}
            </div>
            <form className="text-input-form" onSubmit={e => sendText(e)}>
                <input className="text-input-field" type="text" placeholder="Add message" value={messageText} onChange={e => setMessageText(e.target.value)} autoFocus></input>
                <button className="text-submit-button" onClick={e => sendText(e)}>Send</button>
            </form>
        </div>
    )
}

export default TextMessages
