import React from 'react';
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import {FaRegCopy} from "react-icons/fa";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import DoneIcon from '@mui/icons-material/Done';

export default function Copy_button({textToCopy, color}) {

    const [Clicked, setClicked] = React.useState(false);

    const handleSetClickClose = ()=>{
        setClicked(false)
        console.log(Clicked)
    }
    const handleSetClickOpen = ()=>{
        setClicked(true)
        console.log(Clicked)
    }

    return (
            <ClickAwayListener onClickAway={handleSetClickClose}>
                <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 300 }}
                    onClose={handleSetClickClose}
                    title={<React.Fragment>
                        {Clicked ? <DoneIcon fontSize={"extra-small"}/> : "Copy"}
                    </React.Fragment>}>

                    <button type={"button"} style={{backgroundColor : "transparent", marginLeft : "1rem", border : "none", display : "flex", cursor:"pointer", color: color}}
                            onClick={() => {navigator.clipboard.writeText(textToCopy.toLowerCase()); handleSetClickOpen()}}>
                        <FaRegCopy/>
                    </button>

                </Tooltip>
            </ClickAwayListener>
)
}




