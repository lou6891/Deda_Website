import React , {useEffect, useState,useRef} from 'react';
import {internalLayoutPadding} from "../Components/Global_variables"

import PortfolioDashboard from "./Portfolio_Components/PortfolioDashboard";
import PortfolioFloor from "./Portfolio_Components/PortfolioFloor";
import PortfolioHolders from "./Portfolio_Components/PortfolioHolders";
import PortfolioVolume from "./Portfolio_Components/PortfolioVolume";

import LateralNavigation from "../Components/Navigation/Lateral_Navigation/LateralNavigation";
import GoToTop from '../Components/Layout_elements/GoToTop'
import {PortfolioPagesIndex} from "./Portfolio_Components/PortfolioPagesIndex";


import Footer from "../Components/Footer/Footer";
import Background_generator from "../Components/background/background_generator";
import {CollectionsPagesIndex} from "./Collections_Components/CollectionsPagesIndex";


function Portfolio({themes, appSizes, isMenuOpen}){

    // App sizes and background elements -------------------------------------------------------------------------------
    const [divHeight, setDivHeight] = useState(0);
    const [divWidth, setDivWidth] = useState(0);
    const ref = useRef(null);
    useEffect(() => {
        function updateSize() {
            setDivHeight(ref.current.offsetHeight);
            setDivWidth(ref.current.offsetWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    // Set lateral menu visible or not
    const [lateralMenuVisible, setLateralMenuVisible] = React.useState(false)
    const [isLateralMenuOpen, setIsLateralMenuOpen] = React.useState(false)
    React.useEffect(()=>{
        if(divWidth < 1020){
            setLateralMenuVisible(false)
            setIsLateralMenuOpen(false)
        }
        else if(divWidth >= 1020 && divWidth < 1436){
            setLateralMenuVisible(true)
            setIsLateralMenuOpen(false)
        }
        else if(divWidth >= 1436){
            setLateralMenuVisible(true)
            setIsLateralMenuOpen(false)
        }

    },[divWidth])

    const [lateralMenuWidth, setLateralMenuWidth] = React.useState((65+ 25))
    React.useEffect(()=>{
        if(isLateralMenuOpen){
            // if lateral menu is open
            // Set the total width of the lateral menu, 220px from css roo + padding (25 * 2)
            setLateralMenuWidth((220 + 25))
        }
        else if(!isLateralMenuOpen){
            // if lateral menu is closed
            // Set the total width of the lateral menu, 60px from css roo + padding (25 * 2)
            if(lateralMenuVisible){
                setLateralMenuWidth((60 +25))
            }
            else if(!lateralMenuVisible){
                setLateralMenuWidth(0)
            }

        }
        //console.log("Use effect", "isLateralMenuOpen", isLateralMenuOpen, "Lateral Menu width", lateralMenuWidth)

    },[isLateralMenuOpen,lateralMenuVisible])
    const InternalLayoutMaxWidth = divWidth - lateralMenuWidth



    return (
        <div id={"app_internal_wrapper"} >
           <section id={"background"}>

               <Background_generator divHeight ={divHeight} divWidth={divWidth}/>
               <section id={"app"} ref={ref} >

                   {lateralMenuVisible ?
                       <section id={"lateral_nav_section"}>
                           <LateralNavigation
                               components = {PortfolioPagesIndex}
                               divWidth={divWidth}
                               isLateralMenuOpen={isLateralMenuOpen}
                               setIsLateralMenuOpen={setIsLateralMenuOpen}
                               lateralMenuWidth={lateralMenuWidth}/>
                       </section> : ""}

                    <section id={"page-wrap"}>
                        <section id={"internal_layout"} style={{
                            maxWidth : InternalLayoutMaxWidth,
                            padding : divWidth > 1020 ? internalLayoutPadding[0] : internalLayoutPadding[1],}}
                        >

                            <PortfolioDashboard />
                            <PortfolioHolders />
                            <PortfolioFloor />
                            <PortfolioVolume />

                        </section>

                    </section>

                    <GoToTop/>

                </section>
           </section>
            <Footer/>

        </div>

    );
}

export default Portfolio;


/*

                   <LateralNavigation components={PortfolioPagesIndex} appSizes={null}/>


               <Icon_background divHeight ={divHeight} divWidth={divWidth}></Icon_background>

before testing with icons
return (
        <div id={"app_internal_wrapper"}>

                <section id={"app"} >
                    <LateralNavigation Page_name = {PortfolioPagesIndex}/>
                    <section id={"page-wrap"}>
                        <InternalLayout>
                            <PortfolioDashboard />
                            <PortfolioHolders />
                            <PortfolioFloor />
                            <PortfolioVolume />

                        </InternalLayout>

                    </section>

                    <GoToTop/>

                </section>
            <Footer/>

        </div>

    );






<div id={"app_internal_wrapper"}>

            <div id={"lol"} >
                <Icon_background/>

                <div id={"app"} >
                    <LateralNavigation Page_name = {PortfolioPagesIndex}/>
                    <section id={"page-wrap"}>
                        <InternalLayout>
                            <PortfolioDashboard />
                            <PortfolioHolders />
                            <PortfolioFloor />
                            <PortfolioVolume />

                        </InternalLayout>

                    </section>

                    <GoToTop/>

                </div>

            </div>

            <Footer/>

        </div>




<section id={"app"}>

                <LateralNavigation Page_name = {PortfolioPagesIndex}/>

                <section id={"page-wrap"}>
                    <InternalLayout>
                        <PortfolioDashboard />

                    </InternalLayout>

                </section>

                <GoToTop/>
            </section>

            <Footer/>
 */