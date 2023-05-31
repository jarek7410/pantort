import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {BridgeKeyBoard} from "./components/BridgeKeyBoard";
import Card from 'react-playing-card'

export default function App() {
    return (
    <View style={styles.container}>
        <SafeAreaProvider>
            <Text>ITS working kinde of</Text>
            <BridgeKeyBoard />
            <Card rank="A" suit="S" />
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
