import React, {Component} from 'react';

class Modal extends Component {
    constructor(props){
        super(props);
        this.state = {
            display : props.display,
            postSelected : props.postSelected
        }
    }

    componentWillReceiveProps(props) {
        console.log("props", props);
        if (this.state.postSelected.length === 0) {
            this.setState({
                display : props.display,
                postSelect: props.postSelected
            })
        } else if (this.state.posts !== props.posts) {
            this.setState({
                display : props.display
            })
        }
    }

    displayModal = (val) => {
        if (val){
            return (
                <div className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Modal body text goes here.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.displayModal(this.state.display)}
            </div>
        );
    }
}


export default Modal;
