import {domainMargin} from "../../Global_variables"

const maxYdomainHandler = (prop) => {
    return prop + (prop * domainMargin)
}
const minYdomainHandler = (prop) => {
    return prop - (prop * domainMargin)

}

export {minYdomainHandler, maxYdomainHandler,}
