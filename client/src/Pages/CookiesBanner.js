import React from "react"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import classes from "./Pages.module.css";

function CookiesBanner({open, setOpen}) {

    //console.log("cookies use local storage", open)

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                className={classes.cookiesDialog}

            >
                <h1 >
                    {"Annoying cookie banner"}
                </h1>

                <p >
                        This website used cookies to work properly.
                        <br/>No data collection of any kind
                        <br/>
                        <br/>In particular:
                        <br/>- Save settings (dark mode and cookies preferences)
                        <br/>- Make the website work at all (get screen size, atc..)
                        <br/>
                        <br/> Unfortunately must be accepted to use the site
                </p>

                <Button onClick={handleClose}>
                    Agree
                </Button>
            </Dialog>
        </div>
    );
}

export default CookiesBanner