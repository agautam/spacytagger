import React from 'react';

class DragAndDrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drag: false,
        }
    }

    dragCounter = 0;

    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter++;
        if (!this.state.drag && e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({ drag: true });
        }
    }

    handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter--;
        if (this.state.drag && this.dragCounter === 0) {
            this.setState({ drag: false });
        }
    }

    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ drag: false });
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.props.handleDrop(e.dataTransfer.files);
            e.dataTransfer.clearData();
            this.dragCounter = 0;
        }
    }

    render() {
        return (
            <div
                style={{ position: 'relative' }}
                onDragEnter={this.handleDragIn}
                onDragLeave={this.handleDragOut}
                onDragOver={this.handleDrag}
                onDrop={this.handleDrop}
            >
                {this.state.drag &&
                    <div
                        style={{
                            backgroundColor: 'rgba(255,255,255,.9)',
                        border: 'dashed grey 4px',
                            margin: '20px',
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            zIndex: 10001
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: 0,
                                left: 0,
                                textAlign: 'center',
                                color: 'grey',
                                fontSize: 46
                            }}
                        >
                            <div>Drop here :)</div>
                        </div>
                    </div>
                }
                {this.props.children}
            </div>
        )
    }
}

export default DragAndDrop