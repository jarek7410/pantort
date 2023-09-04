import {Pressable, Text, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as React from "react";
import styles from "./checkbox.styles";

export const MyCheckbox = ({
                               textStyle,
                               text,
                               isChecked,
                               onPress=undefined,
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