import React from 'react';
import classes from '../../Pages.module.css'
import {mainPadding, sliderWidth, sliderHeight, toFixedVariable} from "../../../Components/Global_variables"

import Cart_Sections from '../../../Components/Layout_elements/Cards_types/Cart_Sections'
import Floor_thinness_chart from "../../../Components/Charts/Collection/Collection_floor/floor_thinness_LineChart";
import Floor_chart from "../../../Components/Charts/Collection/Collection_floor/Floor_chart"
import Listings_to_tokenNumber_chart from "../../../Components/Charts/Collection/Collection_floor/Listings_to_tokenNumber_chart"


import Floor_wall_chart from "../../../Components/Charts/Collection/Collection_floor/Floor_wall_Barcharts";
import Collection_call from "../collection_call"
import InformationQuestionmarkV2 from "../../../Components/Layout_elements/Information_mark_V2";

import BarChart_slider from "../../../Components/Charts/Slider_menu/BarChart_slider";
import LineChart_slider from "../../../Components/Charts/Slider_menu/LineChart_slider";
import Floor_chart_percentage from "../../../Components/Charts/Collection/Collection_floor/Floor_chart_percentage";
import Marketplaces_Floor_Chart from "../../../Components/Charts/Collection/Collection_floor/Marketplaces_Floor_Chart";
import MultipleLineChart_slider from "../../../Components/Charts/Slider_menu/MultipleLineChart_slider";


const information_index = [
    "This chart shows the floor price in ETH and relative value in USD at historical price",
    "This chart shows the number of NFTs on sale before a certain price point in ETH",
    "This chart shows how many NFTs are on sale between different price ranges in ETH",
    "This chart shows the % of the collection on sale though time",
    "This charts shows the floor price of the collection for the different marketplaces in ETH"
]


function CollectionFloor ({ selectedIndex, themes, RecentData, graphHeight, fullWidth}) {

    //console.log("FLOOR DATA: ", RecentData)
    //console.log(chartStroke("light"))
    //console.log("cardContainerWidth", cardContainerWidth)
    //const [HistoricalData, setHistoricalData] = React.useState(null)
    async function HistoricalDataHandler()  {
        const data = await Collection_call(selectedIndex,"Floor","historical_listings_stats_wb", null)
        console.log("The historical data are: ", data)
        return data
    }

    const floorChartOptions = ["ETH", "USD", "ETH vs USD"]

    //console.log("floor_data", collection_floor)
    //{"lowest_floor_price_usd":985.4917100000001,"lowest_floor_price_eth":0.6379,"avg_floor_price_eth":8.79418506451613,"avg_floor_price_usd":13586.136506170962,"opensea_floor_price_eth":0.6489,"opensea_floor_price_usd":1002.4856100000001,"looksrare_floor_price_eth":0.6379,"looksrare_floor_price_usd":985.4917100000001,"x2y2_floor_price_eth":0.6399,"x2y2_floor_price_usd":988.5815100000001,"number_of_listings":620,"avg_listing_time_days":47.68776736111111,"currency":null}
    let floor_wall_data = []
    let floor_thinness_data = []
    let floor_data = []
    let listings_to_tokenNumber_data =[]

    const usd_data = { lowest_floor_price_usd : null,  opensea_floor_price_usd: null,  looksrare_floor_price_usd: null,  x2y2_floor_price_usd: null,}
    const eth_data = { lowest_floor_price_eth: null, looksrare_floor_price_eth: null,  x2y2_floor_price_eth: null,  opensea_floor_price_eth: null, }
    let listingNumber = null

    if(RecentData){
        //console.log("Collection Floor Data", RecentData)

        if(RecentData["floor_thinness_array_txt"]){
            floor_thinness_data = JSON.parse(RecentData["floor_thinness_array_txt"])
            floor_thinness_data = floor_thinness_data.slice(0,30)
        }
        if(RecentData["floor_wall_array_txt"]){
            floor_wall_data = JSON.parse(RecentData["floor_wall_array_txt"])
            floor_wall_data = floor_wall_data.slice(0,30)
        }
        if(RecentData["data"]){
            RecentData["data"].map(async (i)=>{
                let temp_data = JSON.parse(i["data"])
                floor_data.push({...temp_data, timestamp : new Date(i["timestamp"]) })
                listings_to_tokenNumber_data.push({ listing_to_token: i["listing_to_token"],  timestamp: new Date(i["timestamp"]) })
            })

            floor_data = floor_data.sort((a, b) => new Date(a["timestamp"]) - new Date(b["timestamp"]))

            //console.log("floor_data", floor_data)

            usd_data.lowest_floor_price_usd = floor_data[floor_data.length-1].lowest_floor_price_usd
            usd_data.looksrare_floor_price_usd = floor_data[floor_data.length-1].looksrare_floor_price_usd
            usd_data.opensea_floor_price_usd = floor_data[floor_data.length-1].opensea_floor_price_usd
            usd_data.x2y2_floor_price_usd = floor_data[floor_data.length-1].x2y2_floor_price_usd
            eth_data.lowest_floor_price_eth = floor_data[floor_data.length-1].lowest_floor_price_eth
            eth_data.looksrare_floor_price_eth = floor_data[floor_data.length-1].looksrare_floor_price_eth
            eth_data.opensea_floor_price_eth = floor_data[floor_data.length-1].opensea_floor_price_eth
            eth_data.x2y2_floor_price_eth = floor_data[floor_data.length-1].x2y2_floor_price_eth
            listingNumber = floor_data[floor_data.length-1]["number_of_listings"]
        }
    }


    const [FloorChart, setFloorChart] = React.useState("ETH");
    const currency_setter = async (value)=>{
        if (value === "ETH"){
            return "USD"
        }
        else if (value === "USD"){
            return "ETH"
        }
        return false
    }

    const [Chart_to_display, setChart_to_display] = React.useState(1);

    //const eth_symbol = themes === 'dark' ? "eth_diamond_rainbow.png" : "eth_diamond_rainbow.png";

    const [FloorChartTicks, setFloorChartTicks] = React.useState(7);

    const change_graph_time = async (prop) => {

        if(prop === 7){setFloorChartTicks(7)}
        else if(prop === 30){setFloorChartTicks()}


        const floorData_startDate = new Date(floor_data[0]["timestamp"].toString())
        const tester_date = new Date(floor_data[0]["timestamp"].toString())
        tester_date.setUTCDate(tester_date.getUTCDate() - prop)

        if(tester_date.getTime() < floorData_startDate.getTime()){
            // TO BE FINISHED
            //HistoricalDataHandler()
        }

        //console.log("test date", floorData_startDate, "type", typeof floorData_startDate)

    }

    // Handles which buttons are active on the screen after been clicked
    const [activeButtons, setActiveButtons] = React.useState(
        {
            timeButtons: null,
            floorChartButtons: "ETH",
            sliderChartsSelector: 1,
        }
    )

    const handleButtonsState = async (target, value) =>{
        setActiveButtons( prevState => ({
            ...prevState,
                [target] : value
        }))
    }



    return  (
        <section id='Floor' className={classes.componentsContainer}>
            <Cart_Sections>
                {/*--------------------------FARE UN MODULO ESTERNO CON TUTTE LE COE BELLE-------------------------- */}
                {/*If data are not present*/}
                {RecentData ? "" :
                    <main className={classes.main} style={{padding : fullWidth ? mainPadding[0] : mainPadding[1] , width: "100%"}}>
                        <p style={{width : "100%", textAlign : "center"}} className={classes.p}>
                            The data are coming!
                            <br/>
                            Please wait a few seconds
                        </p>
                    </main>
                }
                {/*-------------------------------------------------------------------------------------------------- */}

                {!RecentData ?  "" :

                    <main className={classes.main} style={{ width : "100%" }}>

                        <section id={"mainElements"} style={{padding : fullWidth ? mainPadding[0] : mainPadding[1], width : "100%" }}>

                            <h1 className={classes.h1}>
                                Collection Floor
                            </h1>

                            {/*Floor of different marketplaces*/}
                            <div className={classes.stats_container}  >
                                <section className={classes.stats_card_wrapper}>
                                    <div className={classes.stats_internal_div}>
                                        Floor <br/> {eth_data.lowest_floor_price_eth ? eth_data.lowest_floor_price_eth.toFixed(toFixedVariable) : "...Loading..."} ETH
                                    </div>
                                </section>
                                <section className={classes.stats_card_wrapper}>
                                    <div className={classes.stats_internal_div}>
                                        N Listings <br/> {listingNumber ? listingNumber : "...Loading..."}
                                    </div>
                                </section >
                            </div>


                            {/* Collection floor Chart - -------------------------------------------------------------*/}
                            <section  id="Floor_Chart" style={{justifyItems : "center",  justifyContent : "center", marginTop : "10px", flexDirection : "row"}}>
                                {/* Title - -------------------------------------------------------------*/}
                                <div className={classes.title_and_info_button_div}>
                                    <h3 className={classes.charts_titles }> Floor Chart </h3>

                                    <div className={classes.information_mark}>
                                        <InformationQuestionmarkV2 fullWidth={fullWidth}
                                            textToCopy ={information_index[0]}
                                        />
                                    </div>
                                </div>


                                {/* ETH USD COMPARISON BUTTONS ---------------------------------------------------------*/}
                                <div className={classes.chart_buttons_div} >
                                    <button onClick={()=>{setFloorChart(floorChartOptions[0]); handleButtonsState("floorChartButtons", floorChartOptions[0] )}}
                                            className={classes.usd_eth_button}
                                            style={{color : activeButtons.floorChartButtons === floorChartOptions[0] ? "var(--yellowColor)": "",}}
                                    >
                                        {floorChartOptions[0]} </button>
                                    <button onClick={()=>{setFloorChart(floorChartOptions[1]); handleButtonsState("floorChartButtons", floorChartOptions[1] )}}
                                            className={classes.usd_eth_button}
                                            style={{color : activeButtons.floorChartButtons === floorChartOptions[1] ? "var(--yellowColor)": "",}}
                                    >
                                        {floorChartOptions[1]} </button>
                                    <button onClick={()=>{setFloorChart(floorChartOptions[2]); handleButtonsState("floorChartButtons", floorChartOptions[2] )}}
                                            className={classes.usd_eth_button}
                                            style={{color : activeButtons.floorChartButtons === floorChartOptions[2] ? "var(--yellowColor)": "",}}
                                    >
                                        {floorChartOptions[2]} </button>
                                </div>

                                {/* TIME SELECTOR BUTTONS ---------------------------------------------------------------*/}
                                <div className={classes.chart_buttons_div} style={{marginTop : "10px"}}>
                                    <button onClick={()=>{ change_graph_time(7) }} className={classes.chart_buttons_style}> 7d </button>
                                    <button onClick={()=>{ change_graph_time(30); }} className={classes.chart_buttons_style}> 30d </button>
                                    <button onClick={()=>{change_graph_time(90)}} className={classes.chart_buttons_style}> 90d </button>
                                    <button onClick={()=>{change_graph_time(180)}} className={classes.chart_buttons_style}> 180d </button>
                                    <button onClick={()=>{change_graph_time(365)}} className={classes.chart_buttons_style}> 1Y </button>
                                    <button onClick={()=>{change_graph_time("MAX")}} className={classes.chart_buttons_style}> MAX </button>
                                </div>


                                {/* FLOOR CHARTS    ---------------------------------------------------------------------*/}
                                <div className={classes.main_Chart}>
                                    {FloorChart === floorChartOptions[0] || FloorChart=== floorChartOptions[1] ?
                                        <Floor_chart Data={floor_data} ChartCurrency={FloorChart} themes={themes} graphHeight={graphHeight} fullWidth={fullWidth}/>
                                        : ""}
                                    { FloorChart === floorChartOptions[2] ?
                                        <Floor_chart_percentage Data={floor_data} ChartCurrency={FloorChart} themes={themes} graphHeight={graphHeight} fullWidth={fullWidth}/>
                                        : ""
                                    }
                                </div>

                            </section>

                        </section>

                        <section id={"secondaryElements"} style={{ width : "100%" }} >

                            {/* Chart scroller part------------------------------------------------------------------------*/}
                            <section  style={{margin : fullWidth ? "20px 20px" : "20px 0px",
                                border : fullWidth ? "var(--cardsBorderSize) dashed var(--borderColor)" : 0,
                                borderRadius : "var(--secondaryBorderRadius)"
                            }} >

                                {/* SLIDER -------------------------------------------------------------------------------*/}
                                <section className={classes.scroller_section}
                                         style={{gridTemplateColumns: "0px repeat(4, var(--varScrollerChartsWidth)) 10px",
                                             borderTop : !fullWidth ? "var(--cardsBorderSize) dashed var(--borderColor)" : 0,}}
                                >

                                        <button  onClick={() => { setChart_to_display(1); handleButtonsState("sliderChartsSelector", 1 ) }}
                                                 style={{
                                                     width : fullWidth ? sliderWidth[0] : sliderWidth[1],
                                                     height : fullWidth ? sliderHeight[0] : sliderHeight[1],
                                                 }}
                                        >
                                            <p >
                                                Floor Thinness
                                            </p>
                                            <LineChart_slider Data={floor_thinness_data} themes={themes} chartSelected={"cumulative_nfts_up_to_price"} />
                                        </button>

                                        <button  onClick={() => { setChart_to_display(2); handleButtonsState("sliderChartsSelector", 2 ) }}
                                                 style={{
                                                     width : fullWidth ? sliderWidth[0] : sliderWidth[1],
                                                     height : fullWidth ? sliderHeight[0] : sliderHeight[1],
                                                 }}
                                        >
                                            <p >
                                                Floor Wall
                                            </p>
                                            <BarChart_slider Data={floor_wall_data} themes={themes} />

                                        </button>

                                        <button
                                            onClick={() => { setChart_to_display(3); handleButtonsState("sliderChartsSelector", 3 ) }}
                                            style={{
                                                width : fullWidth ? sliderWidth[0] : sliderWidth[1],
                                                height : fullWidth ? sliderHeight[0] : sliderHeight[1],
                                            }}
                                        >
                                            <p >
                                                Listings Change
                                            </p>
                                            <LineChart_slider Data={listings_to_tokenNumber_data} themes={themes} chartSelected={"listing_to_token"} />
                                        </button>
                                        <button
                                            onClick={() => { setChart_to_display(4); handleButtonsState("sliderChartsSelector", 4 ) }}
                                            style={{
                                                width : fullWidth ? sliderWidth[0] : sliderWidth[1],
                                                height : fullWidth ? sliderHeight[0] : sliderHeight[1],
                                            }}
                                        >
                                            <p >
                                                Marketplaces stats
                                            </p>
                                            <MultipleLineChart_slider chartSelected={["looksrare_floor_price_eth", "opensea_floor_price_eth", "x2y2_floor_price_eth"]} Data={floor_data} themes={themes}/>
                                        </button>
                                    </section>

                                {/* CHARTS INFORMATION MARK ---------------------------------------------------------*/}
                                <div className={classes.multiple_charts_info} >
                                    <InformationQuestionmarkV2 fullWidth={fullWidth}
                                        textToCopy = {information_index[Chart_to_display]}
                                    />
                                </div>

                                {/* CHARTS -------------------------------------------------------------------------------*/}
                                <div  className={classes.multiple_charts_container}>
                                    {Chart_to_display === 1 ?
                                        <div style={{width : "100%"}}>
                                            <Floor_thinness_chart Data={floor_thinness_data} graphHeight={graphHeight} themes={themes} fullWidth={fullWidth}/>
                                        </div>
                                        : ""}
                                    {Chart_to_display === 2 ?
                                        <div style={{width : "100%"}}>
                                            <Floor_wall_chart Data={floor_wall_data} graphHeight={graphHeight} themes={themes} fullWidth={fullWidth}/>
                                        </div>
                                        : ""}
                                    {Chart_to_display === 3 ?
                                        <div style={{width : "100%"}}>
                                            <Listings_to_tokenNumber_chart Data={listings_to_tokenNumber_data}  themes={themes} graphHeight={graphHeight} fullWidth={fullWidth}/>
                                        </div>
                                        : ""}
                                    {Chart_to_display === 4 ?
                                        <section style={{justifyContent : "space-evenly"}}>
                                            <div className={classes.stats_container} style={{gridTemplateColumns : "33% 33% 33%"}}>
                                                <section className={classes.stats_card_wrapper}>
                                                    <div className={classes.stats_internal_div}>
                                                        Opensea Floor <br/> {eth_data["opensea_floor_price_eth"] ? eth_data["opensea_floor_price_eth"].toFixed(toFixedVariable) : "...Loading..."}
                                                    </div>
                                                </section >
                                                <section className={classes.stats_card_wrapper} >
                                                    <div className={classes.stats_internal_div}>
                                                        LooksRare Floor <br/> {eth_data["looksrare_floor_price_eth"] ? eth_data["opensea_floor_price_eth"].toFixed(toFixedVariable) : "...Loading..."}
                                                    </div>
                                                </section >
                                                <section className={classes.stats_card_wrapper}>
                                                    <div className={classes.stats_internal_div}>
                                                        X2Y2 Floor <br/> {eth_data["x2y2_floor_price_eth"] ? eth_data["opensea_floor_price_eth"].toFixed(toFixedVariable) : "...Loading..."}
                                                    </div>
                                                </section>

                                            </div>
                                            <Marketplaces_Floor_Chart Data={floor_data} ChartCurrency={"ETH"} themes={themes} graphHeight={graphHeight}  fullWidth={fullWidth}/>

                                        </section>

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

export default CollectionFloor

// borderRight : fullWidth ? "var(--secondaryBorderSize) dashed var(--borderColor)" : 0,
//                                              borderLeft : fullWidth ? "var(--secondaryBorderSize) dashed var(--borderColor)" : 0,

/*
                        <section className={classes.multiple_charts_wrapper_div} style={{display:"flex" }} >

                            <div className={classes.multiple_charts_button_div} >
                                <button className={classes.multiple_charts_buttons_style} onClick={()=>{setChart_to_display(1)}}> Floor Wall </button>
                                <button className={classes.multiple_charts_buttons_style} onClick={()=>{setChart_to_display(2)}}> Floor Thinness </button>
                                <button className={classes.multiple_charts_buttons_style} onClick={()=>{setChart_to_display(3)}}> Listings Change </button>
                                <button className={classes.multiple_charts_buttons_style} onClick={()=>{setChart_to_display(4)}}> Marketplaces stats </button>
                            </div>

                            <div  style={{width: "100%", float:"right", display : "flex", justifyContent : "space-evenly"}}>
                                {Chart_to_display === 1 ?
                                    <div style={{width : "100%"}}>
                                        <Floor_wall_chart Data={floor_wall_data} graphHeight={graphHeight} themes={themes}/>
                                    </div>
                                    : ""}
                                {Chart_to_display === 2 ?
                                    <div style={{width : "100%"}}>
                                        <Floor_thinness_chart Data={floor_thinness_data} graphHeight={graphHeight} themes={themes}/>
                                    </div>
                                    : ""}
                                {Chart_to_display === 3 ?
                                    <div style={{width : "100%"}}>
                                        <div className={classes.chart_buttons_div} style={{marginTop : "10px"}}>
                                            <button onClick={(e)=>{change_graph_time(30) }} className={classes.chart_buttons_style}> 7d </button>
                                            <button onClick={(e)=>{change_graph_time(120)}} className={classes.chart_buttons_style}> 60d </button>
                                            <button onClick={(e)=>{change_graph_time(365)}} className={classes.chart_buttons_style}> 1Y </button>
                                            <button onClick={(e)=>{change_graph_time("MAX")}} className={classes.chart_buttons_style}> MAX </button>
                                        </div>
                                        <Listings_to_tokenNumber_chart Data={listings_to_tokenNumber_data} ChartCurrency={FloorChartCurrency} themes={themes} graphHeight={graphHeight}/>
                                    </div>
                                    : ""}
                                {Chart_to_display === 4 ?
                                    <section style={{justifyContent : "space-evenly"}}>
                                        <div className={classes.stats_container} style={{gridTemplateColumns : "25% 25% 25% 25%"}}>
                                            <section className={classes.stats_card_wrapper}>
                                                <div className={classes.stats_internal_div}>
                                                    Floor <br/> {eth_data["lowest_floor_price_eth"] ? eth_data["opensea_floor_price_eth"] : "...Coming..."}
                                                </div>
                                            </section>
                                            <section className={classes.stats_card_wrapper}>
                                                <div className={classes.stats_internal_div}>
                                                    Opensea Floor <br/> {eth_data["opensea_floor_price_eth"] ? eth_data["opensea_floor_price_eth"] : "...Coming..."}
                                                </div>
                                            </section >
                                            <section className={classes.stats_card_wrapper} >
                                                <div className={classes.stats_internal_div}>
                                                    LooksRare Floor <br/> {eth_data["looksrare_floor_price_eth"] ? eth_data["opensea_floor_price_eth"] : "...Coming..."}
                                                </div>
                                            </section >
                                            <section className={classes.stats_card_wrapper}>
                                                <div className={classes.stats_internal_div}>
                                                    X2Y2 Floor <br/> {eth_data["x2y2_floor_price_eth"] ? eth_data["opensea_floor_price_eth"] : "...Coming..."}
                                                </div>
                                            </section>

                                        </div>

                                    </section>

                                    : ""}

                            </div>

                            <div style = {{height : graphHeight + "px"}}>
                                    <InformationQuestionmarkV2
                                        textToCopy ="This chart shows the floor price in ETH and relative value in USD at historical price"
                                    />
                            </div>

                        </section>

 */

