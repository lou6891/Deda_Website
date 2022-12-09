import React  from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import {chartStroke} from "../../../Global_variables"


export default function Holders_distribution_chart ({Data, themes, graphHeight, fullWidth, multipleChartsContainerRef}) {
    //console.log("Holders distribution chart data", Data)

    //Chart Colors
    const NotActiveChartFill = "var(--greenColor)"
    const NotActiveChartFill_opacity = 0.3
    const ActiveChartFill = "var(--greenColor)"
    const MainTextColor = themes === "light" ? "var(--blackColor)" : "var(--whiteColor)"

    // Sizes
    const outerRadiusSize = fullWidth ? "80%" : "70%";
    const innerRadiusSize = fullWidth ? "42%" : "38%";
    const cyVariable = fullWidth ? "45%" : "52%";


    const [multipleChartsContainerWidth, setMultipleChartsContainerWidth] =  React.useState(null)
    React.useEffect(()=>{
        if(multipleChartsContainerRef){
            setMultipleChartsContainerWidth(multipleChartsContainerRef.current.offsetWidth)
        }
    }, [])

    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                    <tspan x={cx} y={cy-10}>NFTs Owned</tspan>
                    <tspan x={cx} y={cy+ 20}>{payload.balance}</tspan>
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={ActiveChartFill}
                    stroke={chartStroke(themes)}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={chartStroke(themes)}
                    stroke={chartStroke(themes)}
                />

                {
                    fullWidth ?
                        <g>
                            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={chartStroke(themes)} fill="none" />
                            <circle cx={ex} cy={ey} r={2} fill={chartStroke(themes)} stroke="none" />
                            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={MainTextColor}>{`N Holders ${value}`}</text>
                            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="var(--greyColor)">
                                {`(${(percent * 100).toFixed(2)}% of tot holders)`}
                            </text>
                        </g>

                        :

                        <g >
                            <text x={multipleChartsContainerWidth*0.38} y={graphHeight * 0.035}  fill={MainTextColor}>{`N Holders ${value}`}</text>
                            <text x={multipleChartsContainerWidth*0.32} y={graphHeight * 0.05} dy={18}  fill="var(--greyColor)">
                                {`(${(percent * 100).toFixed(2)}% of tot holders)`}
                            </text>
                        </g>
                }

            </g>
        );
    };


    const [state, setState] = React.useState({activeIndex : 0})


    let onPieEnter = (_, index) => {
        setState({
            activeIndex: index,
        });
    };



    return (
        <ResponsiveContainer width="100%" minHeight={graphHeight} >
            <PieChart
                width="100%"
                height="100%"
            >
                <Pie
                        activeIndex={state.activeIndex}
                        activeShape={(props) => renderActiveShape(props)}
                        onMouseEnter={(_, index) => onPieEnter(_, index)}
                        data={Data}
                        cx="50%"
                        cy={cyVariable}
                        labelLine={false}
                        innerRadius={innerRadiusSize}
                        outerRadius={outerRadiusSize}
                        fill="#8884d8"
                        dataKey="n_holders"
                >
                    {Data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={NotActiveChartFill} fillOpacity={NotActiveChartFill_opacity} stroke={chartStroke(themes)}/>
                    ))}

                </Pie>
            </PieChart>
        </ResponsiveContainer>
        );

}

/*
<g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                    <tspan x={cx} y={cy-10}>NFTs Owned</tspan>
                    <tspan x={cx} y={cy+ 20}>{payload.balance}</tspan>
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={ActiveChartFill}
                    stroke={chartStroke(themes)}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={chartStroke(themes)}
                    stroke={chartStroke(themes)}
                />

                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={chartStroke(themes)} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={chartStroke(themes)} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={MainTextColor}>{`N Holders ${value}`}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="var(--greyColor)">
                    {`(${(percent * 100).toFixed(2)}% of tot holders)`}
                </text>
            </g>
 */
