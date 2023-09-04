import {Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {Button} from "../basicComponents/Button";

export const ButtonPlus=({text,onPress,style={}})=>{
    return(
        <Button style={[styles.buttonPlus,styles.squer, style]} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </Button>
    )
}
export const ButtonNinus=({text,onPress,style={}})=>{
    return(
        <Button style={[styles.buttonMinus,styles.squer,style]} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </Button>
    )
}


const styles = StyleSheet.create({
    squer:{
        width:35,
        height:35,
    },
    buttonPlus:{
        backgroundColor:"darkgreen",
    },
    buttonMinus:{
        backgroundColor:"darkred",
    },
    buttonText: {
        fontSize: 20,
    }
})