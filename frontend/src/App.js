import React, { Component } from 'react';
import { signIn, loadData } from "./utils/firebase";
import Graph from './Graph';
import Table from './Table';

const capitalize = s => {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : ""
}

class App extends Component {

  state = {
    id: "",
    data: [],
  };

  componentDidMount() {
    let id = window.location.pathname.split('/').slice(-1)[0]
    id = id ? id : "testing"
    signIn(() => loadData(id, this.setState.bind(this)));
  }

  render() {
    let currentConditions = "(no data)"
    if (this.state.data.length > 0) {
      const m = this.state.data.slice(-1)[0]
      currentConditions = `${m.datetime.fromNow()}: ${m.temperature.toFixed(1)}°C ${m.humidity.toFixed(1)} %`
    }
    return (
      <div>
        <h1>{capitalize(this.state.id)}</h1>
        <h2> {currentConditions}</h2>
        <Graph data={this.state.data}/>
        <Table data={this.state.data}/>

      </div>
    );
  }

}

export default App;
