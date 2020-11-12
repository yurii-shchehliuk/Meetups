import React, {useEffect} from 'react';
import s from './EditMeetUp.module.css'
import {Formik, useFormik} from "formik";
import {createStyles, FormControl, FormGroup, Grid, Input, TextField, Theme} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {editMeetUp, editMeetUpTC, MeetUpResponseDataType} from "../../redux/meetUpsListReduser";
import {getMeetUpItem} from "../../redux/meetUpReducer";
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';
import {PathParamType} from "../MeetItem/MeetItem";

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

const img = 'https://secure.meetupstatic.com/photos/event/a/8/4/e/highres_486643086.jpeg'


type FormikErrorType = {
    title?: string,
    description?: string,
    meetupDate?: string,
    city?: string,
    meetupImgPath?: string
}

export type EditedValueType = {
    title: string
    description: string
    meetupDate: string
    city: string
    meetupImgPath: string
}

const EditMeetUp = (props: RouteComponentProps<PathParamType>) => {
    const dispatch = useDispatch()
    let meetId = props.match.params.meetUpId

    const meetUpItem = useSelector<AppStateType, MeetUpResponseDataType>(state => state.meetUpItem)
    const isEdited = useSelector<AppStateType, boolean>(state => state.meetUp.isEdited)
    useEffect(() => {
        dispatch(getMeetUpItem(meetId))
    }, [])

    const classes = useStyles();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: meetUpItem.title,
            description: meetUpItem.description,
            meetupDate: meetUpItem.meetupDate,
            city: meetUpItem.city,
            meetupImgPath: meetUpItem.meetupImgPath
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.title) {
                errors.title = 'Required';
            } else if (values.title.length < 6) {
                errors.title = 'Title must be at least 6 symbols'
            }

            if (!values.description) {
                errors.description = 'Description is Required';
            } else if (values.description.length < 20) {
                errors.description = 'Description must be at least 20 symbols';
            }
            if (!values.meetupDate) {
                errors.meetupDate = 'Required';
            }
            if (!values.city) {
                errors.city = 'Required';
            }
            return errors;
        },
        onSubmit: (values:EditedValueType) => {
            dispatch(editMeetUpTC(meetId, values))
            debugger
        },
    })

    if(isEdited){
        return <Redirect to={'/myMeetUps'}/>
    }

    return (
        <section className={s.wrapp}>
            <Grid container
                  direction={'column'}
                  justify="center"
                  alignItems={'center'}>
                <h1>Edit MeetUp </h1>
                <form onSubmit={formik.handleSubmit} className={s.form}>
                    <FormGroup>

                        <Input id={'title'}
                               type={'text'}
                               placeholder={'Insert title'}
                               {...formik.getFieldProps('title')}
                        />
                        {formik.errors.title ?
                            <div style={{color: 'red', marginTop: '5px'}}>{formik.errors.title}</div> : null}
                        <Input id={'meetupImgPath'}
                               type={'text'}
                               placeholder={'Insert image url'}
                               {...formik.getFieldProps('meetupImgPath')}
                        />

                        {formik.values.meetupImgPath && <div className={s.imgWrapp}>
                            <img src={formik.values.meetupImgPath} alt={''}/>
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
                        <Input id={'city'}
                               type={'text'}
                               placeholder={'Insert city'}
                               {...formik.getFieldProps('city')}
                        />
                        {formik.errors.city ?
                            <div style={{color: 'red', marginTop: '5px'}}>{formik.errors.city}</div> : null}
                        <TextField
                            id="datetime-local"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...formik.getFieldProps('meetupDate')}
                        />
                        {formik.errors.meetupDate ?
                            <div style={{color: 'red', marginTop: '5px'}}>{formik.errors.meetupDate}</div> : null}
                        <Button className={s.btn} type={'submit'} variant={'contained'} color={'primary'}>Edit
                            meetUp</Button>
                    </FormGroup>
                </form>
            </Grid>
        </section>
    );
};

export default withRouter(EditMeetUp);
