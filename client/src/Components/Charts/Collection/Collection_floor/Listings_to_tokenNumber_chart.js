import React from 'react';
import {
    chartStroke,
    chartFill,
    chartFill_opacity,
    brushTravellerWidth,
    gridColors,
    brushBackgroundColor,
    secondaryGraphsMargins,
    GraphsYWidth,
    chartsCursorsTooltip,
} from "../../../Global_variables"
import {maxYdomainHandler, minYdomainHandler} from "../../chart_functions/mixMaxYDomains"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Brush
} from 'recharts';
import Moment from 'moment';
import classes from "../../ChartsStyles.module.css"
import {tickCounterHandler} from "../../chart_functions/tickCounterHandler";
import {yTickFormatter} from "../../chart_functions/ytickFormatter";

// Brush example
// https://codesandbox.io/s/0c42k?file=/src/App.js:611-621
// https://www.geeksforgeeks.org/create-a-brush-bar-chart-using-recharts-in-reactjs/

// Time series example
// https://github.com/recharts/recharts/issues/956

// Legend example
// https://codesandbox.io/s/k5no4l0n97?file=/SampleChart.jsx

export default function Listings_to_tokenNumber_chart ({Data, themes,graphHeight, fullWidth}) {

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const timestamp_tooltip = new Date(label.toString())
            const data = payload[0].payload["listing_to_token"]
            return (
                <div className={classes.tooltip}>
                    <p className="timestamp" style={{textAlign : "center"}}>{timestamp_tooltip.getUTCDate() + " / " + timestamp_tooltip.getUTCMonth() + " / " + timestamp_tooltip.getUTCFullYear() + " " + timestamp_tooltip.getUTCHours() + "H" + " (UTC)"}</p>
                    <p className="value" style={{textAlign : "center"}}> {data} % of collection is listed</p>
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
        values_array.push(parseFloat(i["listing_to_token"]))
    })
    const minYDomain = Math.min(...values_array)
    const maxYDomain = Math.max(...values_array)

    console.log("minYDomain listings to token number", minYDomain)
    console.log("maxYDomain listings to token number", maxYDomain)

    return (
            <ResponsiveContainer width="100%" height={graphHeight} >
                <AreaChart
                    width = "100%"
                    height={400}
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
                           stroke={chartStroke(themes)}
                    />

                    <YAxis
                        type="number"
                        domain={[minYdomainHandler(minYDomain) ,  maxYdomainHandler(maxYDomain)]}
                        allowDataOverflow={true}
                        tickFormatter={(number) => yTickFormatter(number) + "%"}
                        stroke={chartStroke(themes)}
                        width={GraphsYWidth(fullWidth)}
                        tickCount={tickCounterHandler(minYdomainHandler(minYDomain) ,  maxYdomainHandler(maxYDomain))}
                    />
                    <Tooltip
                        cursor={chartsCursorsTooltip}
                        content={<CustomTooltip/>}
                    />

                    <Brush
                        dataKey={"timestamp"}
                        tickFormatter = {(unixTime) => Moment(unixTime).format('DD/MM/YY')}
                        stroke={chartStroke(themes)}
                        strokeOpacity={0.3}
                        travellerWidth={brushTravellerWidth}
                    >
                        <AreaChart data={Data}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke={gridColors(themes)}
                                fill={brushBackgroundColor(themes)}
                            />
                            <Area  type="monotone"  dataKey={"listing_to_token"}  stroke="none"  fillOpacity={chartFill_opacity}  fill={chartFill} />
                            <YAxis
                                type="number"
                                domain={[minYdomainHandler(minYDomain) ,  maxYdomainHandler(maxYDomain)]}
                                tickCount={10}
                                allowDataOverflow={true}
                                hide = "true"
                            />
                        </AreaChart>


                    </Brush>

                    <Area type="monotone" dataKey={"listing_to_token"} stackId="1" stroke={chartStroke(themes)} fillOpacity={chartFill_opacity}  fill={chartFill}  />
                </AreaChart  >

            </ResponsiveContainer >
        );
}

/*
tick={{stroke: "black", strokeWidth: 0.5}}

<YAxis
                        type="number"
                        domain={[minYdomainHandler(minYDomain) ,  maxYdomainHandler(maxYDomain)]}
                        tickCount={10}
                        allowDataOverflow={true}

                    />
                    <Tooltip
                        cursor={{ stroke: 'black', strokeWidth: 1 }}
                        content={<CustomTooltip/>}
                    />
 */