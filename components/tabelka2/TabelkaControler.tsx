import React, {useEffect, useState} from "react";
import {duplicateBoardsComposer} from "../../helpers/composerhelper";
import {Vulnerability, wind} from "../../helpers/enumhelper";
import {Table} from "./screens/Table";
import {TabelkaEnum} from "./Tabelka.enum";
import {Text} from "react-native";

export const TabelkaControler = () =>{
    const [screen,setScreen] = useState(TabelkaEnum.table)
    const [names,setNames] = useState([""])
    const [boardNumber,setBoardNumber] = useState(2)
    const [volnable,setVolnable] = useState(Vulnerability.NS)
    const [dealer,setDealer] = useState(wind.E)
    const [player,setPlayer] = useState(wind.N)
    // start setup
    useEffect(() => {
        setNames(["wiośnik","letnik","jeśnik","zimnik"])
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
    return(
        <>
            <Text>
                screen:{screen} boardNumber:{boardNumber} volnable:{volnable} dealer:{dealer} player:{player}
            </Text>
            {TabelkaEnum.table===screen &&
                <Table
                    names={names}
                    volnable={volnable}
                    setPlayer={setPlayer}
                    player={player}
                    dealer={dealer}
                />
            }
        </>
    )
}