import React from 'react';
import { AreaChart, Area, XAxis, YAxis ,CartesianGrid, Tooltip, ResponsiveContainer , Brush } from 'recharts';
import {maxYdomainHandler, minYdomainHandler} from "../../chart_functions/mixMaxYDomains";
import {yTickFormatter} from "../../chart_functions/ytickFormatter";


import {
    chartStroke,
    chartFill_opacity,
    tickStroke,
    brushBackgroundColor,
    gridColors,
    toFixedVariable ,
    brushTravellerWidth,
    GraphsYWidth,
    mainGraphsMargins,
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



export default function Floor_chart ({Data, ChartCurrency, themes, graphHeight, fullWidth}) {

    //console.log("floor chart data", Data)

    //Chart Colors

    // First gets which data have been selected

    let selectedData = null
    if(ChartCurrency === "ETH"){
        selectedData = "lowest_floor_price_eth"
    }
    else if (ChartCurrency === "USD"){
        selectedData = "lowest_floor_price_usd"
    }

    if(selectedData){

        const chartFill = ChartCurrency=== "ETH" ? "var(--greenColor)" : "var(--yellowColor)"

        const CustomTooltip = ({ active, payload, label }) => {
            //console.log("payload floor chart",payload)
            if (active && payload && payload.length) {
                const timestamp_tooltip = new Date(label.toString())
                const tooltipValue = payload[0].payload[selectedData].toFixed(toFixedVariable)
                const currency_symbol = selectedData === "lowest_floor_price_eth" ? "ETH" : "USD"

                const change_beginning = ((payload[0].payload[selectedData].toFixed(toFixedVariable) - Data[0][selectedData]) / Data[0][selectedData]) * 100

                return (
                    <div className={classes.tooltip} >
                        <p className="timestamp">{timestamp_tooltip.getUTCDate() + " / " + timestamp_tooltip.getUTCMonth() + " / " + timestamp_tooltip.getUTCFullYear() + " " + timestamp_tooltip.getUTCHours() + "H" + " (UTC)"}</p>
                        <p className="value">{tooltipValue} {currency_symbol}</p>
                        <p className="change_beginning">Δ period selected {change_beginning.toFixed(toFixedVariable)} % {currency_symbol}</p>
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
            values_array.push(i[selectedData])
        })
        const minYDomain = Math.min(...values_array)
        const maxYDomain = Math.max(...values_array)
        //console.log("values_array floor chart", xticks_values)
        //console.log("minYDomain", minYDomain)
        //console.log("maxYDomain", maxYDomain)

        const YTickFormatterSelector = (yTick)=>{
                return yTickFormatter(yTick)
        }

        return (
            <ResponsiveContainer width="100%" height={graphHeight} >
                <AreaChart
                    width = "100%"
                    height= "100%"
                    data={Data}
                    margin={mainGraphsMargins(fullWidth)}
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

                    <Brush
                        dataKey={"timestamp"}
                        tickFormatter = { (unixTime) => Moment(unixTime).format('DD/MM/YY') }
                        stroke={chartStroke(themes)}
                        strokeOpacity={0.3}
                        travellerWidth={brushTravellerWidth}
                    >
                        <AreaChart
                            data={Data}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke={gridColors(themes)}
                                fill={brushBackgroundColor(themes)}
                            />
                            <Area  type="monotone"  dataKey={selectedData}  stroke="none"  fillOpacity={chartFill_opacity}  fill={chartFill} />
                            <YAxis
                                type="number"
                                domain={[minYdomainHandler(minYDomain) ,  maxYdomainHandler(maxYDomain)]}
                                tickCount={10}
                                allowDataOverflow={true}
                                hide = "true"
                            />
                        </AreaChart>


                    </Brush>

                    <YAxis
                        stroke={tickStroke(themes)}
                        type="number"
                        domain={[minYdomainHandler(minYDomain) ,  maxYdomainHandler(maxYDomain)]}
                        tickCount={6}
                        allowDataOverflow={true}
                        tickFormatter={(yTick)=> YTickFormatterSelector(yTick)}
                        width={GraphsYWidth(fullWidth)}
                    />


                    <Area  type="monotone" dataKey={selectedData} stackId="1" stroke={chartStroke(themes)} fill={chartFill} fillOpacity={chartFill_opacity}  />

                </AreaChart  >

            </ResponsiveContainer >
        );
    }


}
//                     { (unixTime) => Moment(unixTime).format('DD/MM[<br>]YYYY') }
/*
<Legend
                        payload={[{ value: 'Floor Price', type: 'line', id: 'ID01' }]}
                        verticalAlign="top"
                        height={36}

                    />
 */