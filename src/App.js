import React from 'react';
import Header from './components/Header'
import Main from './components/Main';

class App extends React.Component {
  state = {
    value: [],
    currentVideo: 'L6HC1bqrLRQ',
  }
  onSearchDone = search => {
    this.setState({value: [...search]})
  }
  playVideo = video => {
    this.setState({currentVideo: video})
  }
  render() {
    return (
      <>
        <Header onSearch={this.onSearchDone} playVideo={this.playVideo}></Header>
        <Main value={this.state.value} currentVideo={this.state.currentVideo}></Main>
      </>
    )
  }
}

export default App;
