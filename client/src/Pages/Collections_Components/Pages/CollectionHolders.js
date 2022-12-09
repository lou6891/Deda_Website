import React from 'react';
import classes from '../../Pages.module.css'
import {mainPadding, sliderHeight, sliderWidth} from "../../../Components/Global_variables"

import Cart_Sections from '../../../Components/Layout_elements/Cards_types/Cart_Sections'
import Holders_chart from "../../../Components/Charts/Collection/Collection_holders/Holders_chart"
import InformationQuestionmarkV2 from "../../../Components/Layout_elements/Information_mark_V2";
import Holders_distribution_chart from "../../../Components/Charts/Collection/Collection_holders/Holders_distribution_chart";
import BarChart_slider from "../../../Components/Charts/Slider_menu/BarChart_slider";
import LineChart_slider from "../../../Components/Charts/Slider_menu/LineChart_slider";
import PieChart_slider from "../../../Components/Charts/Slider_menu/PieChart_slider";

const information_index = [
    "This chart shows the number of holders though time",
    "This chart shows the number of holders and the number of NFTs they own",
    "THis number of holders  that own only 1 NFTs though time",
    "This chart shows list of the top owners of the collection",
]

function CollectionHolders ({ selectedIndex, themes, RecentData, graphHeight, fullWidth}) {
    //console.log("collection_owners", RecentData)
    const percTresholdForHolderDistrChart = 0.01
    let holders_data = []
    let holders_distribution = []
    let top_holders_balance = []


    if(RecentData){
        if(RecentData["top_holders_balance_array_txt"]){
            top_holders_balance = JSON.parse(RecentData["top_holders_balance_array_txt"])
            //const top_holders_balance =top_holders_balance_parsed.map((i)=> <li key={i.owner_address}>{i.owner_address}</li>)
        }
        if(RecentData["data"]) {
            RecentData["data"].map((i) => {
                let temp_data = JSON.parse(i["data_hourly_object_txt"])
                holders_data.push({...temp_data, timestamp: new Date(i["timestamp"])})
            })

            holders_data = holders_data.sort((a, b) => new Date(a["timestamp"]) - new Date(b["timestamp"]))
        }
        if(RecentData["holders_balance_graph_txt"]){
            let holders_distribution_parsed = JSON.parse(RecentData["holders_balance_graph_txt"])
            const N_owners = holders_data[holders_data.length - 1]["total_n_owners"]
            const temp_obj = {n_holders : 0, balance : 0}

            for (let obj of holders_distribution_parsed){

                if(obj["n_holders"] > (N_owners * percTresholdForHolderDistrChart)){
                    holders_distribution.push(obj)
                }
                else if (obj["n_holders"] < (N_owners * percTresholdForHolderDistrChart)){
                    temp_obj.n_holders = temp_obj.n_holders + obj.n_holders
                    if(temp_obj.balance === 0){temp_obj.balance = ">" + obj.balance.toString()}
                }
            }
            holders_distribution.push(temp_obj)
        }
    }

    const [Chart_to_display, setChart_to_display] = React.useState(1);
    const [OwnersChartTicks, setOwnersChartTicks] = React.useState(7);


    const change_graph_time = async (prop) => {
        if(prop === 7){setOwnersChartTicks(7)}
        else if(prop === 30){setOwnersChartTicks()}

    }

    // Handles which buttons are active on the screen after been clicked
    const [activeButtons, setActiveButtons] = React.useState(
        {
            timeButtons: null,
            sliderChartsSelector: 1,
        }
    )

    const handleButtonsState = async (target, value) =>{
        setActiveButtons( prevState => ({
            ...prevState,
            [target] : value
        }))
    }

    // Empty array for the holder list slider
    const emptyArray = fullWidth ? ["", "", "",] : ["", ""]

    // Container width for setting pie chart label
    const multipleChartsContainerRef = React.useRef(null)
    /*
    const [multipleChartsContainerWidth, setMultipleChartsContainerWidth] =  React.useState(null)
    React.useEffect(()=>{
        if(multipleChartsContainerRef){
            setMultipleChartsContainerWidth(multipleChartsContainerRef.current.offsetWidth)
        }
    }, [])

     */


    return  (
        <section id='Holders' className={classes.componentsContainer}>
            <Cart_Sections>
                {/*--------------------------FARE UN MODULO ESTERNO CON TUTTE LE COE BELLE-------------------------- */}
                {/*If data are not present*/}
                {RecentData ? "" :
                    <main className={classes.main} style={{padding : fullWidth ? mainPadding[0] : mainPadding[1] , width: "100%"}}>
                        <p style={{width : "100%", textAlign : "center"}}>
                            The data are coming!
                            <br/>
                            Please wait a few seconds
                        </p>
                    </main>
                }
                {/*-------------------------------------------------------------------------------------------------- */}
                {!RecentData ? "" :

                    <main className={classes.main} style={{ width : "100%" }}>

                        <section id={"mainElements"} style={{padding : fullWidth ? mainPadding[0] : mainPadding[1], width : "100%" }}>

                            <h1 className={classes.h1} style={{fontSize : fullWidth ? "var(--h1TextLarge)" : "var(--h1TextSmall)"}}>
                                Collection Holders
                            </h1>

                            <div className={classes.stats_container}  >
                                <section className={classes.stats_card_wrapper}>
                                    <div className={classes.stats_internal_div}>
                                        N of Holders <br/> ...Coming...
                                    </div>
                                </section>
                                <section className={classes.stats_card_wrapper}>
                                    <div className={classes.stats_internal_div}>
                                        Unique Holders <br/> ...Coming...
                                    </div>
                                </section >
                            </div>


                            {/* Collection Holders Chart - -------------------------------------------------------------*/}
                            <section  id="Holders_chart" style={{justifyItems : "center",  justifyContent : "center", marginTop : "10px", flexDirection : "row"}}>

                            {/* Title - -------------------------------------------------------------*/}
                            <div className={classes.title_and_info_button_div}>
                                <h3 className={classes.charts_titles }> Holders Chart </h3>

                                <div className={classes.information_mark}>
                                    <InformationQuestionmarkV2 fullWidth={fullWidth}
                                        textToCopy = {information_index[0]}
                                    />
                                </div>
                            </div>


                            {/* TIME SELECTOR BUTTONS ---------------------------------------------------------*/}
                            <div className={classes.chart_buttons_div}>
                                <button onClick={(e)=>{ change_graph_time(7) }} className={classes.chart_buttons_style}> 7d </button>
                                <button onClick={(e)=>{ change_graph_time(15)}} className={classes.chart_buttons_style}> 15d </button>
                                <button onClick={(e)=>{ change_graph_time(30)}} className={classes.chart_buttons_style}> 30d </button>
                                <button onClick={(e)=>{ change_graph_time(60)}} className={classes.chart_buttons_style}> 60d </button>
                                <button onClick={(e)=>{ change_graph_time(120)}} className={classes.chart_buttons_style}> 120d </button>
                                <button onClick={(e)=>{ change_graph_time(365)}} className={classes.chart_buttons_style}> 1Y </button>
                                <button onClick={(e)=>{ change_graph_time("MAX")}} className={classes.chart_buttons_style}> MAX </button>
                            </div>

                            <div className={classes.main_Chart}>
                                <Holders_chart themes={themes} Data={holders_data} selectedData={"total_n_owners"} graphHeight={graphHeight} fullWidth={fullWidth}/>
                            </div>

                        </section>

                        </section>

                        <section id={"secondaryElements"} style={{ width : "100%" ,}} >

                            {/* Chart scroller  part------------------------------------------------------------------------*/}
                            <section  style={{margin : fullWidth ? "20px 20px" : "20px 0px",
                                border : fullWidth ? "var(--cardsBorderSize) dashed var(--borderColor)" : 0,
                                borderRadius : "var(--secondaryBorderRadius)"
                            }} >

                                {/* SLIDER -------------------------------------------------------------------------------*/}
                                <section className={classes.scroller_section}
                                         style={{gridTemplateColumns: "0px repeat(3, var(--varScrollerChartsWidth)) 10px",
                                             borderTop : !fullWidth ? "var(--cardsBorderSize) dashed var(--borderColor)" : 0,}}
                                >

                                    <button  onClick={() => { setChart_to_display(1); handleButtonsState("sliderChartsSelector", 1 ) }}
                                             style={{
                                                 width : fullWidth ? sliderWidth[0] : sliderWidth[1],
                                                 height : fullWidth ? sliderHeight[0] : sliderHeight[1],
                                             }}
                                    >
                                        <p >
                                            Holders Distribution
                                        </p>

                                        <PieChart_slider themes={themes} />


                                    </button>
                                    <button  onClick={() => { setChart_to_display(2); handleButtonsState("sliderChartsSelector", 2 ) }}
                                             style={{
                                                 width : fullWidth ? sliderWidth[0] : sliderWidth[1],
                                                 height : fullWidth ? sliderHeight[0] : sliderHeight[1],
                                             }}
                                    >
                                        <p>
                                            Unique Holders
                                        </p>

                                        <LineChart_slider themes={themes} Data={holders_data} chartSelected={"n_unique_owners"}/>

                                    </button>
                                    <button
                                        onClick={() => { setChart_to_display(3); handleButtonsState("sliderChartsSelector", 3 ) }}
                                        style={{
                                            width : fullWidth ? sliderWidth[0] : sliderWidth[1],
                                            height : fullWidth ? sliderHeight[0] : sliderHeight[1],
                                        }}
                                    >
                                        <p >
                                            Holders List
                                        </p>

                                        <div style={{width : "100%", justifyContent : "center", padding : "5px", display : "flex", flexDirection : "column"}}>
                                            {emptyArray.map((i,index) => {
                                                    return (
                                                        <li key={index} style={{listStyle: "none", marginBottom : "7px"}}>
                                                            <section style={{maxWidth : "border-box" ,border : "1px dashed var(--borderColor)", borderRadius : "2px", padding : "2px", display:"grid" ,gridTemplateColumns : "60% 40%"}}>
                                                                <div style={{fontSize : "xx-small"}}>
                                                                    Holder
                                                                </div>
                                                                <div style={{fontSize : "xx-small"}}>
                                                                    Balance
                                                                </div>
                                                            </section>
                                                        </li>);})}
                                        </div>
                                    </button>
                                </section>


                                {/* CHARTS INFORMATION MARK ---------------------------------------------------------*/}
                                <div className={classes.multiple_charts_info} >
                                    <InformationQuestionmarkV2 fullWidth={fullWidth}
                                        textToCopy = {information_index[Chart_to_display]}
                                    />
                                </div>


                                {/* CHARTS -------------------------------------------------------------------------------*/}
                                <div  className={classes.multiple_charts_container} >
                                    {Chart_to_display === 1 ?
                                        <div style={{width : "100%"}} ref={multipleChartsContainerRef}>
                                            <Holders_distribution_chart Data={holders_distribution} graphHeight={graphHeight} themes={themes} fullWidth={fullWidth} multipleChartsContainerRef={multipleChartsContainerRef}/>
                                        </div>
                                        : ""}
                                    {Chart_to_display === 2 ?
                                        <div style={{width : "100%"}}>
                                            <Holders_chart themes={themes} Data={holders_data} selectedData={"n_unique_owners"} graphHeight={graphHeight} fullWidth={fullWidth}/>
                                        </div>
                                        : ""}
                                    {Chart_to_display === 3 ?
                                        <div style={{width : "100%", maxHeight : "350px" ,overflowY : "scroll", overflowX : "hidden", padding: "3%"}}>
                                            {
                                                top_holders_balance.map((i) => {
                                                    return (
                                                        <li key={i["owner_address"]} style={{listStyle: "none", marginBottom : "10px"}}>
                                                            <section style={{border : "2px dashed var(--blueColor)", borderRadius : "2px", padding : "2px", display:"grid" ,gridTemplateColumns : "70% 30%"}}>
                                                                <div style={{wordBreak : "break-all", paddingRight : "2px"}}>
                                                                    Holder Address<br/>{i["owner_address"]}
                                                                </div>
                                                                <div style={{paddingLeft: "2px"}}>
                                                                    Balance<br/>{i["tokens"].length}
                                                                </div>
                                                            </section>
                                                        </li>

                                                    );
                                                })

                                            }
                                        </div>
                                        : ""}

                                </div>
                            </section>
                        </section>
                    </main>
                }
            </Cart_Sections>
        </section>
    )
}

export default CollectionHolders

/*
<div className={classes.multiple_charts_wrapper_div} style={{display:"flex", }} >

                            <div className={classes.multiple_charts_button_div} >
                                <button className={classes.multiple_charts_buttons_style} onClick={()=>{setChart_to_display(1)}}> Holders Distribution </button>
                                <button className={classes.multiple_charts_buttons_style} onClick={()=>{setChart_to_display(2)}}> Unique holders chart</button>
                                <button className={classes.multiple_charts_buttons_style} onClick={()=>{setChart_to_display(3)}}> Holders List </button>
                            </div>
                            <div  style={{width: "85%", float:"right", display : "flex"}}>
                                {Chart_to_display === 1 ?
                                    <div style={{width : "100%"}}>
                                        <Holders_distribution_chart Data={holders_distribution} graphHeight={graphHeight} themes={themes}/>
                                    </div>
                                    : ""}
                                {Chart_to_display === 2 ?
                                    <div style={{width : "100%"}}>
                                        <Holders_chart themes={themes} Data={holders_data} selectedData={"n_unique_owners"} graphHeight={graphHeight}/>
                                    </div>
                                    : ""}
                                {Chart_to_display === 3 ?
                                    <div style={{width : "100%", maxHeight : "350px" ,overflowY : "scroll", overflowX : "hidden", padding: "3%"}}>
                                        {
                                            top_holders_balance.map((i) => {
                                                console.log(i)
                                                return (
                                                    <li key={i["owner_address"]} style={{listStyle: "none", marginBottom : "10px"}}>
                                                        <section style={{border : "2px dashed var(--blueColor)", borderRadius : "2px", padding : "2px", display:"grid" ,gridTemplateColumns : "70% 30%"}}>
                                                            <div>
                                                                Holder Address<br/>{i["owner_address"]}
                                                            </div>
                                                            <div>
                                                                Balance<br/>{i["tokens"].length}
                                                            </div>
                                                        </section>
                                                    </li>

                                                );
                                        })

                                        }
                                    </div>
                                    : ""}
                            </div>

                            <div style = {{height : graphHeight + "px"}}>
                                <InformationQuestionmarkV2
                                    textToCopy ="This chart shows the floor price in ETH and relative value in USD at historical price"
                                />
                            </div>

                        </div>
 */