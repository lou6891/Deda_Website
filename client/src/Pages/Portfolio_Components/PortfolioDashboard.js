import React from 'react';
import classes from '../../Components/Layout_elements/Cards_types/Card.module.css'
import Cart_Sections from '../../Components/Layout_elements/Cards_types/Cart_Sections'

function PortfolioDashboard() {


    return (
        <section id='Dashboard'>
            <Cart_Sections>

                <main className={classes.main}>

                    <h2 className={classes.h2}>

                        Portfolio Dashboard

                    </h2>


                    <p className={classes.p}>

                        Number of NFT collected
                        <br />
                        Number of collections
                        <br />
                        Portfolio Value
                        <br />
                        Gains / losses
                        <br />
                        Standard Dev
                        <br />
                        Correlation
                        <br />
                        Sharp Ration (and historical one)
                        <br />
                        Top 10 by value (and what % they make up)
                        <br />
                        Biggest 10 losses ( think about current or also past trades)
                        <br />
                        Average holding period x NFT
                        <br />
                        Starts about holding of collections (do it on a calendar)
                        <br />
                        Longest hold
                        <br />
                        Gains/loss by period (i.e.: in a calendar)
                        <br />
                        Total royalties paid
                        <br />
                        Pie chart in ETH or USD what percentage each collection gives to total value?


                    </p>


                </main>
            </Cart_Sections>
        </section>
    )
}

export default PortfolioDashboard