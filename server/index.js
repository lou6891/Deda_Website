const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require('cors')
require('dotenv').config()
app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json({}));

// Collection cards, first the one selected, the other random
const Get_Collections_Index = require ("./Routes/get_collections_cards")
const Get_Random_Collection_cards = require("./Routes/Collections/Get_random_collection_cards")

// Get collection Data
const Get_collection_dashboard = require("./Routes/Collections/Get_collection_dahsboard")
const Get_collection_floor = require("./Routes/Collections/Get_collections_floor")
const Get_collection_owners = require("./Routes/Collections/Get_collections_owners")





//----------------------------------------------------------------------------------------------------------------------
// ALl the use that are related with getting data from the database to the front end
app.use("/Collections", Get_Collections_Index)
app.use("/Collections", Get_Random_Collection_cards)
// Get the collection index for dropdown and further navigation, full path /Collections/Index

// COLLECTION DATA -----------------------------------------------------------------------------------------------------
// Collection dashboard component
app.use("/Collections",Get_collection_dashboard)
// Collection floor component
app.use("/Collections",Get_collection_floor)
// Collection Owners component
app.use("/Collections",Get_collection_owners)





//OLD
const Get_Collections = require ("./Routes/Get_Collections_old")



app.use("/Collections", Get_Collections_Index)
// Get the collection index for dropdown and further navigation, full path /Collections/Index
app.use("/Collections", Get_Collections)
// Get the collection obtaining relative data from the database, full path /Collections/Collection_Data
//app.use("", Etherscan)
//Get the latest ETH price from the database, full path /Eth
//----------------------------------------------------------------------------------------------------------------------

//app.use("", Opensea)
//USe the Opensea, full path /Opensea
//app.use("", Alchemy)
//Use the Alchemy, full path /alchemy


//--------------------------------------------------------------------------------------------------------------------
//app.use("/test", test)
//Use the Alchemy, full path /test/test
//app.use("/test", opensea_test)
//Use the Alchemy, full path /test/opensea
//--------------------------------------------------------------------------------------------------------------------

// Just for fun, could be deleted

app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/API", (req, res) => {
    res.json({ message: "Hello from api!" });
});



//-----------------------------------------------------------------------------------------------------------------
//app.use("/add", add);

//-----------------------------------------------------------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});





