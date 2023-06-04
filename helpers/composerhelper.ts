import {bid, result, suit, vals, wind} from "./enumhelper";

export const constractComposer = (contract) => {
    if(!contract){
        return "";
    }
    let composed:string="";
    if(contract.number>7||contract.number<0) {
        throw new Error('Parameter is not a number!');
    }
    if(!isNaN(contract.number)){
        composed+=contract.number;
    }
        switch (contract.suit){
            case suit.nt:
                composed+="NT"
                break;
            case suit.hearts:
                composed+="H"
                break;
            case suit.spades:
                composed+="S"
                break;
            case suit.clubs:
                composed+="C"
                break
            case suit.diamonds:
                composed+="D"
                break
            default:
                break;
        }
    switch (contract.double){
        case bid.xx:
            composed+="XX "
            break
        case bid.x:
            composed+="X  "
            break
        default:
            composed+="   "
            break
    }
    switch (contract.wind){
        case wind.E:
        case wind.N:
        case wind.S:
        case wind.W:
            composed += contract.wind;
    }
    return composed;
}
export const leadComposeer = (lead) => {
    if(!lead){
        return "";
    }
    let composed:string;
    switch (lead.suit){
        case suit.nt:
            composed="NT"
            break;
        case suit.hearts:
            composed="H"
            break;
        case suit.spades:
            composed="S"
            break;
        case suit.clubs:
            composed="C"
            break
        case suit.diamonds:
            composed="D"
            break
        default:
            composed=""
    }
    switch (lead.vals) {
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            composed+=lead.vals
            break
        case vals.T:
            composed+="10"
            break
        case vals.J:
            composed+="J"
            break
        case vals.Q:
            composed+="Q"
            break
        case vals.K:
            composed+="K"
            break
        case vals.A:
            composed+="A"
            break
    }
    return composed
}
export const outcomeComposer = (outcome) => {
    if(!outcome){
        return "";
    }

    let composed:string;
    switch (outcome.result){
        case result.under:
            composed="-"
            break
        case result.over:
            composed="+"
            break
        case result.fair:
            composed="="
            return composed
        default:
            composed=""
    }
    if(!isNaN(outcome.tricks)&&outcome.result) {
        composed += outcome.tricks
    }
    return composed
}