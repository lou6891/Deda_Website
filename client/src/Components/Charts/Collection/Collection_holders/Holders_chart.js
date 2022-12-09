import React from 'react';
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
import {maxYdomainHandler, minYdomainHandler} from "../../chart_functions/mixMaxYDomains"
import {yTickFormatter} from "../../chart_functions/ytickFormatter"
import {tickCounterHandler} from "../../chart_functions/tickCounterHandler"
import {
    chartStroke,
    chartFill,
    chartFill_opacity,
    tickStroke,
    brushBackgroundColor,
    gridColors,
    mainGraphsMargins,
    brushTravellerWidth,
    GraphsYWidth,
    chartsCursorsTooltip,
} from "../../../Global_variables"
import classes from "../../ChartsStyles.module.css";


// Brush example
// https://codesandbox.io/s/0c42k?file=/src/App.js:611-621
// https://www.geeksforgeeks.org/create-a-brush-bar-chart-using-recharts-in-reactjs/

// Time series example
// https://github.com/recharts/recharts/issues/956

// Legend example
// https://codesandbox.io/s/k5no4l0n97?file=/SampleChart.jsx


export default function Holders_chart ({Data, themes, selectedData, graphHeight, fullWidth}) {
    //console.log("Holders chart", selectedData)


    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const timestamp_tooltip = new Date(label.toString())
            const tooltipDescription = ()=>{
                if (selectedData === "total_n_owners"){
                    return "Holders"
                }
                else if (selectedData === "n_unique_owners") {
                    return "Unique Holders"
                }
            }

            return (
                <div className={classes.tooltip}>
                    <p className="timestamp">{timestamp_tooltip.getUTCDate() + " / " + timestamp_tooltip.getUTCMonth() + " / " + timestamp_tooltip.getUTCFullYear() + " " + timestamp_tooltip.getUTCHours() + "H" + " (UTC)"}</p>
                    <p className="value">{payload[0].value } {tooltipDescription()}</p>
                </div>
            );
        }

        return null;
    };

    if (selectedData) {

        // Make the x-axis
        const xticks_values = []
        const values_array = []
        Data.map((i) => {
            if (i.timestamp.getUTCHours() === 0) {
                xticks_values.push(i.timestamp)
            }
            values_array.push(i[selectedData])
        })
        const minYDomain = Math.min(...values_array)
        const maxYDomain = Math.max(...values_array)
        //console.log("values_array floor chart", xticks_values)
        //console.log("minYDomain holders chart", minYDomain)
        //console.log("maxYDomain holders chart", maxYDomain)
        //console.log("test", minYdomainHandler(minYDomain), maxYdomainHandler(maxYDomain))


        return (
            <ResponsiveContainer width="100%" height={graphHeight}>
                <AreaChart
                    width="100%"
                    height={graphHeight}
                    data={Data}
                    margin={mainGraphsMargins(fullWidth)}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={gridColors(themes)}
                    />
                    <XAxis dataKey="timestamp"
                           type="category"
                           tickFormatter={(unixTime) => Moment(unixTime).format('DD/MM')}
                           ticks={[...xticks_values]}
                           stroke={tickStroke(themes)}
                    />
                    <YAxis
                        type="number"
                        domain={[minYdomainHandler(minYDomain), maxYdomainHandler(maxYDomain)]}
                        tickCount={tickCounterHandler(minYdomainHandler(minYDomain), maxYdomainHandler(maxYDomain))}
                        allowDataOverflow={true}
                        tickFormatter={(yTick)=>yTickFormatter(yTick)}
                        stroke={tickStroke(themes)}
                        width={GraphsYWidth(fullWidth)}
                    />
                    <Tooltip
                        cursor={chartsCursorsTooltip}
                        content={<CustomTooltip/>}
                    />
                    <Area type="monotone" dataKey={selectedData} stackId="1" stroke={chartStroke(themes)} fill={chartFill}
                          fillOpacity={chartFill_opacity}/>

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

                </AreaChart>

            </ResponsiveContainer>
        );
    }


}

/*
values_array.push(i["total_n_owners"])
                    <Area type="monotone" dataKey="total_n_owners" stackId="1" stroke="limegreen" fill={"limegreen"} fillOpacity={0.3}  />

 */