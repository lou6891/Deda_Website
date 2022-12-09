import React from 'react';
import {useLocation} from "react-router-dom";
import {Link} from "react-router-dom";
import classes from "./MainNavigation.module.css";
import {BsFillSunFill} from 'react-icons/bs'
import {BsFillMoonFill} from 'react-icons/bs'
import {Header_pages_index} from "./Header_pages_index"
import {FiMenu} from "react-icons/fi"



function Header_main ({switchTheme, themes, appSizes, setIsMenuOpen, isMenuOpen, activePage ,setActivePage, fullWidth}){

    const routePath = useLocation();
    const iconColor = themes === "light" ? "black" : "white"
    const greenColor = "var(--greenColor)"



    const ThemeButtonHandler = ()=>{
        const ThemeIcon = themes === 'dark' ? <BsFillSunFill size={40} color={"white"}/> : <BsFillMoonFill size={35}/>;
        return (
            <button className={classes.themeButton} onClick={() =>{switchTheme()}}>
                {ThemeIcon}
            </button>
        )
    }



    const MenuIconHandler = () =>{
        const MenuIcon = <FiMenu size={40} color={iconColor}/>

        return(
            <button className={classes.themeButton}
                    onClick={() =>{ setIsMenuOpen(!isMenuOpen); }}

            >
                {MenuIcon}
            </button>
        )
    }


    return (
        <header  className={classes.header} >
            <section style={{display : "flex",width : "100%"}}>
                <div style={{marginTop : "3px"}}>
                    <p className={classes.logo} style={{color : greenColor, marginLeft : fullWidth ? "4rem" : "1rem"}}>
                        DEDA
                        {/*logo of the website*/}
                    </p>
                    <p className={classes.beta} style={{color : greenColor, marginLeft : fullWidth ? "4rem" : "1rem"}}>
                        beta
                    </p>
                </div>


            { fullWidth ?
                <nav >
                    <ul style={{justifyContent : "center", }}>
                        {Header_pages_index.map((page)=>{
                            if(page.visible){
                                return(
                                    <li onClick={ () => { setActivePage(page.Active)}} key={page.name}>
                                        <Link to={page.to} >
                                            {/* to specifies where the link should take us, in this case the main page*/}
                                            {/* We use Link in react (different from HTML) to not make a request to the Database)*/}
                                            {/*  <p style={{color : activePage === page.Active ? greenColor : ""}}>*/}
                                            <p >
                                                {page.name}
                                            </p>
                                        </Link>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </nav>
                : ""}

            <div style={{marginLeft: "auto",  order: 2, marginRight : fullWidth ? "4rem" : "1rem", display : "flex", alignItems : "center"}}>
                { fullWidth ?
                    ThemeButtonHandler()
                    : MenuIconHandler()}
            </div>
            </section>
            </header>
    );


/*
    MainNavigation.propTypes = {
        theme: theme.propTypes,
        setTheme: setTheme.propTypes,
    };*/
}

export default Header_main;

/*
OLD
return (

            <header  className={classes.header} >
                <div className={classes.logo} style={{color : greenColor}}>
                DEDA

</div>

<nav>
    <ul >
        <li onClick={ () => { setActivePage("Portfolio");}}>
            <Link to="/Portfolio" >

                <p style={{color : activePage === "Portfolio" ? greenColor : ""}}>
                    Portfolio
                </p>
            </Link>
        </li>

        <li onClick={ () => setActivePage("Collections") } >
            <Link to="/Collections">
                <p style={{color : activePage === "Collections" ? greenColor : ""}}>
                    Collections
                </p>
            </Link>
        </li>

        <li onClick={ () => setActivePage("About") }>
            <Link to="/About">
                <p style={{color : activePage === "About" ? greenColor : ""}}>
                    About Us
                </p>
            </Link>
        </li>
    </ul>
</nav>
<div>
    <button className={classes.themeButton} onClick={() =>{switchTheme()}}>
        {icon}
    </button>


</div>
</header>

);
 */