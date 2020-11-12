import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Auth from "./components/Auth/Auth";
import {useDispatch, useSelector} from "react-redux";
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import {Container} from 'react-bootstrap';
import Slider from "./components/Slider/Slider";
import MeetingList from "./components/MeetingList/MeetingList";
import MeetItem from "./components/MeetItem/MeetItem";
import CreateMeet from "./components/CreateMeet/CreateMeet";
import {LinearProgress} from "@material-ui/core";
import {AppStateType} from "./redux/store";
import {RequestStatusType} from "./redux/appReducer";
import {getMeTC} from "./redux/userReducer";
import MyMeetUps from "./components/MyMeetUps/MyMeetUps";
import EditMeetUp from "./components/EditMeetUp/EditMeetUp";
import MyProfile from "./components/MyProfile/MyProfile";


function App() {
    const dispatch = useDispatch()
    const appStatus = useSelector<AppStateType, RequestStatusType>(state => state.app.status)
    useEffect(() => {
        dispatch(getMeTC())
    }, [])
    return (
        <div>
            <Route exact path={['/', '/createMeet', '/myMeetUps','/meetUp','/editMeetUp','/myProfile']}
                   render={() => <Header/>}/>
            {appStatus === 'loading' && <LinearProgress/>}
            <Switch>
                <Route exact path={'/register'}
                       render={() =>
                           <Auth variant={'register'}/>
                       }
                />
                <Route exact path={'/login'}
                       render={() =>
                           <Auth variant={'login'}/>
                       }
                />
                <Route exact path={'/'}
                       render={() => <div>
                           <Container>
                               <Categories/>
                           </Container>
                           <Slider/>
                           <MeetingList/>
                       </div>}
                />
                <Route exact path={'/createMeet'}
                       render={() =>
                           <CreateMeet/>
                       }
                />
                <Route exact path={'/editMeetUp/:meetUpId'}
                       render={() =>
                           <EditMeetUp/>
                       }
                />
                <Route exact path={'/myMeetUps'}
                       render={() => <MyMeetUps/>}
                />
                <Route exact path={'/myProfile'}
                       render={() => <MyProfile/>}
                />
                <Route exact path={'/meetUp/:meetUpId?'} render={() => <MeetItem/>}/>
                <Route exact path={'/404'} render={() => <h1>404 Not found</h1>}/>
                <Redirect from={'*'} to={'/404'}/>
            </Switch>
        </div>
    );
}

export default App;
