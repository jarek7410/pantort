import {Button, StyleSheet, Text, View} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {useEffect, useRef, useState} from "react";
import {appScreen} from "./helpers/enumhelper";
import {ScreenSetter} from "./components/ScreenSetter";
import {gameCource1, movementExample} from "./helpers/exampleData";
import {boardDefault, roundDefault} from "./helpers/defaultData";




export default function App() {
    const pairNumber=useRef(0);
    const [boards,setBoards]=useState([])
    const [screen,setScreen]=useState(appScreen.movement)
    const [loading,setLoading]=useState(true)
    const [course,setCourse]=useState({})
    const boardsHandler=(board)=>{
        setBoards([...boards,board])
        console.log(boards)
        console.log(board)
    }
    useEffect(()=>{
        setCourse(gameCource1);
        setLoading(false)
    },[])

    return (
    <View style={styles.container} key="main main">
        <SafeAreaProvider style={styles.safeArea}>
            {loading ||<><ScreenSetter
                course={course}
                boardsHandler={boardsHandler}
                pairNumber={pairNumber}
            /></>}
            {loading && <Button title="loading" onPress={()=>{}}/>}
        </SafeAreaProvider>
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
