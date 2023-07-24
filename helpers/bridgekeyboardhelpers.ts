import {bid, vals, result, suit, type, wind} from "./enumhelper"

export const decodeAction = (eventId:number) => {
    if(eventId<=0){
        return null;
    }
    if(eventId===1){
        return {
            type: [type.number],
            number: eventId

        }
    }
    if(eventId<10){
        return {
            type:[type.number,type.vals],
            number:eventId,
            level:eventId,
            val:eventId,
        }
    }
    if(eventId===10){
        return {
            type:[type.number,type.vals],
            number:0,
            level: eventId,
            val:eventId,
        }
    }
    if(eventId===11){
        return {
            type:[type.wind],
            wind:wind.NS
        }
    }
    if(eventId===12){
        return {
            type: [type.wind],
            wind: wind.EW,
        }
    }
    if(eventId===13){
        return{
            type: [type.OK],
        }
    }
    if(eventId===14){
        return {
            type:[type.CANCEL],
        }
    }
    if (eventId===15){
        return{
            type:[type.bid],
            bid:bid.xx
        }
    }
    if (eventId===16){
        return {
            type:[type.bid],
            bid:bid.x
        }
    }
    if(eventId===17){
        return {
            type:[type.bid,type.vals],
            val:vals.K,
            bid:bid.none
        }
    }
    if(eventId===18){
        return {
            type:[type.result,type.vals],
            val:vals.A,
            result:result.fair
        }
    }
    if(eventId===19){
        return {
            type:[type.result,type.vals],
            val:vals.J,
            result:result.over
        }
    }
    if(eventId===20){
        return {
            type:[type.result,type.vals],
            val:vals.Q,
            result:result.under
        }
    }
    if(eventId<=25){
        let output={type:[type.suit], suit: undefined}
        switch (eventId){
            case 21:
                output.suit=suit.SPADES
                break;
            case 22:
                output.suit=suit.HEARTS
                break;
            case 23:
                output.suit=suit.DIAMONDS
                break;
            case 24:
                output.suit=suit.CLUBS
                break;
            case 25:
                output.suit=suit.NT
                break;
        }
        return output;
    }
    return null;
}