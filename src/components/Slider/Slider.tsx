import React from 'react';
import {Carousel} from 'react-bootstrap';
import SliderItem from "./SliderItem/SliderItem";
import s from './Slider.module.css'

const Slider = () => {
    return (
        <Carousel className={s.slider}>
            <Carousel.Item>
                <SliderItem/>
            </Carousel.Item>
            <Carousel.Item>
                <SliderItem/>
            </Carousel.Item>
            <Carousel.Item>
                <SliderItem/>
            </Carousel.Item>
            <Carousel.Item>
                <SliderItem/>
            </Carousel.Item>
        </Carousel>
    );
};

export default Slider;
