import React, {useEffect, useRef, useState} from 'react';
import useLocalStorage from 'use-local-storage'
import {Routes, Route} from 'react-router-dom'; /*defines different paths depending on URL*/

/*importing all the pages we created*/
import Portfolio from "./Pages/Portfolio";
import Collections from "./Pages/Collections";
import About from "./Pages/About";
import Header_main from "./Components/Navigation/Header_and_Menu/Header_main";
import Mobile_menu from "./Components/Navigation/Header_and_Menu/Mobile_menu"

import './App.css'
import './index.css'
import CookiesBanner from "./Pages/CookiesBanner";

//Sets on which chain the connect wallet will work, 1 = ETH Mainet

const connectors = {
    injected: {}
};

function App() {

    //COOKIES ----------------------------------------------------------------------------------------------------------
    const [openCookies, setOpenCookies] = useLocalStorage('cookies', true)
    //const [openCookies, setOpenCookies] = React.useState(true); //For dev purposes

    // APP SIZES -------------------------------------------------------------------------------------------------------
    const [appSizes, setAppSizes] = React.useState(0)
    const ref = React.useRef(null);

    React.useEffect(() => {

        const setSizes = async ()=>{
            await setAppSizes({width  : ref.current.offsetWidth, height : ref.current.offsetHeight });
        }
        setSizes().catch(console.error)

    },[openCookies]);


    //DARK MODE---------------------------------------------------------------------------------------------------------

    // Theme toggle, use local storage enables to save the choice in the browser of the user
    const [theme, setTheme] = useLocalStorage('theme', 'light'  )
    const switchTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }
    /*Data-theme sets the css part of the theme. If light use root (default) if dark use data-theme*/

    //------------------------------------------------------------------------------------------------------------------
    // Manges the active page and the header menu format between full width and not
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [activePage, setActivePage] = React.useState(null)
    const [fullWidth, setFullWidth] = React.useState(false)

    React.useEffect(()=>{
        if(appSizes && appSizes["width"] ){
            if(appSizes["width"] < 1020){
                setFullWidth(false)
            }
            else if(appSizes["width"] >= 1020 && appSizes["width"] < 1436){
                setFullWidth(true)

            }
            else if(appSizes["width"] >= 1436){
                setFullWidth(true)
            }
        }
    },[appSizes])

    const internalLayoutPadding = [ "25px 45px",  "25px 10px"]


    return (
            <div className='App' data-theme = {theme} ref = {ref}  data-width={fullWidth}>

                <Header_main switchTheme = {switchTheme}
                             themes = {theme}
                             appSizes={appSizes}
                             setIsMenuOpen={setIsMenuOpen}
                             isMenuOpen={isMenuOpen}
                             activePage={activePage}
                             setActivePage={setActivePage}
                             fullWidth={fullWidth}/>

                {isMenuOpen ? <Mobile_menu setIsMenuOpen={setIsMenuOpen}
                                           isMenuOpen={isMenuOpen}
                                           activePage={activePage}
                                           setActivePage={setActivePage}
                                           themes = {theme}
                                           switchTheme = {switchTheme}
                                           appSizes={appSizes}
                /> : ""}

                <Routes>
                    {/*sends the theme function and constant to the navigation component because the button is there*/}
                    <Route path="/" element={
                        <Collections
                            themes = {theme}
                            appSizes={appSizes}
                            internalLayoutPadding={internalLayoutPadding}
                            fullWidth={fullWidth}
                        />}
                    />
                    {/* in the new version of React is equal to switch*/}

                    {/* string after the domain, to direct the user on the right page
                          In the new version of react the component is element={...} */}

                    {/*
                    <Route path = '/Portfolio'  element={<Portfolio themes = {theme}
                                                                    appSizes={appSizes}
                                                                    isMenuOpen={isMenuOpen}
                                                                    internalLayoutPadding={internalLayoutPadding}
                                                                    fullWidth={fullWidth}
                    />}/>
                    */}

                    <Route path='/Collections'  element={<Collections themes = {theme}
                                                                      appSizes={appSizes}
                                                                      internalLayoutPadding={internalLayoutPadding}
                                                                      fullWidth={fullWidth}
                    />}/>
                    <Route path ='/About'  element={<About/>}/>
                </Routes>

                <CookiesBanner open={openCookies} setOpen={setOpenCookies}/>
            </div>
  );
}

export default App;



/*

<MainNavigation switchTheme = {switchTheme} themes = {theme}/>
                <Routes>
                -----------
                <Route path="/" element={<Portfolio />} />
                ---------------------
                <Route path = '/Portfolio/Dashboard'  element={<Portfolio />}/>
                    <Route path='/Collections'  element={<Collections themes = {theme} />}/>
                    <Route path ='/About'  element={<About />}/>
</Routes>







<ThirdwebProvider desiredChainId={"1"}
            connectors = {connectors}>
            <div className='App' data-theme = {theme} >

<MainNavigation switchTheme = {switchTheme} themes = {theme}/>
<Routes>

    <Route path="/" element={<Portfolio />} />

    <Route path = '/Portfolio/Dashboard'  element={<Portfolio />}/>
    <Route path='/Collections'  element={<Collections />}/>
    <Route path ='/About'  element={<About />}/>
</Routes>

</div>
</ThirdwebProvider>
 */
