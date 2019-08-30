import React from 'react';
import './App.css';
import Popup from './components/Popup'

class TextDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            bottom: 0,
            left:0,
        };

        this.togglePopup = this.togglePopup.bind(this);
    }

    togglePopup(event) {
        const selectedText = getSelectionText();
        if (selectedText && this.state.selectedText != selectedText) {
            this.setState({
                selectedText: selectedText,
                showPopup: true,
                pbottom: event.clientY,
                pleft: event.clientX,
            });
        } else if (!selectedText && this.state.selectedText) {
            this.setState({
                selectedText: null,
                showPopup: false,
                pbottom: event.clientY,
                pleft: event.clientX,
            });
        }
    }

    render() {
        return (
            <div>
                <h1> Simple Popup Example In React Application </h1>

                {this.state.showPopup ?
                    <Popup
                        bottom={this.state.pbottom}
                        left={this.state.pleft}
                        text={getSelectionText()}
                        closePopup={this.togglePopup}
                    />
                    : null
                }
                <div onMouseUp={this.togglePopup} onKeyUp = { this.togglePopup } > { this.state.text }</div>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showPopup: false
        };
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <TextDisplay text="This is some sample text" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                </a>
                </header>
            </div>
        );
    }
}

function getSelectionText() {
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
        (activeElTagName == "textarea") || (activeElTagName == "input" &&
            /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
        (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}

export default App;
