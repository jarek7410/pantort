import React from "react";
import { Text, StyleSheet} from "react-native";
import {PressableScreen} from "./PressableScreen";

export const TournamentMessageScreen = ({message,endHandler}) => {
    return(
        <PressableScreen onPress={endHandler}>
            <Text style={styles.message}>{message.message}</Text>
        </PressableScreen>
    )
}
const styles = StyleSheet.create({
    screen:{
        width:500,
        aspectRatio:2,
        backgroundColor:"darkgreen",
        marginHorizontal : 10,
        justifyContent:"center",
        alignItems:"center",
    },
    message:{
        fontSize:20,

    }
})