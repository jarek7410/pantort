import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, TouchableHighlight} from "react-native";
import {BridgeScreenRound} from "../turnament/BridgeScreenRound";
import {constractComposer, leadComposeer, outcomeComposer, windConposer} from "../../helpers/composerhelper";
import {Boardsceen} from "../../helpers/enumhelper";

export const BridgeScreen =({logContext,round,board,focus})=>{
    let boards="";
    if(round.boards.length===0){
        boards=" ";
    }else if(round.boards.length===1){
        boards=round.boards[0];
    }else if(round){
        boards=round.boards[0]+"-"+round.boards[round.boards.length-1]
    }
    if(board===undefined){
        console.error(logContext+" board: ",board)
    }
    const contract=constractComposer(board.contract)+" "+windConposer(board.contract);
    const lead=leadComposeer(board.lead);
    const outcome=outcomeComposer(board.outcome);

    return(
        <View style={styles.screen}>
            <BridgeScreenRound round={round} boards={boards}/>

            <View >
                <View style={styles.textRow}>
                    <Text style={styles.textMain}>ROZDANIE:</Text>
                    <Text style={styles.textMain}>
                        {board.number}
                        {focus===Boardsceen.board?"_":""}
                    </Text>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.textMain}>KONTRAKT:</Text>
                    <Text style={styles.textMain}>
                        {contract}
                        {focus===Boardsceen.contract?"_":""}
                    </Text>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.textMain}>WIST:</Text>
                    <Text style={styles.textMain}>
                        {lead}
                        {focus===Boardsceen.lead?"_":""}
                    </Text>
                </View>
                <View style={styles.textRow}>
                    <Text style={styles.textMain}>WYNIK:</Text>
                    <Text style={styles.textMain}>
                        {outcome}
                        {focus===Boardsceen.result?"_":""}
                    </Text>
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
    textRow:{
        flexDirection:"row",
        justifyContent:"flex-start",
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