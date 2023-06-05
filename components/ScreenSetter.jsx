import React, {useEffect, useState} from "react";
import {appScreen} from "../helpers/enumhelper";
import {Movement} from "./Movement";
import {BoardHendler} from "./BoardHendler";
import {roundDefault} from "../helpers/defaultData";
import {Text} from "react-native";
import {movementExample} from "../helpers/exampleData";
import {TournamentEndScreen} from "./TournamentEndScreen";

export const ScreenSetter = ({course,boardsHandler}) => {
    const [movement,setMovement]=useState(movementExample);
    const [round,setRound]=useState(roundDefault);
    const [screen, setScreen] = useState("");
    const [coursePointer, setCoursePointer] = useState(0);
    useEffect(()=>{
        console.log("ScreenSetter useEffect")
        console.log(round)
        let courseCurent=course[coursePointer]

        setScreen(courseCurent.type)
        setRound(courseCurent)
        setMovement(courseCurent)
            // setScreen(course[coursePointer].type)

    },[coursePointer])
    const boardEndHandler = (board) => {
        console.log("OK exceeded screen")
        setCoursePointer(coursePointer+1)
        boardsHandler(board)
    }
    const movementEndHandler = () => {
        console.log("OK exceeded screen")
        setCoursePointer(coursePointer+1)
    }
    if(appScreen.board === screen) {
        return(
            <>
                <BoardHendler endHandler={boardEndHandler} round={round}/>
            </>
        )
    }
    if(screen===appScreen.movement){
        return(
            <>
                <Movement movement={movement} endHandler={movementEndHandler}/>
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