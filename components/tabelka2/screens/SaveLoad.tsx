import { Input} from "@rneui/themed";
import {View, BackHandler, Alert, ScrollView} from "react-native";
import {Button} from "../../basicComponents/Button";

import {colors} from "../styles/styles";
import React, {useEffect} from "react";
import {Text} from "../components/Text";
import {getHistoryEntries, loadFromLongHistory, setLongSave} from "../historyHendler";

export const SaveLoad = ({changeToTable,changeTohistory}) => {
    const [key, setKey] = React.useState<string>("")
    const [keyList, setKeyList] = React.useState<readonly string[]>([])
    useEffect(() => {
        const backAction = () => {
            changeTohistory()
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);
    useEffect(() => {
        getHistoryEntries().then((keys) => {
            setKeyList(keys)
        })
    }, []);

    const save = () => {
        if(key.trim()===""){
            Alert.alert("Nie można zapisać","Nazwa nie może być pusta")
            return
        }
        setLongSave(key)
        changeTohistory()
    }
    const load = (key:string) => {
        loadFromLongHistory(key)
        changeTohistory()
    }
return (<>
            <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                <Button onPress={changeTohistory} style={{}}>
                    <Text>powrót</Text>
                </Button>
                <Text>zapisz/wczytaj</Text>
            </View>
            <View>
                <Text style={{color:colors.text}}>zapisz jako:</Text>
                <Input style={{color:colors.text}} onChangeText={setKey} value={key}></Input>
            </View>
            <View style={[{ flexDirection: "row", alignItems: "center" }]}>

                <Button onPress={save}  style={{}}>
                    <Text>zapisz</Text>
                </Button>
            </View>
             <ScrollView>
                 {keyList.map((key) => {
                     return (
                         <LoadCard mykey={key} key={key} load={load} />
                     )
                 })}
             </ScrollView>
        </>);
}
export const LoadCard = ({mykey,load}) => {

    return (
        <>
            <View style={{
                backgroundColor:colors.card,
                width:"100%",
                // height:"100%",
                padding:10,
                margin:5,
                borderRadius:5,
            }}>
                <Text style={{color:colors.text}}>{mykey}</Text>
                <Button onPress={()=>{
                    load(mykey)
                }}
                        style={{}}>
                    <Text>wczytaj</Text>
                </Button>
            </View>
        </>);
}
