import React from 'react';
import Cart_Sections from '../../Components/Layout_elements/Cards_types/Cart_Sections'
import classes from '../../Components/Layout_elements/Cards_types/Card.module.css'

function PortfolioHolders () {

    const name = "Holders"

    return  (
        <section id='Holders'>
        <Cart_Sections>
            <main className={classes.main}>

                    <h2 className={classes.h2}>
                   Portfolio Holders
                    </h2>
                    <div>

                        <p className={classes.p} style={{position : "relative"}}>
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

                Aliquam euismod est vel interdum pellentesque.
                Maecenas feugiat neque justo, non porttitor nunc venenatis ac.
                Duis imperdiet, ante sit amet scelerisque scelerisque, risus risus dictum ante, id dignissim enim justo ut nisi.
                Integer sed tincidunt neque. Morbi malesuada at mauris sed mattis.
                Vivamus in magna non ex congue venenatis et nec orci. Nullam fermentum ut lorem a fermentum.
                In pharetra molestie augue, in euismod justo.
                Quisque tempus neque eget velit auctor, et accumsan lorem bibendum.
                Sed eleifend eros scelerisque faucibus venenatis.
                Proin nisi quam, rhoncus ut elementum quis, rhoncus vel augue.

                Cras euismod dui eget hendrerit convallis. Nam sed tempor eros.
                Nunc non sapien convallis, mattis magna quis, facilisis eros.
                Fusce tempus vehicula interdum. Morbi imperdiet dolor eu congue sagittis.
                Aliquam fringilla vitae nulla ut mollis.
                Praesent eros nisl, iaculis id tincidunt ut, mattis id sapien.

                Aenean laoreet ipsum a leo egestas, quis rhoncus ligula egestas.
                Mauris ultrices enim nisl, id feugiat mauris luctus quis.
                Vivamus est quam, semper in turpis vitae, lobortis aliquet felis.
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                In hac habitasse platea dictumst. Ut consequat urna a turpis euismod, vehicula sodales justo hendrerit.
                Sed mattis nisi metus, et dictum nulla dapibus id.
                Phasellus et est consectetur, pretium turpis eu, bibendum libero.
                Donec convallis ante nec ipsum posuere, vitae condimentum tellus sollicitudin.
                Aenean eget est elit. Curabitur rhoncus felis ut libero fringilla pharetra.
                    </p>
                    </div>


            </main>
        </Cart_Sections>
        </section>
    )
}

export default PortfolioHolders;