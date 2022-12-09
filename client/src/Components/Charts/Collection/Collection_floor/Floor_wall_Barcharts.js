import { BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip , Legend } from 'recharts';
import {
    chartStroke,
    chartFill,
    chartFill_opacity,
    tickStroke,
    gridColors,
    toFixedVariable,
    secondaryGraphsMargins,
    GraphsYWidth,
    chartsCursorsTooltip,
} from "../../../Global_variables"
import classes from "../../ChartsStyles.module.css"
import React from "react";


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const initial_range = (payload[0].payload["starting_range"]).toFixed(toFixedVariable)
        const ending_range = (payload[0].payload["ending_range"]).toFixed(toFixedVariable)
        const n_nfts = (payload[0].payload["n_nfts_in_range"]).toFixed(toFixedVariable)
        return (
            <div className={classes.tooltip}>
                <p className="tooltip_content" style={{textAlign : "center"}}>{n_nfts} NFTs are on sale<br/>between {initial_range} and {ending_range} ETH</p>
            </div>
        );
    }

    return null;
};

export default function Floor_wall_chart ({Data, graphHeight, themes, fullWidth}) {
    //console.log("TEST FLOOR WALL", Data)


    return (
        <ResponsiveContainer width="100%" height={graphHeight} position={"relative"}>
            <BarChart
                width = "100%"
                height= "100%"
                data={Data}
                margin={secondaryGraphsMargins(fullWidth)}
            >
                <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={gridColors(themes)}
                />
                <XAxis
                    dataKey="ending_range"
                    stroke={tickStroke(themes)}
                />

                <YAxis
                    stroke={tickStroke(themes)}
                    width={GraphsYWidth(fullWidth)}
                    allowDataOverflow={false}
                />

                <Tooltip
                    cursor={chartsCursorsTooltip}
                    content={<CustomTooltip/>}
                />
                <Bar dataKey={"n_nfts_in_range"}  stroke={chartStroke(themes)} fill={chartFill} fillOpacity={chartFill_opacity} />

            </BarChart>

        </ResponsiveContainer >
    );

}
/*
 width={0}
                    tick={false}
 */