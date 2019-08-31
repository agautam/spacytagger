import React from 'react';
import './App.css';
import Popup from './components/Popup';
import DragAndDrop from './components/DragAndDrop.js';

class TextDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bottom: 0,
            left: 0,
        };

        this.togglePopup = this.togglePopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    togglePopup(event) {
        const selectedText = getSelectionText();
        if (selectedText && this.state.selectedText != selectedText) {
            this.setState({
                selectedText: selectedText,
                showPopup: true,
                pbottom: event.pageY,
                pleft: event.pageX,
            });
        } else if (!selectedText && this.state.selectedText) {
            this.setState({
                selectedText: null,
                showPopup: false,
                pbottom: event.pageY,
                pleft: event.pageX,
            });
        }
    }

    closePopup(event) {
        this.setState({
            selectedText: null,
            showPopup: false,
            pbottom: event.pageY,
            pleft: event.pageX,
        });
    }

    render() {
        return (
            <div>
                <h1>SpaCy Training Feeder</h1>

                {this.state.showPopup ?
                    <Popup
                        bottom={this.state.pbottom}
                        left={this.state.pleft}
                        text={getSelectionText()}
                        closePopup={this.closePopup}
                    />
                    : null
                }
                <div style={{textAlign: 'left',}} onMouseUp={this.togglePopup} onKeyUp={this.togglePopup} ><pre> {this.props.text}</pre></div>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            text: 'this is some sample text',
        };
    }

    updateTextDisplay = (e) => {
        const content = e.currentTarget.result;
        this.setState({ text: content, });
    };

    readFile = (file) => {
        const fileReader = new FileReader();
        fileReader.onloadend = (e) => {
            const content = e.currentTarget.result;
            this.setState({ text: content, });
        };
        fileReader.readAsText(file);
    };

    handleDrop = (files) => {
        if (files.length == 1) {
            this.readFile(files[0]);
        }
    };

    render() {
        return (
            <DragAndDrop handleDrop={this.handleDrop}>
                <div className="App">
                    <header className="App-header">
                        <TextDisplay text={this.state.text} />
                    </header>
                </div>
            </DragAndDrop>
        );
    }
}

function getSelectionText() {
    let text = "";
    const activeEl = document.activeElement;
    const activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
        (activeElTagName == "textarea") || (activeElTagName == "input" &&
            /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
        (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        const s = window.getSelection();
        const range = s.getRangeAt(0);
        const node = s.anchorNode;
        while (range.toString().indexOf(' ') != 0 && range.startOffset > 0) {
            range.setStart(node, (range.startOffset - 1));
        }

        if (range.toString().indexOf(' ') == 0) {
            range.setStart(node, range.startOffset + 1);
        }

        while (range.endOffset < node.length && !range.toString().endsWith(' ') && range.toString().trim() != '') {
            range.setEnd(node, range.endOffset + 1);

        }

        text = range.toString().trim();

        if (range.toString() != text) {
            range.setEnd(node, range.endOffset - 1);
        }

        text = range.toString().trim();
    }
    return text;
}

export default App;
