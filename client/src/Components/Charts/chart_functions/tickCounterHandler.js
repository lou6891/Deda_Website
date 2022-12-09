import prime_numbers_analyzer from "../../supplementary_functions/prime_number_analyzer";

const tickCounterHandler = (minYDomain, maxYDomain) => {

    let number = maxYDomain - minYDomain
    number = prime_numbers_analyzer(number)

    let tick_number = 10
    let counter = 1

    while (counter <= 20 ){
        counter ++
        if((number % counter === 0) ){
            tick_number = counter
        }
    }

    if(tick_number > 2 ){
        return tick_number
    }
    else {
        return tick_number + 1
    }

}

export {tickCounterHandler}