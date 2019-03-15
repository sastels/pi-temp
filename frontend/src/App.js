/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react';
import { signIn, loadData } from "./utils/firebase";
import Graph from './Graph';

const root = css`
  font-family: Arial, Helvetica, sans-serif;
  margin: 50px;
`;

const capitalize = s => {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : ""
}

class App extends React.Component {

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
    let currentConditions = ""
    if (this.state.data.length > 0) {
      const m = this.state.data.slice(-1)[0]
      currentConditions = `Last reading (${m.datetime.format("H:mm")}): ${m.temperature.toFixed(1)}°C ${m.humidity.toFixed(1)} %`
    }
    return (
      <div css={root}>
        <h1>{capitalize(this.state.id)}</h1>
        <Graph data={this.state.data}/>
        <p>{currentConditions}</p>
      </div>
    );
  }

}

export default App;
