import axios from "axios";
import React from 'react';
import {backend_url} from "../../Components/Global_variables"


async function Collection_call(selectedIndex, component , db_collection, type){
    //console.log("Collection call called : ->db_collection", db_collection)
    //const [collectionData, setCollectionData] = React.useState([]);
    //Use a constant with options in order to pass to fetch all the info needed
    const options =  {
        method: 'POST', //POST type
        mode:'cors',    //Use Cors
        headers: {
            'Content-Type':'application/json',
        },
        body : [selectedIndex.address, db_collection, component]
    };

    try {
        const url = backend_url + '/Collections/CollectionData/'+ component
        const fullResponse = await axios.post(url, options)
        const responseJSON = await fullResponse.data

        return (responseJSON)
    }
    catch (error) {
        console.log("error in fetching data from back end")
        console.log(error);
    }
}
export default Collection_call

