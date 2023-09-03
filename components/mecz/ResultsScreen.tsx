import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, ScrollView} from "react-native";
import {deletePlay, getPlays, getResult} from "../../helpers/fetchHelper";
import {transw2W} from "../../helpers/cought_them_all.dto";
import {Button} from "../basicComponents/Buttons";

export const ResultsScreen = ({showResults,setPlay,meczId}) => {
    const [plays, setPlays] = useState([])
    const [imp, setImp] = useState(0)

    useEffect(() => {
        fetch()
    },[])
        const fetch = async () => {
        const data = await getPlays(meczId)
        console.log(meczId,data)
        setPlays(data.plays)
        const {imp,ended} = await getResult(meczId)
        setImp(imp)
    }
    const eracePlays =async (playId) => {
        await deletePlay(meczId, playId)
        await fetch()
    }
    const sortPlaysRender = (open) => {
        return plays.sort((a,b)=>{
            if(a.erased===true) {
                return 1
            }
            if(b.erased===true) {
                return -1
            }
            return a.Round-b.Round//a >b => a>0
        }).map((play) => {
            if(play.Open===open) return(<Play erace={eracePlays} key={play.id} play={play}/>)
        })
    }
    return (
        <View>
        <ScrollView style={{
            width: 300,
        }}>
        <View style={[styles.row,]}>
            <View >
                <Text style={styles.text}>Otwarte</Text>
                {sortPlaysRender(true)}
            </View>
            <View>
                <Text style={styles.text}>Zamkniete</Text>
                {sortPlaysRender(false)}
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
const Play = ({play,erace}) => {
    let eraceThis = () => {
        erace(play.id)
    }
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
            {play.erased ||
                <Button onPress={eraceThis}>
                    <Text>Usuń</Text>
                </Button>
            }
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