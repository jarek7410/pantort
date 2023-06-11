import {bid, result, suit, vals, wind} from "./enumhelper";


export const movementExample={
    round:0,
    ns:0,
    ew:0,
}
export const boardExample={
    number:4, //1 to 32
    contract:{
        suit:suit.nt,
        number:1,
        double:bid.xx,
        wind:wind.N,
    },
    lead:{
        suit:suit.diamonds,
        vals:vals.A,
    },
    outcome:{
        tricks:1,
        result:result.fair,
    }
}
