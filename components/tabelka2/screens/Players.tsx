import React, {useState} from "react";
import {ScrollView, Text} from "react-native"
import {Card, Input,Button} from "@rneui/themed";
export const Players=({names,setNames,changeToTable})=>{
    const changeName=(id:number,name:string)=>{
        console.log("changeName",id,name)
        const newNames=names
        newNames.movable[id].player.name=name
        setNames(newNames)
    }
    return(
        <>
        <Button onPress={changeToTable}>
            <Text>stół</Text>
        </Button>
        <ScrollView>
            <Text>Players</Text>
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
    const save=()=>{
        console.log("save",id,name)
        changeName(id,name)
    }
    const [name,setName]=useState(player.name)
    return(
        <Card>
            <Text>{id===0?"N":id}</Text>
            <Input onChangeText={setName} value={name}></Input>
            <Text>name{name}</Text>
            <Button onPress={save}>
                Zapisz
            </Button>
        </Card>
    )

}