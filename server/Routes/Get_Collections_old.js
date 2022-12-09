//This program retrieves all the information of a collection that are stored in a database
const express = require("express");
let router = express.Router();
const cors = require('cors')
require('dotenv').config()


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_DB_URL;
const client = new MongoClient(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1
    });

//Set the initial state of selected collection to null, so when the server receives a collection it starts working
let Collection_selected = null;
let Db_selected

// get data  from the front end
router.post("/Collection_Data", (req , res) =>{
    console.log("I got the collection address from dropdown")
    console.log(req.body);
    //Get the data, the Selected Index from the body of the request
    Collection_selected = req.body.body[0]
    Db_selected = req.body.body[1]

    console.log("Collection_selected", Collection_selected)
    console.log("Db_selected", Db_selected)

    if (Collection_selected && Db_selected) {
        MongoClient.connect(uri, async function (err, db = client.db("Collections_stats_db")) {

            if (err) {
                console.log("Unable to connect to server", err);
                db.close().then(() => res.send("Unable to connect to server"))


            } else {
                // ->>>>>>> Rememebr to change Collection_Name to Address
                //If error message error, if not get all the collections ina  form of array
                console.log("Connected to server");
                console.log("collection selected", Collection_selected)

                const Collections_stats_db = db.db("Collections_stats_db")

                const document = await Collections_stats_db.collection(Db_selected).findOne({
                    "address": Collection_selected.toLowerCase()
                })

                return res.json(document)




            }
        });
    }
});


//{"Collection_Name": [Collection_selected]}

// Create the page for GetCollections
router.get('/Collection_Data', (req, res) => {
    res.json()
});

module.exports = router;