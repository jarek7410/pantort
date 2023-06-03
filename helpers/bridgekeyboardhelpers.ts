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
  if(eventId<=10){
      return {
          type:[type.number,type.lead],
          number:eventId,
          lead:vals[eventId],
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
            type:[type.bid,type.lead],
            lead:vals.K,
            bid:bid.pass
        }
    }
    if(eventId===18){
        return {
            type:[type.result,type.lead],
            lead:vals.A,
            result:result.fair
        }
    }
    if(eventId===19){
        return {
            type:[type.result,type.lead],
            lead:vals.J,
            result:result.over
        }
    }
    if(eventId===20){
        return {
            type:[type.result,type.lead],
            lead:vals.Q,
            result:result.under
        }
    }
    if(eventId<=25){
        let output={type:type.suit, suit: undefined}
        switch (eventId){
            case 21:
                output.suit=suit.spades
                break;
            case 22:
                output.suit=suit.hearts
                break;
            case 23:
                output.suit=suit.diamonds
                break;
            case 24:
                output.suit=suit.clubs
                break;
            case 25:
                output.suit=suit.nt
                break;
        }
        return output;
    }
    return null;
}