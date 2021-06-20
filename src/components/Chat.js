import React from 'react';
import { useState } from 'react';
import '../chat.css';

const Chat = () => {
  const [message, setMessage] = useState([]); //content: 'some messages', self: true
  const [typedMessage, setTypedMessage] = useState('');
  const handleSubmit = () => {

  };
  return (
    <div className="chat-container">
      <div className="chat-header">
        Chat
        <img
          src="https://www.iconsdb.com/icons/preview/white/minus-5-xxl.png"
          alt="chat"
        />
      </div>
      <div className="chat-messages">
        {message.map((msg) => (
          <div
            className={
              msg.self ? 'chat-bubble self-chat' : 'chat-bubble other-chat'
            }
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={typedMessage}
          onChange={(event) => setTypedMessage(event.target.value)}
        />
        <button onClick={(e) => handleSubmit(e)}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
