import {styles} from "../../../styles/styles";
import {Button} from "../../basicComponents/Button";
import {Text, View} from "react-native";
import React from "react";

export const ChouseScreen = ({showJoin,showCreate,back}) => {
    return(
        // <View style={joinStyles.menu}>
        <View>
            <Button onPress={back} style={styles.backButton}>
                <Text>Cofnij</Text>
            </Button>
            <Button onPress={showJoin}
                    style={[styles.item,styles.textInput]}>
                <Text>Dołacz</Text>
            </Button>
            <Button onPress={showCreate}
                    style={[styles.item,styles.textInput]}>
                <Text>Utwórz</Text>
            </Button>
        </View>
    )
}