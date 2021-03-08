import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './slider.css';
import pic1 from '../../landing/school1.jpg'
import pic2 from '../../landing/school2.jpg'
import pic3 from '../../landing/school3.jpg'

//export default class Slider extends Component {
export default function Slider(props) {

    let images = props.school[0].images

    let handleImages = (images) => {
        console.log(images)
        let allImages;
        allImages = images.map((i) => {
            return (<div>
                <img src={i.path} />
            </div>)
        })
        // for (let i = 0; i <= images.length; i++) {
        //     return (<div><img src={images[i].path} /></div>)
        // }
        console.log(allImages)
        return allImages
    }

    return (
        <Carousel infiniteLoop useKeyboardArrows autoPlay >
            {
                handleImages(images)

            }
        </Carousel >
    );
}
