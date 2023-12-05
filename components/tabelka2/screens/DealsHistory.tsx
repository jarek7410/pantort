import React, {useEffect} from "react";
import {BackHandler, ScrollView,  View} from "react-native"
import {deleteFromHistory, historyList, loadFromHistory} from "../historyHendler";
import {Button, Card} from "@rneui/themed";
import {constractComposer, outcomeComposer, windConposer} from "../../../helpers/composerhelper";
import {colors} from "../styles/styles";
import {Text} from "../components/Text";
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
       <>
           <View>
               <View style={[{flexDirection:"row",alignItems:"center"}]}>
                   <Button onPress={changeToTable} size="lg" style={{}}>
                       <Text style={{color:colors.text}}> powrót</Text>
                   </Button>
                   <Text style={{color:colors.text}}>Historia:</Text>
                   <Button onPress={changeToSaveLoad} size="lg" style={{}}>
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
           <Button onPress={deleteHistory}>
               <Text style={{color:colors.text}}>usuń Historie i wszystkie punkty</Text>
           </Button>
       </>
    )}
    else{
        return(
            <>
                <Button onPress={changeToTable}>
                    <Text style={{color:colors.text}}>powrót</Text>
                </Button>

                <Text style={{color:colors.text}}>loading</Text>
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
            backgroundColor:colors.background,
            width:"100%",
            height:"100%",
            padding:10,
        }}>
            <Text style={{color:colors.text}}>{history.id} {history.time} </Text>

            <Text style={{color:colors.text}}>rozdanie numer:{history.board.number}</Text>
            <Text style={{color:colors.text}}>konstract:{constractComposer(history.board.contract)} {windConposer(history.board.contract)} {outcomeComposer(history.board.outcome)}</Text>
            <Text style={{color:colors.text}}>wynik:</Text>
            <Text style={{color:colors.text}}>Imp:{history.score.imps}, punkty rozgrywającego:{history.score.pointsOnPlayer}, punkty za kontrakt:{history.score.score}</Text>
            <Button onPress={deleteHistory}>
                <Text style={{color:colors.text}}>usuń</Text>
            </Button>
        </View>
    )
}