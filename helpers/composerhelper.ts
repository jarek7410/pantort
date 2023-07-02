import {bid, result, suit, vals, Vulnerability, wind} from "./enumhelper";
import {contract, outcome} from "./interfaces";

const isContractGood=(contract):boolean=>{
    if(!contract){
        return null;
    }
    if(contract.number>7||contract.number<0) {
        throw new Error('Parameter is not a good!');
    }
    return true

}
export const constractComposer = (contract) => {
    if(!isContractGood(contract)){
        return ""
    }
    let composed:string="";

    if(!isNaN(contract.number)){
        composed+=contract.number;
    }
    composed+=" ";
    switch (contract.suit){
        case suit.NT:
            composed+="NT"
            break;
        case suit.HEARTS:
            composed+="H"
            break;
        case suit.SPADES:
            composed+="S"
            break;
        case suit.CLUBS:
            composed+="C"
            break
        case suit.DIAMONDS:
            composed+="D"
            break
        default:
            break;
    }
    switch (contract.double){
        case bid.xx:
            composed+=" x"
            break
        case bid.x:
            composed+=" x"
            break
        default:
            composed+=""
            break
    }

    return composed;
}
export const windConposer=(contract)=>{
        switch (contract.wind){
            case wind.E:
            case wind.N:
            case wind.S:
            case wind.W:
                return contract.wind;
            default:
                return "";
    }
}
export const leadComposeer = (lead) => {
    if(!lead){
        return "";
    }
    let composed:string;
    switch (lead.suit){
        case suit.NT:
            composed="NT"
            break;
        case suit.HEARTS:
            composed="H"
            break;
        case suit.SPADES:
            composed="S"
            break;
        case suit.CLUBS:
            composed="C"
            break
        case suit.DIAMONDS:
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
            return composed
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
        if(contract.suit==suit.DIAMONDS ||contract.suit==suit.CLUBS){
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
    if(contract.suit==suit.NT){
        fairytail+=contract.number*30+10;
    }
    if(contract.suit==suit.HEARTS ||contract.suit==suit.SPADES){
        fairytail+=contract.number*30;
    }
    if(contract.suit==suit.CLUBS ||contract.suit==suit.DIAMONDS){
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
    score+=fairytail

    return score;
}
export const duplicateBoardsComposer = (board:number) => {
    let val:Vulnerability;
    let dealer:wind;
    if(board%16==1||board%16==8||board%16==11||board%16==14){
        val=Vulnerability.NONE;
    }else if(board%16==2||board%16==5||board%16==12||board%16==15){
        val=Vulnerability.NS;
    }else if(board%16==3||board%16==6||board%16==9||board%16==0){
        val=Vulnerability.EW;
    }else if(board%16==4||board%16==7||board%16==10||board%16==13){
        val=Vulnerability.BOTH;
    }
    if(board%4==1){
        dealer=wind.N;
    }else if(board%4==2){
        dealer=wind.E;
    }else if(board%4==3){
        dealer=wind.S;
    } else{
        dealer=wind.W;
    }
    return {dealer:dealer,vulnerability:val,board:Math.floor(board/16)}



}