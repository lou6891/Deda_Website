import React from 'react';
import classes from './Footer.module.css'

function Footer() {
    return(
        <section className={classes.footer} style={{display : "flex", flexDirection : "column"}}>
            <p style={{fontSize : "7px"}}>
                <br/>
            </p>

            <p className={classes.p} style={{textAlign : "center", width : "100%"}}>
                DEDA
                <br/>
                Copyrights October 2022
            </p>

        </section>
    );
}

export default Footer;

/*
style={{zIndex : 9}}
 */