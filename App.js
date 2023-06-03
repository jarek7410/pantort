import { StyleSheet,  View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {BridgeKeyBoard} from "./components/BridgeKeyBoard";
import {BridgeScreen} from "./components/BridgeScreen";
import {decodeAction} from "./helpers/bridgekeyboardhelpers";
import {useState} from "react";
import {bid, result, suit, vals, wind} from "./helpers/enumhelper";

const roundDefault={
    round:0, //0 to inf
    ns:0,
    ew:0,
    firstBoard:1,
    lastBoard:1,
}
const boardDefault={
    number:0, //1 to 32
    contract:{
        suit:suit.nt,
        number:1,
        wind:wind.N,
        double:bid.x
    },
    lead:{
        suit:suit.diamonds,
        vals:vals.seven,
    },
    outcome:{
        number:0,
        result:result.fair
    }
}
export default function App() {
    const [round,setRound]=useState(roundDefault);
    const [board,setBoard]=useState(boardDefault)
    const keyboardhendler=id=>{
        console.log(decodeAction(id))
    }
    return (
    <View style={styles.container} key="main main">
        <SafeAreaProvider style={{
            justifyContent:"center",
        }}>
            <BridgeScreen round={round} board={board}/>
            <BridgeKeyBoard onChange={keyboardhendler}/>
        </SafeAreaProvider>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#454545',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
