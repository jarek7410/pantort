import { StyleSheet, View} from "react-native";
import {SquerButton} from "./SquerButton";
import React from "react";

export const Row=({row,onClick,onChange})=> {
    return(
        <View key={row.row} style={[styles.row,{
        }]}>
            {row.children.map(item=>{
                return(
                    <>
                        <SquerButton onChange={onChange} onClick={onClick} text={item.text} color={item.color} icon={item.icon} id={item.id} key={item.id}/>
                    </>
                )
            })}
        </View>
    )
}

const styles =StyleSheet.create({
    row:{
        flexDirection: 'row',
        height:40,
        marginBottom:20,
    }
});