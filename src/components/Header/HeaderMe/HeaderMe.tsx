import React from 'react';
import s from './HeaderMe.module.css'
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {Avatar} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../../redux/userReducer";
import {NavLink} from "react-router-dom";
import {AppStateType} from "../../../redux/store";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        large: {
            width: theme.spacing(8),
            height: theme.spacing(8),
        }
    }),
);

export default function HeaderMe() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const img = useSelector<AppStateType, string>(state => state.user.userData.userImgPath)

    const dispatch = useDispatch()

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const onClickHandler = () => {
        dispatch(logOut())
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={s.wrapper}>
            <div className={s.btnWrapp}>
                <NavLink to={'/createMeet'} className={s.link}>
                    <Button variant="outlined"
                            color="secondary"
                            className={s.createBtn}
                    >
                        Create MeetUp
                    </Button>
                </NavLink>
            </div>
            <div className={s.meWrapp}>
                <Avatar alt="Remy Sharp" className={classes.large + ' ' + s.avatar} src={img}/>
                <div className={classes.root}>
                    <div className={s.btnWrapp}>
                        <Button
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            className={s.iconBtn}
                        >
                            <FontAwesomeIcon className={s.icon} icon={faAngleDown}/>
                        </Button>
                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({TransitionProps, placement}) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList autoFocusItem={open} id="menu-list-grow"
                                                      onKeyDown={handleListKeyDown}>
                                                <NavLink to={'/myProfile'} className={s.link}>
                                                    <MenuItem onClick={handleClose}>
                                                        My Profile
                                                    </MenuItem>
                                                </NavLink>
                                                <NavLink to={'/myMeetUps'} className={s.link}>
                                                    <MenuItem onClick={handleClose}>
                                                        My meetUps
                                                    </MenuItem>
                                                </NavLink>
                                                <MenuItem onClick={onClickHandler}>Logout
                                                </MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                </div>
            </div>
        </div>
    );
}

