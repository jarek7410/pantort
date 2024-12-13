import React, { useRef, useState} from "react";
import {SafeAreaView, StyleSheet, View} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {AppMenu} from "./components/menu/AppMenu";
import {StatusBar} from "expo-status-bar";
import {TabelkaControler} from "./components/tabelka2/TabelkaControler";
import {colors} from "./components/tabelka2/styles/styles";


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
    const screens={
        menu:0,
        tabelka2:4,
    }
    const [Screen ,setScreen]=useState(screens.menu)

    const loadCourse=(course)=> {
        if(course===-1){
            console.log("tabelka 2.0")
            setScreen(screens.tabelka2)
            return
        }
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
            <StatusBar animated={true}
                       // backgroundColor="#61dafb"
                       hidden={true}
                       translucent={true}
            />
            <View style={[styles.container,{backgroundColor:screens.tabelka2===Screen?colors.secondary:"#454545"}]} key="main main">
                {screens.menu===Screen      && <AppMenu setCourse={loadCourse}/>}
                {screens.tabelka2===Screen  &&<TabelkaControler/>}
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: '#ECF0F1',

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
