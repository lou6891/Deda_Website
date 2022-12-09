import React from 'react';
import classes from './Card.module.css'

function Cart_Sections(props) {
    return (
        <div className={classes.card_sections}>
            {props.children}
        </div>
    );
}

export default Cart_Sections;