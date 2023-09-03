import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, ScrollView} from "react-native";
import {getPlays, getResult} from "../../helpers/fetchHelper";
import {transw2W} from "../../helpers/cought_them_all.dto";
import {Button} from "../basicComponents/Buttons";

export const ResultsScreen = ({setPlay,meczId}) => {
    const [plays, setPlays] = useState([])
    const [imp, setImp] = useState(0)

    useEffect(() => {
        const fetch = async () => {
            const data = await getPlays(meczId)
            console.log(meczId,data)
            setPlays(data.plays)
            const {imp,ended} = await getResult(meczId)
            setImp(imp)
        }
        fetch()
    },[])
    const eracePlays = (playId) => {

    }
    return (
        <View>
        <ScrollView style={{
            width: 300,
        }}>
        <View style={[styles.row,]}>
            <View >
                <Text style={styles.text}>Otwarte</Text>
                {plays.sort((a,b)=>a.Round-b.Round).map((play) => {
                    if(play.Open) return(<Play key={play.id} play={play}/>)
                })}
            </View>
            <View>
                <Text style={styles.text}>Zamkniete</Text>
                {plays.map((play) => {
                    if(!play.Open) return(<Play key={play.id} play={play}/>)
                })}
            </View>
        </View>
        </ScrollView>
            <View style={styles.row}>
                <Button
                    style={{borderRadius:5,height:30,width:90,backgroundColor:"darkgreen",justifyContent:"center",alignItems:"center"}}
                    onPress={setPlay}
                >
                    <Text style={{fontSize:20,color:"white"}}>Powrót</Text>
                </Button>
                <Text style={{fontSize:20,color:"white"}}>Imp:{imp}(NS otwarte,EW zamkniete)</Text>
            </View>
        </View>
    )
}
const Play = ({play}) => {
    return (
        <View style={[styles.item,{
        }]}>
                <Text style={styles.text}>Runda: {play.Round}</Text>
                <Text style={styles.text}>Rozdanie:{play.board}</Text>
                <Text style={styles.text}>Kontrakt:{play.contract}</Text>
                <Text style={styles.text}>Rozgrywa:{transw2W(play.declarerWind)}</Text>
            <View style={[styles.row,{justifyContent: "flex-start"}]}>
                <Text style={styles.text}>{play.result}  </Text>
                <Text style={styles.text}>Imp:{play.imp}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    menu:{
        borderRadius:3,
        backgroundColor:"green",
        margin:20,
        padding:10,
        alignItems:"center",
        width:"70%"
    },
    item:{
        backgroundColor:"darkgreen",
        margin:10,
        padding:10,
        justifyContent:"flex-start",
        alignItems:"flex-start",
    },
    text:{
        fontSize:20,
        color:"black",
    },
    textNoDecoration: { textDecorationLine: "none" },
    textInput:{
        fontSize:25,
        height: 60,
        width: 60,
        borderWidth: 1,
        padding: 10,
        borderColor:"black",
        color:"black",
        marginBottom:5,
        borderRadius:3,
    },
    rowOnly:{
        flexDirection:"row",
    },
    row:{
        flexDirection:"row",
        justifyContent:"space-between",
        // alignItems:"center",
        width:"100%"
    },
    button:{
        width:30,
        height:30,
        backgroundColor:"grey",
        alignItems:"center",
        justifyContent:"center",
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