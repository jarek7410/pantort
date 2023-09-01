import {wind} from "./enumhelper";

export class CreatePlayDto {
    Open: boolean;
    Round: number;

    board: number;

    declarer: number;

    declarerWind: Wind;

    contract: string;

    result: string;

    lead: string;

    imp: number;
}
export enum Wind{
    NS="ns",
    EW="ew",
    E="e",
    W="w",
    N="n",
    S="s",
}
export const transW2w=(n:wind)=>{
    switch(n){
        case wind.E:
            return Wind.E
        case wind.W:
            return Wind.W
        case wind.N:
            return Wind.N
        case wind.S:
            return Wind.S
        case wind.NS:
            return Wind.NS
        case wind.EW:
            return Wind.EW
    }
}
export const  transw2W=(n:Wind)=>{
    switch(n){
        case Wind.E:
            return wind.E
        case Wind.W:
            return wind.W
        case Wind.N:
            return wind.N
        case Wind.S:
            return wind.S
        case Wind.NS:
            return wind.NS
        case Wind.EW:
            return wind.EW
    }
}