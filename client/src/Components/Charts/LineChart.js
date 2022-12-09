/*//import {} from 'victory'
import React from "react";
//import * as V from 'victory';
//import { VictoryBar, VictoryChart , VictoryAxis } from 'victory';
//import {Chart as ChartJS} from 'chart.js/auto'
import {ResponsiveLine} from '@nivo/line'


const FakeData = [
    {
        id: 'Floor',
        color: 'red',
        data: [
            {
                Year: 2010,
                Floor: 20,
            },
            {
                Year: 2011,
                Floor: 21,
            },
            {
                'Year': 2012,
                'Floor': 22,
            },
            {
                'Year': 2013,
                'Floor': 23,
            },
        ],

    },
]
export const LineChart = () => {
    return (
            <div className={'coso'}>
                <ResponsiveLine
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    data={lolita}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: true,
                        reverse: false
                    }}
                    yFormat=" >-.2f"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'transportation',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    xisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'count',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}

                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}

                />

            </div>

    )
}

const lolita = [
    {
        "id": "Floor",
        "color": "Red",
        "data": [
            {
                "x": 2009,
                "y": 235
            },
            {
                "x": 2010,
                "y": 127
            },
            {
                "x": 2011,
                "y": 162
            },
            {
                "x": 2012,
                "y": 243
            },
            {
                "x": 2013,
                "y": 273
            },
            {
                "x": 2014,
                "y": 196
            },
            {
                "x": 2015,
                "y": 5
            },
            {
                "x": 2016,
                "y": 78
            },
            {
                "x": 2017,
                "y": 67
            },
            {
                "x": 2018,
                "y": 142
            },
            {
                "x": 2019,
                "y": 157
            },
            {
                "x": 2020,
                "y": 15
            }
        ]
    },
    ] */