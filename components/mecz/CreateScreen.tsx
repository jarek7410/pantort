import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput} from "react-native";
import {Button} from "../basicComponents/Buttons";
import {MyCheckbox} from "../tabelka/Buttons";
import {color} from "../../styles/colors";

export const CreateScreen = ({create,join}) => {
    const [name, setName] = useState('')
    const [passward, setPassward] = useState('')
    const [isPassward, setIsPassward] = useState(false)
    let createMecz = () => {
        create(name)
    };
    return (
        <View style={{width:200}}>
            <Button onPress={join} style={{width:50,marginBottom:20}}>
                <Text>Cofnij</Text>
            </Button>
            <TextInput
                style={styles.input}
                placeholder="tytuł meczu"
                onChangeText={(text) => setName(text)}
                value={name}
                multiline={false} // Specifies the number of visible lines
            />
            <MyCheckbox
                        textStyle={[styles.text, styles.textNoDecoration]}
                        text={"wymagej hasła"}
                        isChecked={isPassward}
                        onPress={() => setIsPassward(!isPassward)}
                        disableBuiltInState
                        fillColor={"yellowgreen"}
                        unfillColor={color.yellow}/>
            {isPassward &&
                <TextInput
                style={styles.input}
                placeholder="hasło"
                onChangeText={(text) => setPassward(text)}
                // value={passward}
                value={"haslo nie działa"}
                multiline={false} // Specifies the number of visible lines
            />}
            <Button onPress={createMecz} style={{marginTop:50}}>
                <Text>Utwórz</Text>
            </Button>
        </View>
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