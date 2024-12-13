import * as React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {MenuOption} from "./MenuOption";



export const AppMenu = ({setCourse}) => {
    const setChooseTabelka2= () => {
        setCourse(-1);
    }
    return(
      <View
            style={{
                width:300,
                }}>
                  <HomeScreen tabelka2={setChooseTabelka2}/>
      </View>
  )
}
const HomeScreen = ({tabelka2}) => {
    return (
        <>
            <View style={[styles.menu]}>
                <MenuOption text="tabelka" handler={tabelka2}/>
            </View>
        </>
    );
};

const ProfileScreen = ({route}) => {
    return <Text>This is {route.params.name}'s profile</Text>;
};

const styles = StyleSheet.create({
    menu:{
        // backgroundColor:color.primary,
        padding:10,
    },
    item:{
        backgroundColor:"darkgreen",
        flex:1,
        aspectRatio:5,
        margin:10,
        padding:10,
        width:200,
        justifyContent:"center",
        alignItems:"center",
    },
    text:{
        fontSize:20,
        color:"black",
    },
    row:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%"
    },
})
