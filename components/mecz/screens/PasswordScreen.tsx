import {StyleSheet, Text, TextInput} from "react-native";
import {Button} from "../../basicComponents/Buttons";
import React, {useState} from "react";
import styles from "../styles/create.styles";

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
