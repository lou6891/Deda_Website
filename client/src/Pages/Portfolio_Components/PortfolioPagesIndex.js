import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import {GiMeshNetwork} from "react-icons/gi"
import BarChartIcon from '@mui/icons-material/BarChart';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
//import {IoStatsChartSharp} from "react-icons/io"


//Nomi delle pagine e ralativi indirizzi da mandare al Lateral Navigation


export const PortfolioPagesIndex= [
    {
            ID: 'pg1',
            Name: 'Dashboard',
            Address: '#Dashboard',
            icon : <DashboardIcon/>,

    },
    {
            ID: 'pg2',
            Name: 'Floor',
            Address: '#Floor',
            icon : <CurrencyBitcoinIcon/>,

    },
    {
            ID: 'pg3',
            Name: 'Volume',
            Address: '#Volume',
            icon : <BarChartIcon/>,

    },
        {
            ID: 'pg4',
            Name: 'Holders',
            Address: '#Holders',
            icon : <GroupsIcon/>,

        },
        {
            ID: 'pg5',
            Name: 'Socials',
            Address: '#Socials',
            icon : <GiMeshNetwork/>,

        },
    ];

