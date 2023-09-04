import {StyleSheet, Text, TextInput} from "react-native";
import {Button} from "../../basicComponents/Buttons";
import React, {useState} from "react";

export const PasswordScreen = ({action, showJoin}) => {
    const [passward, setPassward] = useState('')
    let join = () => {
        action(passward)
    };
    return (
        <>
            <Button onPress={showJoin} style={{width:50,marginBottom:20}}>
                <Text>Cofnij</Text>
            </Button>
            <Text>Podaj hasło:</Text>
            <TextInput
                style={styles.input}
                placeholder="hasło"
                onChangeText={(text) => setPassward(text)}
                value={passward}
                multiline={false} // Specifies the number of visible lines
            />
            <Button onPress={join} style={{marginTop:50}}>
                <Text>Dołącz</Text>
            </Button>
        </>
    )

}
const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderColor: 'black',
        justifyContent: 'center',
        borderWidth: 1,
        padding: 10,
        width:200,
        fontSize: 16,
        borderRadius: 4,
        minHeight: 30, // Minimum height for the input area
    },
    text:{
        fontSize:20,
        color:"black",
    },
    textNoDecoration: { textDecorationLine: "none" },
});