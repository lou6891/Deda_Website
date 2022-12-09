import React from "react"
import {Link} from "react-router-dom";
import {Header_pages_index} from "./Header_pages_index"
//import classes from "../../../App.css"
import classes from "./MainNavigation.module.css"
import {BsFillMoonFill, BsFillSunFill} from "react-icons/bs";
import {CgClose} from "react-icons/cg"

export default function Mobile_menu ({isMenuOpen, setIsMenuOpen, activePage, setActivePage, themes, switchTheme,appSizes}){
    const iconColor = themes === "light" ? "black" : "white"

    const ThemeButtonHandler = ()=>{
        const ThemeIcon = themes === 'dark' ? <BsFillSunFill size={40} color={"white"}/> : <BsFillMoonFill size={35}/>;
        return (
            <button className={classes.mobile_menu_button} onClick={() =>{switchTheme()}}>
                {ThemeIcon}
            </button>
        )
    }

    // Sets the margin top and bottom to center the menu at the center of the screen
    const ref = React.useRef(null);
    const [menuHeight, setMenuHeight] = React.useState(0)
    React.useEffect(() => {
        setMenuHeight(ref.current.offsetHeight);
    }, [] );

    const marginsTop = ()=>{
        if(appSizes && appSizes["height"] && menuHeight){
            //console.log(menuHeight)
            return (appSizes["height"] - menuHeight ) / 2
        }
    }


    return(
        <section className={classes.mobile_menu} >
            <div className={classes.mobile_menu_wrapper} ref={ref} style={{top: marginsTop()}}>

                <nav>
                    <ul >

                        {Header_pages_index.map((page)=>{
                            if(page.visible){
                                return(
                                    <li onClick={ () => {
                                        setActivePage(page.Active);
                                        setIsMenuOpen(!isMenuOpen)
                                    }}
                                        key={page.name}
                                    >
                                        <Link to={page.to} >
                                            {/* to specifies where the link should take us, in this case the main page*/}
                                            {/* We use Link in react (different from HTML) to not make a request to the Databse)*/}
                                            <p style={{ textAlign: "center"}}>
                                                {page.name}
                                            </p>
                                        </Link>
                                    </li>
                                )
                            }

                        })}
                    </ul>
                </nav>

                {ThemeButtonHandler()}

                <button className={classes.mobile_menu_button} onClick={()=> setIsMenuOpen(!isMenuOpen)}>
                    <CgClose size ={45} color={iconColor} />
                </button>
            </div>
        </section>
    )
}