import React, {useEffect} from "react";
import {BackHandler, ScrollView, Text, View} from "react-native"
import {deleteFromHistory, historyList, loadFromHistory} from "../historyHendler";
import {Button, Card} from "@rneui/themed";
import {constractComposer, outcomeComposer, windConposer} from "../../../helpers/composerhelper";
export const DealsHistory=({changeToTable,deleteHistory})=>{
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
                       <Text>powrót</Text>
                   </Button>
                   <Text>Historia:</Text>
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
               <Text>usuń Historie i wszystkie punkty</Text>
           </Button>
       </>
    )}
    else{
        return(
            <>
                <Button onPress={changeToTable}>
                    <Text>powrót</Text>
                </Button>

                <Text>loading</Text>
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
        <Card>
            <Text>{history.id} {history.time} </Text>

            <Text>rozdanie numer:{history.board.number}</Text>
            <Text>konstract:{constractComposer(history.board.contract)} {windConposer(history.board.contract)} {outcomeComposer(history.board.outcome)}</Text>
            <Text>wynik:</Text>
            <Text>Imp:{history.score.imps}, punkty rozgrywającego:{history.score.pointsOnPlayer}, punkty za kontrakt:{history.score.score}</Text>
            <Button onPress={deleteHistory}>
                <Text>usuń</Text>
            </Button>
        </Card>
    )
}