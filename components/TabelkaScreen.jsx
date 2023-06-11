import {Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {color} from "../styles/colors";
import * as React from "react";
import {bid, result, suit, wind} from "../helpers/enumhelper";
import {scoreComposer} from "../helpers/composerhelper";
import {expectablePointsTableka, impTable} from "../helpers/brydzHalpers";
import {ImpPopup} from "./ImpPopup";

export const TabelkaScreen = () => {
  const [isKontra,setIsKontra] = React.useState(bid.pass);
  const [contractHeight,setContractHeight] = React.useState("");
  const [playedSuit,setPlayedSuit] = React.useState(suit.nt);
  const [outcome,setOutcome] = React.useState(result.fair)
  const [takes,setTakes] = React.useState("");
  const [volnable,setVolnable] = React.useState(false);
  const [points,setPoints] = React.useState("");

  const [score,setScore] = React.useState(0);
  const [histry,setHistry] = React.useState([])

  const onsubmit = () => {
    /**
     * kolor done
     * wysokość done
     * kontra
     * praed/po
     */
    let contract = {
      number: contractHeight,
        suit: playedSuit,
        double: isKontra,
      wind: wind.N,
    };
    let outcom = {
      tricks: takes,
      result: outcome,
    }
    let score = scoreComposer(contract,outcom,volnable)
    let estimate = expectablePointsTableka( points,volnable)
    const imp = impTable(score-estimate)
    // console.log("score: ",score)
    // console.log("estimate: ",estimate)
    // console.log("imp: ",imp)
    setScore(imp+score)
    setHistry([...histry,{imp:imp,contract:contract,outcome:outcom}])
  }

  return(
      <View style={[styles.menu]}>
        <ImpPopup history={histry}/>
        <Text style={styles.text}>Kontrakt:</Text>
        <View style={[styles.row]}>
          <Text style={styles.text}>wysokość:</Text>
          <TextInput style={styles.textInput}
                     onChangeText={setContractHeight}
                     value={contractHeight}
                     placeholder="##"
                     keyboardType="numeric"
          />
        </View>
      <HorizontalLine/>
        <View style={[styles.row,{marginTop:10}]}>
          <View>
            <Text style={styles.text}>kolor:</Text>
          <BouncyCheckbox
              textStyle={[styles.text, styles.textNoDecoration]}
              text={"NT"}
              isChecked={playedSuit===suit.nt}
              onPress={()=>{setPlayedSuit(suit.nt)}}
              disableBuiltInState
              fillColor={color.blue}
              unfillColor={color.green}
          />
          <BouncyCheckbox
              textStyle={[styles.text, styles.textNoDecoration]}
              text={"S"}
              isChecked={playedSuit===suit.spades}
              onPress={()=>{setPlayedSuit(suit.spades)}}
              disableBuiltInState
              fillColor={color.black}
              unfillColor={color.yellow}
          />
          <BouncyCheckbox
              textStyle={[styles.text, styles.textNoDecoration]}
              text={"H"}
              isChecked={playedSuit===suit.hearts}
              onPress={()=>{setPlayedSuit(suit.hearts)}}
              disableBuiltInState
              fillColor={color.red}
              unfillColor={color.yellow}
          />
          <BouncyCheckbox
              textStyle={[styles.text, styles.textNoDecoration]}
              text={"D"}
              isChecked={playedSuit===suit.diamonds}
              onPress={()=>{setPlayedSuit(suit.diamonds)}}
              disableBuiltInState
              fillColor={color.red}
              unfillColor={color.yellow}
          />
          <BouncyCheckbox
              textStyle={[styles.text, styles.textNoDecoration]}
              text={"C"}
              isChecked={playedSuit===suit.clubs}
              onPress={()=>{setPlayedSuit(suit.clubs)}}
              disableBuiltInState
              fillColor={color.black}
              unfillColor={color.yellow}
          />
          </View>
          <View style={{borderRightWidth:1,height:"100%",marginHorizontal:5}}/>
          <View>
          <BouncyCheckbox
              textStyle={[styles.text, styles.textNoDecoration]}
              text={"kontra"}
              isChecked={isKontra===bid.x}
              onPress={()=>{
                if(isKontra===bid.x){
                  setIsKontra(bid.pass)
                }else{setIsKontra(bid.x)}}}
              disableBuiltInState
              fillColor={color.orange}
              unfillColor={color.yellow}
          />
          <BouncyCheckbox
            textStyle={[styles.text, styles.textNoDecoration]}
            text={"rekontra"}
            isChecked={isKontra===bid.xx}
            onPress={()=>{
              if(isKontra===bid.xx){
                setIsKontra(bid.pass)
              }else{setIsKontra(bid.xx)}}}
            disableBuiltInState
            fillColor={color.orange}
            unfillColor={color.yellow}
          />
          </View>

        </View>
        <Text style={styles.text}>wynik:</Text>
        <View style={[styles.row]}>
          <View>
          <BouncyCheckbox
              textStyle={[styles.text, styles.textNoDecoration]}
              text={"+"}
              isChecked={outcome===result.over}
              onPress={()=>{setOutcome(result.over)}}
              disableBuiltInState
              fillColor={color.black}
              unfillColor={"grey"}
          />
          <BouncyCheckbox
              textStyle={[styles.text, styles.textNoDecoration]}
              text={"="}
              isChecked={outcome===result.fair}
              onPress={()=>{setOutcome(result.fair)}}
              disableBuiltInState
              fillColor={"yellowgreen"}
              unfillColor={color.yellow}
          />
          <BouncyCheckbox
              textStyle={[styles.text, styles.textNoDecoration]}
              text={"-"}
              isChecked={outcome===result.under}
              onPress={()=>{setOutcome(result.under)}}
              disableBuiltInState
              fillColor={"firebrick"}
              unfillColor={color.red}
          />
          </View>
          <TextInput style={styles.textInput}
                onChangeText={setTakes}
                value={takes}
                placeholder="##"
                keyboardType="numeric"
          />
        </View>
          <HorizontalLine/>
        <View style={[styles.row]}>
          <Text style={styles.text}>przed/po partii:</Text>
          <View>
          <BouncyCheckbox
              textStyle={[styles.text, styles.textNoDecoration]}
              text={"zielone"}
              isChecked={!volnable}
              onPress={()=>{setVolnable(false)}}
              disableBuiltInState
              fillColor={"yellowgreen"}
              unfillColor={color.yellow}
          />
          <BouncyCheckbox
              textStyle={[styles.text, styles.textNoDecoration]}
              text={"czerwone"}
              isChecked={volnable}
              onPress={()=>{setVolnable(true)}}
              disableBuiltInState
              fillColor={"firebrick"}
              unfillColor={color.red}
          />
          </View>
        </View>
        <HorizontalLine/>
        <View style={[styles.row,{marginTop:5}]}>
        <Text style={styles.text}>punkty na lini:</Text>
        <TextInput style={styles.textInput}
                      onChangeText={setPoints}
                      value={points}
                      placeholder="##"
                      keyboardType="numeric"
        />
        </View>
        <HorizontalLine/>
        <TouchableOpacity onPress={onsubmit}>
          <View style={[styles.item]}>
            <Text style={[styles.text,{color:"dark"}]}>zatwierdz</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>wynik: {score}</Text>
      </View>
  )
}
const HorizontalLine = () => {
    return (
        <View style={{borderBottomWidth:1,width:300}}/>
    )
}
const styles = StyleSheet.create({
  menu:{
    backgroundColor:"green",
    margin:20,
    padding:10,
    alignItems:"center",
    width:"70%"
  },
  item:{
    backgroundColor:"darkgreen",
    margin:10,
    padding:10,
    justifyContent:"center",
    alignItems:"center",
  },
  text:{
    fontSize:20,
    color:"black",
  },
  textNoDecoration: { textDecorationLine: "none" },
  textInput:{
    fontSize:25,
    height: 60,
    width: 60,
    borderWidth: 1,
    padding: 10,
    borderColor:"black",
    marginBottom:5,
  },
  row:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    width:"100%"
  },
})