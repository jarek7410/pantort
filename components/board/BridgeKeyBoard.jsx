import React from "react";
import {View,Text,StyleSheet} from "react-native";
import {Row} from "../Row";
import {buttonTable} from "../../helpers/keyboardlayouthelper";


export const BridgeKeyBoard =({onClick,onChange})=>{

    return(
        <View style={{
            justifyContent:"center",
            alignItems:"center",
            width:"100%",
        }}>
            {buttonTable.map((row)=>{
                        return(
                            <Row onChange={onChange} onClick={onClick} row={row}/>
                        )
            })}
        </View>
    )
}
