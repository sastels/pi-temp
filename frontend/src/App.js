import React, { Component } from 'react';

import { signIn, loadData } from "../utils/firebase";


class App extends Component {

  state = {
    data: [],
};

  componentDidMount() {
    signIn(() => loadData(this.props.id, this.setState.bind(this)));
}


  render() {
    return (
      <div>
        <h1> Temperatures</h1>



      </div>
    );
  }
}

export default App;
