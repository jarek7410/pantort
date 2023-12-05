import {colors, styles} from "../../styles/styles";
import {Text} from "../../components/Text";
import {Pressable, View} from "react-native";
import {ButtonNinus, ButtonPlus} from "../../../tabelka/Buttons";
import React, {useState} from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export const BoardNumberSelect =({boardNumber,decreaseBoard,increaseBoard})=>{
    const [isFold,setIsFold]=useState(false)
    return(
        <View style={[styles.card]}>
            <Pressable onPress={()=>setIsFold(!isFold)}>
            <View style={[styles.row,styles.centerContent]}>
                <Text style={{fontSize:20,color:colors.text}}>Numer pudełka: {boardNumber}</Text>
                <MaterialCommunityIcons name="arrow-down-drop-circle" size={30} color={colors.button}/>
            </View>
            </Pressable>
            {isFold&&
            <View style={[styles.row,styles.centerContent,{marginTop:10}]} >
                <ButtonNinus text={"-4"} onPress={()=>{decreaseBoard(4)}}/>
                <ButtonNinus text={"-"} onPress={()=>{decreaseBoard(1)}}/>
                <ButtonPlus text={"+"} onPress={()=>increaseBoard(1)}/>
                <ButtonPlus text={"+4"} onPress={()=>increaseBoard(4)}/>
            </View>
            }
        </View>
    )
}