import React, {useEffect} from "react";
import {appScreen} from "../helpers/enumhelper";
import {Movement} from "./Movement";
import {BoardHendler} from "./BoardHendler";

export const ScreenSetter = ({screen,round,setScreen,movement}) => {
    useEffect(()=>{

    },[])
    const boardEndHandler = (board) => {
        console.log("OK exceeded screen")
        setScreen(appScreen.movement)
    }
    if(screen===appScreen.board) {
        return(
            <BoardHendler boardEndHandler={boardEndHandler} round={round}/>
        )
    }
    if(screen===appScreen.movement){
        return(
            <Movement movement={movement}/>
        )
    }
}