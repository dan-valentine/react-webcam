import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import routes from './routes'
import {Link} from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <nav>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <Link to='/faq'>FAQ</Link>
            <Link to='/camera'>CAMERa</Link>
          </nav>
        </header>
        {routes}
      </div>
    );
  }
}

export default App;
