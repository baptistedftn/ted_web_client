import logo from './logo.svg';
import './App.css';
import React, { useState, useContext, useCallback, useEffect } from 'react';
import { SocketContext } from './context/socket';
import { Button, Card, CardContent, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Socket } from 'socket.io-client';

const App = () => {

  const [response, setResponse] = useState()
  const [question, setQuestion] = useState('')
  const [connected, setConnected] = useState(false)

  const socket = useContext(SocketContext);

  const onSendText = useCallback(() => {
    console.log(question);
    question &&
      socket.emit("text-data", question);
  }, [question, socket]);


  useEffect(() => {
    socket.on('connect', () => {
      setConnected(socket.connected)
    });
    socket.on('disconnect', () => {
      setConnected(false)
    });
    socket.on("response", data => {
      setResponse(JSON.parse(data));
      console.log(response);
    })
  }, []);

  return (
    <div className="App">
      <Card style={{ width: '50%' }}>
        <CardContent>
          <p>
            {
              connected ? 'Connecté' :
                'Déconnecté'
            }
          </p>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <TextField
            label="Pose moi une question..."
            variant="standard"
            fullWidth
            margin="normal"
            value={question}
            onChange={event => {
              setQuestion(event.target.value)
            }}
          />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={e => {
              e.preventDefault()
              onSendText()
            }}
          >
            Envoyer
          </Button>
          <p>
            {response && response.answer}
          </p>
        </CardContent>
      </Card>


    </div>
  );
}

export default App;
