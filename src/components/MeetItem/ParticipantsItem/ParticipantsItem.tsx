import React, {useState} from 'react';
import s from './ParticipantsItem.module.css'
import {Avatar, createStyles, Paper, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

export const Photoczka = 'https://scontent-waw1-1.cdninstagram.com/v/t51.2885-15/e35/61562943_165981037770760_3476157792246746001_n.jpg?_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_cat=104&_nc_ohc=Icu-KFG-m8QAX9yI_sw&_nc_tp=18&oh=e6849b567eea0180601720555957da24&oe=5FBB673A'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        large: {
            width: theme.spacing(8),
            height: theme.spacing(8),
        },
    }),
);


const ParticipantsItem = () => {
    const [focus, setFocus] = useState(false)
    const style = useStyles()
    return (
        <Paper elevation={focus ? 5 : 1} className={s.wrapp}
               onMouseOver={() => setFocus(true)}
               onMouseOut={() => setFocus(false)}
        >
            <div className={s.content}>
                <Avatar alt="Remy Sharp" className={style.large + ' ' + s.avatar} src={Photoczka}/>
                <div className={s.name}>Matti Kawecki</div>
                <div className={s.role}>Participant</div>
            </div>
        </Paper>
    );
};

export default ParticipantsItem;
