
const yTickFormatter = (yTick) =>{
    let number = null
    let index = null
    let isNegative = null

    if(typeof yTick !== "number"){ number = parseInt(yTick) }
    else{ number = yTick }

    if (number < 0) { number = number * -1; isNegative = true}

    if (number === 0){
        yTick = number
    }
    else if(number > 0 && number < 1){
        yTick = number.toFixed(2)
    }
    else if(number >= 1 && number < 10){
        yTick = number.toFixed(1)
    }
    else if(number >= 10 && number < 100){
        yTick = number.toFixed(1)
    }
    else if(number >= 100 && number < 1000){
        yTick = Math.ceil(number)
    }
    else if(number === 1000)
    { number = (number / 1000).toString();
        index = number.indexOf(".")
        yTick = number.slice(0,index+2) + "K" }

    else if(number > 1000 && number < 10000)
    { number = (number / 1000).toString();
        index = number.indexOf(".")
        yTick = number.slice(0,index+2) + "K" }

    else if (number >= 10000 && number < 100000)
    { number = (number / 1000).toString();
        index = number.indexOf(".")
        yTick = number.slice(0,index+2) + "K" }

    else if (number === 100000)
    { number = (number / 1000).toString();
        index = number.indexOf(".")
        yTick = number.slice(0,index+2) + "K" }

    if(isNegative){
        return yTick * -1
    }
    else{
        return yTick
    }

}

export {yTickFormatter}
