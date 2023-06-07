import React, {useEffect, useRef, useState} from "react";
import {appScreen} from "../helpers/enumhelper";
import {Movement} from "./Movement";
import {BoardHendler} from "./BoardHendler";
import {Text} from "react-native";
import {TournamentEndScreen} from "./TournamentEndScreen";

export const ScreenSetter = ({course,boardsHandler}) => {
    const playedBoard = useRef([])
    const playedBoardData = useRef([])

    const [screen, setScreen] = useState("");

    const [coursePointer, setCoursePointer] = useState(0);

    const [currentBoard, setCurentBoard] = useState({});
    useEffect(()=>{
        console.log("current played board: ",currentBoard.round)
        let courseCurentLocal=course[coursePointer]

        setCurentBoard(courseCurentLocal)
        setScreen(courseCurentLocal.type)
        // setRound(courseCurentLocal)
        // setMovement(courseCurentLocal)
            // setScreen(course[coursePointer].type)

    },[coursePointer])
    const boardEndHandler = (board) => {
        playedBoardData.current=[...playedBoardData.current,board]
        playedBoard.current=[...playedBoard.current,board.number]
        console.log("board number: ",board.number)
        // console.log("played boards:",playedBoardData.current)
        // console.log("boards 1.",playedBoard.current)
        // console.log("boards 2.",currentBoard.boards)
        // console.log("method 1: ",
        //     currentBoard.boards.every(y => playedBoard.current.includes(y)))
        if(currentBoard.boards.every(y => playedBoard.current.includes(y))){
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
    if(screen === appScreen.board) {
        return(
            <>
                <BoardHendler endHandler={boardEndHandler} round={currentBoard}/>
            </>
        )
    }
    if(screen===appScreen.movement){
        return(
            <>
                <Movement movement={currentBoard} endHandler={movementEndHandler}/>
            </>
        )
    }
    if(screen===appScreen.tournamentEnd){
        return(
            <>
                <TournamentEndScreen/>
            </>
        )
    }

    return (
        <>
            <Text>error</Text>
        </>
    )
}