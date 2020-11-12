import React from 'react';
import {Nav} from 'react-bootstrap';
import s from './Categories.module.css'

const Categories = () => {
    return (
        <Nav variant="pills" className={'justify-content-around'} >
            <Nav.Item >
                <Nav.Link href="/home" className={s.item}>Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1" className={s.item}>Option 2</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2" className={s.item}>Option 2</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-3" className={s.item}>Option 2</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-4" className={s.item}>Option 2</Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

export default Categories;
