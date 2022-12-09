// TO avoid azios getting stuck
//https://codesandbox.io/s/react-select-async-debounce-usecallback-oeixm?file=/src/App.js:372-419

// For improved transitions
//https://blog.bitsrc.io/how-to-implement-smooth-transitions-in-react-bd0497b06b8

//https://medium.com/path2code/create-suggested-search-bar-with-react-select-f24fa3c5c3b
//add async functionality

import React, {useCallback} from 'react';
import classes from "./Dropdown.module.scss";
import Cart_Sections from "../../Layout_elements/Cards_types/Cart_Sections"
import AsyncSelect from "react-select/async"
import axios from "axios";
import {debounce} from "lodash/function";
import {defaultOptionsNumber, backend_url} from "../../Global_variables"

const getAsyncOptions = async (searchValue) => {
    let card_fetch_options = {
        method: 'POST',
        body: searchValue
    };
    const fullResponse = await axios.post(backend_url+'/Collections/Collections_cards', card_fetch_options)
    const responseJSON = await fullResponse.data

    const return_array = []
    await responseJSON.map((card)=> { return_array.push({label : card.name, address: card.address, slug : card.slug, support_status : card.support_status, image_url : card.image_url,})})

    return return_array
}


function DropdownVTwo ( {title , setSelectedIndexAndStatus, themes } ) {


    //console.log(typeof setSelectedIndex)
    //console.log(CollectionsCards)


    const loadOptions = useCallback(
        debounce((inputText, callback) => {
            getAsyncOptions(inputText)
                .then((options) => callback(options));
        }, 1000),
        []
    );


    const [defaultOptions, setDefaultOptions] = React.useState()
    React.useEffect( ()=>{
        getDefaultOptions()
    }, [])


    const getDefaultOptions = async () =>  {

        let card_fetch_options = {
            method: 'POST',
            body: defaultOptionsNumber,
        };


        const fullResponse = await axios.post(backend_url+'/Collections/Collections_cards/Random', card_fetch_options)
        const responseJSON = await fullResponse.data
        const return_array = []

        for (let card of responseJSON){
            return_array.push({
                label : card.name,
                address: card.address,
                slug : card.slug,
                support_status : card.support_status,
                image_url : card.image_url,
            })}

        setDefaultOptions(return_array)
        return true

    }


    const handleChange = (selectedOption)=>{
       setSelectedIndexAndStatus(selectedOption)
    }


    // see this
    // https://stackoverflow.com/questions/51758932/react-select-background-color-issues
    const customStyles = {
        control: (base, state) => ({
            ...base,
            background: "var(--backgroundColorSecondary)",
            color: "var(--text-primary)",
            border : "none",
            boxShadow: "none",
            minHeight : "48px",
            fontSize : "var(--pFontSize)",
            fontFamily : "Arial, sans-serif",

            //boxShadow: null,
            "&:hover": { },
            "&:active": { boxShadow: "none", }
        }),
        placeholder: base =>({
            ...base,
            color: "var(--text-primary)",
        }),
        loadingMessage: base =>({
            ...base,
            color: "var(--darkGreyColor)",
        }),

        input: base =>({
            ...base,
            color: "var(--text-primary)",
        }),
        menu: base => ({
            ...base,
            background: "var(--backgroundColorSecondary)",
            color : "var(--text-primary)",
            "&:focus": {
                background: "var(--backgroundColorSecondary)",
            },

        }),
        menuList: base => ({
            ...base,
            background: "var(--backgroundColorSecondary)",
            borderRadius: "var(--secondaryBorderRadius)",
            color : "var(--text-primary)",
            overflowX : "clip",
        }),
        option: base =>({
            ...base,
            background: "var(--backgroundColorSecondary)",
            color : "var(--text-primary)",
            //marginBottom : "5px",
            borderRadius: "var(--secondaryBorderRadius)",
            fontSize : "var(--pFontSize)",
            fontFamily : "Arial, sans-serif",

            "&:hover": {
                background: "var(--backgroundColorSecondary)",
                border: "var(--borderColor) dashed ",
                color : "var(--redColor)",
            },
            "&:active": {
                color : "var(--redColor)",
                boxShadow: "none",
            }
        })

    };

    return(
        <Cart_Sections>
            <AsyncSelect
                placeholder={title}
                defaultOptions={defaultOptions}
                //defaultOptions={test}
                loadOptions={loadOptions}
                onChange={handleChange}
                isClearable={true}
                cacheOptions
                styles={customStyles}
                className={classes.wrapper}
                formatOptionLabel={card => (
                    <div className="country-option" style={{display : "flex"}}>
                        <img src={card.image_url} alt={card.label} width={20} height={20} style={{marginLeft : 5}}/>
                        <span>&ensp; {card.label}</span>
                    </div>
                )}
                minMenuHeight={48}
                controlShouldRenderValue={false}
            />
        </Cart_Sections>
    )}

export default DropdownVTwo

/*
formatOptionLabel={card => (
                    <div className="country-option" style={{display : "flex"}}>
                        <img src={card.image_url} alt={card.label} width={20} height={20} style={{marginLeft : 5}}/>
                        <span>&ensp; {card.label}</span>
                    </div>
                )}
 */

//CollectionsCards.map(async (opt) => ({ label: opt.Display_Name, value: opt.Address }));
/* if(CollectionsCards && CollectionsCards.length > 0){
    console.log("CollectionsCards", CollectionsCards)
CollectionsCards.map((card)=>{
    if(card.active_status.toLowerCase() === "not_active"){
        index.push({label : card.name, address: card.address, slug : card.slug, support_status : card.support_status})
    }
})}

 */

/*


Old version just a simple dropdown
 const index = []
    //CollectionsCards.map(async (opt) => ({ label: opt.Display_Name, value: opt.Address }));
    CollectionsCards.map((card)=>{
        if(card.active_status.toLowerCase() === "not_active"){
            index.push({label : card.name, address: card.address, slug : card.slug, support_status : card.support_status})
        }
    })


    return(
        <Cart_Sections>
            <Select
                className={classes.wrapper}
                classNamePrefix= {title}
                options= {index}
                onChange={opt => { setSelectedIndexAndStatus(opt.address, opt.support_status); console.log("dropdownVTWO",opt.label, opt.address, opt.slug, opt.support_status);  }}
            />
        </Cart_Sections>
    )}


working but does too many axios calls
const loadOptions =  (searchValue, callback) =>{
        setTimeout(async ()=>{
            try {

                if(searchValue){
                    let card_fetch_options = {
                        method: 'POST', //POST type
                        //mode: 'cors',    //Use Cors
                        //headers: {'Content-Type': 'application/json',},
                        body: searchValue
                    };
                    console.log("searchValue", searchValue)
                    const fullResponse = await axios.post('http://localhost:3001/Collections/Collections_cards', card_fetch_options)
                    const responseJSON = await fullResponse.data

                    const return_array = []
                    await responseJSON.map((card)=> { return_array.push({value : card.name, label : card.name,})})
                    console.log("return_array", return_array)

                    callback(return_array)
                }

            }
            catch (e) {
                console.log("error in fetching collections cards", e)
            }
        }, 0)
    }


 */
