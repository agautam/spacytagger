import React from 'react';
import './popup.css';

class Popup extends React.Component {
    render() {
        return (
            <div className='popup' style={{ bottom: this.props.bottom, left: this.props.left }}>
                <div className='inner'>
                    <p>
                        <span>{this.props.text}</span><br/>
                    <label>Part of Speech:<input type='text' name='pos' />
                        </label>
                        </p>
                    <button onClick={this.props.closePopup}>close me</button>
                </div>
            </div>);
    }
}

export default Popup;