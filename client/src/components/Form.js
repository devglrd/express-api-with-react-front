import React, {Component} from 'react';
import axios from "axios/index";

// import fetchData from "./../api";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: props.display,
            title : null,
            content : null,
            error : props.error,
            author: props.author
        }
    }

    componentWillReceiveProps(props) {
        console.log(props);
        this.setState({
            display: props.display,
            error : props.error,
            author: props.author
        })
    }

    handleInput = (e) => {
        if (e.target.name === "title") {
            this.setState({ title : e.target.value})
        }
        else if(e.target.name === "content"){
            this.setState({content : e.target.value})
        }
    }

    savePost = () => {
        if (this.state.title === null|| this.state.content === null){
            this.props.addError("Vous devez passé un contenue");
            return false;
        }
        let url;
        if (this.state.author !== null || this.state.author !== null){
            url = `http://127.0.0.1:9000/api/authors/${this.state.author.cuid}/post`;
        } else{
            url = `http://127.0.0.1:9000/api/posts`;
        }
        axios.post(url, {post : { title : this.state.title, content : this.state.content }}).then((res) => {
            this.setState({title : null, content : null});
            this.props.updatePostState(res.data);
        });
    }

    renderForm = (display) => {
        if (display === true) {
            return (
                <div className="py-3">
                    <div className="row d-flex align-items-center justify-content-center mb-3">
                        <div className="col-md-6">
                            <label className="mr-4" htmlFor="">Title</label>
                        </div>
                        <div className="col-md-6">
                            <input placeholder="Titre du post" name="title" type="text" className="form-control"
                                   onChange={this.handleInput.bind(this)}/>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center mb-3 row">
                        <div className="col-md-6">
                            <label className="mr-4" htmlFor="">Contenue</label>
                        </div>
                        <div className="col-md-6">
                            <textarea placeholder="Contenue du post" name="content" type="text" className="form-control"
                                      onChange={this.handleInput.bind(this)}>

                            </textarea>
                        </div>
                    </div>
                    <div onClick={this.savePost} className="btn btn-outline-success">Ajouter le post</div>
                </div>
            )
        }
    }

    renderBtn = (display) => {
        if (display === true) {
            return (
                <button onClick={this.props.clickBtn} className="btn btn-outline-danger">Fermer</button>
            )
        } else {
            return (
                <button onClick={this.props.clickBtn} className="btn btn-outline-success">Ajouter un post</button>
            )
        }
    }

    render() {

        return (
            <div className="w-100 d-flex align-items-center justify-content-center flex-column">
                {this.props.error}
                <div className="my-4">
                    {this.renderBtn(this.state.display)}
                </div>
                {this.renderForm(this.state.display)}
            </div>
        );
    }
}


export default Form;
