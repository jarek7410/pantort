import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, TouchableHighlight} from "react-native";

export const BridgeScreen =({round,board,menuEnable})=>{
    let boards;
    if(round.firstBoard===round.lastBoard){
        boards=round.firstBoard;
    }else{
        boards=round.firstBoard+"-"+round.lastBoard;
    }
    return(
        <View style={styles.screen}>
            <View style={styles.row}>
                <View>
                    <Text >round {round.round}</Text>
                </View>
                <View>
                    <Text>NS:{round.ns} EW:{round.ew}</Text>
                </View>
                <View>
                    <Text>
                        {boards}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />
            <View >
                <Text style={styles.textMain}>ROZDANIE:</Text>
                <Text style={styles.textMain}>KONTRAKT:</Text>
                <Text style={styles.textMain}>VIST:</Text>
                <Text style={styles.textMain}>WYNIK:</Text>
            </View>
            <View style={[styles.row,{
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
        height:190,
        padding:5,
        backgroundColor:"darkgreen",
    },
    row:{
        flexDirection:"row",
        height:20,
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%"
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