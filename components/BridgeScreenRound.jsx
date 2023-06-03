import {StyleSheet, Text, View} from "react-native";
import React from "react";

export const BridgeScreenRound = ({round,boards}) => {
  return(
      <>
        <View style={[styles.row,styles.narow]}>
          <View>
              <Text >round {round.round}</Text>
          </View>
          <View>
              <Text>NS:{round.ns} EW:{round.ew}</Text>
          </View>
          <View>
              <Text>
                  {boards}
              </Text>
          </View>
        </View>
        <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
            }}
        />
      </>
  )
}
const styles=StyleSheet.create({
    screen:{
        margin:5,
        width:290,
        height:195  ,
        padding:5,
        backgroundColor:"darkgreen",
    },
    row:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%"
    },
    narow:{
        height:20,
    },
    textMain:{
        fontSize:25,
    },
    manuItem:{
        height:20,
        backgroundColor:"gray",
        width:65,
        justifyContent:"center",
        alignItems:"center",
    },
    menuItemsText: {
        fontSize:10
    }
})