import AsyncStorage from "@react-native-async-storage/async-storage";
import { board } from "../../helpers/interfaces";
import {moves, Names, player} from "./interfaces";
import {simpleImpScoreComposer, simpleScoreComposer} from "../../helpers/composerhelper";
import {windIsWindy} from "../../helpers/enumhelper";

export const saveToHistory = async (board:board,players:Names,pointsOnPlayer) => {
    let value:historyList= await loadFromHistory();
    if(value === null){
        value ={
            history:[],
            players:players,
            lastBoard:0,
        }
    }
    const historyItem:historyItem={
        id:value.history.length+1,
        board:board,
        players:players,
        time:new Date(),
        score:{
            pointsOnPlayer:pointsOnPlayer,
            score:simpleScoreComposer(board),
            imps:simpleImpScoreComposer(board,pointsOnPlayer),
        }
    }
    value.history.push(historyItem)
    value.lastBoard=board.number;
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('my-key', jsonValue);
    } catch (e) {
        // saving error
    }
}
export const loadFromHistory = async () => {
    let value:historyList;
    try {
        const jsonValue = await AsyncStorage.getItem('my-key');
        value = jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        return
    }
    return value;
}
export const deleteFromHistory = async (id:number) => {
    let value:historyList= await loadFromHistory();
    if(value === null){
        return
    }
    value.history=value.history.filter((item)=>item.id!==id)
    // console.log("deleteFromHistory",value,"id",id)
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('my-key', jsonValue);
    } catch (e) {
        // saving error
    }
}

export const getCountedScore = async (playerId: number) => {
    const value = await loadFromHistory();
    let score:number=0;
    value.history.forEach((item)=>{
        const wind=moves(playerId,item.board.number)
        if(windIsWindy(item.board.contract.wind,wind)) {
            score += item.score.imps
        }else{
            score -= item.score.imps
        }
    })
    return score;
}
export const restartHistory = async (players:Names) => {
    const value ={
        history:[],
        players:players,
        lastBoard:0,
    }
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('my-key', jsonValue);
    } catch (e) {
        // saving error
    }
}
export interface score{
    pointsOnPlayer:number,//0-40
    score:number,
    imps:number,
}
export interface historyItem{
    id:number,
    score:score,
    board:board,
    players:Names,
    time:Date,
}
export interface historyList{
    history:historyItem[],
    players:Names,
    lastBoard:number,

}