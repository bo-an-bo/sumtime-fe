import React from 'react'

const KakaoMessage = ({ friends }) => {
    const sendMessage = (uid) => {
        // Your logic to send a message using the UID
        console.log(`Sending message to UID: ${uid}`)
    }

    return (
        <div>
            <h2>Kakao Friends</h2>
            <ul>
                {friends.map((friend) => (
                    <li key={friend.id}>
                        {friend.profile_nickname}
                        <button onClick={() => sendMessage(friend.id)}>Send Message</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default KakaoMessage
