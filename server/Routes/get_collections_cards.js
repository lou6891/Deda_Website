//This program gets the collection index of all the collections from the database

const express = require("express");
let router = express.Router();
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');


async function  get_collection_cards (card_name){

    if(card_name){

        try {

            const uri = process.env.MONGO_DB_URL;
            const client = new MongoClient(uri,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    serverApi: ServerApiVersion.v1
                });


            await client.connect()

            const database = await client.db("Collections_db")
            const collectionCards_db = await database.collection("working_collection_cards");
            const document = await collectionCards_db.find({$text: {$search: card_name}}).toArray()


            await client.close()

            const return_doc = []
            for (let card of document){
                if (card["active_status"] === "not_active"){
                    return_doc.push(card)
                }
            }


            return return_doc


        } catch (error) {
            console.log("Error wih mongo pull filtered collection cards: \n", error)
            return false
        }
    }
}

// Get Index names for Dropdown
router.post ('/Collections_cards',async (req, res) =>
{
    const card_name = req.body.body
    if(req.body.body.length > 2){
        const return_doc = await get_collection_cards(card_name)

        return res.json(return_doc)
    }
    else {
        return false
    }


});

module.exports = router;

