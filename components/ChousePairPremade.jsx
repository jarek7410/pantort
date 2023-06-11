import * as React from "react";
import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {color} from "../styles/colors";

export const ChousePairPremade = ({setPair}) => {
    const [isNS, setIsNS] = React.useState(true);
    const [tableNumber, setTableNumber] = React.useState(0);
    const submit=()=>{
        if(tableNumber===0){
            return
        }
        if(isNaN(tableNumber)){
            return
        }
        if(!tableNumber){
            return
        }
        let pair=tableNumber*2;
        if(isNS){
            pair-=1
        }
        setPair(pair)

    }

    return(
        <View style={[styles.menu]}>
            <View style={[styles.row]}>
                <Text style={styles.text}>Numer Stołu:</Text>
                <TextInput style={styles.textInput}
                           onChangeText={setTableNumber}
                           value={tableNumber}
                           placeholder="##"
                           keyboardType="numeric"
                />
            </View>
            <View style={[styles.row,{marginBottom:50}]}>
                <Text style={styles.text}>linia:</Text>
                <BouncyCheckbox
                    textStyle={[styles.text, styles.textNoDecoration]}
                    text={"NS"}
                    isChecked={isNS}
                    onPress={()=>{setIsNS(true)}}
                    disableBuiltInState
                    fillColor={color.orange}
                    unfillColor={color.yellow}
                />
                <BouncyCheckbox
                    text={"EW"}
                    textStyle={[styles.text, styles.textNoDecoration]}
                    isChecked={!isNS}
                    onPress={()=>{setIsNS(false)}}
                    disableBuiltInState
                    fillColor={color.orange}
                    unfillColor={color.yellow}
                />
            </View>
            <Pressable onPress={submit}>
                <View style={[styles.item,]}>
                    <Text style={[styles.text,{color:"dark"}]}>Dodaj</Text>
                </View>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    menu:{
        backgroundColor:"green",
        margin:20,
        padding:10,
    },
    item:{
        backgroundColor:"darkgreen",
        flex:1,
        aspectRatio:5,
        margin:10,
        padding:10,
        justifyContent:"center",
        alignItems:"center",
    },
    text:{
        fontSize:20,
        color:"black",
    },
    textNoDecoration: { textDecorationLine: "none" },
    textInput:{
        fontSize:21,
        height: 30,
        width: 60,
        borderWidth: 1,
        padding: 10,
        borderColor:"black",
        marginBottom:5,
    },
    row:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%"
    },
})