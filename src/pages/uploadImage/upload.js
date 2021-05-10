import React, { useState, Component } from 'react';
import firebase from "../../Util/firebase";
import useStyles from "./styles";
import { Grid } from "@material-ui/core";
import { TextField, InputBase, CircularProgress } from "@material-ui/core";
import Widget from "../../components/Widget/Widget";

const storage = firebase.storage();
//var classes = useStyles();

class ImageUpload extends Component {

    constructor(props) {

        super(props);
        this.state = {
            image: null,
            url: '',
            progress: 0,
            textValue: ''
        }
        
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }
    
    handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }));
        }
    }
    handleUpload = () => {
        const { image } = this.state;
        const uploadTask = storage.ref(`/images/${image.name}`).put(image);
        uploadTask.on('state_changed',
            (snapshot) => {
                // progrss function ....
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({ progress });
            },
            (error) => {
                // error function ....
                console.log(error);
            },
            () => {
                // complete function ....
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({ url });

                    // const [imgURL, setImgURL] = useState('')

                    // firebase
                    //     .firestore()
                    //     .collection('notes')
                    //     .add({
                    //         imgURL
                    //     })
                    //     .then(() => {
                    //         setImgURL('')
                    //     })


                })
            });
    }
    render() {

        return (
            // <div>
            //     <progress value={this.state.progress} max="100" />
            //     <br />
            //     <input type="file" onChange={this.handleChange} />
            //     <button onClick={this.handleUpload}>Upload</button>
            //     <br />

            //     <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400" />
            // </div>
            <Grid item md={8}>
                <Widget title="What's on your mind?" disableWidgetMenu>
                    <form onSubmit={this.handleUpload}>
                        <TextField value={this.state.textValue}
                            //className={this.classes.textfield}
                            // onChange={e => setTextValue(e.target.value)} 
                            onChange={e => {
                                let newVal = e.target.value;
                                this.setState({textValue: newVal})}}
                            placeholder='Text here...'></TextField>

                        {/* <div className={this.classes.postbottom}> */}
                        {/* <div className={this.classes.postbottomL} > */}
                        <div>
                            <div>
                                {/* <PhotoIcon fontSize='large' className='icon' />
              <text>Upload photo</text> */}
                                <input
                                    type="file"
                                    // multiple
                                    onChange={this.handleChange}
                                />
                            </div>
                            <br />
                            <progress value={this.state.progress} max="100" />
                            <button type='submit'
                            //className={this.classes.postButton}
                            >Post</button>
                        </div>
                    </form>
                </Widget>
                {/* <div><img src={imageAsUrl.imgUrl} alt="image tag" /></div> */}
            </Grid>
        )
    }
}
export default ImageUpload;