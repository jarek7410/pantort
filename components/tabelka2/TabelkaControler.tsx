import React, {useEffect, useState} from "react";
import {duplicateBoardsComposer} from "../../helpers/composerhelper";
import {suit, vals, Vulnerability, wind} from "../../helpers/enumhelper";
import {Table} from "./screens/Table";
import {TabelkaEnum} from "./Tabelka.enum";
import {Text} from "react-native";
import {Players} from "./screens/Players";
import {Names} from "./interfaces";
import {ContractScreen} from "./screens/Contract";
import {contract, lead, outcome} from "../../helpers/interfaces";
import {DealInput} from "./screens/DealInput";
import {loadFromHistory, restartHistory, saveToHistory} from "./historyHendler";
import {DealsHistory} from "./screens/DealsHistory";
import {SafeAreaView} from "react-native-safe-area-context";

export const TabelkaControler = () =>{
    const [screen,setScreen] = useState(TabelkaEnum.table)
    const [names,setNames]
        = useState<Names>({movable:
            [
                {player:{name:"wiośnik",imp: 0,isN: true},id:0},
                {player:{name:"letnik",imp: 0,isN: false},id:1},
                {player:{name:"jeśnik",imp: 0,isN: false},id:2},
                {player:{name:"zimnik",imp: 0,isN: false},id:3},
            ]})
    const [boardNumber,setBoardNumber] = useState(2)
    const [volnable,setVolnable] = useState(Vulnerability.NS)
    const [dealer,setDealer] = useState<wind>(wind.E)
    // const [player,setPlayer] = useState<wind>(wind.N)
    const [contract,setContract] = useState<contract>({double: undefined, number: undefined, suit: undefined, wind: undefined})
    const [pointsOnPlayer,setPointsOnPlayer] = useState(0)
    const [outcome,setOutcome] = useState<outcome>()
    const [lead,setLead] = useState<lead>({suit:suit.DIAMONDS,vals:vals.seven})
    // start setup
    useEffect(() => {
        loadFromHistory().then((history)=>{
            console.log("history",history)
            if(history.history.length>0){
                setBoardNumber(history.lastBoard+1)
            }else{
                setBoardNumber(1)
            }
            if(history.players!==undefined){
                setNames(history.players)
            }
        })
    }, []);
    useEffect(()=>{
        setForBoard(boardNumber)
    },[boardNumber])
    const setForBoard = (round:number) => {
        const duplicate = duplicateBoardsComposer(round)
        setVolnable(duplicate.vulnerability)
        setDealer(duplicate.dealer)
    }
    const changeToPlayers = () => {
        setScreen(TabelkaEnum.players)
    }
    const changeToTable = () => {
        setScreen(TabelkaEnum.table)
    };
    const changeToContract = () => {
        setScreen(TabelkaEnum.contract)
    }
    const changeToDealInput = () => {
        setScreen(TabelkaEnum.input)
    }
    const changeToHistory = () => {
        setScreen(TabelkaEnum.history)
    }
    const  setDeal=  async (outcome:outcome,points:number)=>{
        console.log("setDeal",outcome,points)
        setOutcome(outcome)
        setPointsOnPlayer(points)
        await saveToHistory({
            number:boardNumber,
            contract:contract,
            lead:lead,
            outcome:outcome
        },names,points)
        // const histry = await loadFromHistory()
        // console.log("histry",histry)

        setBoardNumber(boardNumber+1)
        setContract({double: undefined, number: undefined, suit: undefined, wind: undefined})
        setPointsOnPlayer(0)
        setOutcome(undefined)
        // setLead({suit:suit.DIAMONDS,vals:vals.seven})

        changeToTable()
    };


    return(
        <SafeAreaView>
            {TabelkaEnum.table===screen &&
                <Table
                    names={names}
                    volnable={volnable}
                    // setPlayer={setPlayer}
                    // player={player}
                    dealer={dealer}
                    changeToPlayers={changeToPlayers}
                    changeToContract={changeToContract}
                    changeToDealInput={changeToDealInput}
                    changeToHistory={changeToHistory}
                    boardNumber={boardNumber}
                    setBoardNumber={setBoardNumber}
                    contract={contract}
                    setContract={setContract}

                />
            }
            {TabelkaEnum.players===screen &&
                <Players
                    changeToTable={changeToTable}
                    names={names}
                    setNames={setNames}

                />
            }
            {TabelkaEnum.contract===screen &&
                <ContractScreen
                    setContract={setContract}
                    contract={contract}
                    changeToTable={changeToTable}
                />
            }
            {TabelkaEnum.input===screen &&
                <DealInput
                    setDeal={setDeal}
                    changeToTable={changeToTable}
                />
            }
            {TabelkaEnum.history===screen &&
                <DealsHistory
                    changeToTable={changeToTable}
                    deleteHistory={async ()=>{
                        await restartHistory(names)
                        changeToTable()
                    }}
                />
            }
        </SafeAreaView>
    )
}