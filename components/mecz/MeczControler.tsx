import {StyleSheet, Text, View} from "react-native";
import {useState} from "react";
import {styles} from "./styles";
import {JoinScreen} from "./JoinScreen";
import Config from "react-native-config";
import {PlayScreen} from "./PlayScreen";
import {getMeczID, postMeczPlay} from "../../helpers/fetchHelper";
import {CreatePlayDto} from "../../helpers/cought_them_all.dto";
import {ResultsScreen} from "./ResultsScreen";
enum scmech {
    join ,
    create,
    list,
    chouse,
    game,
    histry

}

export const MeczControler = () => {
    const [screen, setScreen] = useState(scmech.join);
    const [code, setCode] = useState('')
    const [mechID, setMechID] = useState(-1)
    const [codeText, setCodeText] = useState('')
    const  join = async (code) => {
        const {mechID,...rest}={...await getMeczID(code)}

        setMechID(mechID)
        setCode(code)
        setScreen(scmech.game)
    }
    const showPlay = () => {
        setScreen(scmech.game)
    }
    const showHistry = () => {
        setScreen(scmech.histry)
    }
    const setPlay = (playDto:CreatePlayDto) => {
        postMeczPlay(mechID,playDto)
    }

    return(
        <View style={styles.menu}>
            {screen===scmech.join &&
                <JoinScreen action={join}/>
        }
            {screen===scmech.game &&
                    <PlayScreen code={code} showHistry={showHistry} setPlay={setPlay}/>
        }
            {screen===scmech.histry &&
                    <ResultsScreen setPlay={showPlay}/>
            }
        </View>
    )
}
