import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import './slider.css';
import defaultPic from './landingScreen.jpg'
// import pic2 from 'https://firebasestorage.googleapis.com/v0/b/okay-945dc.appspot.com/o/images%2FlandingScreen.jpg?alt=media&token=e4e2c005-f2d4-4827-9479-c506af9a80d9'
// import pic3 from 'https://firebasestorage.googleapis.com/v0/b/okay-945dc.appspot.com/o/images%2FlandingScreen.jpg?alt=media&token=e4e2c005-f2d4-4827-9479-c506af9a80d9'

export default class Slider extends Component {
    render() {
        return (
            <Carousel infiniteLoop useKeyboardArrows autoPlay >
                <div>
                    <img className="pic" src={defaultPic} />
                    <p className="legend">School Structures</p>
                </div>
                <div>
                    <img src={defaultPic} />
                    <p className="legend">School life</p>
                </div>
                <div>
                    <img src={defaultPic} />
                    <p className="legend">Campus</p>
                </div>
            </Carousel>
        );
    }
}
