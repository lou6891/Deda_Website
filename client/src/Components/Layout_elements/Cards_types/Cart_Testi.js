import React from 'react';
import classes from './Card.module.css'

function Cart_testi(props) {
    return (
        <div className={classes.card_testi}>
            {props.children}
        </div>
    );
}

export default Cart_testi;