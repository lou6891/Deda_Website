import {Line, LineChart, ResponsiveContainer, YAxis} from "recharts";
import React from "react";
import {looksrareStroke, openseaStroke,  x2y2Stroke,} from "../../Global_variables"
import {maxYdomainHandler, minYdomainHandler} from "../chart_functions/mixMaxYDomains";


export default function MultipleLineChart_slider ({Data, themes, chartSelected }) {

    Data = Data.slice(0,10)
    const baseColor = themes === "light" ? "var(--blackColor)" : "var(--whiteColor)"
    const [color, setColor]= React.useState(baseColor)

    React.useEffect(()=>{
        setColor(baseColor)
    },[themes])


    const values_array = []
    Data.map((i)=>{
        values_array.push(i[chartSelected[0]], i[chartSelected[1]], i[chartSelected[2]])
    })
    const minYDomain = Math.min(...values_array)
    const maxYDomain = Math.max(...values_array)

    return (
        <ResponsiveContainer width="100%" height="100%" >
            <LineChart
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
                    domain={[minYdomainHandler(minYDomain) ,  maxYdomainHandler(maxYDomain)]}
                    //domain = {[minYDomain, maxYDomain]}
                />

                <Line type="monotone" dataKey={chartSelected[0]} stroke={color} strokeWidth={looksrareStroke[1]} dot={false} />
                <Line type="monotone" dataKey={chartSelected[1]} stroke={color} strokeWidth={openseaStroke[1]} dot={false} />
                <Line type="monotone" dataKey={chartSelected[2]} stroke={color} strokeWidth={x2y2Stroke[1]} dot={false} />

            </LineChart>

        </ResponsiveContainer >
    );

}