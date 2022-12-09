import { BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer,CartesianAxis, Tooltip , Legend } from 'recharts';
import classes from "../ChartsStyles.module.css"
import React from "react";


export default function BarChart_slider ({Data, themes, isActive}) {
    //console.log("TEST FLOOR WALL", Data)

    Data = Data.slice(0,10)
    const baseColor = themes === "light" ? "var(--blackColor)" : "var(--whiteColor)"
    const [color, setColor]=React.useState(baseColor)
    React.useEffect(()=>{setColor(baseColor)},[themes])

    return (
        <ResponsiveContainer width="100%" height="100%" >
            <BarChart
                width = "100%"
                height= "100%"
                data={Data}
                cursor={"pointer"}
                onMouseEnter={()=>{setColor("var(--yellowColor)")}}
                onMouseLeave={()=>{setColor(baseColor)}}
            >
                <YAxis
                    tick={false}
                    width={1}
                    stroke={color}
                />

                <Bar dataKey={"n_nfts_in_range"}  stroke={color} fill={color} cursor={"pointer"} />

            </BarChart>

        </ResponsiveContainer >
    );
}
