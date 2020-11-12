import React from 'react';
import s from './Header.module.css'
import SearchForm from "../../Forms/SearchForm/SearchForm";
import {Button} from 'react-bootstrap';
import HeaderMe from "./HeaderMe/HeaderMe";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";

const logo = 'https://events.com/wp-content/uploads/2019/11/Events_Primary_Logo-scaled.png'

const Header = () => {

    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

    return (
        <header className={s.wrapper}>
            <div className={s.logoWrap}>
                <NavLink to={'/'} className={s.link}><img className={s.logo} src={logo} alt={'logo'}/></NavLink>
            </div>
            <div className={s.searchWrap}>
                <SearchForm/>
            </div>

            {isLoggedIn
                ? <div className={s.menuWrapp}>
                    <HeaderMe/>
                </div>
                : <div className={s.btnWrap}>
                    <Button variant={"outline-primary"}>Sign in</Button>
                    <Button variant={"outline-success"}>Login</Button>
                </div>
            }
        </header>
    );
};

export default Header;
