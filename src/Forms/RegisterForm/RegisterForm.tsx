import React, {useState} from 'react';
import avatar from "../../assets/images/avatar.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import {faCloudUploadAlt, faEnvelope, faExclamationCircle, faLock} from "@fortawesome/free-solid-svg-icons";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {register} from "../../redux/authReducer";
import s from "../../components/Auth/Auth.module.css"
import {AppStateType} from "../../redux/store";
import {Redirect} from 'react-router-dom';


export type RegisterFormDataType = {
    username: string
    email: string
    password: string
    password2: string

}

type InitialValuesFormikType = {
    username: string
    email: string
    password: string
    password2: string
}

const initialValues = {
    username: '',
    email: '',
    password: '',
    password2: ''
}

const validationSchema = Yup.object({
    username: Yup.string().min(4, 'Too short').max(25, 'Too long').required('required'),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).max(8).required(),
    password2: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must be equals').required()
})

const RegisterForm = () => {
    const isRegister = useSelector<AppStateType, boolean>(state => state.auth.isRegister)
    const dispatch = useDispatch()
    const [focus, setFocus] = useState<any>({
        username: false,
        email: false,
        password: false,
        password2: false
    })
    const [value, setValue] = useState<any>({
        username: '',
        email: '',
        password: '',
        password2: ''
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
        dispatch(register(values.username, values.email, values.password, values.password2))
    }

    if (isRegister) {
        return <Redirect to={'/login'}/>
    }
    return (
        <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
            <Form id="reg__form">
                {/*<div className={s.avatarWrapp}>*/}
                {/*    <label className={s.regImg} htmlFor={"fileInput"}>*/}
                {/*        <img  src={avatar} alt={''}/>*/}
                {/*        <div className={s.avatarIcon}>*/}
                {/*            <FontAwesomeIcon icon={faCloudUploadAlt}/>*/}
                {/*        </div>*/}
                {/*        <input id={"fileInput"} className={s.fileInput} type={'file'}/>*/}
                {/*    </label>*/}
                {/*</div>*/}
                <img src={avatar} alt={''}/>
                <h2 className={s.title}>Waiting for you</h2>
                <div
                    className={(focus.username || !!value.username) ? `${s.inputDiv} ${s.one} ${s.focus}` : `${s.inputDiv} ${s.one}`}>
                    <div className={s.i}>
                        <FontAwesomeIcon className={s.fas} icon={faUser}/>
                    </div>
                    <div className={s.div}>
                        <h5>Username</h5>
                        <Field type="text"
                               className={s.input}
                               name="username"
                               onFocus={onFocusHandler}
                               onBlur={onBlurHandler}
                        />
                        {/*<FontAwesomeIcon className="fas fa-check-circle" icon={faCheckCircle}/>*/}
                        {/*<FontAwesomeIcon className="fas fa-exclamation-circle" icon={faExclamationCircle}/>*/}
                        <ErrorMessage name='username'>{
                            errorMessage => <span className={s.reg__error}>{errorMessage}</span>
                        }</ErrorMessage>
                    </div>
                </div>

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

                <div
                    className={(focus.password2 || !!value.password2) ? `${s.inputDiv} ${s.pass} ${s.focus}` : `${s.inputDiv} ${s.pass}`}>
                    <div className={s.i}>
                        <FontAwesomeIcon className={s.fas} icon={faLock}/>
                    </div>
                    <div className={s.div}>
                        <h5>Password check</h5>
                        <Field type="password"
                               className={s.input}
                               name="password2"
                               onFocus={onFocusHandler}
                               onBlur={onBlurHandler}
                        />
                        {/*<FontAwesomeIcon className="fas fa-check-circle" icon={faCheckCircle}/>*/}
                        {/*<FontAwesomeIcon className="fas fa-exclamation-circle" icon={faExclamationCircle}/>*/}
                        <ErrorMessage name='password2'>{
                            errorMessage => <span className={s.reg__error}>{errorMessage}</span>
                        }</ErrorMessage>
                    </div>

                </div>
                <button onClick={() => {
                }} type="submit" className={s.btn}>Submit
                </button>
            </Form>
        </Formik>
    );
};


export default RegisterForm;
