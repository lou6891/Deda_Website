import React , {useEffect, useRef, useState}from 'react';
import '../App.css'
import classes from "./About_Components/About.module.css";
import WorkInProgress from "./About_Components/WorkInProgress";
import Mission from "./About_Components/Mission";
import WhatIsThis from "./About_Components/WhatIsThis";
import GoToTop from "../Components/Layout_elements/GoToTop";
import Footer from "../Components/Footer/Footer";
import Background_generator from "../Components/background/background_generator";
import {internalLayoutPadding} from "../Components/Global_variables";


function About () {

    // App sizes and background elements -------------------------------------------------------------------------------
    const [divHeight, setDivHeight] = useState(0);
    const [divWidth, setDivWidth] = useState(0);
    const ref = useRef(null);
    // This sets the max with of all the elements inside the card section
    //const [cardContainerWidth, setCardContainerWidth] = useState(null)
    useEffect(() => {
        function updateSize() {
            setDivHeight(ref.current.offsetHeight);
            setDivWidth(ref.current.offsetWidth);
            //setCardContainerWidth(ref_card.current.offsetWidth);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [ref]);

    return (
        <div className={"app_internal_wrapper"}>
            <section id={"background"}>
                <Background_generator divHeight ={divHeight} divWidth={divWidth} key={Math.random()}></Background_generator>
                <section id={"app"} ref={ref}  style={{height : "100vh"}}>
                    <section id={"page-wrap"}>
                        <section id={"internal_layout"} >
                            {/*
                            <Vision/>
                            <Mission/>
                            */}
                            <WhatIsThis/>
                            <WorkInProgress/>
                        </section>
                    </section>
                    <GoToTop/>
            </section>
                <Footer/>
            </section>
        </div>
    );

}

export default About;