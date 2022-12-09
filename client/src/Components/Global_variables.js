
//const backend_url = "http://localhost:3001"
const backend_url = "/api"

const internalLayoutPadding = [ "25px 45px",  "25px 10px"]
const mainPadding = [15, 10]

// Slider charts variables
const sliderWidth = [120, 100]
const sliderHeight = [90, 70]

// Charts variables
const chartStroke = (themes) => { if(themes === "light"){ return "var(--blackColor)" }  else { return "var(--whiteColor)" } }
const chartFill = "var(--greenColor)"
const chartFill_opacity = 0.75
const gridColors = (themes) => { if(themes === "light"){ return "var(--greyColor)" }  else { return "var(--greyColor)" } }
const tickStroke = (themes) => { if(themes === "light"){ return "var(--blackColor)" }  else { return "var(--whiteColor)" } }
const brushBackgroundColor = (themes) => { if(themes === "light"){ return "var(--whiteColor)" }  else { return "var(--blackColor)" } }
const chartsCursorsTooltip = { stroke: 'var(--text-primary)', strokeWidth: 1 }
const brushTravellerWidth = 8
const usdStroke = ["var(--yellowColor)", 3]
const ethStroke = ["var(--greenColor)", 3]
const looksrareStroke = ["var(--greenColor)", 3]
const openseaStroke = ["var(--blueColor)", 3]
const x2y2Stroke = ["var(--purpleColor)", 3]
const toFixedVariable = 2
const mainGraphsMargins = (fullWidth) => {
    if(fullWidth){return { top: 10,  right:25,  left: 10,  bottom: 0, }}
    else {return { top: 10,  right:0,  left: 10,  bottom: 0, }}
}

const GraphsYWidth = (fullWidth) => {if(fullWidth){return 50} else {return 30}}
const secondaryGraphsMargins = (fullWidth) => {
    if(fullWidth){return { top: 10,  right:25,  left: 10,  bottom: 0, }}
    else {return { top: 10,  right:20,  left: 15,  bottom: 0, }}
}

const secondaryGraphsYWidth = (fullWidth) => {if(fullWidth){return 50} else {return 30}}

const domainMargin = 0.01

// For initial values of dropdown
const defaultOptionsNumber = 6



export {
    backend_url,
    internalLayoutPadding,
    mainPadding,
    sliderWidth,
    sliderHeight,
    chartStroke,
    chartFill,
    chartFill_opacity,
    gridColors,
    tickStroke,
    brushBackgroundColor,
    brushTravellerWidth,
    toFixedVariable,
    usdStroke,
    ethStroke,
    looksrareStroke,
    openseaStroke,
    x2y2Stroke,
    defaultOptionsNumber,
    mainGraphsMargins,
    secondaryGraphsMargins,
    GraphsYWidth,
    domainMargin,
    chartsCursorsTooltip,
}

