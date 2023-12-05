import React, {useEffect, useState} from "react";
import {BackHandler, ScrollView,  View,Button} from "react-native"
import {Card, Input} from "@rneui/themed";
import {getCountedScore} from "../historyHendler";
import {colors, styles} from "../styles/styles";
import {Text} from "../components/Text";
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
              <Button onPress={changeToTable} title={"Powrót"}  color={colors.button}></Button>
                  {/*<Text>Powrót</Text>*/}
              {/*</Button>*/}
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
        <View style={{backgroundColor:colors.card,padding:10,margin:3 }}>
            <Text>{id===0?"N":id}</Text>
            <Text>imps:{imps}, pseudonim:{name} </Text>
            <Input onChangeText={setName} value={name} style={{color:colors.text}}></Input>
            {player.name!==name &&
                <Button onPress={save} title={"Zapisz"}/>
            }
        </View>
    )

}