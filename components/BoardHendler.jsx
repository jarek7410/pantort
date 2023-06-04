import React, {useState} from "react";
import {Boardsceen} from "../helpers/enumhelper";
import {decodeAction} from "../helpers/bridgekeyboardhelpers";
import {boardUpdate} from "../helpers/boardhelper";
import {BridgeScreen} from "./BridgeScreen";
import {BridgeKeyBoard} from "./BridgeKeyBoard";
import {boardDefault} from "../helpers/defaultData";

export const BoardHendler = (round,boardEndHandler) => {
    const [focus, setFocus] = useState(Boardsceen.board);
    const [board, setBoard] = useState(boardDefault);
    const keyboardHandler = id => {
        let action = decodeAction(id)
        const [workboard, workfocus] = boardUpdate(board, action, focus)
        setBoard({...board, workboard});
        setFocus(workfocus);
        if(workfocus===Boardsceen.DONE){
            boardEndHandler(board);
        }
    }
    return (
        <>
            <BridgeScreen focus={focus} round={round} board={board}/>
            <BridgeKeyBoard onChange={keyboardHandler}/>
        </>
    )
}