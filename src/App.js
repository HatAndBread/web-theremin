import React from 'react';
import { ToolBar } from './ToolBar';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
        <ToolBar />
      </div>
    );
  }
}

export default App;
