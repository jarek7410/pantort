import {KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {color} from "../styles/colors";
import * as React from "react";
import {bid, result, suit, Vulnerability, wind} from "../helpers/enumhelper";
import {duplicateBoardsComposer, outcomeComposer, scoreComposer} from "../helpers/composerhelper";
import {expectablePointsTableka, impTable} from "../helpers/brydzHalpers";
import {ImpPopup} from "./ImpPopup";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect} from "react";

export const TabelkaScreen = () => {
  const [boardNumber,setBoardNumber] = React.useState("1");
  const [isKontra,setIsKontra] = React.useState(bid.pass);
  const [contractHeight,setContractHeight] = React.useState("1");
  const [playedSuit,setPlayedSuit] = React.useState(suit.nt);
  const [outcome,setOutcome] = React.useState(result.fair)
  const [takes,setTakes] = React.useState("0");
  const [volnable,setVolnable] = React.useState(Vulnerability.NONE);
  const [player,setPlayer] = React.useState(wind.N)
  const [dealer,setDealer] = React.useState(wind.N)
  const [points,setPoints] = React.useState("20");
  const [duplicateBoards,setDuplicateBoards] = React.useState(1)

  const [score,setScore] = React.useState(0);
  const [histry,setHistry] = React.useState([])
  useEffect(()=>{
    const duplicate = duplicateBoardsComposer(parseInt(boardNumber))
    setDuplicateBoards(duplicate.board)
    setVolnable(duplicate.vulnerability)
    setDealer(duplicate.dealer)
  },[boardNumber])

  useEffect(()=>{
    if(parseInt(points)>40||parseInt(points)<0){
      setPoints("20")
    }
  },[points])

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
      wind: player,
    };
    let outcom = {
      tricks: takes,
      result: outcome,
    }
    let vol=false
    if (volnable===Vulnerability.BOTH){
      vol=true
    }
    if (volnable===Vulnerability.NS
        &&(player===wind.N||player===wind.S)){
      vol=true
    }
    if (volnable===Vulnerability.EW
        &&(player===wind.E||player===wind.W)) {
      vol = true
    }
    let scoreLocal = scoreComposer(contract,outcom,vol)
    let estimate = expectablePointsTableka( points,vol)
    const imp = impTable(scoreLocal-estimate)
    console.log("score: ",scoreLocal)
    console.log("estimate: ",estimate)
    console.log("imp: ",imp)
    console.log("boardNumber: ",(parseInt(boardNumber)+1))
    setScore(imp+score)
    setHistry([...histry,{
      imp:imp,
      contract:contract,
      outcome:outcom,
      number:boardNumber}])
    setBoardNumber((parseInt(boardNumber)+1).toString())
  }

  return(
      <View style={[styles.menu]}>
        <SafeAreaView>
        <ImpPopup history={histry} setHistry={setHistry}/>
        <View style={[styles.row]}>
          <Text style={styles.text}>rozdanie nr:</Text>
          <TextInput style={styles.textInput}
                     onChangeText={setBoardNumber}
                     value={boardNumber}
                     placeholder="##"
                     keyboardType="numeric"
          />
          <Text style={styles.text}>punkty na lini:</Text>
          <TextInput style={styles.textInput}
                     onChangeText={setPoints}
                     value={points}
                     placeholder="##"
                     keyboardType="numeric"
          />
        </View>
          <Text style={styles.text}>Deler: {dealer}</Text>
        </SafeAreaView>
        <View style={[styles.row]}>
          <View>
            <Text style={styles.text}></Text>
            <Text style={styles.text}>przed:</Text>
            <Text style={styles.text}>po:</Text>
          </View>
          <View>
            <Text style={styles.text}>NS:</Text>
            <BouncyCheckbox
                textStyle={[styles.text, styles.textNoDecoration]}
                text={""}
                isChecked={volnable===Vulnerability.NONE||volnable===Vulnerability.EW}
                disableBuiltInState
                fillColor={"yellowgreen"}
                unfillColor={color.yellow}
            />
            <BouncyCheckbox
                textStyle={[styles.text, styles.textNoDecoration]}
                text={""}
                isChecked={volnable===Vulnerability.BOTH||volnable===Vulnerability.NS}
                disableBuiltInState
                fillColor={"firebrick"}
                unfillColor={color.red}
            />
          </View>
          <View>
            <Text style={styles.text}>EW:</Text>
            <BouncyCheckbox
                textStyle={[styles.text, styles.textNoDecoration]}
                text={""}
                isChecked={volnable===Vulnerability.NONE||volnable===Vulnerability.NS}
                disableBuiltInState
                fillColor={"yellowgreen"}
                unfillColor={color.yellow}
            />
            <BouncyCheckbox
                textStyle={[styles.text, styles.textNoDecoration]}
                text={""}
                isChecked={volnable===Vulnerability.BOTH||volnable===Vulnerability.EW}
                disableBuiltInState
                fillColor={"firebrick"}
                unfillColor={color.red}
            />
          </View>
          <Text style={styles.text}>Rozgrywa:</Text>
          <View>
            <BouncyCheckbox
                textStyle={[styles.text, styles.textNoDecoration]}
                text={"N"}
                isChecked={player===wind.NS||player===wind.N}
                onPress={()=>{setPlayer(wind.N)}}
                disableBuiltInState
                fillColor={"darkgreen"}
                unfillColor={color.green}
            />
            <BouncyCheckbox
                textStyle={[styles.text, styles.textNoDecoration]}
                text={"E"}
                isChecked={player===wind.EW||player===wind.E}
                onPress={()=>{setPlayer(wind.E)}}
                disableBuiltInState
                fillColor={"darkgreen"}
                unfillColor={color.green}
            />
          </View>
          <View>
            <BouncyCheckbox
                textStyle={[styles.text, styles.textNoDecoration]}
                text={"S"}
                isChecked={player===wind.NS||player===wind.S}
                onPress={()=>{setPlayer(wind.S)}}
                disableBuiltInState
                fillColor={"darkgreen"}
                unfillColor={color.green}
            />
            <BouncyCheckbox
                textStyle={[styles.text, styles.textNoDecoration]}
                text={"W"}
                isChecked={player===wind.EW||player===wind.W}
                onPress={()=>{setPlayer(wind.W)}}
                disableBuiltInState
                fillColor={"darkgreen"}
                unfillColor={color.green}
            />
          </View>
        </View>
        <HorizontalLine/>
        <Text style={styles.text}>Kontrakt:</Text>
        <View style={[styles.row]}>
          <Text style={styles.text}>wysokość:{contractHeight}</Text>
          {/*<TextInput style={styles.textInput}*/}
          {/*           onChangeText={setContractHeight}*/}
          {/*           value={contractHeight}*/}
          {/*           placeholder="##"*/}
          {/*           keyboardType="numeric"*/}
          {/*/>*/}
          <View>
            <BouncyCheckbox
                textStyle={[styles.text, styles.textNoDecoration]}
                text={""}
                isChecked={false}
                onPress={()=>{
                  if(contractHeight<7){
                    setContractHeight((parseInt(contractHeight)+1).toString())
                  }else{
                    setContractHeight("1")
                  }
                }}
                disableBuiltInState
                fillColor={color.orange}
                unfillColor={color.orange}/>
          </View>
          <View style={{borderRightWidth:1,height:"100%",marginHorizontal:5}}/>
          <View >
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
      <HorizontalLine/>
        <View style={[styles.row,{marginTop:10}]}>
          <Text style={styles.text}>kolor:</Text>
          <View>
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
              <Text style={styles.text}>wynik: {outcomeComposer({tricks: takes,result:outcome})}</Text>
                  <BouncyCheckbox
                      textStyle={[styles.text, styles.textNoDecoration]}
                      text={"+"}
                      isChecked={outcome===result.over}
                        onPress={()=>{
                            setOutcome(result.over)
                            takes>=0?setTakes(parseInt(takes)+1):setTakes(1);
                        }}
                      disableBuiltInState
                      fillColor={color.black}
                      unfillColor={"grey"}
                  />
                  <BouncyCheckbox
                      textStyle={[styles.text, styles.textNoDecoration]}
                      text={"="}
                      isChecked={outcome===result.fair}
                      onPress={()=>{
                        setOutcome(result.fair)
                        setTakes(0);
                      }}
                      disableBuiltInState
                      fillColor={"yellowgreen"}
                      unfillColor={color.yellow}
                  />
                  <BouncyCheckbox
                      textStyle={[styles.text, styles.textNoDecoration]}
                      text={"-"}
                      isChecked={outcome===result.under}
                        onPress={()=>{
                          setOutcome(result.under)
                          takes<=0?setTakes(takes-1):setTakes(-1);
                        }}
                      disableBuiltInState
                      fillColor={"firebrick"}
                      unfillColor={color.red}
                  />
            </View>

        </View>
        <HorizontalLine/>


        <View style={[styles.row,{marginTop:5}]}>
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
// const colortabelka = {
//     black:"#000000",
//   neongreen:"#00FF19",
// }
const styles = StyleSheet.create({
  button:{
    width:30,
    height:30,
    backgroundColor:"bisque",
    alignItems:"center",
    justifyContent:"center",
  },
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
    color:"black",
    marginBottom:5,
  },
  row:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    width:"100%"
  },
  buttonText: {
    fontSize: 20,
  }

})