import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {BridgeKeyBoard} from "./components/BridgeKeyBoard";
import {BridgeScreen} from "./components/BridgeScreen";
import {decodeAction} from "./helpers/bridgekeyboardhelpers";

const round={
    round:0, //0 to inf
    ns:0,
    ew:0,
    firstBoard:1,
    lastBoard:1,
}
export default function App() {
    const keyboardhendler=id=>{
        console.log(decodeAction(id))
    }
    return (
    <View style={styles.container} key="main main">
        <SafeAreaProvider style={{
            justifyContent:"center",
        }}>
            <BridgeScreen round={round}/>
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
