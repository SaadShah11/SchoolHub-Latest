import React, { Component } from 'react'
import Post from "./post"

export default class getPosts extends Component {

    state = {
        kee: null
    }

    render() {
        let displayPosts //= () => { let displayPostsVar
        let allPosts = this.props.allPosts

        // if (allPosts != undefined) {
        //     console.log("inside displayPost")
        displayPosts = allPosts.map((i) => {
            //console.log(ke)
            let ke = i._id
            return <Post key={i._id} id={i._id} onClick={() => this.setState({ kee: ke })}
                username={i.username} time={i.time} text={i.text} image={i.image} //onSelect={this.onSelect} 
            />
        })
        // } else {
        //     console.log("nothing")
        // }
        return (<div>
            {displayPosts}
        </div>)

    }
}