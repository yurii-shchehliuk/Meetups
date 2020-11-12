import React from 'react';
import {Button} from 'react-bootstrap';
import s from './SliderItem.module.css'

const img = 'https://www.ietf.org/media/images/IETF_101_Hackathon_London_025_49SDekf.original.jpg'

const SliderItem = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.imgWrap}>
                <img className={s.img} src={img} alt={''}/>
            </div>
            <h1 className={s.h1}>Hackathon</h1>
            <div className={s.textBox}>
                <h2 className={s.h2}>
                    Dołącz do największego wydarzenia IT w Polsce
                </h2>
                <p className={s.count}><span>345</span> osoby już czekają</p>
                <button className={s.btn}>Chcę</button>
            </div>
        </div>
    );
};

export default SliderItem;
