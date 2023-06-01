import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Text, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";

export const SquerButton=({onChange,onClick,name,icon="",color="black",alt="text",text="default",id=-1})=>{
    const event=()=>{
        if(onChange){
            onChange(id)
        }
    }
    if(icon===""){
        return (
            <TouchableOpacity onPress={event}  style={styles.button}>
                <Text style={{
                    color:{color},
                }}>
                    {text}
                </Text>
            </TouchableOpacity>
        )
    }
    else {
        return (
            <TouchableOpacity onPress={event} style={styles.button}>
                <MaterialCommunityIcons name={icon} size={40} color={color}/>
            </TouchableOpacity>
        )
    }

}
const styles =StyleSheet.create({
    button:{
        backgroundColor:"gray",
        height:50,
        width:50,
        margin:5,
        padding:5,
    }
});