import {bid, suit} from "./enumhelper";

export const constractComposer = (contract) => {
    let composed:string;
    switch (contract.suit){
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
    }
    if(contract.number>7||contract.number<0) {
        throw new Error('Parameter is not a number!');
    }
    composed+=contract.number;
    switch (contract.double){
        case bid.xx:
            composed+="XX "
            break
        case bid.x:
            composed+="X  "
            break
        case bid.pass:
            composed+="   "
            break
    }
    composed+=contract.wind;
    return composed;
}