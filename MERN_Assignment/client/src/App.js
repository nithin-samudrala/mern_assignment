import logo from './logo.svg';
import './App.css';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';

import { BrowserRouter, Switch, Route } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
