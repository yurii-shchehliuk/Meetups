import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './MeetingList.module.css'
import MeetingItem from "./MeetingItem/MeetingItem";
import {Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getList, MeetUpResponseDataType, SortState} from "../../redux/meetUpsListReduser";
import {AppStateType} from "../../redux/store";
import {NavLink} from "react-router-dom";
import {getMeTC} from "../../redux/userReducer";
import {Breadcrumbs, Button, FormControlLabel, Input, Link} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {Pagination} from "@material-ui/lab";

const MeetingList = () => {
    const totalPages = useSelector<AppStateType, number>(state => state.meetUp.pageView.totalPages)
    const meets = useSelector<AppStateType, Array<MeetUpResponseDataType>>(state => state.meetUp.meetups)

    const [searchQuery, setSearchQuery] = useState('')
    const [sortState, setSortState] = useState<SortState>(0)
    const [isDescending, setIsDescending] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [activeBtn, setActiveBtn] = useState<SortState>(0)
    const [timerId, setTimerId] = useState<any>()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getList())
    }, [])

    const searchQueryHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setSearchQuery(value)
        clearTimeout(timerId)
        const id = setTimeout(() => {
            searchQueryClickHandler()
        }, 300)
        setTimerId(id)
    }

    const searchQueryClickHandler = () => {
        dispatch(getList(page, searchQuery, sortState, isDescending))
    }

    const titleFocusHandler = (value: SortState) => {
        setActiveBtn(0)
        setSortState(0)
        dispatch(getList(page, searchQuery, value, isDescending))
    }

    const dateFocusHandler = (value: SortState) => {
        setActiveBtn(1)
        setSortState(1)
        dispatch(getList(page, searchQuery, value, isDescending))

    }

    const cityFocusHandler = (value: SortState) => {
        setActiveBtn(2)
        setSortState(2)
        dispatch(getList(page, searchQuery, value, isDescending))
    }

    const isDescendingHandler = (isDescending: boolean) => {
        setIsDescending(isDescending)
        dispatch(getList(page, searchQuery, sortState, isDescending))
    }

    const pageChangeHandler = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        dispatch(getList(value, searchQuery, sortState, isDescending))
    };

    return (
        <div>
            <h1 className={s.h1}>All meetings</h1>
            <Container className={s.nav}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Input value={searchQuery} onChange={searchQueryHandler}/>
                    <FontAwesomeIcon icon={faSearch} className={s.search} onClick={searchQueryClickHandler}/>
                    <Button color={activeBtn === 0 ? "primary" : undefined}
                            variant={activeBtn === 0 ? "contained" : undefined}
                            onClick={() => titleFocusHandler(0)}
                    >
                        Title
                    </Button>
                    <Button color={activeBtn === 1 ? "primary" : undefined}
                            variant={activeBtn === 1 ? "contained" : undefined}
                            onClick={() => dateFocusHandler(1)}
                    >
                        MeetupDate
                    </Button>
                    <Button color={activeBtn === 2 ? "primary" : undefined}
                            variant={activeBtn === 2 ? "contained" : undefined}
                            onClick={() => cityFocusHandler(2)}
                    >
                        City
                    </Button>

                    <FormControlLabel style={{margin: 0}}
                                      control={<Switch size="small" checked={isDescending}
                                                       onChange={() => isDescendingHandler(!isDescending)}/>}
                                      label="DESC"
                    />
                </Breadcrumbs>
                <Pagination count={totalPages} color="primary" page={page} onChange={pageChangeHandler}/>
            </Container>
            <Container className={s.list}>
                {meets.map(item => {
                    return (
                        <NavLink to={'/meetUp/' + item.id} className={s.link} style={{textDecoration: 'none'}}>
                            <MeetingItem
                                id={item.id}
                                title={item.title}
                                city={item.city}
                                description={item.description}
                                meetupImgPath={item.meetupImgPath}
                                meetupDate={item.meetupDate}
                                createdByUser={item.createdByUser}
                                joined={item.joined}
                                users={item.users}
                            />
                        </NavLink>
                    )
                })}
            </Container>
        </div>
    );
};

export default MeetingList;
