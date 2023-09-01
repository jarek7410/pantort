import React, {useEffect, useState} from "react";
import {Text, TextInput, View} from "react-native";
import {styles} from "./styles";
import {Button} from "../basicComponents/Buttons";
import {codePretty} from "./hendler";

export const JoinScreen = ({action}) => {
    const [code, setCode] = useState('P81F99C')
    const [codeText, setCodeText] = useState('P81F99C')
    useEffect(() => {
        setCodeText(codePretty(code))
        setCode(code.replace(/\s+/g, ''))
    },[code])

    const submit = () => {
        console.log("submit",code)
        if(code.length === 7) {
            action(code)
        }
        if(code.length === 0) {
            action('')
        }
    }

    return(
        <View style={styles.menu}>
            <TextInput style={styles.textInput}
                       onChangeText={setCode}
                       value={codeText}
                       autoFocus={true}
                       placeholder="### ####"
            />
            <Button onPress={submit} style={{paddingHorizontal:20}}>
                <Text>Dołacz</Text>
            </Button>
            <Button onPress={submit} style={{paddingHorizontal:20}}>
                <Text>Utwórz</Text>
            </Button>
        </View>
    )
}