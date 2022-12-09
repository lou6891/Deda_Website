import React from 'react';
import Cart_Sections from '../../Components/Layout_elements/Cards_types/Cart_Sections'
import classes from '../../Components/Layout_elements/Cards_types/Card.module.css'

function PortfolioFloor () {




    return  (
        <section id='Floor'>
        <Cart_Sections>
            <main className={classes.main}>

                    <h2 className={classes.h2}>
                   Portfolio Floor
                    </h2>

                    <p className={classes.p}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Integer ullamcorper velit vel lectus malesuada feugiat.
                Curabitur sit amet suscipit dui. Suspendisse potenti.
                Nullam tempor orci ac egestas egestas.
                Donec leo felis, bibendum et laoreet tempus, maximus eget lectus.
                Aliquam ornare convallis tincidunt.
                Nam interdum ipsum quis eros hendrerit, accumsan mollis sem tempus. Nulla facilisi.

                    </p>

            </main>
        </Cart_Sections>
        </section>
    )
}

export default PortfolioFloor;