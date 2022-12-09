

export default function prime_numbers_analyzer (number) {
    let isPrime = true
    let primeDivisorChecker = false
    if(number > 1){
        isPrime = prime_number_check(number, isPrime)

        if (isPrime === true) { number ++ }

        while (primeDivisorChecker === false){
            isPrime = prime_number_check((number / 2), true)
            if (isPrime === true){ number = number + 2; primeDivisorChecker = true}
            else {primeDivisorChecker = true}
        }
    }

    return number
}

function prime_number_check (number, isPrime){


    // looping through 2 to number-1
    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            isPrime = false;
            break;
        }
    }

    return isPrime
}