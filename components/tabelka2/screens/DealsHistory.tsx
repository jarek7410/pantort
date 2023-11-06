import React, {useEffect} from "react";
import {ScrollView, Text} from "react-native"
import {deleteFromHistory, historyList, loadFromHistory} from "../historyHendler";
import {Button, Card} from "@rneui/themed";
import {constractComposer, outcomeComposer} from "../../../helpers/composerhelper";
export const DealsHistory=({changeToTable,deleteHistory})=>{
    const [historyList,setHistryList]=React.useState<historyList>(undefined)
    useEffect( () => {
        load().then((history)=>{
            setHistryList(history)
            console.log("history",history)
        })
    }, []);
    const load= async (): Promise<historyList> => {
        return await loadFromHistory()
    }
    const deleteItem=async (id)=>{
        await deleteFromHistory(id)
        load().then((history)=>{
            setHistryList(history)
            console.log("history",history)
        })
    }
    if(historyList!=undefined){
    return(
       <>
           <Button onPress={changeToTable}>
               <Text>powrót</Text>
          </Button>
            <ScrollView>
                <Text>Historia:</Text>
                {historyList.history.map((history)=>{
                    return(
                        <HistoryCard history={history} deleteItem={deleteItem}/>
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
            <Text>loading</Text>
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
            <Text>Imp:{history.score.imps}, punkty rozgrywającego:{history.score.pointsOnPlayer}, punkty za kontrakt:{history.score.score}</Text>

            <Text>rozdanie numer:{history.board.number}</Text>
            <Text>konstract:{constractComposer(history.board.contract)}</Text>
            <Text>wynik:{outcomeComposer(history.board.outcome)}</Text>
            <Button onPress={deleteHistory}>
                <Text>usuń</Text>
            </Button>
        </Card>
    )
}