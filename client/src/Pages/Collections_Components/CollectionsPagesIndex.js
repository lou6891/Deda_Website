import React from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';


export const CollectionsPagesIndex = [
    {
        ID: 'pg1',
        Name: 'Search Collection',
        Address: '#Search',
        icon : <SearchIcon/>,
        // Manda al Dropdown
    },
    {
        ID: 'pg2',
        Name: 'Dashboard',
        Address: '#Dashboard',
        icon : <DashboardIcon/>,

    },
    {
        ID: 'pg3',
        Name: 'Floor',
        Address: '#Floor',
        icon : <CurrencyBitcoinIcon/>,

    },
    {
        ID: 'pg4',
        Name: 'Holders',
        Address: '#Holders',
        icon : <GroupsIcon/>,

    },
];

/*
 {
        ID: 'pg1',
        Name: 'Search Collection',
        Address: '#Search',
        icon : null,
        // Manda al Dropdown
    },
    {
        ID: 'pg2',
        Name: 'Dashboard',
        Address: '#Dashboard',
        icon : null,

    },
    {
        ID: 'pg3',
        Name: 'Floor',
        Address: '#Floor',
        icon : null,

    },
    {
        ID: 'pg4',
        Name: 'Volume',
        Address: '#Volume',
        icon : null,

    },
    {
        ID: 'pg5',
        Name: 'Holders',
        Address: '#Holders',
        icon : <GroupsIcon/>,

    },
    {
        ID: 'pg6',
        Name: 'Socials',
        Address: '#Socials',
        icon : null,

    },
    {
        ID: 'pg7',
        Name: 'Feelings',
        Address: '#Feelings',
        icon : null,

    },
 */