import React from 'react';
import classes from '../../../Components/Layout_elements/Cards_types/Card.module.css'
import Cart_Sections from '../../../Components/Layout_elements/Cards_types/Cart_Sections'

function Collection_loading_screen () {


    return  (
        <section id='warning'>
            <Cart_Sections>
                <main className={classes.main} style={{width : "100%"}}>

                    <h1 className={classes.h1} style={{textAlign : "center"}}>

                        Please select a collection from the dropdown above
                    </h1>


                </main>
            </Cart_Sections>
        </section>
    )
}

export default Collection_loading_screen