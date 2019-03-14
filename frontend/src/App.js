import React, { Component } from 'react';
import { signIn, loadData } from "./utils/firebase";
import Table from './Table';
import Graph from './Graph';

class App extends Component {

  state = {
    data: [],
  };

  componentDidMount() {
    signIn(() => loadData("temperatures", this.setState.bind(this)));
  }


  render() {
    return (
      <div>
        <h1>Temperature and Humidty</h1>
        <Graph data={this.state.data}/>
        <Table data={this.state.data}/>
      </div>
    );
  }

}

export default App;
