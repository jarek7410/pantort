import {Button, ScrollView, StyleSheet, View} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import React, {useEffect, useRef, useState} from "react";
import {ScreenSetter} from "./components/ScreenSetter";
import {boardExample, gameCource1} from "./helpers/exampleData";
// import Realm from "realm";
import {BridgeScreen} from "./components/BridgeScreen";
import {Boardsceen} from "./helpers/enumhelper";
import {boardEmpty, roundDefault} from "./helpers/defaultData";

const boardSchema={
    name:"board",
    properties:{
        _id: "int",
        number: "int",
        contract:{
            suit:"int",
            number:"int",
            double:"int",
            wind:"int",
        },
        lead:{
            suit:"int",
            vals:"int",
        },
        outcome:{
            tricks:"int",
            result:"int",
        }
    },
    primatyKey:"_id"
}


export default function App() {

    const pairNumber=useRef(0);
    const [boards,setBoards]=useState([])
    const [loading,setLoading]=useState(true)
    const [course,setCourse]=useState({})
    const boardsHandler=(board)=>{
        setBoards([...boards,...board])
    }
    useEffect(()=>{
        setCourse(gameCource1);
        setLoading(false)
    },[])


    return (
    <View style={[styles.container,styles.row]} key="main main">
        <View>
            <SafeAreaProvider style={styles.safeArea}>
                {loading ||<><ScreenSetter
                    course={course}
                    boardsHandler={boardsHandler}
                    pairNumber={pairNumber}
                /></>}
                {loading && <Button title="loading" onPress={()=>{}}/>}
            </SafeAreaProvider>
        </View>
        <ScrollView>
            {console.log("boards",boards)}
            {boards.map((item)=>{
                if(item) {
                    return <BridgeScreen logContext={"app"} key={item.number} board={JSON.parse(JSON.stringify(item))} focus={Boardsceen.BACK} round={roundDefault}/>
                }
            })
            }
        </ScrollView>
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
    row:{
        flexDirection: 'row',
    }
});
