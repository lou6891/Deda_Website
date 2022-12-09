import React from 'react';
import { LineChart, Line, XAxis, YAxis ,CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import {maxYdomainHandler, minYdomainHandler} from "../../chart_functions/mixMaxYDomains";
import {yTickFormatter} from "../../chart_functions/ytickFormatter";
import {tickCounterHandler} from "../../chart_functions/tickCounterHandler"

import {
    tickStroke,
    toFixedVariable,
    gridColors,
    secondaryGraphsMargins,
    GraphsYWidth,
    chartsCursorsTooltip,
} from "../../../Global_variables"

import Moment from 'moment';
import classes from "../../ChartsStyles.module.css"
// Brush example
// https://codesandbox.io/s/0c42k?file=/src/App.js:611-621
// https://www.geeksforgeeks.org/create-a-brush-bar-chart-using-recharts-in-reactjs/

// Time series example
// https://github.com/recharts/recharts/issues/956

// Legend example
// https://codesandbox.io/s/k5no4l0n97?file=/SampleChart.jsx



export default function Marketplaces_Floor_Chart ({Data, ChartCurrency, themes, graphHeight, fullWidth}) {

    //console.log("marketplace floor chart data", Data)

    //Chart Colors

    // First gets which data have been selected

    let selectedData = null
    if(ChartCurrency === "ETH"){
        selectedData = ["looksrare_floor_price_eth", "opensea_floor_price_eth", "x2y2_floor_price_eth"]
    }
    else if (ChartCurrency === "USD"){
        selectedData = null
    }

    if(selectedData){

        const CustomTooltip = ({ active, payload, label }) => {
            //console.log("payload markeplaces", payload)
            if (active && payload && payload.length) {
                const timestamp_tooltip = new Date(label.toString())

                const looksRare_data = (payload[0].payload[selectedData[0]]).toFixed(toFixedVariable)
                const openSea_data = (payload[1].payload[selectedData[1]]).toFixed(toFixedVariable)
                const x2y2_data = (payload[2].payload[selectedData[2]]).toFixed(toFixedVariable)
                const looksRare_color = payload[0]["color"]
                const openSea_color = payload[1]["color"]
                const x2y2_color = payload[2]["color"]


                return (
                    <div className={classes.tooltip} >
                        <p className="timestamp" >{timestamp_tooltip.getUTCDate() + " / " + timestamp_tooltip.getUTCMonth() + " / " + timestamp_tooltip.getUTCFullYear() + " " + timestamp_tooltip.getUTCHours() + "H" + " (UTC)"}</p>
                        <p className="looksRareValue"  style={{color : looksRare_color}}>Looks: {looksRare_data} ETH</p>
                        <p className="OpenseaValue"  style={{color : openSea_color}}>Opensea: {openSea_data} ETH</p>
                        <p className="x2y2value"  style={{color : x2y2_color}}>X2Y2: {x2y2_data} ETH</p>
                    </div>
                );
            }

            return null;
        };

        // Make the x-axis
        const xticks_values = []
        const values_array = []
        Data.map((i)=>{
            if(i.timestamp.getUTCHours() === 0){
                xticks_values.push(i.timestamp)
            }
            values_array.push(i[selectedData[0]], i[selectedData[1]], i[selectedData[2]])
        })
        const minYDomain = Math.min(...values_array)
        const maxYDomain = Math.max(...values_array)
        //console.log("values_array marketplaces floor chart", values_array)
        //console.log("minYDomain marketplaces floor chart", minYDomain)
        //console.log("maxYDomain marketplaces floor chart", maxYDomain)

        const YTickFormatterSelector = (yTick)=>{
            return yTickFormatter(yTick)
        }

        return (
            <ResponsiveContainer width="100%" height={graphHeight} >
                <LineChart
                    width = "100%"
                    height= "100%"
                    data={Data}
                    margin={secondaryGraphsMargins(fullWidth)}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={gridColors(themes)}
                    />
                    <XAxis dataKey="timestamp"
                           type="category"
                           tickFormatter = {(unixTime) => Moment(unixTime).format('DD/MM')}
                           ticks={[...xticks_values]}
                           stroke={tickStroke(themes)}
                    />

                    <Tooltip
                        cursor={chartsCursorsTooltip}
                        content={<CustomTooltip/>}
                    />


                    <YAxis
                        stroke={tickStroke(themes)}
                        type="number"
                        domain={[ minYdomainHandler(minYDomain) ,  maxYdomainHandler(maxYDomain)]}
                        allowDataOverflow={false}
                        tickFormatter={(yTick)=> YTickFormatterSelector(yTick)}
                        width={GraphsYWidth(fullWidth)}
                        tickCount={tickCounterHandler(minYdomainHandler(minYDomain) ,  maxYdomainHandler(maxYDomain))}
                    />


                    <Line  type="monotone" dataKey={selectedData[0]} stroke={"var(--greenColor)"} strokeWidth={2} dot={false} />
                    <Line  type="monotone" dataKey={selectedData[1]} stroke={"var(--blueColor)"} strokeWidth={2} dot={false} />
                    <Line  type="monotone" dataKey={selectedData[2]} stroke={"var(--redColor)"} strokeWidth={2} dot={false} />

                </LineChart  >

            </ResponsiveContainer >
        );
    }


}