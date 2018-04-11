import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { SmartProviderRedux } from './smart-provider/index';
import { nestedList } from './data/nested-list';

class App extends Component {
  render() {
    const smartProvider = (
      <SmartProviderRedux
        data={nestedList}
      />
    );
    return (
      <div className="App">
        {smartProvider}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
