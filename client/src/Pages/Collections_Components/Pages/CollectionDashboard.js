import React from 'react';
import classes from '../../Pages.module.css'
import {mainPadding} from "../../../Components/Global_variables"
import {FaRegCopy} from "react-icons/fa";

import Card_sections from '../../../Components/Layout_elements/Cards_types/Cart_Sections'
import LanguageIcon from '@mui/icons-material/Language';
import Tooltip from "@mui/material/Tooltip"
import Fade from '@mui/material/Fade';
import Copy_button from "../../../Components/Layout_elements/Copy_button";

function CollectionDashboard ({ themes, DashboardData, fullWidth}) {


    /*
    const [DashboardData, setDashboardData] = React.useState()
    React.useEffect(() => {
        async function fetchCollections() {
            const data = await Collection_call(selectedIndex,"Dashboard","collection_description", null)
            setDashboardData(data)
        }
        fetchCollections()
    },[selectedIndex]);

     */


    // Tests if the data from the parent component have arrived, if yes assigns them to the data array

    let description_data = DashboardData
    const itemPadding = fullWidth ? "10px" : "2px"
    const logosPadding = fullWidth ? "10px" : "5px"
    const statsContainerGridStyle = fullWidth ? {gridTemplateColumns : "20% 20% 20% 20% 20%" , gridTemplateRows : "auto"}
        : {gridTemplateColumns : "33% 33% 33%", gridTemplateRows : "auto auto"}

    //const royaltiesContainerGridStyle = fullWidth ? {gridTemplateColumns : "auto auto" , gridTemplateRows : "auto"}
    //    : {gridTemplateColumns : "auto", gridTemplateRows : "auto auto"}
    //console.log("DashboardData", description_data)

    function number_rounder (value){
        let number

        if(typeof value !== "number"){
            number = parseInt(value)
        }
        else{
            number = value
        }

        if(number === 1000){
            number = (number / 1000).toString()
            value = number.slice(0,1) + "K"
        }
        else if(number > 1000 && number < 10000){
            number = (number / 1000).toString()
            value = number.slice(0,2) + "K"
        } else if (number >= 10000 && number < 100000){
            number = (number / 1000).toString()
            value = number.slice(0,2) + "K"
        } else if (number === 100000){
            number = (number / 1000).toString()
            value = number.slice(0,3) + "K"
        }

        return value

    }

    // ----------------- SVG TEST ------------------------------------------------------------------------------
    //const test = "Tw_logo_black.svg"
    //<img src={test}></img> svg are possible

    const etherscan_logo = themes === 'dark' ? "etherscan-logo-light-circle.png" : "etherscan-logo-circle.png";
    const twitter_logo = themes === 'dark' ? "Twitter_logo_white.png" : "Twitter_logo_black.png";
    const discord_logo = themes === 'dark' ? "discord_logo_white.png" : "discord_logo_black.png";
    const website_icon = themes === 'dark' ? <LanguageIcon style={{ fontSize: 40 , color : "white", }}/> : <LanguageIcon style={{ fontSize: 40 , color : "black"}}/>;

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };



    //                                    Receiving fee address  {description_data.royalties.recipient.toLowerCase().slice(0,8)}...{description_data.royalties.recipient.toLowerCase().slice(description_data.royalties.recipient.length - 10)}
    //                            {description_data.address.toLowerCase().slice(0,8)}...{description_data.address.toLowerCase().slice(description_data.address.length - 10)}
    return  (
        <section id='Dashboard' className={classes.componentsContainer}>
            <Card_sections >
                {/*--------------------------FARE UN MODULO ESTERNO CON TUTTE LE COE BELLE-------------------------- */}
                {/*If data are not present*/}
                {description_data ? "" :
                    <main className={classes.main} style={{padding : fullWidth ? mainPadding[0] : mainPadding[1] , width: "100%"}}>
                        <p style={{width : "100%", textAlign : "center"}} className={classes.p}>
                            The data are coming!
                            <br/>
                            Please wait a few seconds
                        </p>
                    </main>
                }
                {/*-------------------------------------------------------------------------------------------------- */}

                {/*If the data are present display this*/}
                {!description_data ? "" :
                <main className={classes.main} style={{padding : fullWidth ? mainPadding[0] : mainPadding[1], width: "100%"}}>
                    <h1 className={classes.h1} >
                        {description_data.name}
                    </h1>

                    {/*DIV that contains the address - -------------------------------------------------------------*/}
                    {/* */}
                    <div className={classes.address_div} >
                        <Tooltip
                            title={"hello"}>
                            <h2 className={classes.h2}
                                style={{
                                    display : "inline-block" ,
                                    wordBreak : "break-all",
                                    textAlign : "center",
                                    }}
                                onClick={()=>console.log("helloooo from dashboard address")}
                            >
                                {description_data["address"].toLowerCase()} <FaRegCopy/>
                                {/*
                                {fullWidth ?
                                    description_data["address"].toLowerCase()
                                    : description_data["address"].toLowerCase().slice(0,8) + "..." + description_data.address.toLowerCase().slice(-10)}
                                    */}
                            </h2>
                        </Tooltip>
                        {/*
                        <Copy_button textToCopy={description_data.address.toLowerCase()} color={"limegreen"}/>
                        */}
                    </div>

                    {/* THis will be activated only if the device is small contains the image*/}
                    {fullWidth ?
                        "" :
                        <section  style={{width: "content-box",  padding : itemPadding, textAlign : "center"}}>
                            <img src={description_data.image_url} alt={"Collection_image"} className={classes.image} />
                        </section>}

                    <div className={classes.main_container}>

                        {fullWidth ?
                        <section  style={{width: "content-box", padding : itemPadding}}>
                            <img src={description_data.image_url} alt={"Collection_image"} className={classes.image}
                                 style={{border: "0.08rem dashed",}}/>
                            <br/>
                        </section>
                            : ""}


                    <section  style={{width: "100%", padding : itemPadding}}>

                        {/* Logos */}
                        <div className={classes.logos_div} style={{padding : logosPadding}}>
                            <Tooltip
                                TransitionComponent={Fade}
                                TransitionProps={{ timeout: 300 }}
                                title="Etherscan Page">
                                <img src={etherscan_logo}
                                     alt={"etherscan"}
                                     onClick={()=> openInNewTab("https://etherscan.io/address/" + description_data.address)}
                                     className={classes.logos}
                                />
                            </Tooltip>

                            <Tooltip
                                TransitionComponent={Fade}
                                TransitionProps={{ timeout: 300 }}
                                title="Twitter page">
                                <img
                                    src={twitter_logo}
                                    alt={"twitter"}
                                    onClick={()=> openInNewTab("https://twitter.com/" + description_data["twitter_username"])}
                                    className={classes.logos}
                                />

                            </Tooltip>

                            <Tooltip
                                TransitionComponent={Fade}
                                TransitionProps={{ timeout: 300 }}
                                title="Discord channel">
                                <img src={discord_logo}
                                     alt={"discord"} onClick={()=>
                                    openInNewTab(description_data["discord_url"])}
                                     className={classes.logos}/>

                            </Tooltip>

                            <Tooltip
                                TransitionComponent={Fade}
                                TransitionProps={{ timeout: 300 }}
                                title="Website">
                                <button className={classes.logos}
                                        onClick={()=> openInNewTab(description_data["website_url"])}
                                        style={{display : "flex"}} >
                                    {website_icon}
                                </button>
                            </Tooltip>


                        </div>

                        {/*Collections stats floor, volume and holders*/}
                        <div className={classes.stats_container}
                             style={statsContainerGridStyle}>
                            <section className={classes.stats_card_wrapper}>
                                <p className={classes.stats_internal_div} >
                                    Items <br/> {number_rounder (description_data["token_count"])}
                                </p>
                            </section >
                            <section className={classes.stats_card_wrapper} >
                                <p className={classes.stats_internal_div} >
                                    Total Volume <br/> ...coming...
                                </p>
                            </section>
                            <section className={classes.stats_card_wrapper} >
                                <p className={classes.stats_internal_div} >
                                    Floor Eth <br/> {description_data["lowest_floor_price_eth"]}
                                </p>
                            </section>
                            <section className={classes.stats_card_wrapper} >
                                <p className={classes.stats_internal_div} >
                                    Owners <br/> {description_data["total_owners"]}
                                </p>
                            </section>
                            <section className={classes.stats_card_wrapper} >
                                <p className={classes.stats_internal_div}
                                   >
                                    Listed
                                    <br/>
                                    { (description_data["number_of_listings"] / parseInt(description_data["token_count"])).toFixed(2) } %
                                </p>
                            </section>
                            {fullWidth ? "" :
                                <section className={classes.stats_card_wrapper} >
                                    <p className={classes.stats_internal_div}>
                                        Royalties
                                        <br/>
                                        {description_data["royalties"] ? (Math.round(description_data["royalties"]["bps"] * 100) / 10000) + "%" : "..coming..."}
                                    </p>
                            </section>}
                        </div>


                        {/* ROYALTIES SECTION --------------------------*/}
                        <div className={classes.royalties_container} >

                            {fullWidth ?
                                <section className={classes.internal_royalties_section}>
                                    <p >
                                        Royalties&ensp;
                                        {fullWidth ? "" : <br/>}
                                        {description_data["royalties"] ? (Math.round(description_data["royalties"]["bps"] * 100) / 10000) + "%" : "..coming..."}
                                    </p>
                                </section>
                                : ""}

                            <section className={classes.internal_royalties_section} >
                                <p style={{fontSize : fullWidth ? "var(--pTextLarge)" : "var(--pTextSmall)", }}>
                                    Paid to&ensp;
                                    {fullWidth ? "" : <br/>}
                                    {!description_data["royalties"] ? "...Coming..." :
                                        <Tooltip
                                            TransitionComponent={Fade}
                                            TransitionProps={{ timeout: 300 }}
                                            title={description_data["royalties"]["recipient"]} >
                                            <span style={{ display : "inline-block",wordBreak: "break-word"}}>
                                                {description_data["royalties"]["recipient"].toLowerCase()}
                                            </span>
                                        </Tooltip>
                                    }


                                    {/*
                                    <Copy_button textToCopy={description_data["royalties"]["recipient"].toLowerCase()} color={"black"}/>
                                    */}

                                </p>
                            </section>
                        </div>

                    </section>
                    </div>

                    <section className={classes.description_section}>
                        <h3 className={classes.h3} style={{fontSize : fullWidth ? "var(--h3TextLarge)" : "var(--h3TextSmall)"}}>
                            Description:
                        </h3>
                        <p className={classes.p} >
                            {description_data.description}
                        </p>
                    </section>

                </main>
                }
            </Card_sections>
        </section>
    )
}

export default CollectionDashboard

/*
<div className={classes.royalties_container} style={royaltiesContainerGridStyle}>
                            {fullWidth ?
                                <section >
                                    <p >
                                        Royalties
                                        <br/>
                                        <div >
                                            {Math.round(description_data["royalties"]["bps"] * 100) / 10000}%
                                        </div>
                                    </p>

                                </section>
                                : ""}
                            <section >
                                <p >
                                    Paid to
                                    <br/>
                                    <div  style={{ display : "flex"}}>
                                        <Tooltip
                                            TransitionComponent={Fade}
                                            TransitionProps={{ timeout: 300 }}
                                            title={description_data["royalties"]["recipient"]} >
                                            <p style={{ display : "inline-block", wordBreak: "break-all"}}>
                                                {description_data["royalties"]["recipient"].toLowerCase()}
                                            </p>
                                        </Tooltip>
                                        <Copy_button textToCopy={description_data["royalties"]["recipient"].toLowerCase()} color={"black"}/>
                                    </div>
                                </p>
                            </section>
                        </div>


 */
