import React from 'react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    LineChart,
    Line,
    ReferenceLine,
    Brush
} from 'recharts';
import {
    chartStroke,
    brushBackgroundColor,
    gridColors,
    usdStroke,
    ethStroke,
    GraphsYWidth,
    mainGraphsMargins,
    chartsCursorsTooltip,
} from "../../../Global_variables"
import Moment from 'moment';
import classes from "../../ChartsStyles.module.css"
import create_percentage_lines from "../../chart_functions/create_percentage_lines";
import {maxYdomainHandler, minYdomainHandler} from "../../chart_functions/mixMaxYDomains";
import {yTickFormatter} from "../../chart_functions/ytickFormatter";



// Brush example
// https://codesandbox.io/s/0c42k?file=/src/App.js:611-621
// https://www.geeksforgeeks.org/create-a-brush-bar-chart-using-recharts-in-reactjs/

// Time series example
// https://github.com/recharts/recharts/issues/956

// Legend example
// https://codesandbox.io/s/k5no4l0n97?file=/SampleChart.jsx

const LegendElement = (props) => {
    const { payload } = props;
    return (
        <ul className={classes.legendContainer}>
            {
                payload.map((entry, index) => {
                    return(
                    <li className={classes.legendItem} key={`item-${index}`} style={{color: payload[index]["color"] , fontWeight : "bold"}}>
                        {index === 0 ? "ETH" : "USD"}
                    </li>
                    )
                })
            }
        </ul>
    )
}


export default function Floor_chart_percentage ({Data, themes,graphHeight, fullWidth}) {

    Data = create_percentage_lines(Data)


    const CustomTooltip = ({ active, payload, label }) => {
        //console.log("payload flor chart percentage", payload)
        if (active && payload && payload.length) {
            const timestamp_tooltip = new Date(label.toString())
            const ethStyle = payload[0].stroke
            const usdStyle = payload[1].stroke
            const ethData = payload[0].payload["eth_change"]
            const usdData = payload[1].payload["usd_change"]
            const beginningDate = Moment(Data[0].timestamp).format("DD/MM/YY")

            return (
                <div className={classes.tooltip}>
                    <p className="timestamp" style={{textAlign : "center"}}>{timestamp_tooltip.getUTCDate() + " / " + timestamp_tooltip.getUTCMonth() + " / " + timestamp_tooltip.getUTCFullYear() + " " + timestamp_tooltip.getUTCHours() + "H" + " (UTC)"}</p>
                    <p className="explanation" style={{textAlign : "center"}}> % Δ since {beginningDate} </p>
                    <p className="value eth" style={{textAlign : "center"}}> {ethData} % ETH value</p>
                    <p className="value usd" style={{textAlign : "center"}}> {usdData} % USD value</p>

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
        values_array.push(i["eth_change"], i["usd_change"])
    })

    let minYDomain = Math.floor( Math.min(...values_array) )
    let maxYDomain = Math.ceil( Math.max(...values_array) )

    if(minYDomain < 0){
        let diff = 0 - minYDomain
        if(maxYDomain < diff){
            maxYDomain = diff
        }
    }

    return (
        <ResponsiveContainer width="100%" height={graphHeight} >
            <LineChart
                width = "100%"
                height={400}
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
                       stroke={chartStroke(themes)}
                />

                <YAxis
                    type="number"
                    domain={[minYdomainHandler(minYDomain) , maxYdomainHandler(maxYDomain)]}
                    allowDataOverflow={false}
                    tickFormatter={(number) => yTickFormatter(number) + " %"}
                    stroke={chartStroke(themes)}
                    width={GraphsYWidth(fullWidth)}
                />
                <Tooltip
                    cursor={chartsCursorsTooltip}
                    content={<CustomTooltip/>}
                />
                <Legend
                    //payload={[
                    //    { value: 'ETH ', type: 'line', id: 'ID01' },
                    //    { value: 'USD ', type: 'line', id: 'ID02' }
                    //]}
                    verticalAlign="top"
                    height={36}
                    content={<LegendElement/>}

                />

                <Brush
                    dataKey={"timestamp"}
                    tickFormatter = {(unixTime) => Moment(unixTime).format('DD/MM/YY')}
                    stroke={chartStroke(themes)}
                    strokeOpacity={0.3}
                >
                    <LineChart data={Data}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={gridColors(themes)}
                            fill={brushBackgroundColor(themes)}
                        />

                        <Line type="monotone" dataKey={"eth_change"} stroke={ethStroke[0]} strokeWidth={ethStroke[1]}  dot={false} id={"ID01"}/>
                        <Line type="monotone" dataKey={"usd_change"} stroke={usdStroke[0]} strokeWidth={usdStroke[1]} dot={false} id={"ID02"}/>

                        <YAxis
                            type="number"
                            domain={[minYdomainHandler(minYDomain) ,  maxYdomainHandler(maxYDomain)]}
                            tickCount={10}
                            allowDataOverflow={true}
                            hide = "true"
                        />
                    </LineChart>


                </Brush>

                <ReferenceLine y={0} stroke={chartStroke(themes)} />

                <Line type="monotone" dataKey={"eth_change"} stroke={ethStroke[0]} strokeWidth={ethStroke[1]} dot={false} />
                <Line type="monotone" dataKey={"usd_change"} stroke={usdStroke[0]} strokeWidth={usdStroke[1]} dot={false} />

            </LineChart  >

        </ResponsiveContainer >
    );

}
