//This program retrieves all the information of ollection floor relative to a collection
const express = require("express");
let router = express.Router();
const cors = require('cors')
require('dotenv').config()


const { MongoClient, ServerApiVersion } = require('mongodb');


async function get_collection_owners (Collection_selected,Db_selected){

    if(Collection_selected && Db_selected){

        try{

            const uri = process.env.MONGO_DB_URL;
            const client = new MongoClient(uri,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    serverApi: ServerApiVersion.v1
                });

            await client.connect()
            const database = await client.db("Collections_stats_db")

            const document = await database.collection(Db_selected).findOne({
                "address": Collection_selected.toLowerCase()
            })

            return document

        }
        catch (error){
            console.log("Error wih mongo pull collection owners: \n", error)
            return false
        }
    }
}

// get data  from the front end
router.post("/CollectionData/Owners", async (req , res) =>{

    //Get the data, the Selected Index from the body of the request
    const Collection_selected = req.body.body[0]
    const Db_selected = req.body.body[1]

    const return_doc = await get_collection_owners(Collection_selected, Db_selected)
    return res.json(return_doc)

});


//{"Collection_Name": [Collection_selected]}

// Create the page for GetCollections
router.get('/CollectionData/Owners', (req, res) => {
    res.json()
});

module.exports = router;