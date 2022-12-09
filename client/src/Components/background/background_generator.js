import React from 'react';
import {Background_images_index} from "./Background_images_index"
import { IconContext } from "react-icons";

function Background_generator({divHeight, divWidth, fullWidth}){

    const img_width = 45
    const row_padding = 10
    const img_padding = 9
    const percentage_color_toBlack = 1
    const range_of_icons = fullWidth ? [18, 23] : [23,28]
    const n_icons = 20

    const justifyContentOptions = [
        "space-around",
        "space-evenly",
        "space-between",
    ]


    const color_array_modified = () =>{
        /*
        const colors = [
            "var(--greenColor)",
            "var(--redColor)",
            "var(--blueColor)",
            "var(--yellowColor)",
        ]

         */
        const colors = [
            "var(--greyColor)",
        ]

        let value = Math.round((colors.length / percentage_color_toBlack) - colors.length)
        while (value > 0){ colors.push("black"); value -- }
        return colors
    }


    const Icons_columns = () =>{ return  Math.floor( (divWidth / ((img_width) + (row_padding * 2))) ) }

    const Icons_rows = () =>{
        const array = []
        const max_number_icons = Math.floor(( divHeight / img_width))

        let i = Math.floor(Math.random() * (range_of_icons[1] - range_of_icons[0] +1 ) + range_of_icons[0])
        const colors = color_array_modified()

        if(i > max_number_icons){ i =  max_number_icons }

        while (i > 0){
            array.push({
                index : Math.floor((Math.random() * (Background_images_index.length ))),
                color :  colors[Math.round(Math.random() * (colors.length - 1))]
            })
            i--
        }
        return array
    }


    const randomJustifyContent = () => {return justifyContentOptions[Math.floor((Math.random() * (justifyContentOptions.length)))]}

    return(
        <section id={"IconBackground_div"} >
            {
                <div id={"big_container"} style={{ height : divHeight, display: "flex", flexDirection : "row", justifyContent : "space-between"}}>
                    {
                        [...Array(Icons_columns())].map((value, index) =>

                            <div id={"background_icons_columns"}
                                 style={{padding : row_padding.toString() + "px", justifyContent: randomJustifyContent(), maxHeight : divHeight}} key={index}
                            >

                                {Icons_rows().map((obj) => {
                                        //console.log(obj)
                                        return (
                                            <IconContext.Provider value={{
                                                color: obj.color,
                                                size: img_width.toString() + "px",
                                                style: {verticalAlign: 'middle', padding: img_padding.toString() + "px"}
                                            }}>
                                                <div key={obj.index + index +  Math.random()}>
                                                    {Background_images_index[obj.index].source}
                                                </div>
                                            </IconContext.Provider>
                                        )
                                })}

                            </div>
                        )

                    }

                </div>

            }

        </section>


    )
}
export default Background_generator