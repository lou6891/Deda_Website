import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer , Legend, BarChart , Bar} from 'recharts';
import Moment from 'moment';
// Brush example
// https://codesandbox.io/s/0c42k?file=/src/App.js:611-621
// https://www.geeksforgeeks.org/create-a-brush-bar-chart-using-recharts-in-reactjs/

// Time series example
// https://github.com/recharts/recharts/issues/956

// Legend example
// https://codesandbox.io/s/k5no4l0n97?file=/SampleChart.jsx


const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

/*

export default class Floor_wall_chart extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/stacked-area-chart-ix341';

    render() {
        return (
            <div width="100%" height="100rem">
                <AreaChart
                    width={500}
                    height={400}
                    data={this.props.Data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="cumulative_nfts_up_to_price" stackId="1" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>

            </div>
        );
    }
}

 */

function tick_sorter (date){

}

//export default class Floor_chart extends PureComponent {
export default function Floor_chart ({Data}) {




        return (
            <ResponsiveContainer width="100%" height={300} >
                <AreaChart
                    width = "100%"
                    height={400}
                    data={Data}
                    margin={{
                        top: 10,
                        right:30,
                        left: -10,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x_axis"
                           type="category"
                           tickFormatter = {(unixTime) => Moment(unixTime).format('DD/MM')}

                    />
                    <Legend
                        verticalAlign="top"
                        height={36}

                    />
                    <YAxis
                        tickCount={10}
                    />
                    <Tooltip />
                    <Area type="monotone" dataKey="lowest_floor_price_eth" stackId="1" stroke="#000000" fill="#000000" />


                </AreaChart >

            </ResponsiveContainer >
        );

}
/*
<Area type="monotone" dataKey="lowest_floor_price_eth" stackId="1" stroke="#8884d8" fill="#443423" />
                    <Area type="monotone" dataKey="opensea_floor_price_eth" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="opensea_floor_price_usd" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="looksrare_floor_price_eth" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="looksrare_floor_price_usd" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="x2y2_floor_price_eth" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="x2y2_floor_price_usd" stackId="1" stroke="#8884d8" fill="#8884d8" />

<div width="100%" height="100rem">
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>

            </div>
 */
//export default area_chart()

