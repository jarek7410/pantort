import { StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {color} from "../../styles/colors";
import * as React from "react";
import {bid, result, suit, Vulnerability, wind} from "../../helpers/enumhelper";
import {duplicateBoardsComposer, outcomeComposer, scoreComposer} from "../../helpers/composerhelper";
import {expectablePointsTableka, impTable} from "../../helpers/brydzHalpers";
import {ImpPopup} from "./ImpPopup";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect} from "react";
import {ButtonNinus, ButtonPlus, MyCheckbox} from "./Buttons";

export const TabelkaScreen = () => {
  const [boardNumber,setBoardNumber] = React.useState("1");
  const [isKontra,setIsKontra] = React.useState(bid.none);
  const [contractHeight,setContractHeight] = React.useState("1");
  const [playedSuit,setPlayedSuit] = React.useState(suit.NT);
  const [outcome,setOutcome] = React.useState(result.fair)
  const [takes,setTakes] = React.useState("0");
  const [volnable,setVolnable] = React.useState(Vulnerability.NONE);
  const [player,setPlayer] = React.useState(wind.N)
  const [dealer,setDealer] = React.useState(wind.N)
  const [points,setPoints] = React.useState(20);
  const [DuplicateBoards,setDuplicateBoards] = React.useState(1)

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
      level:boardNumber}])
    setBoardNumber((parseInt(boardNumber)+1).toString())
  }

  const increasePoints = (number) => {
        if(points+number>40){
          setPoints(40)
        }else{
          setPoints(points+number)
        }

  };
  const decreasePoints = (number) => {
        if(points-number<0){
          setPoints(0)
        }else{
          setPoints(points-number)
        }
  };
  return(
      <View style={[styles.menu]}>
        <SafeAreaView>
        <View style={[styles.row]}>
          <Text style={styles.text}>rozdanie nr:</Text>
          <TextInput style={styles.textInput}
                     onChangeText={setBoardNumber}
                     value={boardNumber}
                     autoFocus={true}
                     placeholder="##"
                     keyboardType="numeric"
          />
          <View style={{marginLeft:10}}>
            <Text style={styles.text}>Deler: {dealer}</Text>
            <ImpPopup history={histry} setHistry={setHistry}/>
          </View>
        </View>
          <View style={{alignItems:"center"}}>
          <Text style={styles.text}>punkty na lini:</Text>
          <View style={styles.rowOnly}>
            <ButtonNinus text={"-5"} onPress={()=>{decreasePoints(5)}}/>
            <ButtonNinus text={"-"} onPress={()=>{decreasePoints(1)}}/>
            <Text style={[styles.text,{width:35,height:30}]}>
              [{points}]
            </Text>
            <ButtonPlus text={"+"} onPress={()=>increasePoints(1)}/>
            <ButtonPlus text={"+5"} onPress={()=>increasePoints(5)}/>
          </View>
        </View>
        </SafeAreaView>
        <View style={[styles.row]}>
          <View>
            <Text style={styles.text}></Text>
            <Text style={styles.text}>przed:</Text>
            <Text style={styles.text}>po:</Text>
          </View>
          <View>
            <Text style={styles.text}>NS:</Text>
            <MyCheckbox
                textStyle={[styles.text, styles.textNoDecoration]}
                text={""}
                isChecked={volnable===Vulnerability.NONE||volnable===Vulnerability.EW}
                disableBuiltInState
                fillColor={"yellowgreen"}
                unfillColor={color.yellow}
            />
            <MyCheckbox
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
            <MyCheckbox
                textStyle={[styles.text, styles.textNoDecoration]}
                text={""}
                isChecked={volnable===Vulnerability.NONE||volnable===Vulnerability.NS}
                disableBuiltInState
                fillColor={"yellowgreen"}
                unfillColor={color.yellow}
            />
            <MyCheckbox
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
            <MyCheckbox
                textStyle={[styles.text, styles.textNoDecoration]}
                text={"N"}
                isChecked={player===wind.NS||player===wind.N}
                onPress={()=>{setPlayer(wind.N)}}
                disableBuiltInState
                fillColor={"darkgreen"}
                unfillColor={color.green}
            />
            <MyCheckbox
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
            <MyCheckbox
                textStyle={[styles.text, styles.textNoDecoration]}
                text={"S"}
                isChecked={player===wind.NS||player===wind.S}
                onPress={()=>{setPlayer(wind.S)}}
                disableBuiltInState
                fillColor={"darkgreen"}
                unfillColor={color.green}
            />
            <MyCheckbox
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
          <Text style={styles.text}>wysokość:</Text>
          {/*<TextInput style={styles.textInput}*/}
          {/*           onChangeText={setContractHeight}*/}
          {/*           value={contractHeight}*/}
          {/*           placeholder="##"*/}
          {/*           keyboardType="numeric"*/}
          {/*/>*/}
          <View>
            <MyCheckbox
                textStyle={[styles.text, styles.textNoDecoration]}
                text={contractHeight}
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
            <MyCheckbox
                textStyle={[styles.text, styles.textNoDecoration]}
                text={"kontra"}
                isChecked={isKontra===bid.x}
                onPress={()=>{
                  if(isKontra===bid.x){
                    setIsKontra(bid.none)
                  }else{setIsKontra(bid.x)}}}
                disableBuiltInState
                fillColor={color.orange}
                unfillColor={color.yellow}
            />
            <MyCheckbox
                textStyle={[styles.text, styles.textNoDecoration]}
                text={"rekontra"}
                isChecked={isKontra===bid.xx}
                onPress={()=>{
                  if(isKontra===bid.xx){
                    setIsKontra(bid.none)
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
          <MyCheckbox
              textStyle={[styles.text, styles.textNoDecoration]}
              text={"NT"}
              isChecked={playedSuit===suit.NT}
              onPress={()=>{setPlayedSuit(suit.NT)}}
              disableBuiltInState
              fillColor={color.blue}
              unfillColor={color.green}
          />
          <MyCheckbox
              textStyle={[styles.text, styles.textNoDecoration]}
              text={"S"}
              isChecked={playedSuit===suit.SPADES}
              onPress={()=>{setPlayedSuit(suit.SPADES)}}
              disableBuiltInState
              fillColor={color.black}
              unfillColor={color.yellow}
          />
          <MyCheckbox
              textStyle={[styles.text, styles.textNoDecoration]}
              text={"H"}
              isChecked={playedSuit===suit.HEARTS}
              onPress={()=>{setPlayedSuit(suit.HEARTS)}}
              disableBuiltInState
              fillColor={color.red}
              unfillColor={color.yellow}
          />
          <MyCheckbox
              textStyle={[styles.text, styles.textNoDecoration]}
              text={"D"}
              isChecked={playedSuit===suit.DIAMONDS}
              onPress={()=>{setPlayedSuit(suit.DIAMONDS)}}
              disableBuiltInState
              fillColor={color.red}
              unfillColor={color.yellow}
          />
          <MyCheckbox
              textStyle={[styles.text, styles.textNoDecoration]}
              text={"C"}
              isChecked={playedSuit===suit.CLUBS}
              onPress={()=>{setPlayedSuit(suit.CLUBS)}}
              disableBuiltInState
              fillColor={color.black}
              unfillColor={color.yellow}
          />
          </View>
          <View style={{borderRightWidth:1,height:"100%",marginHorizontal:5}}/>
            <View>
              <Text style={styles.text}>wynik: {outcomeComposer({tricks: takes,result:outcome})}</Text>
                  <MyCheckbox
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
                  <MyCheckbox
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
                  <MyCheckbox
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
        <TouchableOpacity onPress={onsubmit}>
          <View style={[styles.item,{borderRadius:5}]}>
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
  menu:{
    borderRadius:3,
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
    borderRadius:3,
  },
  rowOnly:{
    flexDirection:"row",
  },
  row:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    width:"100%"
  },
  button:{
    width:30,
    height:30,
    backgroundColor:"grey",
    alignItems:"center",
    justifyContent:"center",
  },
  buttonPlus:{
    backgroundColor:"darkgreen",
  },
  buttonMinus:{
    backgroundColor:"darkred",
  },
  buttonText: {
    fontSize: 20,
  }

})