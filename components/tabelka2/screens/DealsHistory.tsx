import React, {useEffect} from "react";
import {BackHandler, SafeAreaView, ScrollView, View} from "react-native"
import {deleteFromHistory, historyList, loadFromHistory, restartHistory} from "../historyHendler";
import {Button} from "../../basicComponents/Button";
import {outcomeComposer, windConposer} from "../../../helpers/composerhelper";
import {colors, styles} from "../styles/styles";
import {Text} from "../components/Text";
import {SiutText} from "../components/SiutText";
export const DealsHistory=({changeToTable,deleteHistory,changeToSaveLoad})=>{
    const [historyList,setHistryList]=React.useState<historyList>(undefined)
    useEffect( () => {
        load().then((history)=>{
            setHistryList(history)
            // console.log("history",history)
        })
    }, []);
    useEffect(() => {
        const backAction = () => {
            changeToTable()
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);
    const load= async (): Promise<historyList> => {
        return await loadFromHistory()
    }
    const deleteItem=async (id)=>{
        await deleteFromHistory(id)
        load().then((history)=>{
            setHistryList(history)
            // console.log("history",history)
        })
    }
    if(historyList!=undefined){
    return(
       <SafeAreaView>
           <View>
               <View style={[{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}]}>
                   <Button onPress={changeToTable}  style={{width:100}}>
                       <Text style={{color:colors.text}}> powrót</Text>
                   </Button>
                   <Text style={{color:colors.text}}>Historia:</Text>
                   <Button onPress={changeToSaveLoad} style={styles.button}>
                       <Text style={{color:colors.text}}>zapisz/wczytaj</Text>
                   </Button>
                </View>
           </View>
            <ScrollView>
                {historyList.history.map((history)=>{
                    return(
                        <HistoryCard history={history} deleteItem={deleteItem} key={history.id}/>
                    )
                })
                }
            </ScrollView>
           <Button onPress={deleteHistory} style={{width:100,height:60}}>
               <Text style={{color:colors.text}}>usuń Historie i wszystkie punkty</Text>
           </Button>
       </SafeAreaView>
    )}
    else{
        return(
            <>
                <Button onPress={changeToTable}>
                    <Text style={{color:colors.text}}>powrót</Text>
                </Button>

                <Text style={{color:colors.text}}>wczytywanie</Text>
                <Button onPress={()=>{
                    deleteHistory()
                }}>
                    <Text style={{color:colors.text}}>zresetuj base danych aplikacji</Text>
                </Button>
            </>
        )
    }
}
const HistoryCard=({history,deleteItem})=>{
    const deleteHistory=()=>{
        console.log("deleteHistory",history, "id",history.id)
        deleteItem(history.id)
    }
    return(
        <View style={{
            backgroundColor:colors.card,
            width:"100%",
            // height:"100%",
            padding:10,
            margin:5,
        }}>
            <Text style={{color:colors.text}}>{history.id} {history.time} </Text>

            <Text style={{color:colors.text}}>rozdanie numer:{history.board.number}</Text>
            <View style={styles.row}>
                <Text style={{color:colors.text}}>
                    konstract:
                </Text>
                <SiutText contract={history.board.contract} size={25}/>
                <Text style={{color:colors.text}}>
                    {/*{constractComposer(history.board.contract)} */}
                    {windConposer(history.board.contract)}
                    {outcomeComposer(history.board.outcome)}
                </Text>
            </View>
            {/*<Text style={{color:colors.text}}>wynik:</Text>*/}
            <Text style={{color:colors.text}}>Imp:{history.score.imps}, punkty rozgrywającego:{history.score.pointsOnPlayer}, punkty za kontrakt:{history.score.score}</Text>
            <Button onPress={deleteHistory} style={[styles.button,{width:50}]}>
                <Text style={{color:colors.text}}>usuń</Text>
            </Button>
        </View>
    )
}
