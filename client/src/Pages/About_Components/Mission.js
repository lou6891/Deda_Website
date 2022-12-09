import React from 'react';
import Cart_Sections from "../../Components/Layout_elements/Cards_types/Cart_Sections";
import classes from "../../Components/Layout_elements/Cards_types/Card.module.css";

function Mission(){
    return (
        <Cart_Sections>
            <main className={classes.main}>

                <h2 className={classes.h2}>
                    Mission
                </h2>

                <p className={classes.p}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer ullamcorper velit vel lectus malesuada feugiat.
                    Curabitur sit amet suscipit dui. Suspendisse potenti.
                    Nullam tempor orci ac egestas egestas.
                    Donec leo felis, bibendum et laoreet tempus, maximus eget lectus.
                    Aliquam ornare convallis tincidunt.
                    Nam interdum ipsum quis eros hendrerit, accumsan mollis sem tempus. Nulla facilisi.

                    Etiam rhoncus egestas congue.
                    Cras sodales ullamcorper aliquam. Fusce sed odio quis est placerat commodo.
                    Nam sagittis, orci nec pellentesque interdum, nunc arcu porttitor tellus, at volutpat risus purus non augue.
                    Curabitur tristique feugiat sem at porta.
                    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                    Phasellus maximus mauris quis magna tincidunt accumsan.
                    Aliquam in neque rutrum, suscipit lacus in, scelerisque nunc.
                    Sed nisi elit, congue sit amet rhoncus ac, pulvinar sed velit.
                    Mauris dignissim eu nisl a egestas. Donec dui lacus, semper non libero sit amet, vehicula semper sapien.
                </p>
            </main>
        </Cart_Sections>
    );
}

export default Mission;