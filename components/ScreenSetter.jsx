import React, {useEffect, useRef, useState} from "react";
import {appScreen} from "../helpers/enumhelper";
import {Movement} from "./Movement";
import {BoardHendler} from "./BoardHendler";
import {TournamentEndScreen} from "./TournamentEndScreen";
import {TournamentMessageScreen} from "./TournamentMessageScreen";

export const ScreenSetter = ({course,boardsHandler}) => {
    const playedBoard = useRef([])
    const playedBoardData = useRef([])

    const [screen, setScreen] = useState("");

    const [coursePointer, setCoursePointer] = useState(0);

    const [currentPart, setCurrentPart] = useState({});
    useEffect(()=>{
        console.log("current played board: ",currentPart.round)
        let courseCurentLocal=course[coursePointer]

        setCurrentPart(courseCurentLocal)
        setScreen(courseCurentLocal.type)

    },[coursePointer])
    const boardEndHandler = (board) => {
        playedBoardData.current=[...playedBoardData.current,board]
        playedBoard.current=[...playedBoard.current,board.number]
        console.log("board number: ",board.number)
        console.log("played board: ",playedBoardData.current.length)
        if(currentPart.boards.every(y => playedBoard.current.includes(y))){
            setCoursePointer(coursePointer+1)
            boardsHandler(playedBoardData.current)
        }
        else{
        }
    }
    const movementEndHandler = () => {
        console.log("OK exceeded screen")
        setCoursePointer(coursePointer+1)
    }
    return(
        <>
            {appScreen.board === screen &&
                <BoardHendler endHandler={boardEndHandler} round={currentPart}/>
            }
            {appScreen.movement === screen &&
                <Movement movement={currentPart} endHandler={movementEndHandler}/>
            }
            {appScreen.tournamentEnd === screen &&
                <TournamentEndScreen/>
            }
            {appScreen.message === screen &&
                <TournamentMessageScreen message={currentPart} endHandler={movementEndHandler}/>
            }
        </>
    )
}