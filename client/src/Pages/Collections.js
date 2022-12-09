import React , {useEffect, useState,useRef} from 'react';
import {internalLayoutPadding} from "../Components/Global_variables"

import LateralNavigation from "../Components/Navigation/Lateral_Navigation/LateralNavigation";

import CollectionDashboard from "./Collections_Components/Pages/CollectionDashboard";
import CollectionFloor from "./Collections_Components/Pages/CollectionFloor";
import CollectionHolders from "./Collections_Components/Pages/CollectionHolders";
import Collection_support_warning from "./Collections_Components/Pages/Collection_support_warning"
import Collection_loading_screen from "./Collections_Components/Pages/Collection_loading_scree"

import {CollectionsPagesIndex} from "./Collections_Components/CollectionsPagesIndex";
import GoToTop from "../Components/Layout_elements/GoToTop";
import Footer from "../Components/Footer/Footer";
import DropdownVTwo from "../Components/Navigation/Dropdown/DropdownVTwo";
import useLocalStorage from "use-local-storage";
import Collection_call from "./Collections_Components/collection_call";
import Background_generator from "../Components/background/background_generator";
import WorkInProgress from "./About_Components/WorkInProgress";



function Collections ({themes, appSizes, fullWidth}){

    //console.log("theme", themes, "appSizes", appSizes)
    const graphHeight = 350

    //Elements for Dropdown ---------------------------------------------------------------------------------------
    // Index from dropdown, this sets which collection to fetch, in this case it starts with doodles
    const [selectedIndex, setSelectedIndex] = useLocalStorage('collection_card', "null"  )

    //const [selectedIndexStatus, setSelectedIndexStatus] = React.useState(null)
    //const [selectedIndexStatus, setSelectedIndexStatus] = useLocalStorage('collection_card', null  )

    // Function called from Dropdown component to change collection
    const indexSelected = (selected) => {
        let local_storage_obj = {
            address : selected.address,
            support_status : selected.support_status
        }
        setSelectedIndex(selected);}

    // Get the index from the db to be fetched to the dropdown element
    /*
    const [CollectionsCards, setCollectionsCards] = React.useState([]);

    React.useEffect(() => {
        async function fetchCollections () {
            const fullResponse = await axios.get("http://localhost:3001/Collections/Collections_cards")
            //const responseJSON = fullResponse.json();
            const responseJSON = await fullResponse.data;
            //console.log("responseJSON",responseJSON)
            setCollectionsCards(responseJSON);}
        fetchCollections()
    }, [])

     */


    // Data for elements _______________________________________________________________________________________________
    const [DashboardData, setDashboardData] = React.useState(null);
    const [FloorRecentData, setFloorRecentData] = React.useState(null);
    const [OwnersRecentData, setOwnersRecentData] = React.useState(null);
    React.useEffect(() => {
        async function fetchCollections() {
            const dash_data = await Collection_call(selectedIndex,"Dashboard","collection_description", null)
            setDashboardData(dash_data)
            const floor_data = await Collection_call(selectedIndex,"Floor","recent_listings_stats_wb", null)
            setFloorRecentData(floor_data)
            const owners_data = await Collection_call(selectedIndex,"Owners","recent_owners_stats_wb", null)
            setOwnersRecentData(owners_data)
        }
        fetchCollections()
    },[selectedIndex]);


    // Set lateral menu visible or not
    const [lateralMenuVisible, setLateralMenuVisible] = React.useState(false)
    const [isLateralMenuOpen, setIsLateralMenuOpen] = React.useState(false)
    React.useEffect(()=>{
        if(!fullWidth){
            setLateralMenuVisible(false)
            setIsLateralMenuOpen(false)
        }
        else if(fullWidth){
            setLateralMenuVisible(true)
            setIsLateralMenuOpen(false)
        }

    },[fullWidth])

    // App sizes and background elements -------------------------------------------------------------------------------
    const [divHeight, setDivHeight] = useState(0);
    const [divWidth, setDivWidth] = useState(0);
    const ref = useRef(null);
    // This sets the max with of all the elements inside the card section
    const ref_card = useRef(null);
    //const [cardContainerWidth, setCardContainerWidth] = useState(null)
    React.useEffect(() => {
        async function updateSize() {
            await setDivHeight(ref.current.offsetHeight);
            await setDivWidth(ref.current.offsetWidth);
            //setCardContainerWidth(ref_card.current.offsetWidth);
        }
        window.addEventListener('resize', updateSize);

        updateSize().catch(console.error);

        return async () => window.removeEventListener('resize', updateSize);
    }, [DashboardData, FloorRecentData, OwnersRecentData, isLateralMenuOpen]);



    const [lateralMenuWidth, setLateralMenuWidth] = React.useState((65+ 25))
    React.useEffect(()=>{

        const setLateral = async ()=>{
            if(isLateralMenuOpen){
                // if lateral menu is open
                // Set the total width of the lateral menu, 220px from css roo + padding (25 * 2)
                setLateralMenuWidth((220 + 25))
            }
            else if(!isLateralMenuOpen){
                // if lateral menu is closed
                // Set the total width of the lateral menu, 60px from css roo + padding (25 * 2)
                if(lateralMenuVisible){
                    setLateralMenuWidth((60 + 25))
                }
                else if(!lateralMenuVisible){
                    setLateralMenuWidth(0)
                }
            }
        }

        setLateral().catch(console.error)
    },[isLateralMenuOpen,lateralMenuVisible])

    const InternalLayoutMaxWidth = divWidth - lateralMenuWidth

    return (
        <div className={"app_internal_wrapper"} >

            <section id={"background"}>

                <Background_generator divHeight ={divHeight} divWidth={divWidth} fullWidth={fullWidth} key={Math.random()}></Background_generator>

                    <section id={"app"}
                             ref={ref}
                             style={{minHeight : (appSizes.height * 0.9) + "px" }}>

                        {lateralMenuVisible ?
                            <section id={"lateral_nav_section"} >
                            <LateralNavigation components = {CollectionsPagesIndex} divWidth={divWidth} isLateralMenuOpen={isLateralMenuOpen}
                                               setIsLateralMenuOpen={setIsLateralMenuOpen} lateralMenuWidth={lateralMenuWidth} />
                            </section> : ""}


                        <section id={"page-wrap"}>
                            {/*<Dropdown title={"Search Collections"} Collections_index={dataIndex} setSelectedIndex = {indexSelected}/> */}

                            <section id={"internal_layout"} style={{maxWidth : InternalLayoutMaxWidth, padding : divWidth > 1020 ? internalLayoutPadding[0] : internalLayoutPadding[1]}}>

                                <section id="Search" style={{position : "sticky", scrollMarginTop : "var(--scrollMargin)"}}>
                                    <DropdownVTwo
                                        title={"Type to search a collection or chose a random one!"}
                                        setSelectedIndexAndStatus = {indexSelected}
                                        themes={themes}
                                    />
                                </section>


                                {(()=>{
                                    //console.log("selectedIndex collections line 118", collectionData)
                                    if(selectedIndex === "null"){
                                        return(
                                            <div>
                                                <Collection_loading_screen/>
                                                <WorkInProgress/>
                                            </div>
                                        )
                                    }
                                    else if(selectedIndex.support_status === "not_supported"){
                                        return(
                                            <div>
                                                <Collection_support_warning/>,
                                            </div>
                                        )
                                    }
                                    else if(selectedIndex.support_status === "partially_supported"){
                                        return(
                                            <div>
                                                <Collection_support_warning/>,
                                            </div>
                                        )
                                    }
                                    else if(selectedIndex.support_status === "supported"){
                                        return(
                                            <div ref={ref_card}>
                                                <CollectionDashboard
                                                    themes={themes}
                                                    DashboardData={DashboardData}
                                                    fullWidth={fullWidth}
                                                />
                                                <CollectionFloor
                                                    selectedIndex={selectedIndex}
                                                    themes = {themes}
                                                    RecentData={FloorRecentData}
                                                    graphHeight={graphHeight}
                                                    fullWidth={fullWidth}
                                                />
                                                <CollectionHolders
                                                    selectedIndex={selectedIndex}
                                                    themes = {themes}
                                                    RecentData={OwnersRecentData}
                                                    graphHeight={graphHeight}
                                                    fullWidth={fullWidth}
                                                />
                                            </div>
                                        )
                                    }

                                })()}

                            </section>


                    </section>
                    <GoToTop/>
                </section>
            </section>

            <Footer/>
        </div>
    )
}

export default Collections;

/*


                <Icon_background divHeight ={divHeight} divWidth={divWidth}></Icon_background>


 */

/*
                                        <CollectionDashboard selectedIndex={selectedIndex} themes={themes} checker={checker}/>

                                        <CollectionFloor  selectedIndex={selectedIndex} themes = {themes} checker={checker}/>

                                        <CollectionFloor RecentData={FloorRecentData} selectedIndex={selectedIndex} themes = {themes}  support_status={selectedIndex.support_status} />

 <div className={"app_internal_wrapper"}>
            <section id={"app"}>
                <LateralNavigation Page_name = {CollectionsPagesIndex}/>
                <section id={"page-wrap"}>

<InternalLayout>
    <DropdownVTwo  title={"Search Collections"} setSelectedIndex = {indexSelected} CollectionsCards={CollectionsCards} />

    <CollectionDashboard  collectionData={collectionData}  />
    <CollectionFloor />
    <CollectionVolume />
    <CollectionHolders />
    <CollectionSocials />
    <CollectionFeelings />
</InternalLayout>

</section>
<GoToTop/>
</section>

<Footer/>
</div>
 */

{/*<Dropdown title={"Search Collections"} Collections_index={dataIndex} setSelectedIndex = {indexSelected}/> */}



//Send and Get collection data data ---------------------------------------------------------------------------------------
/*

    const [collectionData, setCollectionData] = React.useState([]);
    //Use a constant with options in order to pass to fetch all the info needed
    const options =  {
        method: 'POST', //POST type
        mode:'cors',    //Use Cors
        headers: {
            'Content-Type':'application/json',
        },
        //body: JSON.stringify({selectedIndex}), //send a Json file to Back End
        body : selectedIndex.address
    };

    try {


        React.useEffect(() => {
            async function fetchCollections() {
                //send a Json to GetCollections, using options
                const fullResponse = await axios.post('http://localhost:3001/Collections/Collection_Data', options)
                const responseJSON = await fullResponse.data
                //Collect the response and set data to that response
                //console.log("lol",responseJSON)
                setCollectionData(responseJSON);
                //console.log("The useEffect has acted")
            }
            fetchCollections()
        },[selectedIndex]);
        console.log("the data are", collectionData)
    }
    catch (error) {
        console.log("error in fetching data from back end")
        console.log(error);
    }

 */

