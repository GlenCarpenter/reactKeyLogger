import React from 'react';
import './App.css';

class Keylogger extends React.Component {
  
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    this.focusHandler = this.focusHandler.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
  }
  
  state = {
    message: "All keystrokes will be logged when typed into the field above.",
    keyLogArr: [],
    placeholder: "Type here to begin"
  };
  
  // When focusing on the textarea, placeholder text will disappear and word preview will change to larger size.
  focusHandler = () => {
    this.setState({placeholder: ""});
    document.getElementById("wordChange").style.fontSize = "xx-large";
  }
  
  // When clicking outside of the textarea, placeholder text will be replaced if empty and preview text will resize to smaller.
  blurHandler = () => {
    document.getElementById("wordChange").style.fontSize = "x-large";
    this.setState({placeholder: "Type here to begin"});
  }
  
  // As text is entered into the textarea, all inputs will be logged to an array and a preview of the current text will appear below.
  changeHandler = () => {
    if (document.getElementById('words').value === "") {
      this.setState({message: "All keystrokes will be logged when typed into the field above."});
    } else {
      this.setState({message: document.getElementById('words').value});
      this.setState({keyLogArr: this.state.keyLogArr.concat([document.getElementById('words').value])});
    }
  }
  
  render() {
    return (
      <div>
        <textarea id="words" placeholder={this.state.placeholder} onChange={this.changeHandler} onFocus={this.focusHandler} onBlur={this.blurHandler}></textarea>
        <InputPreviewPane id="wordChange" currentDisplay={this.state.message}/>
        <ButtonRendersArrayWithNewLine inputsArray={this.state.keyLogArr}/>
      </div>
    );
  }
}

class InputPreviewPane extends React.Component {
  render() {
    return (
        <h4 id="wordChange">{this.props.currentDisplay}</h4>
    );
  }
}

class ButtonRendersArrayWithNewLine extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }
  
  state = {
    inputsStringWithNewLine: ""
  };
  
  // Upon clicking the button, will log array of inputs to console and print results to screen, one line for each input.
  clickHandler = () => {
    console.log(this.state.keyLogArr);
    this.setState({inputsStringWithNewLine: this.props.inputsArray.join('\n\n')});
  }
  
  render() {
    return (
      <div>
        <button onClick={this.clickHandler}>Click here to see inputs</button>
        <pre id="inputs">{this.state.inputsStringWithNewLine}</pre>
      </div>
    );
  }
}

const App = ()=> {
  return (
    <div id="keylogger">
      <h1 id="topBanner">React Keylogger</h1>
      <Keylogger />
    </div>
  );
}

export default App;
