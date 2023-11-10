import {wind} from "../../../helpers/enumhelper";
import {Names} from "./names";

export const position = (windi:wind,BoardNumber:number,names:Names)=>{
    if(windi===wind.N){
        return names.movable[0].player
    }
    if(positionCount(windi,BoardNumber)===1){
        return names.movable[1].player
    }
    if(positionCount(windi,BoardNumber)===2){
        return names.movable[2].player
    }
    if(positionCount(windi,BoardNumber)===3){
        return names.movable[3].player
    }
}
export const positionCount = (windi:wind,BoardNumber:number):number=>{
    const BN= (Math.floor((BoardNumber-1) / 4)%3 )+1;
    console.log("positionCount",windi,BoardNumber,"BN",BN,"calc",Math.floor((BoardNumber-1) / 4))
    if(windi===wind.S){
        return BN;
    }
    if(windi===wind.W){
        if(BN===1){
            return 2
        }
        return 1
    }
    if(windi===wind.E){
        if(BN===3){
            return 2
        }
        return 3
    }
    return 0
}
export const moves =(PNumber:number,BoardNumber:number):wind=> {
    const BN= (Math.floor((BoardNumber-1) / 4)%3 )+1;
    console.log("moves",PNumber,BoardNumber,"BN",BN,"calc",Math.floor((BoardNumber-1) / 4))

    if (PNumber === 1) {
        if(BN===1){
            return wind.S
        }
        return wind.W
    }
    if (PNumber === 2) {
        if(BN===1){
            return wind.W
        }
        if(BN===2){
            return wind.S
        }
        return wind.E
    }
    if (PNumber === 3) {
        if(BN===3){
            return wind.S
        }
        return wind.E
    }
    return wind.N
}
