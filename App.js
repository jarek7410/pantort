import {Button, ScrollView, StyleSheet, View} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import React, {useEffect, useRef, useState} from "react";
import {ScreenSetter} from "./components/ScreenSetter";
import {boardExample, gameCource1} from "./helpers/exampleData";
// import Realm from "realm";
import {BridgeScreen} from "./components/BridgeScreen";
import {appScreen, Boardsceen} from "./helpers/enumhelper";
import {boardEmpty, roundDefault} from "./helpers/defaultData";
import {AppMenu} from "./components/AppMenu";


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
    const [course,setCourse]=useState({type:appScreen.menu})
    const boardsHandler=(board)=>{
        setBoards([...board])
    }
    const loadCoursePremade=()=> {
        setCourse(gameCource1);
        setLoading(false)
    }
    const loadCourse=()=> {
        setCourse(gameCource1);
        setLoading(false)
    }


    return (
    <View style={[styles.container]} key="main main">
        <SafeAreaProvider style={styles.safeArea}>
        <ScrollView style={{
            marginHorizontal:20,
        }}>
        <View key={"1"}>
            {loading ||<ScreenSetter
                course={course}
                boardsHandler={boardsHandler}
                pairNumber={pairNumber}
            />}
            {loading && <AppMenu/>}
            {loading && <Button title="loading" onPress={loadCourse}/>}

        </View>
        <View key={"2"}>
            {boards.length >=6 &&
            <View>
                {console.log("boards",boards)}
                {boards.map((item)=>{
                    if(item) {
                        return <BridgeScreen logContext={"app"} key={item.number} board={JSON.parse(JSON.stringify(item))} focus={Boardsceen.BACK} round={roundDefault}/>
                    }
                })}
            </View>
            }
        </View>
        </ScrollView>
        </SafeAreaProvider>
    </View>
    );
}
const styles = StyleSheet.create({
    safeArea: {
        justifyContent:"center",
        marginTop: 25,
    },
    container: {
        width: '100%',
        backgroundColor: '#454545',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    row:{
        flexDirection: 'row',
    },
    pagerView: {
        flex: 1,
    },
});
