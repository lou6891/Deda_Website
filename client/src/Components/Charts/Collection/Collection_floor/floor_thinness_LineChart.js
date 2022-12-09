import {Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import classes from "../../ChartsStyles.module.css"
import React from "react";
import {
    chartStroke,
    chartFill,
    chartFill_opacity,
    tickStroke,
    gridColors,
    secondaryGraphsMargins,
    GraphsYWidth,
    chartsCursorsTooltip,
} from "../../../Global_variables"
import {tickCounterHandler} from "../../chart_functions/tickCounterHandler"


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const commutative_nfts = payload[0].payload["cumulative_nfts_up_to_price"]
        //console.log("payload floor thinness", payload, "label", label)
        //                <p className="intro">{getIntroOfPage(label)}</p>
        //<img src={eth_symbol} alt={"Eth symbol"} style={{width : "15px", height : "15px"}}/>
        return (
            <div className={classes.tooltip} >

                <p className="tooltip_content" style={{textAlign : "center"}}>{commutative_nfts} NFTs are for sale<br/>below {label} ETH</p>
            </div>
        );
    }

    return null;
};



export default function Floor_thinness_chart ({Data, themes ,graphHeight, fullWidth}) {

    const values_array = []
    Data.map((i)=>{
        values_array.push(i["cumulative_nfts_up_to_price"])
    })
    const minYDomain = Math.min(...values_array)
    const maxYDomain = Math.max(...values_array)
    //console.log("values_array", values_array)
    //console.log("minYDomain", minYDomain)
    //console.log("maxYDomain", maxYDomain)

    return (
        <ResponsiveContainer width="100%" height={graphHeight} position={"relative"}>
            <AreaChart
                width = "100%"
                height= "100%"
                data={Data}
                margin={secondaryGraphsMargins(fullWidth)}
            >
                <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={gridColors(themes)}
                />
                <XAxis dataKey="price"
                       type="category"
                       tickFormatter = {(prop) => prop.toFixed(2)}
                       stroke={tickStroke(themes)}
                />

                <YAxis
                    type="number"
                    allowDataOverflow={false}
                    domain={[minYDomain, maxYDomain]}
                    tickCount={tickCounterHandler(minYDomain, maxYDomain)}
                    stroke={tickStroke(themes)}
                    width={GraphsYWidth(fullWidth)}
                />

                <Tooltip
                    cursor={chartsCursorsTooltip}
                    content={<CustomTooltip/>}
                />
                <Area type="monotone" dataKey="cumulative_nfts_up_to_price" stroke={chartStroke(themes)} fill={chartFill} fillOpacity={chartFill_opacity}/>


            </AreaChart>

        </ResponsiveContainer >
    );

}
