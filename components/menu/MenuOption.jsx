import * as React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";

export const MenuOption = ({style,text,handler}) => {
    return(
        <Pressable onPress={handler}>
            <View style={[styles.item,style]}>
                <Text style={[styles.text]}>{text}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    menu:{
        // backgroundColor:color.primary,
        margin:20,
        padding:10,
    },
    item:{
        backgroundColor:"darkgreen",
        margin:10,
        padding:10,
        justifyContent:"center",
        alignItems:"center",
    },
    text:{
        fontSize:20,
        color:"black",
    },
    row:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%"
    },
})