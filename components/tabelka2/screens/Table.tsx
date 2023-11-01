import React from "react";
import {Text, View} from "react-native"
import {Compass} from "./Table/Compass";
import {styles} from "../styles/styles";
export const Table=({names,volnable,player,setPlayer,dealer})=>{
    return(

        <View>
            {/*split view into 3 parts one for top, bottom and for compas in the midle*/}
            <View style={[styles.debug]}></View>
            <Compass
                names={names} volnable={volnable}
                player={player} setPlayer={setPlayer}
                dealer={dealer}
            />
            <View style={[styles.debug]}></View>
        </View>
    )
}