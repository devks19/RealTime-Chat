import React, {useState, useEffect} from "react"
import { databases, DATABASE_ID, COLLECTION_ID_MESSEGES } from '../appwriteConfig'
import { ID } from "appwrite"
import { Query } from "appwrite"
import { Trash2 } from "react-feather"

const Room = () => {

    const [messages, setMessages] = useState([])
    const [messageBody, stMessageBody] = useState('')

    useEffect(() => {
        getMessages()
    }, []

    )

    const handleSubmit = async(e) => {
        e.preventDefault()

        let payload = {
            body: messageBody
        }

        let response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID_MESSEGES,
            ID.unique(),
            payload
            
        )
        console.log('Created!', response)

        setMessages(prevState => [response, ...messages])

        setMessageBody('')
    }

    const getMessages = async () => {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_MESSEGES,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(5)
            ]
            )
        console.log('RESPONSE: ', response)
        setMessages(response.documents)
}

const deleteMessage = async (message_id) => {
    databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSEGES, message_id)
    setMessages(prevState => messages.filter(message => message.$id !== message_id))
}

    return (
        <main className="container">

            <div className="room--container">
                <form onSubmit={handleSubmit} id="message--form">
                    <div>
                        <textarea required maxLength="1000" placeholder="Messageeeee ..." onChange={(e) => {stMessageBody(e.target.value)}} value={messageBody}>

                        </textarea>
                    </div>
                    <div className="send-btn--wrapper">
                        <input className="btn btn--secondary" type="submit" value="Send"/>
                    </div>
                </form>
            <div>
                {messages.map(message => (
                    <div key={message.$id} className="messages--wrapper">

                        <div className="message--header">
                            <small className="message-timestamp">{new Date(message.$createdAt).toLocaleString}</small>
                            <Trash2 
                            className="delete--btn"
                            onClick={() => {deleteMessage(message.$id)}}
                            />
                            {/* <button onClick={() => {deleteMessage(message.$id)}}>X</button> */}
                        </div>

                        <div className="message--body">
                            <span>{message.body}</span>
                        </div>
                    </div>
                ))}
            </div>
            </div>
             
        </main>
    )
}

export default Room