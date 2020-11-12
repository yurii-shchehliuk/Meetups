import React, {useState} from 'react';
import avatar from "../../assets/images/avatar.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import {faExclamationCircle, faLock} from "@fortawesome/free-solid-svg-icons";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {Redirect} from 'react-router-dom';
import s from '../../components/Auth/Auth.module.css'
import {AppStateType} from "../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/authReducer";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {Switch} from "formik-material-ui";
import {getMeTC} from "../../redux/userReducer";


type InitialValuesFormikType = {
    email: string
    password: string
    check: boolean
}

const initialValues = {
    email: '',
    password: '',
    check: true,
}

const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).max(8).required(),
})

const LoginForm = () => {
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

    const dispatch = useDispatch();

    const [focus, setFocus] = useState<any>({
        email: false,
        password: false,
    })
    const [value, setValue] = useState<any>({
        email: '',
        password: ''
    })

    const onFocusHandler = (e: any) => {
        setFocus({
            ...focus,
            [e.currentTarget.name]: true

        })
    }

    const onBlurHandler = (e: any) => {
        setFocus({
            ...focus,
            [e.currentTarget.name]: false
        })
        setValue({
            ...value,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    const onSubmit = (values: InitialValuesFormikType) => {
        dispatch(login(values.email, values.password, values.check))
    }

    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return (
        <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
            <div className={s.loginContent}>
                <Form id="reg__form">
                    <img src={avatar} alt={''}/>
                    <h2 className={s.title}>Welcome</h2>
                    <div
                        className={(focus.email || !!value.email) ? `${s.inputDiv} ${s.one} ${s.focus}` : `${s.inputDiv} ${s.one}`}>
                        <div className={s.i}>
                            <FontAwesomeIcon className={s.fas} icon={faUser}/>
                        </div>
                        <div className={s.div}>
                            <h5>Email</h5>
                            <Field type="email"
                                   className={s.input}
                                   name="email"
                                   onFocus={onFocusHandler}
                                   onBlur={onBlurHandler}
                            />
                            {/*<FontAwesomeIcon className="fas fa-check-circle" icon={faCheckCircle}/>*/}
                            {/*<FontAwesomeIcon className="fas fa-exclamation-circle" icon={faExclamationCircle}/>*/}
                            <ErrorMessage name='email'>{
                                errorMessage => <span className={s.reg__error}>{errorMessage}</span>
                            }</ErrorMessage>
                        </div>
                    </div>

                    <div
                        className={(focus.password || !!value.password) ? `${s.inputDiv} ${s.pass} ${s.focus}` : `${s.inputDiv} ${s.pass}`}>
                        <div className={s.i}>
                            <FontAwesomeIcon className={s.fas} icon={faLock}/>
                        </div>
                        <div className={s.div}>
                            <h5>Password</h5>
                            <Field type="password"
                                   className={s.input}
                                   name="password"
                                   onFocus={onFocusHandler}
                                   onBlur={onBlurHandler}
                            />
                            {/*<FontAwesomeIcon className="fas fa-check-circle" icon={faCheckCircle}/>*/}
                            {/*<FontAwesomeIcon className="fas fa-exclamation-circle" icon={faExclamationCircle}/>*/}
                            <ErrorMessage name='password'>{
                                errorMessage => <span className={s.reg__error}>{errorMessage}</span>
                            }</ErrorMessage>
                        </div>
                    </div>
                    <div className={s.rememberMe}>
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Field component={Switch} type="checkbox" name="check"/>}
                        />
                    </div>
                    {/*<a href="#">Forgot Password?</a>*/}
                    <button type="submit" className={s.btn}>Submit</button>
                    <button className={s.btn} onClick={() => {
                        return <Redirect to={'/register'}/>
                    }}>Registration
                    </button>
                </Form>
            </div>
        </Formik>
    );
};


export default LoginForm;
