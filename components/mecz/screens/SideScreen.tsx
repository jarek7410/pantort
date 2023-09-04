import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Button} from "../../basicComponents/Buttons";

export const SideScreen = ({setIsOpne}) => {
    const setOpen = () => {
        setIsOpne(true)
    }
    const setClose = () => {
        setIsOpne(false)
    }
    return(
        <>
            <Text >Wybierz swój stół</Text>
            <View style={{flexDirection: 'row'}}>
                <Button style={styles.button} onPress={setOpen}>
                    <Text>otwarty</Text>
                </Button>
                <Button style={styles.button} onPress={setClose}>
                    <Text>zamkniety</Text>
                </Button>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    button: {
        width: 70,
        marginHorizontal: 30,
        marginVertical: 20,
    }
})