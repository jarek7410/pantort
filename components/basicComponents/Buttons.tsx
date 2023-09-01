import {StyleSheet, TouchableOpacity} from "react-native";
import * as React from "react";

export const Button=({style={},onPress,children})=>{
    return(
        <TouchableOpacity onPress={onPress} style={[stylesButton.button,style]}>
            {children}
        </TouchableOpacity>
    )
}
const stylesButton = StyleSheet.create({
    button:{
        height:35,
        backgroundColor:"grey",
        alignItems:"center",
        justifyContent:"center",
        margin:2,
        padding:2,
        borderRadius:5
    }
})