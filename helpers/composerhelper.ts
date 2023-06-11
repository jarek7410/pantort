import {bid, result, suit, vals, wind} from "./enumhelper";
import {contract, outcome} from "./interfaces";

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
export const scoreComposer = (contract: contract,outcome:outcome,vol:boolean) => {
    let score:number=0;
    if(outcome.result===result.under){
        let trik:number=vol?100:50;
        if(contract.double==bid.x){
            trik=vol?300:200;
            score=-100;
        }
        if(contract.double==bid.xx){
            trik=vol?400:300;
            score=-100;
        }
        score+=trik*outcome.tricks;
        return score
    }else if(outcome.result===result.over){
        let trik:number=30;
        if(contract.suit==suit.diamonds||contract.suit==suit.clubs){
            trik=20;
        }
        if(contract.double==bid.x){
            trik=vol?200:100;
        }
        if(contract.double==bid.xx){
            trik=vol?400:200;
        }
        score+=trik*outcome.tricks;

    }
    let fairytail:number=0;
    if(contract.suit==suit.nt){
        fairytail+=contract.number*30+10;
    }
    if(contract.suit==suit.hearts||contract.suit==suit.spades){
        fairytail+=contract.number*30;
    }
    if(contract.suit==suit.clubs||contract.suit==suit.diamonds){
        fairytail+=contract.number*20;
    }

    if(contract.double==bid.x){
        fairytail=fairytail*2;
        score+=50;
    }
    if(contract.double==bid.xx){
        fairytail=fairytail*4;
        score+=100;
    }
    if(fairytail>=100){
        score+=vol?500:300;
    }else{
        score+=50
    }


    if(contract.number>=7){
        score+=vol?1500:1000;
    }
    if(contract.number>=6&&contract.number<=6){
        score+=vol?1000:500;
    }
    // if(
    //     contract.number>=5
    //     // &&contract.number<=5
    //     &&(contract.suit==suit.clubs||contract.suit==suit.diamonds)){
    //     score+=vol?500:300;
    // }
    score+=fairytail

    return score;
}