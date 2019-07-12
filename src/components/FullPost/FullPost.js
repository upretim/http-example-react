import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
    constructor(props){
        super(props);
     this.state = {
         loadedPost: null
     }
    }

    componentDidUpdate(){
        const id = this.props.id;
        if(id){
            if (!this.state.loadedPost || (this.state.loadedPost &&  (this.state.loadedPost.id !== id))){
                axios.get('https://jsonplaceholder.typicode.com/posts/'+ id)
                .then(response=>{
                    this.setState({
                        loadedPost: response.data
                    })           
                })
            }
           
        }    
    }

    deletePost = () =>{
      axios.delete('https://jsonplaceholder.typicode.com/posts/'+  this.props.id)
      .then((response)=>{
          console.log('deleted success ', response.data)
      })
    }
    render () {

        let post = (<p style={{
            textAlign: 'center'
        }}> Please select a Post!
        </p>);
        if(this.props.id){
            post = (<p style={{
                textAlign: 'center'
            }}> loading...
            </p>);
        }
        if(this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button  onClick={this.deletePost}className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
       
        return post;
    }
}

export default FullPost;