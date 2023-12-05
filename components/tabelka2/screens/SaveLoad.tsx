import {Button, Card, Input} from "@rneui/themed";
import {View, BackHandler, Alert, ScrollView} from "react-native";
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
                <Button onPress={changeTohistory} size="lg" style={{}}>
                    <Text>powrót</Text>
                </Button>
                <Text>zapisz/wczytaj</Text>
            </View>
            <View>
                <Text style={{color:colors.text}}>zapisz jako:</Text>
                <Input onChangeText={setKey} value={key}></Input>
            </View>
            <View style={[{ flexDirection: "row", alignItems: "center" }]}>

                <Button onPress={save} size="lg" style={{}}>
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
            <Card>
                <Text style={{color:colors.text}}>{mykey}</Text>
                <Button onPress={()=>{
                    load(mykey)
                }}
                        size="lg" style={{}}>
                    <Text>wczytaj</Text>
                </Button>
            </Card>
        </>);
}