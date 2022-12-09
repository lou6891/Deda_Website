import React from 'react';
import Cart_Sections from "../../Components/Layout_elements/Cards_types/Cart_Sections";
import classes from "../../Components/Layout_elements/Cards_types/Card.module.css";

function WhatIsThis(){
    return (
        <Cart_Sections>
            <main className={classes.main} >

                <h2 className={classes.h2}>
                    What Is This?
                </h2>

                <p className={classes.p}>
                    Deda was born to help NFTs people to track and manage what they own.
                    It's a tool build for collectors from a collector.
                    That's all to it, a clean, simple and precise tool
                    for all the people who believe NFTs are more than PNGs.
                </p>
            </main>
        </Cart_Sections>
    );
}

export default WhatIsThis;