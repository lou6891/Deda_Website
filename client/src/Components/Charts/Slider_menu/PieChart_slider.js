import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import {chartStroke} from "../../Global_variables";


export default function PieChart_slider  ({Data, themes, chartSelected}) {

    //Data = Data.slice(0,10)
    const baseColor = themes === "light" ? "var(--blackColor)" : "var(--whiteColor)"
    const stroke = themes === "light" ? "var(--whiteColor)" : "var(--blackColor)"
    const [color, setColor]= React.useState(baseColor)

    React.useEffect(()=>{
        setColor(baseColor)
    },[themes])

    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];

    return (
        <ResponsiveContainer width="100%" height= "100%">
            <PieChart
                width="100%"
                height= "100%"

            >
                <Pie
                    data={data}
                    cx="50%%"
                    cy="50%"
                    labelLine={false}
                    outerRadius= "100%"
                    dataKey="value"
                    fill={"blue"}
                    onMouseEnter={()=>{setColor("var(--yellowColor)")}}
                    onMouseLeave={()=>{setColor(baseColor)}}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={color}  stroke={stroke}/>
                    ))}

                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );

}