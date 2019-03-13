import React, { Component } from 'react';
import { signIn, loadData } from "./utils/firebase";
import Table from './Table';

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
        <h1> Temperatures</h1>
        <Table data={this.state.data}/>
      </div>
    );
  }

}

export default App;
