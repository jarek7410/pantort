import React, { useRef, useState} from "react";
import {ScrollView, StyleSheet, View} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {ScreenSetter} from "./components/turnament/ScreenSetter";
import {BridgeScreen} from "./components/board/BridgeScreen";
import {appScreen, Boardsceen} from "./helpers/enumhelper";
import {roundDefault} from "./helpers/defaultData";
import {gameCource1} from "./helpers/ExampleCoursefor3";
import {AppMenu} from "./components/menu/AppMenu";
import {TabelkaScreen} from "./components/tabelka/TabelkaScreen";
import {MeczControler} from "./components/mecz/MeczControler";


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

    const [isMenu ,setIsMenu]=useState(true)
    const [isBoard ,setIsBoard]=useState(false)
    const [isTableka ,setIsTableka]=useState(false)
    const screens={
        menu:0,
        board:1,
        tableka:2,
        mecz:3,
    }
    const [Screen ,setScreen]=useState(screens.menu)

    const [course,setCourse]=useState({type:appScreen.menu})
    const boardsHandler=(board)=>{
        setBoards([...board])
    }
    const loadCoursePremade=()=> {
        setCourse(gameCource1);
        setScreen(screens.board)

        //TODO: disable this
        setIsMenu(false)
        setIsBoard(true)
    }
    const loadCourse=(course)=> {
        if(course===0){
            console.log("loadTableka")
            setScreen(screens.tableka)

            //TODO: disable this
            setIsTableka(true)
            setIsMenu(false)
            return
        }
        if(course===1){
            console.log("loadmecz")
            setScreen(screens.mecz)
            return
        }
        setCourse(course);
        setScreen(screens.board)

        //TODO: disable this
        setIsMenu(false)
        setIsBoard(true)
    }
    const loadMenu=()=>{
        setScreen(screens.menu)
    }


    return (
        <SafeAreaProvider style={styles.safeArea}>
            <View style={[styles.container]} key="main main">
            <View key={"1"}>
                {screens.board===Screen && <ScreenSetter
                    course={course}
                    boardsHandler={boardsHandler}
                    pairNumber={pairNumber}
                />}
                {screens.menu===Screen && <AppMenu setCourse={loadCourse}/>}
                {screens.tableka===Screen&&<TabelkaScreen/>}
                {screens.mecz===Screen&&<MeczControler back={loadMenu}/>}
            </View>
            <ScrollView style={{
                marginHorizontal:20,
            }}>
            <View key={"2"}>
                {boards.length >=6 &&
                    (<View>
                    {boards.map((item)=>{
                        if(item) {
                            return <BridgeScreen logContext={"app"} key={item.number} board={JSON.parse(JSON.stringify(item))} focus={Boardsceen.BACK} round={roundDefault}/>
                        }
                    })}
                </View>)
                }
            </View>
            </ScrollView>
            </View>
        </SafeAreaProvider>
    );
}
const styles = StyleSheet.create({
    safeArea: {
        // justifyContent:"center",

    },
    container: {
        width: '100%',
        height: '100%',
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
