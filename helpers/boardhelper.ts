import {bid, Boardsceen, suit, type, wind} from "./enumhelper";


//this is old code
export const boardUpdate = (board, action,focus) => {
    if (action.type.includes( type.number)&&focus===Boardsceen.board) {
        if(typeof(board.number)==="string"){
            board.number="";
        }
        board.number=numberWriter(board.number,action);
        if(board.number>32){
            board.number="";//TODO: add acceptable error message
        }
    }
    if(focus===Boardsceen.contract){
        board=contractHenler(board,action);
    }
    if(focus===Boardsceen.lead){
        board=leadHandler(board,action);
    }
    if(focus===Boardsceen.result){
        board=resultHandler(board,action);
    }

    if ((Boardsceen.DONE !== focus) && action.type.includes(200)) {
        focus+=1;
        //TODO: add focus validation and guards
    }
    if (action.type.includes(400)&&focus!==Boardsceen.BACK) {
        focus -= 1;
        //TODO: delete last input data
    }
    return [board,focus];
}
const resultHandler = (board, action) => {
    if(action.type.includes(type.result)){
        board.outcome.result=action.result;
    }
    if(action.type.includes(type.number)){
        board.outcome.tricks=numberWriter(board.outcome.tricks,action);
        if(board.outcome.tricks>13){
            board.outcome.tricks="";
        }
        //TODO: add guardian for tricks
    }
    return board;
};
const leadHandler = (board, action) => {
    if(action.type.includes(type.suit)){
        board.lead.suit=action.suit;
        if(action.suit===suit.NT){
            board.lead.suit="";
        }
    }
    if(action.type.includes(type.vals)){
        board.lead.vals=action.val;
    }
    return board;
};
const contractHenler = (board,action) => {
    if(action.type.includes(type.suit)){
        board.contract.suit=action.suit;
    }
    if(action.type.includes(type.number)){

        if(action.number<=7){
            board.contract.number=action.number;
        }
    }
    if(action.type.includes(type.wind)){
        if(!board.contract.wind) {
            if(action.wind===wind.NS){
                board.contract.wind=wind.N;
            }
            if(action.wind===wind.EW){
                board.contract.wind=wind.E;
            }
        }else {
            if (action.wind === wind.NS
                && board.contract.wind === wind.N) {
                board.contract.wind = wind.S;
            }else if (action.wind === wind.NS){
                board.contract.wind = wind.N;
            }
            if (action.wind === wind.EW
                && board.contract.wind === wind.E) {
                board.contract.wind = wind.W;
            }else if (action.wind === wind.EW){
                board.contract.wind = wind.E;
            }
        }
    }
    if(action.type.includes(type.bid)){
        if(action.bid===bid.x){
            board.contract.double=bid.x;
        }
        if(action.bid===bid.none) {
            board.contract.double = "";
        }
        if(action.bid===bid.xx){
            board.contract.double=bid.xx;
        }
    }

    return board;
}
const numberWriter = (number:number,action) => {
    if(!number) {
        if(action.number===0){
            number=10;
        }else{
            number = action.number;
        }
    }else{
        number = number*10+action.number;
    }
    return number;
}