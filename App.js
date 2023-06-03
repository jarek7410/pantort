import { StyleSheet,  View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {BridgeKeyBoard} from "./components/BridgeKeyBoard";
import {BridgeScreen} from "./components/BridgeScreen";
import {decodeAction} from "./helpers/bridgekeyboardhelpers";
import {useEffect, useState} from "react";
import {bid, result, Boardsceen, suit, vals, wind} from "./helpers/enumhelper";
import {boardUpdate} from "./helpers/boardhelper";

const roundDefault={
    round:0, //0 to inf
    ns:0,
    ew:0,
    firstBoard:1,
    lastBoard:1,
}
const boardDefault={
    number:4, //1 to 32
    contract:{
        suit:suit.nt,
        number:1,
        double:bid.xx,
        wind:wind.N,
    },
    lead:{
        suit:suit.diamonds,
        vals:vals.A,
    },
    outcome:{
        tricks:1,
        result:result.fair,
    }
}
export default function App() {
    const [focus,setFocus]=useState(Boardsceen.board);
    const [round,setRound]=useState(roundDefault);
    // const [board,setBoard]=useState(boardDefault)
    const [board,setBoard]=useState({})
    const [,setRender]=useState(0);

    useEffect(()=>{
      console.count("render")
    })
    const keyboardhendler=id=>{
        let action=decodeAction(id)
        console.log("action"+action);
        const [workboard,workfocus]=boardUpdate(board,action,focus)
        setBoard({...board,workboard});
        setFocus(workfocus);
        console.log(typeof(workboard));
        console.log(board)
        setRender(Math.random())
    }
    return (
    <View style={styles.container} key="main main">
        <SafeAreaProvider style={{
            justifyContent:"center",
        }}>
            <BridgeScreen focus={focus} round={round} board={board}/>
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
