import {StyleSheet, View, Text, Pressable} from "react-native";
import React from "react";

export const Movement = ({movement,endHandler}) => {
    const pressHandler=()=> {
        endHandler();
    }

    return (
        <>
            <Pressable onPress={pressHandler}>
            <View style={styles.screen}>
                <View style={styles.row}>
                    <View style={styles.card}>
                        <Text style={styles.textMain}>ROZDANIE:{movement.round}</Text>
                    </View>
                    <View
                        style={{
                            borderRightWidth:1,
                            borderRightColor:"black",
                            height:"100%",
                        }}
                    />
                    <View style={styles.card}>
                        <Text style={styles.textMain}>ZE STOŁU:{movement.table}</Text>
                        <Text style={styles.textMain}>NS{"->"}{movement.ns.table} {movement.ns.wind}</Text>
                        <Text style={styles.textMain}>EW{"->"}{movement.ew.table} {movement.ew.wind}</Text>
                    </View>


                </View>
            </View>
            </Pressable>
        </>
    )
}
const styles=StyleSheet.create({
    screen:{
        margin:5,
        width:290,
        height:195  ,
        padding:20,
        backgroundColor:"darkgreen",
        alignItems:"center",
        justifyContent:"center",
    },
    row:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
        height:"100%"

    },
    textRow:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        width:"100%"

    },
    card:{
        margin:10,
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