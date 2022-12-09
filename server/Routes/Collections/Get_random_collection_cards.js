const express = require("express");
let router = express.Router();
require('dotenv').config()
const cors = require('cors')


const { MongoClient, ServerApiVersion } = require("mongodb");
//const { MongoClient, ServerApiVersion } = require('mongodb');

async function get_random_collection_cards (nCardsToSelect) {
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
        const document = await collectionCards_db.aggregate(
            [
                { $match: { support_status : "supported" } },
                { $sample: { size: nCardsToSelect },}
                ]
        ).toArray()

        await client.close()
        return document


    } catch (error) {
        console.log("Error wih mongo pull random collections cards: \n", error)
        return false
    }

}

router.post("/Collections_cards/Random", async (req , res) =>{
    const nCardsToSelect = req.body.body

    const return_doc = await get_random_collection_cards(nCardsToSelect)

    return res.json(return_doc)
});


//{"Collection_Name": [Collection_selected]}

// Create the page for GetCollections
router.get('/Collections_cards/Random', (req, res) => {
    res.json({ message: "Hello from server!" });
});

module.exports = router;
