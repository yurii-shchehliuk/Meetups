import {Avatar, Paper} from '@material-ui/core';
import React, {useEffect} from 'react';
import {Container} from 'react-bootstrap';
import s from './MeetItem.module.css';
import ParticipantsItem from "./ParticipantsItem/ParticipantsItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons/faClock";
import Button from "@material-ui/core/Button";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getMeetUpItem} from "../../redux/meetUpReducer";
import {AppStateType} from "../../redux/store";
import {MeetUpResponseDataType} from "../../redux/meetUpsListReduser";

const img = 'https://secure.meetupstatic.com/photos/event/a/8/4/e/highres_486643086.jpeg'

const participants = Array(1, 13, 123, 1, 231, 23, 1231, 32, 123, 12)

export type PathParamType = {
    meetUpId: string
}

const MeetItem = (props: RouteComponentProps<PathParamType>) => {
    const dispatch = useDispatch()
    let meetId = props.match.params.meetUpId

    const meetUpItem = useSelector<AppStateType, MeetUpResponseDataType>(state => state.meetUpItem)

    useEffect(() => {
        dispatch(getMeetUpItem(meetId))
    }, [])
    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <Container>
                    <div className={s.date}><span>{meetUpItem.meetupDate}</span></div>
                    <h3 className={s.title}>{meetUpItem.title}</h3>
                    <div className={s.author}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                        <div className={s.authorInfo}>
                            <div className={s.host}>Hosted by</div>
                            <div className={s.name}>Marodi Mykhailo</div>
                        </div>
                    </div>
                </Container>
            </div>
            <section className={s.main}>
                <Container>
                    <div className={s.mWrapper}>
                        <div className={s.left}>
                            <img className={s.mainImg} src={meetUpItem.meetupImgPath} alt={''}/>
                            <h4 className={s.LTitle}>Details</h4>
                            <p className={s.LInfo}>
                                {meetUpItem.description}
                            </p>
                            <div className={s.participantsWrapp}>
                                <div className={s.PHeader}>
                                    <h4 className={s.PTitle}>Participants <span>(20)</span></h4>
                                    <div className={s.all}>See all</div>
                                </div>
                                <div className={s.participants}>
                                    {meetUpItem.users.map(item => {
                                        return <ParticipantsItem/>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className={s.right}>
                            <div className={s.rightWrapper}>
                                <Paper elevation={3} className={s.paper}>
                                    <div className={s.meet}>
                                        <img className={s.smallImg} src={meetUpItem.meetupImgPath} alt={''}/>
                                        <div className={s.meetInfo}>
                                            <div className={s.meetName}>{meetUpItem.title}</div>
                                            <div className={s.meetType}>Открытая группа</div>
                                        </div>
                                    </div>
                                </Paper>
                                <Paper elevation={3} className={s.paper}>
                                    <div className={s.meet}>
                                        <FontAwesomeIcon icon={faClock} className={s.timeIcon}/>
                                        <div className={s.meetInfo}>
                                            <div className={s.meetName}>{meetUpItem.meetupDate}</div>
                                            <div className={s.meetType}>19:00 до 21:00 GMT+1</div>
                                        </div>
                                    </div>
                                    <Button variant="outlined"
                                            color="secondary"
                                            className={s.joinBtn}>
                                       Join
                                    </Button>
                                </Paper>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default withRouter(MeetItem);
