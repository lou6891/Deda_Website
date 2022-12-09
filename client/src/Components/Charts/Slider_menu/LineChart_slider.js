import {Area, AreaChart, ResponsiveContainer, YAxis} from "recharts";
import React from "react";
import classes from "../ChartsStyles.module.css";
import {maxYdomainHandler, minYdomainHandler} from "../chart_functions/mixMaxYDomains";


export default function LineChart_slider ({Data, themes, chartSelected }) {

    Data = Data.slice(0,10)
    const baseColor = themes === "light" ? "var(--blackColor)" : "var(--whiteColor)"
    const [color, setColor]= React.useState(baseColor)

    React.useEffect(()=>{
        setColor(baseColor)
    },[themes])

    const values_array = []
    Data.map((i)=>{
        values_array.push(i[chartSelected])
    })
    const minYDomain = Math.min(...values_array)
    const maxYDomain = Math.max(...values_array)


    return (
        <ResponsiveContainer width="100%" height="100%" >
            <AreaChart
                width = "100%"
                height= "100%"
                data={Data}
                cursor={"pointer"}
                onMouseEnter={()=>{setColor("var(--yellowColor)")}}
                onMouseLeave={()=>{setColor(baseColor)}}
                //onClick={()=> setColor("var(--greenColor)")}
            >
                <YAxis
                    tick={false}
                    width={1}
                    stroke={color}
                    domain={[]}
                />

                <Area type="monotone" dataKey={chartSelected} stroke={color} fill={color} cursor={"pointer"} />

            </AreaChart>

        </ResponsiveContainer >
    );

}