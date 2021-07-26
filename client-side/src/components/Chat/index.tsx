import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import { useLocation } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import styled from 'styled-components';
import { SocketContext } from '../../utils/socketConfig';

const StyledChat = styled.div`
  border: 2px solid black;
  border-radius: 5px;
  width: 80%;
  height: 80vh;
  display: flex;
  flex-direction: column;
`;

const StyledTextSection = styled.section`
  height: 90%;
  width: auto;
`;

const StyledTextInput = styled.input`
  width: auto;
  height: 10%;
  border: none;
  border-top: 2px solid black;
  font-size: large;
  outline: none;
`;

type ChatData = {
  user: string;
  message: string;
};

const Chat: React.FC = () => {
  const [value, setValue] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatData[]>([]);
  const { state } = useLocation<{ name: string }>();

  // Socket context
  const socket = useContext<Socket>(SocketContext);

  // Reference to use chatHistory inside socket handlers
  const chatHistoryRef = useRef(chatHistory);

  useEffect(() => {
    /**
     * This effect executes on every render (no dependency array specified).
     * Any change to the "chatHistory" state will trigger a re-render
     * which will then cause this effect to capture the current "chatHistory"
     * value in "chatHistoryRef.current".
     */
    chatHistoryRef.current = chatHistory;
  });

  useEffect(() => {
    socket.on('NEW_MESSAGE', (data: ChatData) => {
      setChatHistory([...chatHistoryRef.current, data]);
    });
  }, []);

  const handleInputSubmit = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      socket.emit('SEND_MESSAGE', { user: state.name, message: value });
      setValue('');
    }
  };

  return (
    <>
      <StyledChat>
        <StyledTextSection>
          {
            chatHistory.map((elem) => (
              <p>{`${elem.user}: ${elem.message}`}</p>
            ))
          }
        </StyledTextSection>
        <StyledTextInput
          onChange={(e) => setValue(e.target.value)}
          value={value}
          onKeyPress={(e) => handleInputSubmit(e)}
        />
      </StyledChat>
    </>
  );
};

export default Chat;
