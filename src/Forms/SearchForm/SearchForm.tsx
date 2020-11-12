import React from 'react';
import s from './SearchForm.module.css'
import {Field, Form, Formik} from "formik";
import {text} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from "@fortawesome/free-solid-svg-icons";

type InitialValuesFormikType = {
    search: null | string
}

const initialValue: InitialValuesFormikType = {
    search: ''
}

const SearchForm = () => {
    const onSubmit = (value: InitialValuesFormikType) => {
        console.log(value)
    }
    return (
        <Formik initialValues={initialValue}
                onSubmit={onSubmit}>
            <Form className={s.form}>
                <Field type={text}
                       name={'search'}
                       className={s.input}
                />
               <button><FontAwesomeIcon icon={faSearch} className={s.icon}/></button>
            </Form>
        </Formik>
    );
};

export default SearchForm;
