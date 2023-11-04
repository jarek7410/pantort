import {bid, result, suit, vals, wind} from "./enumhelper";
export interface contract{
    number:number,//height
    suit:suit,
    double:bid,
    wind:wind
}
export interface lead{
    suit:suit,
    vals:vals
}
export interface outcome{
    tricks:number,
    result:result
}
export interface board{
    number:number,
    contract:contract,
    lead:lead,
    outcome:outcome
}