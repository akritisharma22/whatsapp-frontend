import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import {useEffect, useState} from 'react';
import Pusher from 'pusher-js'
import axios from './axios'

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync').then((response) =>{
      setMessages(response.data)
    });
  }, []);

  useEffect(() => {
    //when component loads run this piece of code once
    const pusher = new Pusher('b6b0b1bac7d88846c45f', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage])
    });

    return() => {
      channel.unbind_all();
      // channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);



  return (
    <div className="app">
      <div className="app__body"> 
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
