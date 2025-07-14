
import { useState, useRef, useEffect } from 'react';

import { db } from '../firebase';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp
} from 'firebase/firestore';
import axios from 'axios';
import './Chatbot.css';


// eslint-disable-next-line react/prop-types
const Chatbot = ({ onClose }) => {
  const [name, setName] = useState('');
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);


  const userId = 'test_user_1'; // hardcoded for now , i have to change once login is integrated

  const handleSubmit = async () => {
    if (name) {
      const userRef = doc(db, 'users', userId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        await updateDoc(userRef, { lastUsed: serverTimestamp() });
      } else {
        await setDoc(userRef, {
          name,
          lastUsed: serverTimestamp()
        });
      }
      setMessages([{ sender: 'bot', text: 'How are you feeling today?' }]);
      setSubmitted(true);
      setShowOptions(true);
    }
  };
   
  const scrollToBottom = () => {
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }
};
useEffect(() => {
  scrollToBottom();
}, [messages]);

  const sendToAI = async (text) => {
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setIsTyping(true);
    setUserInput('');

    try {
      const res = await axios.post('http://localhost:5000/ask-ai', {
        userMessage: text,
        userName: name // send user's name
      });

      const reply = res.data.reply;
      const botReply = { sender: 'bot', text: reply };

      setMessages((prev) => [...prev, botReply]);

      const messageRef = doc(db, 'messages', userId);
      await setDoc(
        messageRef,
        {
          name,
          chat: arrayUnion({
            text,
            response: reply,
            timestamp: new Date()
          })
        },
        { merge: true }
      );
    } catch (err) {
      console.error('AI error:', err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOptionClick = (option) => {
    setShowOptions(false);
    if (option === 'book') {
      window.location.href = '/book-consultation';
    } else if (option === 'other') {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'How can I help you?' }]);
    } else {
      sendToAI(option);
    }
  };

  const handleSend = async () => {
    if (!userInput.trim()) return;
    await sendToAI(userInput);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
  <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'black' }}>Yatri Bot</div>
  <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✖</button>
</div>


      {!submitted ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p><b>🧘 Hi! I’m YatriBot, your Soul Yatri assistant.</b><br />Please enter your name to begin:</p>
         <input className="name-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name"
         />

          <button onClick={handleSubmit}>Start Chat</button>
        </div>
      ) : (
        <>
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '10px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ margin: '5px 0', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                <div className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
                    {msg.text}
                   </div>
              </div>
            ))}
            <div ref={messagesEndRef} />

            {isTyping && (
              <div style={{ fontStyle: 'italic', color: 'gray' }}>
                YatriBot is typing...
              </div>
            )}
          </div>

          {showOptions && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <button onClick={() => handleOptionClick('What to know about Soul Yatri')}>What to know about Soul Yatri</button>
              <button onClick={() => handleOptionClick('book')}>Book a Consultation</button>
              <button onClick={() => handleOptionClick('Our Services')}>Our Services</button>
              <button onClick={() => handleOptionClick('other')}>Others</button>
            </div>
          )}

          {!showOptions && (
            <div className="input-area">
              <input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message"
                style={{ flex: 1 }}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Chatbot;
