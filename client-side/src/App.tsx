import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Chat from './components/Chat';
import User from './components/User';
// import Socket from './Socket';
import { SocketContext, socket } from './utils/socketConfig';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/chat">
        <SocketContext.Provider value={socket}>
          <Chat />
        </SocketContext.Provider>
      </Route>
      <Route path="/">
        <User />
      </Route>
    </Switch>
  </Router>
);

export default App;
