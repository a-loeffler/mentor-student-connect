


const TextMessages = ({texts}) => {


    //to-do: get individual messages out of the messages object



    return (
        <div className="text-messages-container">
            {texts.map(text => <TextBubble />)}
        </div>
    )
}

export default TextMessages
