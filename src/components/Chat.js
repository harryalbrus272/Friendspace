import React from 'react';
import { useState } from 'react';
import '../chat.css';
import io from 'socket.io-client';
import { connect } from 'react-redux';

const Chat = (props) => {
  const { user, dispatch } = props;
  const [message, setMessage] = useState([]); //content: 'some messages', self: true
  const [typedMessage, setTypedMessage] = useState('');
  const socket = io.connect('ws://54.237.158.65:5000');
  const userEmail = user.email;
  const handleSubmit = () => {
    if (typedMessage && userEmail) {
      socket.emit('send_message', {
        message: typedMessage,
        user_email: userEmail,
        chatroom: 'friendspace',
      });
    }
  };
  const setupConnections = () => {
    socket.on('connect', () => {
      console.log('connection established');
      socket.emit('join_room', {
        user_email: userEmail,
        chatroom: 'friendspace',
      });

      socket.on('user_joined', (data) => {
        console.log('new user joined');
      });
      socket.on('receive_message', (data) => {
        console.log('new user joined');
        //add message to state
        const messageObj = {};
        messageObj.content = data.message;
        if (data.user_email === userEmail) {
          messageObj.self = true;
        }
        setMessage({
          messages: [...message, messageObj],
          typeMessage: '',
        });
      });
    });
  };
  if (userEmail) {
    setupConnections();
  }

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

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps)(Chat);
