import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Slide1 from "../../../assets/Slide1.png";
import Slide2 from "../../../assets/Slide2.png";
import Slide3 from "../../../assets/Slide3.png";
import './SlideShow.css'

const SlideShow = () => {
    return (
        <div>
        <Carousel>
        <Carousel.Item>
          <img style={{height:'50vh'}}
            className="d-block w-100"
            src={Slide1}
            alt="First slide"
          />
          
        </Carousel.Item>
        <Carousel.Item>
          <img style={{height:'50vh'}}
            className="d-block w-100"
            src={Slide2}
            alt="Second slide"
          />
    
          
        </Carousel.Item>
        <Carousel.Item>
          <img style={{height:'50vh'}}
            className="d-block w-100"
            src={Slide3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      </div>
      )
}

export default SlideShow