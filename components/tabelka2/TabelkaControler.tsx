import React, {useEffect, useState} from "react";
import {duplicateBoardsComposer} from "../../helpers/composerhelper";
import {suit, Vulnerability, wind} from "../../helpers/enumhelper";
import {Table} from "./screens/Table";
import {TabelkaEnum} from "./Tabelka.enum";
import {Text} from "react-native";
import {Players} from "./screens/Players";
import {Names} from "./interfaces";
import {ContractScreen} from "./screens/Contract";
import {contract} from "../../helpers/interfaces";

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
    const [contract,setContract] = useState<contract>({double: undefined, number: 0, suit: undefined, wind: undefined})
    // start setup
    useEffect(() => {
        setBoardNumber(2)
    }, []);
    useEffect(()=>{
        setForBoard(boardNumber)
    },[boardNumber])
    const setForBoard = (round) => {
        const duplicate = duplicateBoardsComposer(round)
        // setDuplicateBoards(duplicate.board)
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
    return(
        <>
            <Text>
                screen:{screen} boardNumber:{boardNumber} volnable:{volnable} dealer:{dealer}
            </Text>
            {TabelkaEnum.table===screen &&
                <Table
                    names={names}
                    volnable={volnable}
                    // setPlayer={setPlayer}
                    // player={player}
                    dealer={dealer}
                    changeToPlayers={changeToPlayers}
                    changeToContract={changeToContract}
                    boardNumber={boardNumber}
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
        </>
    )
}