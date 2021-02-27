import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import './slider.css';
import pic1 from '../../landing/school1.jpg'
import pic2 from '../../landing/school2.jpg'
import pic3 from '../../landing/school3.jpg'

export default class Slider extends Component {
    render() {
        return (
            <Carousel infiniteLoop useKeyboardArrows autoPlay >
                <div>
                    <img className="pic" src={pic1} />
                    <p className="legend">School Structures</p>
                </div>
                <div>
                    <img src={pic2} />
                    <p className="legend">School life</p>
                </div>
                <div>
                    <img src={pic3} />
                    <p className="legend">Campus</p>
                </div>
                <div>
                    <img src={pic3} />
                    <p className="legend">Campus</p>
                </div>
            </Carousel>
        );
    }
}
