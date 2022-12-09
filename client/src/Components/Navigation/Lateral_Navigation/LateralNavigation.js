import React from 'react';
import classes from "./LaterlNavigation.module.css"
import '../../../App.css'
import {HashLink as Link} from "react-router-hash-link";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

function LateralNavigation({components, isLateralMenuOpen, setIsLateralMenuOpen, lateralMenuWidth}) {
    //console.log("lateral_navigation",  props)
    //const [activeRow, setActiveRow] = React.useState(null)

    //console.log("lateral menu app", divWidth)

    //const active_color = "var(--blueColor)"
    //const active_border_color = "var(--redColor)"
    const icon = isLateralMenuOpen ? <KeyboardDoubleArrowLeftIcon/> : <KeyboardDoubleArrowRightIcon/>



    const scrollWithOffset  = (el) => {
        const element = document.getElementById(el.id);
        element.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
        });

    }



            return (

                <section className={classes.div} style={{maxWidth : "300px" , width : lateralMenuWidth + "px"}}>

                    <nav className={classes.header}>

                        <ul className={classes.sidebarList}>

                            <button
                                className={classes.open_close_button}
                                onClick={() => setIsLateralMenuOpen(!isLateralMenuOpen)}
                            >
                                <div style={{width: "100%"}}>
                                    {icon}
                                </div>
                            </button>

                            {components.map((card) => {
                                return (

                                    <li key={card.ID}>

                                        <Link
                                            className={classes.row}
                                            smooth to={card.Address}
                                        >
                                            <div className={classes.row_icon} >
                                                {card.icon ? card.icon : "not found"}
                                            </div>


                                            {
                                                isLateralMenuOpen ?
                                                    <div className={classes.row_txt}
                                                         >
                                                        {card.Name}
                                                    </div>
                                                    : ""
                                            }


                                        </Link>
                                    </li>
                                )
                            })}

                        </ul>
                    </nav>
                </section>

            );

}

export default LateralNavigation;

//onClick={() => {
//                                                   setActiveRow(card.ID);
//                                               }}
//style={{color: activeRow === card.ID ? active_color : "",}}

//console.log("elementPosition", elementPosition)
//const yCoordinate = el.getBoundingClientRect().top +  window.pageYOffset;
//window.scrollTo({top: elementPosition + yOffset, behavior: "smooth"});

//const yCoordinate = el.getBoundingClientRect().top +  window.pageYOffset;
//window.scrollTo({top: yCoordinate + yOffset, behavior: "smooth"});

//document.getElementById("app_internal_wrapper").scrollTo({top: elementPosition + yOffset, behavior: "smooth"});
//const topOfElement = document.querySelector(el.id).offsetTop - yOffset;
//const elementPosition = document.getElementById(el.id).offsetTop
//console.log("elementPosition", elementPosition)
//window.scrollTo({top: elementPosition + yOffset, behavior: "smooth"});



/*
smooth to={card.Address}
                                          scroll={el => {scrollWithOffset(el)}}
                                          elementId={card.address ? "active" : ""}

  scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })}
                                            scroll={el => scrollWithOffset (el)}


 <div className={classes.row_icon}>
                                            {card.icon ? card.icon : "not found"}
                                        </div>

                                        <div className={classes.row_txt} >
                                            {card.Name}
                                        </div>
 */
