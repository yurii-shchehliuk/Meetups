import React from 'react';
import "./Auth.module.css"
import wave from '../../assets/images/wave.png';
import welcome from "../../assets/images/regWelcome.svg";
import loginPic from "../../assets/images/loginBigPic.svg"
import RegisterForm from '../../Forms/RegisterForm/RegisterForm';
import LoginForm from '../../Forms/LoginForm/LoginForm';
import s from './Auth.module.css'
import { LinearProgress } from '@material-ui/core';


type AuthPropsType = {
    variant: 'login' | 'register'
}

const Auth = (props: AuthPropsType) => {
    return (
        <div className=''>
            <LinearProgress />
            <img className={s.wave} src={wave} alt={''}/>
            <div className={s.container}>
                <div className={s.img}>
                    <img src={props.variant === 'login' ? loginPic : welcome} alt={''}/>
                </div>
                <div className={s.loginContent}>
                    {props.variant === 'login' ? <LoginForm/> : <RegisterForm/>}
                </div>
            </div>
        </div>
    );
};

export default Auth;
