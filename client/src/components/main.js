import React, {Component} from 'react';
import axios from 'axios';
import Card from "./card";
import Sidebar from "./sidebar";
import Form from "./Form";

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            authors : [],
            posts : [],
            formDisplay : false,
            formError : null,
            author : []
        }
    }

    async componentDidMount(){
        let postsUrl = "http://127.0.0.1:9000/api/posts";
        let authorsUrl = "http://127.0.0.1:9000/api/authors";

        await this.fetchData(postsUrl).then(res => {
            this.setState({
                posts : res.data.posts
            })
        });

        await this.fetchData(authorsUrl).then(res => {
           this.setState({
               authors : res.data.author
           })
        });

        console.log('state of parent', this.state)
    }


    fetchData = (url) => {
        return axios.get(url).catch(err => {console.log(err)})
    }


    clickBtn = () => {
        this.removeError();
        this.setState({
            formDisplay: !this.state.formDisplay
        })
    }

    updateStatePost = (val) => {
        if (this.state.author.cuid !== null || this.state.author.cuid !== undefined){
            this.setState({
                posts : [...this.state.posts, val.newPost]
            })
        }else{
            this.setState({
                posts : [...this.state.posts, val.post]
            })
        }
    }

    addEroor = (err) => {
        this.setState({formError : err})
    }

    removeError = () => {
        this.setState({formError : null})
    }

    chooseAuthor = (el) => {
        this.setState({author : el})
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <Form author={this.state.author} display={this.state.formDisplay} clickBtn={this.clickBtn} updatePostState={this.updateStatePost.bind(this)} error={this.state.formError} addError={this.addEroor.bind(this)} removeErr={this.removeError} />
                    <Sidebar authors={this.state.authors}  author={this.state.author} chooseAuthor={this.chooseAuthor}/>
                    <Card posts={this.state.posts} />
                </div>
            </div>
        );
    }
}


export default Main;
