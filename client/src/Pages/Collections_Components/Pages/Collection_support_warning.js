import React from 'react';
import classes from '../../../Components/Layout_elements/Cards_types/Card.module.css'
import Cart_Sections from '../../../Components/Layout_elements/Cards_types/Cart_Sections'

function Collection_support_warning () {


    return  (
        <section id='warning'>
            <Cart_Sections>
                <main className={classes.main}>

                    <p className={classes.p}>
                        This collection is only partially supported by our systems
                        Would you like to have more info about it?
                    </p>


                </main>
            </Cart_Sections>
        </section>
    )
}

export default Collection_support_warning