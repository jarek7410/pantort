import {StyleSheet, Text, View} from "react-native";

export const TournamentEndScreen = () => {
  return(
      <View style={styles.screen}>
          <Text>Turniej zakończony</Text>
          <Text>Dziekuje za Grę</Text>
      </View>
  )
}
const styles=StyleSheet.create({
    screen: {
        margin: 5,
        width: 290,
        height: 195,
        padding: 20,
        backgroundColor: "darkgreen",
        alignItems: "center",
        justifyContent: "center",
    },
})