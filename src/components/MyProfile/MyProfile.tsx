import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {useFormik} from "formik";
import {createMeetUpTC} from "../../redux/meetUpsListReduser";
import {NavLink, Redirect, RouteComponentProps, withRouter} from "react-router-dom";
import s from "./MyProfile.module.css";
import {createStyles, FormGroup, Grid, Input, Snackbar, TextField, Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {
    deleteProfile,
    editUserDataTC,
    getMeTC,
    MeDataType,
    setUserDataIsEdited,
    UserDataType
} from "../../redux/userReducer";
import {Alert} from "@material-ui/lab";

type FormikErrorType = {
    email?: string,
    userName?: string,
    password?: string,
    description?: string,
    birthDay?: string,
    userImgPath?: string
}

export type EditedUserDataType = {
    email: string,
    userName: string,
    password: string,
    description: string,
    birthDay: string,
    userImgPath: string
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }),
);

const MyProfile = (props: RouteComponentProps) => {
    const dispatch = useDispatch()

    const me = useSelector<AppStateType, UserDataType>(state => state.user.userData)
    const isUserDataEdited = useSelector<AppStateType, boolean>(state => state.user.isEdited)
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

    useEffect(() => {
        dispatch(getMeTC())
    }, [])


    const classes = useStyles();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: me.email,
            userName: me.userName,
            password: me.password,
            description: me.description,
            birthDay: me.birthDay,
            userImgPath: me.userImgPath
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (values.description.length < 20) {
                errors.description = 'Description must be at least 20 symbols';
            }
            return errors;
        },
        onSubmit: (values) => {
            debugger
            dispatch(editUserDataTC(values))
        },
    })

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setUserDataIsEdited(false));
    };

    const deleteHandler = () => {
        dispatch(deleteProfile())
    }


    if (!isAuth) {
        return <Redirect to={'/login'}/>
    }

    return (
        <section className={s.wrapp}>
            <Grid container
                  direction={'column'}
                  justify="center"
                  alignItems={'center'}>
                <h1>My Profile</h1>
                <form onSubmit={formik.handleSubmit} className={s.form}>
                    <FormGroup>

                        <Input id={'email'}
                               type={'text'}
                               placeholder={'Insert email'}
                               {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ?
                            <div style={{color: 'red', marginTop: '5px'}}>{formik.errors.email}</div> : null}
                        <Input id={'userName'}
                               type={'text'}
                               placeholder={'Insert UserName'}
                               {...formik.getFieldProps('userName')}
                        />
                        {formik.errors.userName ?
                            <div style={{color: 'red', marginTop: '5px'}}>{formik.errors.userName}</div> : null}
                        <Input id={'userImgPath'}
                               type={'text'}
                               placeholder={'Insert image url'}
                               {...formik.getFieldProps('userImgPath')}
                        />

                        {formik.values.userImgPath && <div className={s.imgWrapp}>
                            <img src={formik.values.userImgPath} alt={''}/>
                        </div>}

                        <TextField
                            id="description"
                            placeholder="Insert description"
                            multiline
                            variant="outlined"
                            className={s.descr}
                            {...formik.getFieldProps('description')}
                        />
                        {formik.errors.description ?
                            <div style={{color: 'red', marginTop: '5px'}}>{formik.errors.description}</div> : null}
                        <TextField
                            id="datetime-local"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...formik.getFieldProps('birthDay')}
                        />
                        <Input id={'password'}
                               type={'password'}
                               placeholder={'Insert newPassword'}
                               {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password ?
                            <div style={{color: 'red', marginTop: '5px'}}>{formik.errors.password}</div> : null}
                        {formik.errors.birthDay ?
                            <div style={{color: 'red', marginTop: '5px'}}>{formik.errors.birthDay}</div> : null}
                        <Button className={s.btn} type={'submit'} variant={'contained'} color={'primary'}>Edite
                            Profile</Button>
                        <NavLink to={'/'} className={s.link}>
                            <Button onClick={() => props.history.goBack()} className={s.btn} variant={'contained'}
                                    color={'secondary'}>
                                Get back
                            </Button>
                        </NavLink>
                        <NavLink to={'/'} className={s.link}>
                            <Button onClick={deleteHandler} className={s.btn} variant={'outlined'}
                                    color={'secondary'}>
                                Delete Profile
                            </Button>
                        </NavLink>
                    </FormGroup>
                </form>
            </Grid>
            <Snackbar open={isUserDataEdited} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    User was updated! :)
                </Alert>
            </Snackbar>
        </section>

    );
};

export default withRouter(MyProfile);
