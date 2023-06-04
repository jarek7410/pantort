import {Button, StyleSheet, View} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {useEffect, useRef, useState} from "react";
import {appScreen} from "./helpers/enumhelper";
import {ScreenSetter} from "./components/ScreenSetter";
import {gameCource1, movementExample} from "./helpers/exampleData";
import {boardDefault, roundDefault} from "./helpers/defaultData";




export default function App() {
    const pairNumber=useRef(0);
    const [round,setRound]=useState(roundDefault);
    const [board,setBoard]=useState(boardDefault)
    const [screen,setScreen]=useState(appScreen.movement)
    let course
    useEffect(()=>{
        course=gameCource1;
    },[])

    return (
    <View style={styles.container} key="main main">
        <SafeAreaProvider style={styles.safeArea}>
            <ScreenSetter
                course={course}
                round={round}
                board={board} setBoard={setBoard}
                pairNumber={pairNumber} movement={movementExample}
            />
        </SafeAreaProvider>
        <Button title="change screen" onPress={()=>{
            if(screen===appScreen.movement){
                setScreen(appScreen.board)
            }else{
                setScreen(appScreen.movement)
            }
        }}/>
    </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        justifyContent:"center",
    },
    container: {
        flex: 1,
        backgroundColor: '#454545',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
