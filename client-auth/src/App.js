import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { getToken } from "./login";

class App extends Component {
  state = {
    response: null
  };

  componentWillMount() {
    fetch("/api/v1/auth/test", {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(response => response.json())
      .then(myJson => {
        this.setState({ response: myJson });
      })
      .catch(err => {
        this.setState({ response: err.message });
      });
  }

  render() {
    const { response } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Login via:
          <ul>
            <li>
              <a href={"/api/v1/auth/google"}>Google</a>
            </li>
            <li>
              <a href={"/api/v1/auth/github"}>Github</a>
            </li>
          </ul>
        </p>
        <h3>Test API call</h3>
        {response ? (
          <div className="test">{JSON.stringify(response)}</div>
        ) : (
          "... loading ..."
        )}
      </div>
    );
  }
}

export default App;
