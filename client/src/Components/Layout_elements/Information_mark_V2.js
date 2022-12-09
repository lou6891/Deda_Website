import React from 'react';
import Tooltip from "@mui/material/Tooltip";
import {withStyles} from '@mui/styles';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import {AiOutlineInfoCircle} from 'react-icons/ai';

export default function InformationQuestionmarkV2({textToCopy, fullWidth}) {
    const [open, setOpen] = React.useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: 'var(--backgroundColorPrimary)',
            color: 'var(--text-primary)',
            maxWidth: 100,
            border: '1px dashed black',
        },
    }))(Tooltip);

    if(fullWidth){
        return(
            <HtmlTooltip
                title={
                    <React.Fragment>
                        <p style={{textAlign : "center"}}>
                            {textToCopy}
                        </p>
                    </React.Fragment>}
            >
                <span>
                    <AiOutlineInfoCircle size= "24px"/>
                </span>

            </HtmlTooltip>
        )
    }
    else if(!fullWidth){
        return(
            <ClickAwayListener onClickAway={handleTooltipClose}>
                <div>
                    <HtmlTooltip
                        title={
                            <React.Fragment>
                                <p style={{textAlign : "center"}}>
                                    {textToCopy}
                                </p>
                            </React.Fragment>}
                        open={open}
                        onClose={handleTooltipClose}
                    >
                <span>
                    <AiOutlineInfoCircle onClick={handleTooltipOpen} style={{cursor : "pointer"}} size= "24px"/>
                </span>

                    </HtmlTooltip>
                </div>
            </ClickAwayListener>
        )
    }
}
