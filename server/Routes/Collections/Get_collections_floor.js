//This program retrieves all the information of collection floor relative to a collection
const express = require("express");
let router = express.Router();
require('dotenv').config()


const { MongoClient, ServerApiVersion } = require('mongodb');


async function get_collection_floor (Collection_selected,Db_selected){
    if (Collection_selected && Db_selected) {
        try {

            const uri = process.env.MONGO_DB_URL;

            const client = new MongoClient(uri,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    serverApi: ServerApiVersion.v1
                });


            await client.connect()

            const Collections_stats_db = await client.db("Collections_stats_db")

            const document = await Collections_stats_db.collection(Db_selected).findOne({
                "address": Collection_selected.toLowerCase()
            })

            const token_count = await Collections_stats_db.collection("collection_description").findOne(
                {"address": Collection_selected.toLowerCase(),},
                {projection: {token_count: 1, _id: 0}}
            )
            document.token_count = token_count["token_count"]

            const collections_db = await client.db("Collections_db")
            const support_status = await collections_db.collection("working_collection_cards").findOne(
                {"address": Collection_selected.toLowerCase(),},
                {projection: {support_status: 1, _id: 0}}
            )


            // Creates the listed_graph_array to send for the graph
            if (support_status["support_status"].toLowerCase() === "supported") {
                if (Db_selected === "recent_listings_stats_wb") {
                    document["data"].map((i) => {
                        const data = JSON.parse(i["data"])
                        i.listing_to_token = ((data["number_of_listings"] / parseInt(token_count["token_count"])) * 100).toFixed(2)
                    })
                }
            }

            await client.close()

            return document


        } catch (error) {
            console.log("Error wih mongo pull random collections floor: \n", error)
            return false
        }
    }
}

// get data  from the front end
router.post("/CollectionData/Floor", async(req , res) =>{
    //console.log("Get collection floor")

    //Get the data, the Selected Index from the body of the request
    const Collection_selected = req.body.body[0]
    const Db_selected = req.body.body[1]

    const return_doc = await get_collection_floor(Collection_selected,Db_selected)
    return res.json(return_doc)

});


// Create the page for GetCollections
router.get('/CollectionData/Floor', (req, res) => {
    res.json()
});

module.exports = router;

/*
 {token_count : 1 , _id : 0 ,address : 0,banner_image_url : 0, description : 0, discord_url : 0, image_url : 0,  name : 0,  royalties : 0,
                        sample_images : 0,  slug : 0,   twitter_username : 0,  website_url : 0, looksrare_floor_price_eth : 0 ,  looksrare_floor_price_usd : 0,
                        lowest_floor_price_eth: 0, lowest_floor_price_usd: 0, number_of_listings:0, opensea_floor_price_eth: 0, opensea_floor_price_usd: 0 , x2y2_floor_price_eth: 0,
                        x2y2_floor_price_usd: 0 , total_owners: 0, unique_owners: 0}
 */