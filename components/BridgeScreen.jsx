import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, TouchableHighlight} from "react-native";
import {BridgeScreenRound} from "./BridgeScreenRound";
import {constractComposer} from "../helpers/contractcomposerhelper";

export const BridgeScreen =({round,board,menuEnable})=>{
    let boards;
    if(round.firstBoard===round.lastBoard){
        boards=round.firstBoard;
    }else{
        boards=round.firstBoard+"-"+round.lastBoard;
    }
    let contract=constractComposer(board.contract);
    return(
        <View style={styles.screen}>
            <BridgeScreenRound round={round} boards={boards}/>

            <View >
                <View style={[styles.row,{
                    justifyContent:"flex-start"
                }]}>
                    <Text style={styles.textMain}>ROZDANIE:</Text>
                    <Text style={styles.textMain}>{board.number}</Text>
                </View>
                <View style={[styles.row,{
                justifyContent:"flex-start"
                }]}>
                    <Text style={styles.textMain}>KONTRAKT:</Text>
                    <Text style={styles.textMain}>{contract}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textMain}>VIST:</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textMain}>WYNIK:</Text>
                </View>
            </View>
            <View style={[styles.row,styles.narow,{
                marginTop:10,
            }]}>
                <TouchableHighlight
                    underlayColor="#fff"
                    style={styles.manuItem}>
                    <Text style={styles.menuItemsText} role="menu">text</Text>
                </TouchableHighlight>
                <TouchableOpacity style={styles.manuItem}>
                    <Text  style={styles.menuItemsText} role="menu">text</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.manuItem}>
                    <Text  style={styles.menuItemsText} role="menu">text</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.manuItem}>
                    <Text  style={styles.menuItemsText} role="menu">text</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    screen:{
        margin:5,
        width:290,
        height:195  ,
        padding:5,
        backgroundColor:"darkgreen",
    },
    row:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%"
    },
    narow:{
        height:20,
    },
    textMain:{
        fontSize:25,
    },
    manuItem:{
        height:20,
        backgroundColor:"gray",
        width:65,
        justifyContent:"center",
        alignItems:"center",
    },
    menuItemsText: {
        fontSize:10
    }
})