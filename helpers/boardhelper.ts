import {type} from "./enumhelper";

export const boardUpdate = (board, action,focus) => {
    if (action.type.includes( type.number)) {
        if(typeof(board.number)==="string"){
            board.number="";
        }
        board.number=numberWriter(board.number,action);
        if(board.number>32){
            board.number="TOO BIG";//TODO: add acceptable error message
        }
    }
    return [board,focus];
}
const numberWriter = (number:number,action) => {
    if(!number) {
        console.log("action.number===0");
        number = action.number;
    }else{
        number = number*10+action.number;
    }
    return number;
}