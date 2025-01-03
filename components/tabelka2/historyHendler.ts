import AsyncStorage from "@react-native-async-storage/async-storage";
import {board} from "../../helpers/interfaces";
import {moves, Names} from "./interfaces";
import {duplicateBoardsComposer, simpleImpScoreComposer, simpleScoreComposer} from "../../helpers/composerhelper";
import {isWindVul, windIsWindy} from "../../helpers/enumhelper";
import {expectablePointsTableka} from "../../helpers/brydzHalpers";

export let historyKey:string = 'this game';
export const saveToHistory = async (board:board,players:Names,pointsOnPlayer) => {
    let value:historyList= await loadFromHistory();
    if(value === null){
        value ={
            history:[],
            players:undefined,
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
            estimatedScore: expectablePointsTableka( pointsOnPlayer,isWindVul(board.contract.wind,duplicateBoardsComposer(board.number).vulnerability)),
        }
    }
    value.history.push(historyItem)
    value.lastBoard=board.number;
    value.players=players;
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(historyKey, jsonValue);
    } catch (e) {
        // saving error
    }
}
export const loadFromLongHistory=(key:string) => {
    historyKey=key;
    return loadFromHistory();
}
export const loadFromHistory = async () => {
    let value:historyList;
    try {
        const jsonValue = await AsyncStorage.getItem(historyKey);
        value = jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        return
    }
    console.log("histry hendler",value.players)
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
        await AsyncStorage.setItem(historyKey, jsonValue);
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
    // historyKey=historyKey;
    const value ={
        history:[],
        players:players,
        lastBoard:0,
    }
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(historyKey, jsonValue);
    } catch (e) {
        // saving error
    }
}
export const getHistoryEntries =  () => {
    return AsyncStorage.getAllKeys();
}

async function setHistory(history: historyList) {
    try {
        const jsonValue = JSON.stringify(history);
        await AsyncStorage.setItem(historyKey, jsonValue);
    } catch (e) {
        // saving error
    }
}

export const setLongSave = async (key:string)=>{
    const current=await loadFromHistory()
    if(current===undefined){
        return undefined;
    }
    historyKey=key;
    await setHistory(current)
}
export interface score{
    pointsOnPlayer:number,//0-40
    score:number,
    imps:number,
    estimatedScore:number,
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
