import React, {useEffect, useState} from "react";
import {View, Text,  ScrollView, Pressable} from "react-native";
import {deletePlay, getPlays, getResult} from "../../../helpers/fetchHelper";
import {transw2W} from "../../../helpers/cought_them_all.dto";
import {Button} from "../../basicComponents/Button";
import styles from "../styles/play.styles";

export const ResultsScreen = ({setPlay,meczId,isOpen}) => {
    const [plays, setPlays] = useState([])
    const [imp, setImp] = useState(0)

    useEffect(() => {
        fetch()
    },[])
    const fetch = async () => {
        const data = await getPlays(meczId)
        // console.log(meczId,data)
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
            if(play.Open===open) {
                if(open===isOpen){
                    return(<Play erace={eracePlays} key={play.id} play={play}/>)
                }else{
                    return(<Play erace={()=>{}} key={play.id} play={play} simple={true}/>)
                }

            }
        })
    }
    return (
        <View>
        <ScrollView style={{
            width: 350,
        }}>
        <View >
            <View style={styles.row}>
                <Text style={styles.text}>Otwarte</Text>
                <Text style={styles.text}>Zamkniete</Text>
            </View>
            <View style={styles.rowOnly}>
                <View style={{width:"50%"}}>
                    {sortPlaysRender(true)}
                </View>
                <View style={{width:"50%"}}>
                    {sortPlaysRender(false)}
                </View>

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
const Play = ({play,erace,simple=false}) => {
    const [show, setShow] = useState(false)


    let eraceThis = () => {
        erace(play.id)
    }
    return (
        <View style={[styles.item,{
            backgroundColor: play.erased ? "grey" : "darkgreen",
        }]}>

            {/*{simple && play.erased &&*/}
            {/*    <Text style={styles.text}>Usunięte</Text>*/}
            {/*}*/}

            <Pressable onPress={()=>setShow(true)} onHoverOut={()=>setShow(false)}>
                <Text style={styles.text}>Runda: {play.Round}</Text>
                <Text style={styles.text}>Rozdanie:{play.board}</Text>

            {simple ||
            show &&
            <>
                <Text style={styles.text}>Kontrakt:{play.contract}</Text>
                <Text style={styles.text}>Rozgrywa:{transw2W(play.declarerWind)}</Text>
                <View style={[styles.row,{justifyContent: "flex-start"}]}>
                    <Text style={styles.text}>{play.result}  </Text>
                    <Text style={styles.text}>Imp:{play.imp}</Text>
                </View>
            </>
            }
            {play.erased ||simple || show&&
                <Button onPress={eraceThis}>
                    <Text>Usuń</Text>
                </Button>
            }
            </Pressable>
        </View>
    )
}
