import {Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export const ButtonPlus=({text,onPress,style})=>{
    return(
        <Button style={[styles.buttonPlus, style]} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </Button>
    )
}
export const ButtonNinus=({text,onPress,style})=>{
    return(
        <Button style={[styles.buttonMinus,style]} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </Button>
    )
}
export const MyCheckbox = ({
                               textStyle,
                               text,
                               isChecked,
                               onPress,
                               disableBuiltInState,
                               fillColor,
                               unfillColor})=>{
    return(
        <Pressable onPress={onPress} style={{margin:2}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
                <View style={{width:30,height:30,borderColor:fillColor,borderWidth:2,borderRadius:5}}>
                    {isChecked&&
                    <View style={{borderRadius:3,backgroundColor:fillColor,height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}}>
                        <MaterialCommunityIcons name={"check"} style={{color:"grey"}}/>
                    </View>
                    }
                    {isChecked||
                    <View style={{borderRadius:3,backgroundColor:unfillColor,height:"100%",width:"100%"}}>

                    </View>
                    }
                </View>
            <Text style={[styles.buttonText,textStyle]}>{text&&" "+text}</Text>
        </View>
</Pressable>
    )
}
const Button=({style,onPress,children})=>{
    return(
        <TouchableOpacity onPress={onPress} style={[styles.button,style]}>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        width:35,
        height:35,
        backgroundColor:"grey",
        alignItems:"center",
        justifyContent:"center",
        margin:2,
        borderRadius:5
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