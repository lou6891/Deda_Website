import React from 'react';
import Cart_Sections from "../../Components/Layout_elements/Cards_types/Cart_Sections";
import classes from "../../Components/Layout_elements/Cards_types/Card.module.css";

function WorkInProgress(){
    return (
        <Cart_Sections>
            <main className={classes.main} style={{justifyItems : "center", width : "100%"}}>

                <h2 className={classes.h2} style={{textAlign : "center", width : "100%"}}>
                    This website is a work in progress that is still a beta.
                    <br/>
                    Everything you see is build with the best care and love,
                    however bugs are evil, and hard to find and fix.
                </h2>
            </main>
        </Cart_Sections>
    );
}

export default WorkInProgress;