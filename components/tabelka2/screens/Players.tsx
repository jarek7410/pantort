import React, {useEffect, useState} from "react";
import {BackHandler, ScrollView, Text, View} from "react-native"
import {Card, Input,Button} from "@rneui/themed";
import {getCountedScore} from "../historyHendler";
import {styles} from "../styles/styles";
export const Players=({names,setNames,changeToTable})=>{

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
    const changeName=(id:number,name:string)=>{
        console.log("changeName",id,name)
        const newNames=names
        newNames.movable[id].player.name=name
        setNames(newNames)
    }
    return(
        <>
          <View style={[styles.row,{width:"100%",alignItems:"center"}]}>
              <Button onPress={changeToTable}>
                  <Text>Powrót</Text>
              </Button>
              <Text>Players</Text>
          </View>


        <ScrollView>
            {names.movable.map((player,id:number)=>{;
                return(
                    <PlayerCard changeName={changeName} player={player.player} key={id} id={id}/>
                )
            })}
        </ScrollView>
        </>
    )
}
const PlayerCard=({player,id,changeName})=>{
    const [name,setName]=useState(player.name)
    const [imps,setImps]=useState(player.imps)
    useEffect(() => {
        getCountedScore(id).then((imps)=>{
            setImps(imps)
        })
    }, []);
    const save=()=>{
        console.log("save",id,name)
        changeName(id,name)
    }
    return(
        <Card>
            <Text>{id===0?"N":id}</Text>
            <Text>imps:{imps}, pseudonim:{name} </Text>
            <Input onChangeText={setName} value={name}></Input>
            {player.name!==name &&
                <Button onPress={save}>
                    Zapisz
                </Button>
            }
        </Card>
    )

}